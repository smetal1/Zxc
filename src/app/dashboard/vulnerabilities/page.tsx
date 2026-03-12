"use client";

import { useState } from "react";
import {
  Search,
  Play,
  ChevronDown,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target,
  Bug,
  Server,
  Monitor,
  Container,
  ExternalLink,
  Wrench,
  Eye,
  TrendingUp,
  Activity,
  RefreshCw,
  Filter,
  ScanLine,
  CircleDot,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// -- Data --

const severityDistribution = [
  { name: "Critical", value: 3, color: "#ef4444" },
  { name: "High", value: 8, color: "#f97316" },
  { name: "Medium", value: 12, color: "#f59e0b" },
  { name: "Low", value: 47, color: "#3b82f6" },
];

const vulnerabilities = [
  {
    id: "CVE-2024-1234",
    title: "Remote Code Execution in Apache",
    description:
      "A critical vulnerability in Apache HTTP Server allows remote attackers to execute arbitrary code via crafted request headers. Affects versions 2.4.49 through 2.4.51.",
    severity: "Critical" as const,
    cvss: 9.8,
    affectedAssets: 12,
    discoveredDate: "2024-12-15",
    status: "Open" as const,
  },
  {
    id: "CVE-2024-5678",
    title: "SQL Injection in API Gateway",
    description:
      "Improper input sanitization in the API gateway allows authenticated users to execute arbitrary SQL queries, potentially leading to data exfiltration.",
    severity: "Critical" as const,
    cvss: 9.1,
    affectedAssets: 4,
    discoveredDate: "2024-12-18",
    status: "In Progress" as const,
  },
  {
    id: "CVE-2024-3456",
    title: "Auth Bypass in OAuth Flow",
    description:
      "A flaw in the OAuth 2.0 implementation allows attackers to bypass authentication by manipulating redirect URIs, gaining unauthorized access to protected resources.",
    severity: "High" as const,
    cvss: 8.2,
    affectedAssets: 7,
    discoveredDate: "2024-12-20",
    status: "Open" as const,
  },
  {
    id: "CVE-2024-9012",
    title: "XSS in Dashboard Component",
    description:
      "Reflected cross-site scripting vulnerability in the analytics dashboard allows attackers to inject malicious scripts via URL parameters.",
    severity: "High" as const,
    cvss: 7.5,
    affectedAssets: 3,
    discoveredDate: "2024-12-22",
    status: "In Progress" as const,
  },
  {
    id: "CVE-2024-7890",
    title: "Information Disclosure via Error Messages",
    description:
      "Verbose error messages in production environment expose internal server paths, database schema details, and stack traces to unauthenticated users.",
    severity: "Medium" as const,
    cvss: 5.3,
    affectedAssets: 18,
    discoveredDate: "2024-12-25",
    status: "Fixed" as const,
  },
];

const assets = [
  { hostname: "prod-web-01.aegis.io", ip: "10.0.1.12", type: "Server", os: "Ubuntu 22.04 LTS", lastScan: "2 hours ago", vulns: 5, risk: "Critical" },
  { hostname: "api-gateway-prod", ip: "10.0.2.5", type: "Container", os: "Alpine 3.18", lastScan: "2 hours ago", vulns: 3, risk: "High" },
  { hostname: "db-primary.aegis.io", ip: "10.0.3.10", type: "Server", os: "RHEL 9.2", lastScan: "2 hours ago", vulns: 1, risk: "Medium" },
  { hostname: "k8s-worker-03", ip: "10.0.4.22", type: "Container", os: "Debian 12", lastScan: "3 hours ago", vulns: 4, risk: "High" },
  { hostname: "dev-ws-emily", ip: "10.0.10.45", type: "Endpoint", os: "macOS 14.2", lastScan: "5 hours ago", vulns: 2, risk: "Low" },
  { hostname: "staging-web-01", ip: "10.0.5.8", type: "Server", os: "Ubuntu 22.04 LTS", lastScan: "4 hours ago", vulns: 6, risk: "High" },
  { hostname: "monitoring-stack", ip: "10.0.6.15", type: "Container", os: "Alpine 3.19", lastScan: "2 hours ago", vulns: 0, risk: "Low" },
  { hostname: "dev-ws-marcus", ip: "10.0.10.52", type: "Endpoint", os: "Windows 11 Pro", lastScan: "6 hours ago", vulns: 2, risk: "Medium" },
];

const scanHistory = [
  { id: 1, date: "2024-12-27 14:30", type: "Full Scan", duration: "47 min", findings: 23, status: "Completed" },
  { id: 2, date: "2024-12-26 09:15", type: "Quick Scan", duration: "12 min", findings: 8, status: "Completed" },
  { id: 3, date: "2024-12-25 22:00", type: "Full Scan", duration: "52 min", findings: 31, status: "Completed" },
  { id: 4, date: "2024-12-24 14:00", type: "Custom Scan", duration: "25 min", findings: 14, status: "Completed" },
  { id: 5, date: "2024-12-23 08:45", type: "Full Scan", duration: "49 min", findings: 27, status: "Completed" },
  { id: 6, date: "2024-12-22 16:30", type: "Quick Scan", duration: "11 min", findings: 5, status: "Failed" },
];

const remediationData = [
  { severity: "Critical", fixed: 67, total: 3, color: "#ef4444" },
  { severity: "High", fixed: 45, total: 8, color: "#f97316" },
  { severity: "Medium", fixed: 30, total: 12, color: "#f59e0b" },
  { severity: "Low", fixed: 15, total: 47, color: "#3b82f6" },
];

// -- Helpers --

function severityColor(s: string) {
  switch (s) {
    case "Critical": return "text-danger-400";
    case "High": return "text-orange-400";
    case "Medium": return "text-warning-400";
    case "Low": return "text-primary-400";
    default: return "text-dark-400";
  }
}

function severityBg(s: string) {
  switch (s) {
    case "Critical": return "bg-danger-500/15 text-danger-400 border-danger-500/30";
    case "High": return "bg-orange-500/15 text-orange-400 border-orange-500/30";
    case "Medium": return "bg-warning-500/15 text-warning-400 border-warning-500/30";
    case "Low": return "bg-primary-500/15 text-primary-400 border-primary-500/30";
    default: return "bg-dark-700 text-dark-400 border-dark-600";
  }
}

function statusBadge(s: string) {
  switch (s) {
    case "Open": return "bg-danger-500/15 text-danger-400 border-danger-500/30";
    case "In Progress": return "bg-warning-500/15 text-warning-400 border-warning-500/30";
    case "Fixed": return "bg-success-500/15 text-success-400 border-success-500/30";
    case "Completed": return "bg-success-500/15 text-success-400 border-success-500/30";
    case "Failed": return "bg-danger-500/15 text-danger-400 border-danger-500/30";
    default: return "bg-dark-700 text-dark-400 border-dark-600";
  }
}

function cvssBar(score: number) {
  if (score >= 9.0) return "bg-danger-500";
  if (score >= 7.0) return "bg-orange-500";
  if (score >= 4.0) return "bg-warning-500";
  return "bg-primary-500";
}

function assetIcon(type: string) {
  switch (type) {
    case "Server": return Server;
    case "Container": return Container;
    case "Endpoint": return Monitor;
    default: return Server;
  }
}

// -- Component --

export default function VulnerabilitiesPage() {
  const [scanType, setScanType] = useState("Full Scan");
  const [scanTypeOpen, setScanTypeOpen] = useState(false);
  const [targetInput, setTargetInput] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredVulns = vulnerabilities.filter((v) => {
    if (severityFilter !== "All" && v.severity !== severityFilter) return false;
    if (statusFilter !== "All" && v.status !== statusFilter) return false;
    return true;
  });

  const totalVulns = severityDistribution.reduce((a, b) => a + b.value, 0);

  return (
    <div className="space-y-6">
      {/* ===== Header ===== */}
      <div className="flex flex-col lg:flex-row lg:items-end gap-4">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-500/15 border border-primary-500/30">
              <ScanLine className="w-6 h-6 text-primary-400" />
            </div>
            Vulnerability Scanner
          </h1>
          <p className="text-dark-400 mt-1.5 text-sm">
            Scan, detect, and remediate security vulnerabilities across your infrastructure.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Target input */}
          <div className="flex items-center gap-2 bg-dark-800/70 border border-dark-700/50 rounded-lg px-3 py-2 w-56 focus-within:border-primary-500/50 focus-within:ring-1 focus-within:ring-primary-500/20 transition-all">
            <Target className="w-4 h-4 text-dark-500 shrink-0" />
            <input
              type="text"
              placeholder="Target IP or hostname..."
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              className="bg-transparent text-sm text-dark-200 placeholder:text-dark-500 outline-none w-full"
            />
          </div>

          {/* Scan type dropdown */}
          <div className="relative">
            <button
              onClick={() => setScanTypeOpen(!scanTypeOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-dark-800/70 border border-dark-700/50 rounded-lg text-sm text-dark-200 hover:border-dark-600 transition-colors"
            >
              {scanType}
              <ChevronDown className={`w-4 h-4 text-dark-500 transition-transform ${scanTypeOpen ? "rotate-180" : ""}`} />
            </button>
            {scanTypeOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setScanTypeOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-40 bg-dark-800 border border-dark-700/50 rounded-lg shadow-xl z-40 overflow-hidden">
                  {["Full Scan", "Quick Scan", "Custom Scan"].map((t) => (
                    <button
                      key={t}
                      onClick={() => { setScanType(t); setScanTypeOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        scanType === t ? "bg-primary-500/15 text-primary-400" : "text-dark-300 hover:bg-dark-700/50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* New Scan button */}
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-primary-500/25">
            <Play className="w-4 h-4" />
            New Scan
          </button>
        </div>
      </div>

      {/* ===== Scan Status Banner ===== */}
      <div className="glass-card glow-border rounded-xl p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="animate-scan-line absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success-500/15">
              <CheckCircle2 className="w-5 h-5 text-success-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Last scan completed 2 hours ago</p>
              <p className="text-xs text-dark-400 mt-0.5">
                847 assets scanned &middot; 23 vulnerabilities found &middot; Duration: 47 min
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 sm:w-48">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-dark-400">Scan Progress</span>
                <span className="text-success-400 font-semibold">100%</span>
              </div>
              <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary-500 to-success-500 rounded-full w-full transition-all duration-500" />
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-dark-700/50 text-dark-400 hover:text-dark-200 transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ===== Vulnerability Summary (Cards + Donut) ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Metric Cards */}
        {[
          { label: "Critical", count: 3, color: "danger", icon: AlertTriangle, pulse: true },
          { label: "High", count: 8, color: "orange", icon: Shield, pulse: false },
          { label: "Medium", count: 12, color: "warning", icon: Bug, pulse: false },
          { label: "Low", count: 47, color: "primary", icon: CircleDot, pulse: false },
        ].map((card) => {
          const colorMap: Record<string, { text: string; bg: string; border: string; glow: string }> = {
            danger: { text: "text-danger-400", bg: "bg-danger-500/15", border: "border-danger-500/30", glow: "shadow-danger-500/20" },
            orange: { text: "text-orange-400", bg: "bg-orange-500/15", border: "border-orange-500/30", glow: "shadow-orange-500/20" },
            warning: { text: "text-warning-400", bg: "bg-warning-500/15", border: "border-warning-500/30", glow: "shadow-warning-500/20" },
            primary: { text: "text-primary-400", bg: "bg-primary-500/15", border: "border-primary-500/30", glow: "shadow-primary-500/20" },
          };
          const c = colorMap[card.color];
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`glass-card rounded-xl p-4 border ${c.border} ${card.pulse ? "animate-pulse-glow" : ""}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${c.bg}`}>
                  <Icon className={`w-4 h-4 ${c.text}`} />
                </div>
                <span className="text-xs text-dark-500 font-medium uppercase tracking-wider">{card.label}</span>
              </div>
              <p className={`text-3xl font-bold ${c.text}`}>{card.count}</p>
              <p className="text-xs text-dark-500 mt-1">vulnerabilities</p>
            </div>
          );
        })}

        {/* Donut Chart */}
        <div className="glass-card rounded-xl p-4 border border-dark-700/30 flex flex-col items-center justify-center">
          <div className="w-full h-40 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {severityDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid rgba(148,163,184,0.2)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#e2e8f0",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-white">{totalVulns}</span>
              <span className="text-[10px] text-dark-400 uppercase tracking-wider">Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Vulnerability List ===== */}
      <div className="glass-card rounded-xl border border-dark-700/30 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-dark-700/30">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Bug className="w-5 h-5 text-accent-400" />
            Vulnerability List
          </h2>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-dark-500" />
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-dark-800/70 border border-dark-700/50 rounded-lg px-3 py-1.5 text-sm text-dark-300 outline-none focus:border-primary-500/50"
            >
              <option value="All">All Severity</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-dark-800/70 border border-dark-700/50 rounded-lg px-3 py-1.5 text-sm text-dark-300 outline-none focus:border-primary-500/50"
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Fixed">Fixed</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-dark-700/30">
          {filteredVulns.map((vuln) => (
            <div key={vuln.id} className="p-5 hover:bg-dark-800/30 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Left: Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <code className="text-xs font-mono px-2 py-0.5 bg-dark-800 rounded text-dark-300 border border-dark-700/50">
                      {vuln.id}
                    </code>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${severityBg(vuln.severity)}`}>
                      {vuln.severity}
                    </span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusBadge(vuln.status)}`}>
                      {vuln.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{vuln.title}</h3>
                  <p className="text-xs text-dark-400 leading-relaxed">{vuln.description}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-dark-500">
                    <span className="flex items-center gap-1">
                      <Server className="w-3 h-3" />
                      {vuln.affectedAssets} affected assets
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Discovered {vuln.discoveredDate}
                    </span>
                  </div>
                </div>

                {/* Right: CVSS + Actions */}
                <div className="flex items-center gap-4 shrink-0">
                  {/* CVSS gauge */}
                  <div className="text-center">
                    <p className="text-[10px] text-dark-500 uppercase tracking-wider mb-1">CVSS</p>
                    <div className="relative w-14 h-14">
                      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="24" fill="none" strokeWidth="4" className="stroke-dark-700" />
                        <circle
                          cx="28" cy="28" r="24" fill="none" strokeWidth="4"
                          strokeDasharray={`${(vuln.cvss / 10) * 150.8} 150.8`}
                          strokeLinecap="round"
                          className={cvssBar(vuln.cvss).replace("bg-", "stroke-")}
                        />
                      </svg>
                      <span className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${severityColor(vuln.severity)}`}>
                        {vuln.cvss}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-500/15 hover:bg-primary-500/25 text-primary-400 rounded-lg text-xs font-medium transition-colors border border-primary-500/30">
                      <Wrench className="w-3 h-3" />
                      Fix
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-dark-700/50 hover:bg-dark-700 text-dark-300 rounded-lg text-xs font-medium transition-colors border border-dark-600/50">
                      <Eye className="w-3 h-3" />
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredVulns.length === 0 && (
            <div className="p-10 text-center text-dark-500 text-sm">
              No vulnerabilities match the selected filters.
            </div>
          )}
        </div>
      </div>

      {/* ===== Asset Inventory + Scan History (side by side on xl) ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Asset Inventory - spans 2 cols */}
        <div className="xl:col-span-2 glass-card rounded-xl border border-dark-700/30 overflow-hidden">
          <div className="p-5 border-b border-dark-700/30">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-primary-400" />
              Asset Inventory
            </h2>
            <p className="text-xs text-dark-500 mt-1">Scanned assets and their current risk posture</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-700/30">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-dark-500 uppercase tracking-wider">Host</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-dark-500 uppercase tracking-wider">Type</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-dark-500 uppercase tracking-wider hidden md:table-cell">OS</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-dark-500 uppercase tracking-wider hidden lg:table-cell">Last Scan</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-dark-500 uppercase tracking-wider">Vulns</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-dark-500 uppercase tracking-wider">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700/20">
                {assets.map((a, i) => {
                  const Icon = assetIcon(a.type);
                  return (
                    <tr key={i} className="hover:bg-dark-800/30 transition-colors">
                      <td className="px-5 py-3">
                        <div>
                          <p className="text-dark-200 font-medium text-xs">{a.hostname}</p>
                          <p className="text-dark-500 text-[11px] font-mono">{a.ip}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="flex items-center gap-1.5 text-dark-400 text-xs">
                          <Icon className="w-3.5 h-3.5" />
                          {a.type}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-dark-400 text-xs hidden md:table-cell">{a.os}</td>
                      <td className="px-5 py-3 text-dark-500 text-xs hidden lg:table-cell">{a.lastScan}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`text-xs font-semibold ${a.vulns > 0 ? severityColor(a.risk) : "text-success-400"}`}>
                          {a.vulns}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${severityBg(a.risk)}`}>
                          {a.risk}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scan History */}
        <div className="glass-card rounded-xl border border-dark-700/30 overflow-hidden">
          <div className="p-5 border-b border-dark-700/30">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-warning-400" />
              Scan History
            </h2>
          </div>
          <div className="divide-y divide-dark-700/20">
            {scanHistory.map((scan) => (
              <div key={scan.id} className="px-5 py-3 hover:bg-dark-800/30 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-dark-200">{scan.type}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusBadge(scan.status)}`}>
                    {scan.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-dark-500">
                  <span>{scan.date}</span>
                  <span>&middot;</span>
                  <span>{scan.duration}</span>
                  <span>&middot;</span>
                  <span className="text-warning-400 font-medium">{scan.findings} findings</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Remediation Tracker ===== */}
      <div className="glass-card rounded-xl border border-dark-700/30 p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success-400" />
            Remediation Tracker
          </h2>
          <span className="text-xs text-dark-500">Overall progress across severity levels</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {remediationData.map((item) => (
            <div key={item.severity} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-semibold ${severityColor(item.severity)}`}>
                  {item.severity}
                </span>
                <span className="text-xs text-dark-400">
                  {item.fixed}% fixed
                </span>
              </div>
              <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${item.fixed}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-dark-500">
                <span>{Math.round(item.total * item.fixed / 100)} of {item.total} resolved</span>
                <span>{100 - item.fixed}% remaining</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
