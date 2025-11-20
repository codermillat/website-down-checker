
import React, { useState } from 'react';

// --- Icons ---
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

const XCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
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
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className || "w-4 h-4"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-70">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
  </svg>
);

const LockClosedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-70">
    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
  </svg>
);

const ServerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-70">
    <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v2.5A2.25 2.25 0 0115.75 9H4.25A2.25 2.25 0 012 6.75v-2.5zm0 7A2.25 2.25 0 014.25 9h11.5A2.25 2.25 0 0118 11.25v2.5a2.25 2.25 0 01-2.25 2.25H4.25A2.25 2.25 0 012 13.75v-2.5z" clipRule="evenodd" />
  </svg>
);

// --- Types ---
interface DnsRecord {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

interface SslInfo {
  status: 'READY' | 'PENDING' | 'ERROR';
  issuer?: string;
  validFrom?: string;
  validTo?: string;
  grade?: string;
}

interface ApiResult {
  url: string;
  result: {
    status: 'UP' | 'DOWN' | 'ERROR';
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
  ipv6: 'SUPPORTED' | 'NOT_SUPPORTED';
  ssl: SslInfo;
  whois: any;
}

interface LocalStatusState {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: ApiResult | null;
  errorMessage?: string;
}

// --- Components ---

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

const StatBadge = ({ label, value, icon: Icon, colorClass }: { label: string, value: string, icon: any, colorClass: string }) => (
  <div className="flex flex-col p-4 bg-slate-50 rounded-xl border border-slate-100">
    <div className="flex items-center gap-2 mb-2">
      <div className={`p-1.5 rounded-lg ${colorClass} bg-opacity-10 text-current`}>
        <Icon />
      </div>
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
    </div>
    <div className="text-slate-900 font-mono font-medium text-sm break-all">
      {value}
    </div>
  </div>
);

const SectionToggle = ({ title, isOpen, onClick, badge }: { title: string, isOpen: boolean, onClick: () => void, badge?: string }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full flex justify-between items-center py-4 px-6 text-left transition-all duration-200 ${isOpen ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'}`}
  >
    <div className="flex items-center gap-3">
      <span className="font-semibold text-slate-700">{title}</span>
      {badge && <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 text-xs font-medium">{badge}</span>}
    </div>
    <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-slate-900' : 'text-slate-400'}`}>
      <ChevronDownIcon />
    </div>
  </button>
);

const DnsTable = ({ type, records }: { type: string, records: DnsRecord[] }) => {
  if (!records || records.length === 0) return null;
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-bold font-mono">{type}</span>
        <span className="text-xs text-slate-400">{records.length} records found</span>
      </div>
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden text-xs sm:text-sm shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-3 font-semibold text-slate-600 w-full">Content</th>
                <th className="p-3 font-semibold text-slate-600 w-24 text-right">TTL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((rec, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 text-slate-700 font-mono break-all">{rec.data}</td>
                  <td className="p-3 text-slate-500 text-right font-mono">{rec.TTL}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const KeyValRow = ({ label, value, isCode = false }: { label: string, value: any, isCode?: boolean }) => {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-slate-100 last:border-0 text-sm gap-1">
      <dt className="font-medium text-slate-500">{label}</dt>
      <dd className={`text-slate-900 text-right ${isCode ? 'font-mono bg-slate-50 px-2 py-0.5 rounded text-xs sm:text-sm inline-block self-start sm:self-auto' : ''}`}>
        {typeof value === 'object' ? JSON.stringify(value) : value}
      </dd>
    </div>
  );
};

export const StatusChecker: React.FC = () => {
  const [url, setUrl] = useState('');
  const [state, setState] = useState<LocalStatusState>({ status: 'idle', data: null });
  
  // UI State for collapsible sections
  const [showDns, setShowDns] = useState(false);
  const [showWhois, setShowWhois] = useState(false);
  const [showSsl, setShowSsl] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setShowDns(false);
    setShowWhois(false);
    setShowSsl(false);

    let target = url.trim();
    if (!target.includes('.')) {
        setState({ status: 'error', data: null, errorMessage: 'Please enter a valid domain (e.g., google.com)' });
        return;
    }

    setState({ status: 'loading', data: null });

    try {
      const res = await fetch(`/check?url=${encodeURIComponent(target)}`);
      if (res.status === 404) throw new Error("Backend API not found.");
      
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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Input Section */}
      <Card className="relative z-10 p-2 mb-8 ring-4 ring-slate-50/50">
        <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <GlobeIcon />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200 font-medium"
              placeholder="enter-website.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={state.status === 'loading'}
            className="flex-none py-4 px-8 rounded-xl text-white font-bold shadow-lg shadow-blue-500/30 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-80 disabled:cursor-wait transition-all duration-200 transform active:scale-[0.98] min-w-[180px] flex justify-center items-center"
          >
            {state.status === 'loading' ? (
              <div className="flex items-center gap-2">
                <LoaderIcon />
                <span className="animate-pulse">Analyzing...</span>
              </div>
            ) : (
              'Check Status'
            )}
          </button>
        </form>
      </Card>

      {/* Results Area */}
      {state.status !== 'idle' && (
        <div className="animate-slide-up space-y-6">
          
          {/* Error State */}
          {state.status === 'error' && (
            <Card className="p-8 text-center border-l-4 border-l-red-500">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4 ring-4 ring-red-50/50">
                <XCircleIcon className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Analysis Failed</h3>
              <p className="text-slate-500 mt-1">{state.errorMessage}</p>
            </Card>
          )}

          {/* Success State */}
          {state.status === 'success' && state.data && (
            <>
              {/* Hero Status Banner */}
              <Card className="overflow-hidden">
                <div className={`p-8 sm:p-10 text-center relative overflow-hidden ${
                  state.data.result.status === 'UP' 
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white' 
                    : 'bg-gradient-to-br from-rose-500 to-red-600 text-white'
                }`}>
                  {/* Background decorative pattern */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                  
                  <div className="relative z-10 flex flex-col items-center animate-fade-in">
                    {state.data.result.status === 'UP' ? (
                      <>
                        <div className="bg-white/20 p-3 rounded-full mb-4 backdrop-blur-sm shadow-xl">
                          <CheckCircleIcon className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-2 drop-shadow-md">IT'S ONLINE</h2>
                        <p className="text-emerald-100 font-medium text-lg bg-black/10 px-4 py-1 rounded-full backdrop-blur-sm border border-white/10">
                          Response: {state.data.result.httpCode} OK
                        </p>
                      </>
                    ) : (
                      <>
                         <div className="bg-white/20 p-3 rounded-full mb-4 backdrop-blur-sm shadow-xl">
                          <XCircleIcon className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-2 drop-shadow-md">IT'S OFFLINE</h2>
                        <p className="text-rose-100 font-medium text-lg bg-black/10 px-4 py-1 rounded-full backdrop-blur-sm border border-white/10">
                          {state.data.result.httpCode === 0 ? 'Connection Timeout' : `Error ${state.data.result.httpCode}`}
                        </p>
                        {state.data.result.error && (
                           <p className="mt-2 text-sm text-white/80 max-w-md">{state.data.result.error}</p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white">
                  <StatBadge 
                    label="Response Time" 
                    value={`${state.data.result.responseTime || '<1'}ms`} 
                    icon={ClockIcon}
                    colorClass="bg-blue-500 text-blue-600"
                  />
                  <StatBadge 
                    label="IP Address" 
                    value={state.data.ip} 
                    icon={ServerIcon}
                    colorClass="bg-purple-500 text-purple-600"
                  />
                  <StatBadge 
                    label="IPv6" 
                    value={state.data.ipv6 === 'SUPPORTED' ? 'Yes' : 'No'} 
                    icon={GlobeIcon}
                    colorClass={state.data.ipv6 === 'SUPPORTED' ? "bg-emerald-500 text-emerald-600" : "bg-slate-500 text-slate-600"}
                  />
                   <StatBadge 
                    label="SSL Security" 
                    value={state.data.ssl?.grade ? `Grade ${state.data.ssl.grade}` : (state.data.ssl?.status === 'READY' ? 'Valid' : state.data.ssl?.status || 'Unknown')} 
                    icon={LockClosedIcon}
                    colorClass={state.data.ssl?.status === 'READY' ? "bg-teal-500 text-teal-600" : "bg-orange-500 text-orange-600"}
                  />
                </div>
              </Card>

              {/* Detailed Sections */}
              <div className="space-y-4">
                
                {/* SSL Details */}
                <Card className="border-l-4 border-l-teal-500">
                  <SectionToggle 
                    title="SSL Certificate" 
                    isOpen={showSsl} 
                    onClick={() => setShowSsl(!showSsl)}
                    badge={state.data.ssl.status}
                  />
                  {showSsl && (
                    <div className="p-6 pt-0 animate-fade-in">
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <dl>
                           <KeyValRow label="Issuer" value={state.data.ssl.issuer || 'N/A'} />
                           <KeyValRow label="Valid From" value={state.data.ssl.validFrom ? new Date(state.data.ssl.validFrom).toLocaleDateString() : 'N/A'} />
                           <KeyValRow label="Valid To" value={state.data.ssl.validTo ? new Date(state.data.ssl.validTo).toLocaleDateString() : 'N/A'} />
                           <KeyValRow label="Analysis Status" value={state.data.ssl.status} isCode />
                        </dl>
                      </div>
                    </div>
                  )}
                </Card>

                {/* DNS Records */}
                <Card className="border-l-4 border-l-blue-500">
                  <SectionToggle 
                    title="DNS Records" 
                    isOpen={showDns} 
                    onClick={() => setShowDns(!showDns)}
                    badge={Object.values(state.data.dns).reduce((acc, curr) => acc + curr.length, 0).toString()}
                  />
                  {showDns && (
                    <div className="p-6 pt-0 animate-fade-in">
                       <div className="space-y-1">
                          <DnsTable type="A" records={state.data.dns.A} />
                          <DnsTable type="AAAA" records={state.data.dns.AAAA} />
                          <DnsTable type="MX" records={state.data.dns.MX} />
                          <DnsTable type="NS" records={state.data.dns.NS} />
                          <DnsTable type="TXT" records={state.data.dns.TXT} />
                       </div>
                    </div>
                  )}
                </Card>

                {/* WHOIS Info */}
                <Card className="border-l-4 border-l-purple-500">
                  <SectionToggle 
                    title="WHOIS Information" 
                    isOpen={showWhois} 
                    onClick={() => setShowWhois(!showWhois)} 
                  />
                  {showWhois && (
                    <div className="p-6 pt-0 animate-fade-in">
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                         {!state.data.whois || state.data.whois.error ? (
                           <p className="text-sm text-slate-500 italic">Data unavailable.</p>
                         ) : (
                           <dl>
                             <KeyValRow label="Registrar" value={state.data.whois.registrar} />
                             <KeyValRow label="Created" value={state.data.whois.creation_date || state.data.whois.created} />
                             <KeyValRow label="Expires" value={state.data.whois.expiration_date || state.data.whois.expires} />
                             <KeyValRow label="Status" value={state.data.whois.status} />
                             <KeyValRow label="Nameservers" value={state.data.whois.whois_server || state.data.whois.nameservers} />
                           </dl>
                         )}
                      </div>
                    </div>
                  )}
                </Card>

              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
