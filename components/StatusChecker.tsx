
import React, { useState } from 'react';

// --- Icons ---
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-green-500">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

const XCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-red-500">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
  </svg>
);

const LoaderIcon = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const ChevronUpIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

// --- Types ---
// Defined locally to avoid modifying global types.ts and causing conflicts
interface DnsRecord {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

interface WhoisInfo {
  domain?: string;
  registrar?: string;
  available?: string;
  type?: string;
  statuses?: string[];
  created?: string;
  updated?: string;
  expires?: string;
  nameServers?: string[];
  rawText?: string;
  error?: string;
}

interface ApiResult {
  url: string;
  domain: string;
  result: {
    status: 'UP' | 'DOWN' | 'ERROR'; // Added ERROR for preview/fallback
    httpCode: number;
    error?: string;
    responseTime?: number;
  };
  dns: {
    A: DnsRecord[];
    AAAA: DnsRecord[];
    NS: DnsRecord[];
    MX: DnsRecord[];
    TXT: DnsRecord[];
  };
  ip: string;
  whois: WhoisInfo;
}

interface LocalStatusState {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: ApiResult | null;
  errorMessage?: string;
}

// --- Components ---

const SectionToggle = ({ title, isOpen, onClick }: { title: string, isOpen: boolean, onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex justify-between items-center py-3 px-4 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-left text-sm font-semibold text-slate-700 mt-3"
  >
    <span>{title}</span>
    {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
  </button>
);

const DnsTable = ({ type, records }: { type: string, records: DnsRecord[] }) => {
  if (!records || records.length === 0) return null;
  return (
    <div className="mb-4 last:mb-0">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{type} Records</h4>
      <div className="bg-white border border-slate-200 rounded overflow-hidden text-xs sm:text-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-2 border-b border-slate-100 font-medium text-slate-600">Data</th>
              <th className="p-2 border-b border-slate-100 font-medium text-slate-600 w-16">TTL</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec, idx) => (
              <tr key={idx} className="border-b border-slate-100 last:border-0">
                <td className="p-2 text-slate-800 break-all font-mono">{rec.data}</td>
                <td className="p-2 text-slate-500">{rec.TTL}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const formatDate = (value?: string) => {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (!isNaN(parsed.getTime())) {
    return parsed.toUTCString();
  }
  return value;
};

const WhoisRow = ({ label, value }: { label: string, value?: React.ReactNode }) => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '')
  ) {
    return null;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 py-2 border-b border-slate-100 last:border-0 text-sm">
      <dt className="font-medium text-slate-500">{label}</dt>
      <dd className="sm:col-span-2 text-slate-800 break-words">{value}</dd>
    </div>
  );
};

export const StatusChecker: React.FC = () => {
  const [url, setUrl] = useState('');
  const [state, setState] = useState<LocalStatusState>({ status: 'idle', data: null });
  
  // UI State for collapsible sections
  const [showDns, setShowDns] = useState(false);
  const [showWhois, setShowWhois] = useState(false);
  const [showWhoisRaw, setShowWhoisRaw] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    // Reset UI
    setShowDns(false);
    setShowWhois(false);
    setShowWhoisRaw(false);

    let target = url.trim();
    // Basic client validation
    if (!target.includes('.')) {
        setState({ status: 'error', data: null, errorMessage: 'Please enter a valid domain (e.g., google.com)' });
        return;
    }

    setState({ status: 'loading', data: null });

    try {
      const res = await fetch(`/check?url=${encodeURIComponent(target)}`);
      
      // Handle 404 (Preview environment)
      if (res.status === 404) {
        throw new Error("Backend API not found. Please deploy to Cloudflare Pages.");
      }
      
      // Check Content-Type
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
         throw new Error(`Unexpected response from server (${res.status})`);
      }

      const data: ApiResult = await res.json();
      setState({ status: 'success', data: data });

    } catch (error: any) {
      setState({
        status: 'error',
        data: null,
        errorMessage: error.message || 'Failed to connect to checker service.'
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto"> {/* Increased max-w for better table display */}
      <form onSubmit={handleCheck} className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
        <div className="p-6 bg-slate-50 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 text-center">Is it down?</h2>
          <p className="text-slate-500 text-sm text-center mt-1">Enter a URL to check status, DNS, and WHOIS.</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <GlobeIcon />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-shadow duration-200"
              placeholder="example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={state.status === 'loading'}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {state.status === 'loading' ? (
              <>
                <LoaderIcon />
                <span className="ml-2">Analyzing...</span>
              </>
            ) : (
              'Check Status'
            )}
          </button>
        </div>

        {/* Results Area */}
        {state.status !== 'idle' && (
          <div className={`border-t animate-in fade-in slide-in-from-bottom-4 duration-300 bg-slate-50`}>
            
            {/* Error Message */}
            {state.status === 'error' && (
               <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-3">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900">Error</h3>
                <p className="text-slate-500 mt-1 text-sm px-4">{state.errorMessage}</p>
              </div>
            )}

            {/* Success Data Display */}
            {state.status === 'success' && state.data && (
              <div className="divide-y divide-slate-200">
                
                {/* Main Status Section */}
                <div className={`p-6 text-center ${
                   state.data.result.status === 'UP' ? 'bg-green-50/50' : 'bg-red-50/50'
                }`}>
                  {state.data.result.status === 'UP' ? (
                    <>
                      <div className="flex justify-center mb-4"><CheckIcon /></div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-1">It's UP!</h3>
                      <p className="text-green-600 font-medium">Returns {state.data.result.httpCode} OK</p>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center mb-4"><XCircleIcon /></div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-1">It's DOWN</h3>
                      <p className="text-red-600 font-medium">
                        {state.data.result.httpCode === 0 ? 'Unreachable' : `Returns ${state.data.result.httpCode}`}
                      </p>
                      {state.data.result.error && (
                        <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto bg-white/50 p-1 rounded">
                          {state.data.result.error}
                        </p>
                      )}
                    </>
                  )}
                  
                  <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-8 text-sm text-slate-600">
                    <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
                      <span className="text-slate-400 text-xs uppercase font-bold">Time</span>
                      <span className="font-mono">{state.data.result.responseTime}ms</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
                      <span className="text-slate-400 text-xs uppercase font-bold">IP</span>
                      <span className="font-mono">{state.data.ip}</span>
                    </div>
                  </div>
                </div>

                {/* DNS Records Section */}
                <div className="p-4 sm:p-6">
                  <SectionToggle 
                    title="DNS Records" 
                    isOpen={showDns} 
                    onClick={() => setShowDns(!showDns)} 
                  />
                  
                  {showDns && (
                    <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 fade-in duration-200">
                      {Object.keys(state.data.dns).every(k => (state.data?.dns as any)[k].length === 0) ? (
                         <p className="text-sm text-slate-500 italic p-2">No DNS records found.</p>
                      ) : (
                        <>
                          <DnsTable type="A" records={state.data.dns.A} />
                          <DnsTable type="AAAA" records={state.data.dns.AAAA} />
                          <DnsTable type="NS" records={state.data.dns.NS} />
                          <DnsTable type="MX" records={state.data.dns.MX} />
                          <DnsTable type="TXT" records={state.data.dns.TXT} />
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* WHOIS Section */}
                <div className="p-4 sm:p-6 pt-0">
                  <SectionToggle 
                    title="WHOIS Information" 
                    isOpen={showWhois} 
                    onClick={() => setShowWhois(!showWhois)} 
                  />

                  {showWhois && (
                    <div className="mt-4 bg-slate-50 rounded-lg border border-slate-100 p-4 animate-in slide-in-from-top-2 fade-in duration-200">
                      {!state.data.whois || state.data.whois.error ? (
                         <p className="text-sm text-slate-500 italic">WHOIS lookup failed or data unavailable.</p>
                       ) : (
                         <>
                           <dl>
                             <WhoisRow label="Domain" value={state.data.whois.domain || state.data.domain} />
                             <WhoisRow label="Registrar" value={state.data.whois.registrar} />
                             <WhoisRow label="Availability" value={state.data.whois.available} />
                             <WhoisRow label="TLD Type" value={state.data.whois.type} />
                             <WhoisRow label="Created" value={formatDate(state.data.whois.created)} />
                             <WhoisRow label="Updated" value={formatDate(state.data.whois.updated)} />
                             <WhoisRow label="Expires" value={formatDate(state.data.whois.expires)} />
                             <WhoisRow 
                               label="Name Servers" 
                               value={
                                 state.data.whois.nameServers && state.data.whois.nameServers.length > 0 ? (
                                   <ul className="space-y-1">
                                     {state.data.whois.nameServers.map((ns, idx) => (
                                       <li key={ns + idx} className="font-mono text-xs sm:text-sm">{ns}</li>
                                     ))}
                                   </ul>
                                 ) : undefined
                               } 
                             />
                           </dl>

                           {state.data.whois.statuses && state.data.whois.statuses.length > 0 && (
                             <div className="mt-4">
                               <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Statuses</div>
                               <div className="flex flex-wrap gap-2">
                                 {state.data.whois.statuses.map((status: string) => (
                                   <span key={status} className="px-2 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600">
                                     {status}
                                   </span>
                                 ))}
                               </div>
                             </div>
                           )}

                           {state.data.whois.rawText && (
                             <div className="mt-4">
                               <button
                                 type="button"
                                 onClick={() => setShowWhoisRaw(prev => !prev)}
                                 className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                               >
                                 {showWhoisRaw ? 'Hide raw WHOIS' : 'Show raw WHOIS record'}
                               </button>
                               {showWhoisRaw && (
                                 <pre className="mt-3 bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-700 whitespace-pre-wrap max-h-64 overflow-y-auto">
                                   {state.data.whois.rawText}
                                 </pre>
                               )}
                             </div>
                           )}
                         </>
                       )}
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};
