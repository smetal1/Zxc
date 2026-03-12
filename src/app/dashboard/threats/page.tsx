"use client";

import { useState } from "react";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Brain,
  Activity,
  Zap,
  Clock,
  Search,
  Filter,
  Play,
  Eye,
  X,
  AlertTriangle,
  Globe,
  Server,
  Lock,
  Bug,
  Wifi,
  ChevronDown,
  TrendingUp,
  Target,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// --- Data ---

const threatFeed = [
  {
    id: 1,
    type: "SQL Injection",
    description: "SQL Injection attempt detected on /api/users endpoint",
    sourceIp: "192.168.1.47",
    severity: "critical" as const,
    status: "blocked" as const,
    timestamp: "12:47:23",
    icon: Bug,
  },
  {
    id: 2,
    type: "DDoS",
    description: "DDoS pattern detected from subnet 10.0.45.0/24",
    sourceIp: "10.0.45.0/24",
    severity: "high" as const,
    status: "mitigating" as const,
    timestamp: "12:44:11",
    icon: Wifi,
  },
  {
    id: 3,
    type: "Brute Force",
    description: "Brute force login attempt on /api/auth",
    sourceIp: "203.0.113.82",
    severity: "high" as const,
    status: "blocked" as const,
    timestamp: "12:41:58",
    icon: Lock,
  },
  {
    id: 4,
    type: "XSS",
    description: "XSS payload detected in contact form input",
    sourceIp: "198.51.100.14",
    severity: "medium" as const,
    status: "blocked" as const,
    timestamp: "12:38:04",
    icon: Bug,
  },
  {
    id: 5,
    type: "API Abuse",
    description: "Suspicious API call pattern from authenticated user",
    sourceIp: "172.16.0.55",
    severity: "medium" as const,
    status: "investigating" as const,
    timestamp: "12:35:22",
    icon: Server,
  },
  {
    id: 6,
    type: "Port Scan",
    description: "Port scanning detected across multiple services",
    sourceIp: "45.33.32.156",
    severity: "low" as const,
    status: "blocked" as const,
    timestamp: "12:30:17",
    icon: Globe,
  },
];

const threatTimelineData = [
  { time: "00:00", critical: 2, high: 5, medium: 8, low: 12 },
  { time: "02:00", critical: 1, high: 3, medium: 6, low: 10 },
  { time: "04:00", critical: 0, high: 2, medium: 4, low: 8 },
  { time: "06:00", critical: 1, high: 4, medium: 7, low: 9 },
  { time: "08:00", critical: 3, high: 8, medium: 12, low: 15 },
  { time: "10:00", critical: 5, high: 12, medium: 18, low: 20 },
  { time: "12:00", critical: 4, high: 10, medium: 15, low: 18 },
  { time: "14:00", critical: 6, high: 14, medium: 20, low: 22 },
  { time: "16:00", critical: 8, high: 16, medium: 22, low: 25 },
  { time: "18:00", critical: 5, high: 11, medium: 16, low: 19 },
  { time: "20:00", critical: 3, high: 7, medium: 10, low: 14 },
  { time: "22:00", critical: 2, high: 5, medium: 8, low: 11 },
];

const threatTypeDistribution = [
  { type: "SQL Injection", count: 342, fill: "#ef4444" },
  { type: "DDoS", count: 256, fill: "#f59e0b" },
  { type: "XSS", count: 189, fill: "#8b5cf6" },
  { type: "Brute Force", count: 167, fill: "#3b82f6" },
  { type: "API Abuse", count: 134, fill: "#22c55e" },
  { type: "Port Scan", count: 98, fill: "#64748b" },
];

