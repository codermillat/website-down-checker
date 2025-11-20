
import psl from "psl";

// Cloudflare Pages Function Types
// Defined locally to avoid needing external dependencies
interface EventContext {
  request: Request;
  functionPath: string;
  waitUntil: (promise: Promise<any>) => void;
  passThroughOnException: () => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  env: Record<string, any>;
  params: Record<string, any>;
  data: Record<string, any>;
}

const getRegistrableDomain = (host: string): string => {
  const parsed = psl.parse(host);
  if (typeof parsed === "string") {
    return host;
  }
  return parsed.domain || host;
};

const normalizeTimestamp = (value: any): string | undefined => {
  if (!value && value !== 0) return undefined;
  if (typeof value === "number") {
    return new Date(value * 1000).toISOString();
  }
  if (typeof value === "string") {
    const numeric = Number(value);
    if (!isNaN(numeric)) {
      return new Date(numeric * 1000).toISOString();
    }
    const parsed = Date.parse(value);
    if (!isNaN(parsed)) {
      return new Date(parsed).toISOString();
    }
    return value;
  }
  return undefined;
};

const buildWhoisSummary = (source: any, fallbackDomain: string) => {
  if (!source || source.error) {
    return source || { error: "Lookup failed" };
  }

  const statuses = Array.isArray(source.statuses)
    ? source.statuses
    : source.status
      ? Array.isArray(source.status)
        ? source.status
        : [source.status]
      : undefined;

  const nameServers = Array.isArray(source.nameservers)
    ? source.nameservers
    : typeof source.nameservers === "string"
      ? source.nameservers.split(/\s+/).filter(Boolean)
      : undefined;

  return {
    domain: source.domain || fallbackDomain,
    registrar: source.registrar,
    available: source.available,
    type: source.type,
    statuses,
    created: normalizeTimestamp(source.created || source.creation_date),
    updated: normalizeTimestamp(source.updated || source.updated_date || source.modified),
    expires: normalizeTimestamp(source.expires || source.expiration_date),
    nameServers,
    rawText: typeof source.whois === "string" ? source.whois : undefined
  };
};

export async function onRequest(context: EventContext): Promise<Response> {
  const urlStr = new URL(context.request.url).searchParams.get("url");

  if (!urlStr) {
    return new Response(JSON.stringify({ error: "No URL provided" }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }

  // Normalize URL for HTTP check
  let targetUrl = urlStr;
  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    targetUrl = "https://" + targetUrl;
  }

  // Extract hostname for lookups
  let hostname = "";
  try {
    hostname = new URL(targetUrl).hostname;
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid URL format" }), {
      headers: { "Content-Type": "application/json" },
      status: 400 
    });
  }

  const registrableDomain = getRegistrableDomain(hostname);

  const startTime = Date.now();

  // 1. HTTP Status Check
  const checkHttp = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout
    try {
      const response = await fetch(targetUrl, {
        method: "GET",
        headers: { "User-Agent": "WebsiteDownChecker/2.0 (Cloudflare Pages)" },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      // Consider 2xx and 3xx as UP
      const isUp = response.ok || (response.status >= 300 && response.status < 400);
      
      return {
        status: isUp ? "UP" : "DOWN",
        httpCode: response.status,
        responseTime: Date.now() - startTime
      };
    } catch (err: any) {
      clearTimeout(timeoutId);
      return {
        status: "DOWN",
        httpCode: 0,
        error: err.message || "Connection timed out or failed",
        responseTime: Date.now() - startTime
      };
    }
  };

  // 2. DNS Lookup (Google DoH)
  const resolveDns = async (type: string) => {
    try {
      const res = await fetch(`https://dns.google/resolve?name=${hostname}&type=${type}`, {
        headers: { "Accept": "application/dns-json" }
      });
      if (!res.ok) return [];
      const data: any = await res.json();
      return data.Answer || [];
    } catch (e) {
      return [];
    }
  };

  // 3. WHOIS Lookup (Free API)
  const checkWhois = async () => {
    try {
      const res = await fetch(`https://api.whois.vu/?q=${registrableDomain}`);
      if (!res.ok) return { error: "Lookup failed" };
      return await res.json();
    } catch (e) {
      return { error: "Lookup failed" };
    }
  };

  // Execute all checks in parallel
  const [
    httpResult,
    dnsA,
    dnsAAAA,
    dnsNS,
    dnsMX,
    dnsTXT,
    whoisData
  ] = await Promise.all([
    checkHttp(),
    resolveDns('A'),
    resolveDns('AAAA'),
    resolveDns('NS'),
    resolveDns('MX'),
    resolveDns('TXT'),
    checkWhois()
  ]);

  // Extract IP from A record
  const ip = dnsA.length > 0 ? dnsA[0].data : "Not found";

  const whoisSummary = buildWhoisSummary(whoisData, registrableDomain);

  // Construct final response
  const finalResponse = {
    url: hostname,
    domain: registrableDomain,
    result: httpResult,
    dns: {
      A: dnsA,
      AAAA: dnsAAAA,
      NS: dnsNS,
      MX: dnsMX,
      TXT: dnsTXT
    },
    ip: ip,
    whois: whoisSummary
  };

  return new Response(JSON.stringify(finalResponse), {
    headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