const threatMapDots = [
  // North America
  { x: 18, y: 28, severity: "critical" as const, region: "na" },
  { x: 22, y: 35, severity: "high" as const, region: "na" },
  { x: 15, y: 38, severity: "medium" as const, region: "na" },
  { x: 25, y: 30, severity: "high" as const, region: "na" },
  { x: 20, y: 42, severity: "low" as const, region: "na" },
  { x: 12, y: 32, severity: "critical" as const, region: "na" },
  { x: 28, y: 38, severity: "medium" as const, region: "na" },
  // Europe
  { x: 48, y: 25, severity: "high" as const, region: "eu" },
  { x: 52, y: 30, severity: "critical" as const, region: "eu" },
  { x: 50, y: 22, severity: "medium" as const, region: "eu" },
  { x: 55, y: 28, severity: "high" as const, region: "eu" },
  { x: 46, y: 32, severity: "low" as const, region: "eu" },
  { x: 53, y: 35, severity: "medium" as const, region: "eu" },
  // Asia
  { x: 72, y: 30, severity: "critical" as const, region: "as" },
  { x: 78, y: 35, severity: "high" as const, region: "as" },
  { x: 75, y: 28, severity: "high" as const, region: "as" },
  { x: 80, y: 40, severity: "medium" as const, region: "as" },
  { x: 70, y: 38, severity: "critical" as const, region: "as" },
  { x: 82, y: 32, severity: "low" as const, region: "as" },
  { x: 76, y: 42, severity: "medium" as const, region: "as" },
  { x: 85, y: 36, severity: "high" as const, region: "as" },
  // Others
  { x: 55, y: 60, severity: "low" as const, region: "af" },
  { x: 30, y: 65, severity: "medium" as const, region: "sa" },
  { x: 85, y: 62, severity: "low" as const, region: "oc" },
];

const regions = [
  { name: "North America", threats: 87, key: "na", x: 18, y: 50 },
  { name: "Europe", threats: 64, key: "eu", x: 48, y: 44 },
  { name: "Asia Pacific", threats: 112, key: "as", x: 75, y: 52 },
];

// --- Helpers ---

const severityColor = {
  critical: "bg-danger-500",
  high: "bg-warning-500",
  medium: "bg-primary-500",
  low: "bg-dark-500",
};

const severityTextColor = {
  critical: "text-danger-400",
  high: "text-warning-400",
  medium: "text-primary-400",
  low: "text-dark-400",
};

const severityBadge = {
  critical: "bg-danger-500/15 text-danger-400 border-danger-500/30",
  high: "bg-warning-500/15 text-warning-400 border-warning-500/30",
  medium: "bg-primary-500/15 text-primary-400 border-primary-500/30",
  low: "bg-dark-500/15 text-dark-400 border-dark-500/30",
};

const statusBadge = {
  blocked: "bg-success-500/15 text-success-400 border-success-500/30",
  mitigating: "bg-warning-500/15 text-warning-400 border-warning-500/30",
  investigating: "bg-primary-500/15 text-primary-400 border-primary-500/30",
};

const severityDotColor = {
  critical: "#ef4444",
  high: "#f59e0b",
  medium: "#3b82f6",
  low: "#64748b",
};

// --- Component ---

export default function ThreatDetectionPage() {
  const [severityFilter, setSeverityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [timeframeFilter, setTimeframeFilter] = useState("24h");
  const [scanRunning, setScanRunning] = useState(false);

  const filteredThreats = threatFeed.filter((t) => {
    if (severityFilter !== "all" && t.severity !== severityFilter) return false;
    if (typeFilter !== "all" && t.type !== typeFilter) return false;
    return true;
  });

  const handleRunScan = () => {
    setScanRunning(true);
    setTimeout(() => setScanRunning(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* ====== Header ====== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/20">
              <Brain className="w-6 h-6 text-primary-400" />
            </div>
            AI Threat Detection
          </h1>
          <p className="text-dark-400 text-sm mt-1">
            Real-time threat monitoring powered by AI analysis
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Severity filter */}
          <div className="relative">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="appearance-none bg-dark-800/70 border border-dark-700/50 text-dark-300 text-sm rounded-lg pl-3 pr-8 py-2 focus:border-primary-500/50 focus:outline-none cursor-pointer"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none" />
          </div>

          {/* Type filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="appearance-none bg-dark-800/70 border border-dark-700/50 text-dark-300 text-sm rounded-lg pl-3 pr-8 py-2 focus:border-primary-500/50 focus:outline-none cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="SQL Injection">SQL Injection</option>
              <option value="DDoS">DDoS</option>
              <option value="Brute Force">Brute Force</option>
              <option value="XSS">XSS</option>
              <option value="API Abuse">API Abuse</option>
              <option value="Port Scan">Port Scan</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none" />
          </div>

          {/* Timeframe filter */}
          <div className="relative">
            <select
              value={timeframeFilter}
              onChange={(e) => setTimeframeFilter(e.target.value)}
              className="appearance-none bg-dark-800/70 border border-dark-700/50 text-dark-300 text-sm rounded-lg pl-3 pr-8 py-2 focus:border-primary-500/50 focus:outline-none cursor-pointer"
            >
              <option value="1h">Last 1 Hour</option>
              <option value="6h">Last 6 Hours</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none" />
          </div>

          {/* Run Scan button */}
          <button
            onClick={handleRunScan}
            disabled={scanRunning}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              scanRunning
                ? "bg-primary-500/20 text-primary-400 cursor-not-allowed"
                : "bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/25"
            }`}
          >
            {scanRunning ? (
              <>
                <Activity className="w-4 h-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Scan
              </>
            )}
          </button>
        </div>
      </div>

      {/* ====== Real-time Threat Map ====== */}
      <div className="glass-card rounded-xl p-6 glow-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-dark-100 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary-400" />
            Real-time Threat Map
          </h2>
          <div className="flex items-center gap-4 text-xs text-dark-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-danger-500 animate-threat-pulse" />
              Critical
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-warning-500" />
              High
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary-500" />
              Medium
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-dark-500" />
              Low
            </span>
          </div>
        </div>
        <div className="relative w-full h-64 sm:h-80 bg-dark-900/80 rounded-lg border border-dark-700/30 overflow-hidden">
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Scan line */}
          {scanRunning && (
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent animate-scan-line z-10" />
          )}

          {/* Threat dots */}
          {threatMapDots.map((dot, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
            >
              {/* Pulse ring for critical */}
              {dot.severity === "critical" && (
                <span
                  className="absolute -inset-2 rounded-full animate-ping opacity-30"
                  style={{ backgroundColor: severityDotColor[dot.severity] }}
                />
              )}
              {/* Glow */}
              <span
                className="absolute -inset-1.5 rounded-full opacity-20 blur-sm"
                style={{ backgroundColor: severityDotColor[dot.severity] }}
              />
              {/* Dot */}
              <span
                className={`relative block w-2.5 h-2.5 rounded-full ${
                  dot.severity === "critical" ? "animate-threat-pulse" : ""
                }`}
                style={{ backgroundColor: severityDotColor[dot.severity] }}
              />
            </div>
          ))}

          {/* Region labels */}
          {regions.map((r) => (
            <div
              key={r.key}
              className="absolute text-center"
              style={{ left: `${r.x}%`, top: `${r.y}%`, transform: "translateX(-50%)" }}
            >
              <span className="text-[11px] font-semibold text-dark-300 block">
                {r.name}
              </span>
              <span className="text-[10px] text-danger-400 font-mono">
                {r.threats} threats
              </span>
            </div>
          ))}

          {/* Active indicator */}
          <div className="absolute top-3 right-3 flex items-center gap-2 bg-dark-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-dark-700/50">
            <span className="w-2 h-2 rounded-full bg-success-400 animate-pulse" />
            <span className="text-xs text-dark-300 font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* ====== Threat Stats Row ====== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Threats */}
        <div className="glass-card rounded-xl p-5 border-l-2 border-l-danger-500 animate-pulse-glow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-dark-400 uppercase tracking-wider">
                Active Threats
              </p>
              <p className="text-3xl font-bold text-danger-400 mt-1 animate-threat-pulse">
                23
              </p>
              <p className="text-xs text-danger-400/70 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +5 in last hour
              </p>
            </div>
            <div className="p-3 rounded-lg bg-danger-500/10">
              <ShieldX className="w-6 h-6 text-danger-400" />
            </div>
          </div>
        </div>

        {/* Blocked Today */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-dark-400 uppercase tracking-wider">
                Blocked Today
              </p>
              <p className="text-3xl font-bold text-success-400 mt-1">1,247</p>
              <p className="text-xs text-success-400/70 mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                99.1% block rate
              </p>
            </div>
            <div className="p-3 rounded-lg bg-success-500/10">
              <ShieldCheck className="w-6 h-6 text-success-400" />
            </div>
          </div>
        </div>

        {/* AI Confidence */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-dark-400 uppercase tracking-wider">
                AI Confidence
              </p>
              <p className="text-3xl font-bold text-primary-400 mt-1">97.3%</p>
              <p className="text-xs text-primary-400/70 mt-1 flex items-center gap-1">
                <Brain className="w-3 h-3" />
                Model v4.2 active
              </p>
            </div>
            <div className="p-3 rounded-lg bg-primary-500/10">
              <Brain className="w-6 h-6 text-primary-400" />
            </div>
          </div>
        </div>

        {/* Avg Response */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-dark-400 uppercase tracking-wider">
                Avg Response
              </p>
              <p className="text-3xl font-bold text-accent-400 mt-1">0.3s</p>
              <p className="text-xs text-accent-400/70 mt-1 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                -12% vs yesterday
              </p>
            </div>
            <div className="p-3 rounded-lg bg-accent-500/10">
              <Zap className="w-6 h-6 text-accent-400" />
            </div>
          </div>
        </div>
      </div>

      {/* ====== Threat Feed ====== */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-dark-700/50">
          <h2 className="text-lg font-semibold text-dark-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-danger-400" />
            Threat Feed
            <span className="ml-2 text-xs font-mono bg-danger-500/15 text-danger-400 px-2 py-0.5 rounded-full border border-danger-500/30">
              LIVE
            </span>
          </h2>
          <span className="text-xs text-dark-500">
            Showing {filteredThreats.length} of {threatFeed.length} threats
          </span>
        </div>
        <div className="divide-y divide-dark-700/30">
          {filteredThreats.map((threat) => {
            const Icon = threat.icon;
            return (
              <div
                key={threat.id}
                className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 px-6 py-4 hover:bg-dark-800/40 transition-colors group"
              >
                {/* Timestamp + Icon */}
                <div className="flex items-center gap-3 lg:w-44 shrink-0">
                  <span className="text-xs font-mono text-dark-500 w-16 shrink-0">
                    {threat.timestamp}
                  </span>
                  <div
                    className={`p-1.5 rounded-md ${
                      threat.severity === "critical"
                        ? "bg-danger-500/10"
                        : threat.severity === "high"
                        ? "bg-warning-500/10"
                        : threat.severity === "medium"
                        ? "bg-primary-500/10"
                        : "bg-dark-700/50"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${severityTextColor[threat.severity]}`}
                    />
                  </div>
                </div>

                {/* Description + IP */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-dark-200 truncate">
                    {threat.description}
                  </p>
                  <p className="text-xs text-dark-500 mt-0.5">
                    Source: <span className="font-mono">{threat.sourceIp}</span>
                  </p>
                </div>

                {/* Badges + Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Severity badge */}
                  <span
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-full border capitalize ${
                      severityBadge[threat.severity]
                    }`}
                  >
                    {threat.severity}
                  </span>
                  {/* Status badge */}
                  <span
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-full border capitalize ${
                      statusBadge[threat.status]
                    }`}
                  >
                    {threat.status}
                  </span>
                  {/* Action buttons */}
                  <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-primary-400 bg-primary-500/10 rounded-md hover:bg-primary-500/20 transition-colors border border-primary-500/20">
                      <Eye className="w-3 h-3" />
                      Investigate
                    </button>
                    <button className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-dark-400 bg-dark-700/50 rounded-md hover:bg-dark-700 transition-colors border border-dark-600/30">
                      <X className="w-3 h-3" />
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredThreats.length === 0 && (
            <div className="px-6 py-12 text-center">
              <ShieldCheck className="w-10 h-10 text-dark-600 mx-auto mb-3" />
              <p className="text-sm text-dark-400">
                No threats match your current filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ====== AI Analysis Panel + Threat Timeline ====== */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* AI Analysis Panel */}
        <div className="glass-card rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-dark-100 flex items-center gap-2">
            <Brain className="w-5 h-5 text-accent-400" />
            AI Analysis Panel
          </h2>

          {/* Threat Pattern Analysis - Bar Chart */}
          <div>
            <h3 className="text-sm font-medium text-dark-300 mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-dark-500" />
              Threat Pattern Analysis
            </h3>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={threatTypeDistribution}
                  layout="vertical"
                  margin={{ top: 0, right: 16, bottom: 0, left: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(51,65,85,0.4)"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="type"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={90}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid rgba(148,163,184,0.15)",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: "#e2e8f0",
                    }}
                    cursor={{ fill: "rgba(59,130,246,0.05)" }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Predictions */}
          <div className="bg-dark-800/60 rounded-lg p-4 border border-accent-500/20">
            <h3 className="text-sm font-medium text-dark-200 flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-accent-400" />
              AI Predictions
            </h3>
            <p className="text-sm text-dark-300 leading-relaxed">
              Based on current patterns,{" "}
              <span className="text-warning-400 font-semibold">73% probability</span>{" "}
              of increased DDoS activity in the next 24 hours. Recommend
              pre-emptive rate limiting on edge services.
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-accent-400" />
              <span className="text-xs text-accent-400 font-medium cursor-pointer hover:text-accent-300 transition-colors">
                View detailed prediction report
              </span>
            </div>
          </div>

          {/* Model Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark-800/40 rounded-lg p-3 text-center border border-dark-700/30">
              <p className="text-xs text-dark-400 uppercase tracking-wider mb-1">
                Model Accuracy
              </p>
              <p className="text-xl font-bold text-success-400">99.2%</p>
            </div>
            <div className="bg-dark-800/40 rounded-lg p-3 text-center border border-dark-700/30">
              <p className="text-xs text-dark-400 uppercase tracking-wider mb-1">
                False Positive Rate
              </p>
              <p className="text-xl font-bold text-primary-400">0.3%</p>
            </div>
          </div>
        </div>

        {/* Threat Timeline */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold text-dark-100 flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary-400" />
            Threat Timeline
            <span className="text-xs text-dark-500 font-normal ml-auto">
              Last 24 hours
            </span>
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={threatTimelineData}
                margin={{ top: 5, right: 16, bottom: 5, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(51,65,85,0.4)"
                />
                <XAxis
                  dataKey="time"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid rgba(148,163,184,0.15)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#e2e8f0",
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }}
                />
                <Line
                  type="monotone"
                  dataKey="critical"
                  name="Critical"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#ef4444" }}
                />
                <Line
                  type="monotone"
                  dataKey="high"
                  name="High"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#f59e0b" }}
                />
                <Line
                  type="monotone"
                  dataKey="medium"
                  name="Medium"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#3b82f6" }}
                />
                <Line
                  type="monotone"
                  dataKey="low"
                  name="Low"
                  stroke="#64748b"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#64748b" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
