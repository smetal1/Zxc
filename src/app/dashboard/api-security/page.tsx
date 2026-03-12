"use client";

import { useState } from "react";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Activity,
  Plus,
  Clock,
  Globe,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  Gauge,
  Eye,
  Ban,
  FileWarning,
  ChevronDown,
  ExternalLink,
  Zap,
  Server,
  Users,
  Search,
  Bug,
  FileCode2,
  RefreshCw,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

// --- Data ---

const timeRanges = ["1h", "6h", "12h", "24h", "7d", "30d"];

const trafficData = [
  { time: "00:00", normal: 1200, anomalous: 15 },
  { time: "01:00", normal: 980, anomalous: 8 },
  { time: "02:00", normal: 750, anomalous: 5 },
  { time: "03:00", normal: 620, anomalous: 12 },
  { time: "04:00", normal: 580, anomalous: 3 },
  { time: "05:00", normal: 640, anomalous: 7 },
  { time: "06:00", normal: 890, anomalous: 10 },
  { time: "07:00", normal: 1350, anomalous: 18 },
  { time: "08:00", normal: 2100, anomalous: 35 },
  { time: "09:00", normal: 2800, anomalous: 42 },
  { time: "10:00", normal: 3200, anomalous: 68 },
  { time: "11:00", normal: 3450, anomalous: 55 },
  { time: "12:00", normal: 3100, anomalous: 120 },
  { time: "13:00", normal: 3300, anomalous: 45 },
  { time: "14:00", normal: 3500, anomalous: 38 },
  { time: "15:00", normal: 3400, anomalous: 92 },
  { time: "16:00", normal: 3150, anomalous: 28 },
  { time: "17:00", normal: 2700, anomalous: 22 },
  { time: "18:00", normal: 2200, anomalous: 15 },
  { time: "19:00", normal: 1900, anomalous: 48 },
  { time: "20:00", normal: 1650, anomalous: 20 },
  { time: "21:00", normal: 1400, anomalous: 12 },
  { time: "22:00", normal: 1250, anomalous: 8 },
  { time: "23:00", normal: 1100, anomalous: 10 },
];

const endpoints = [
  {
    path: "/api/users",
    method: "GET" as const,
    reqPerMin: 342,
    errorRate: 0.8,
    latency: 45,
    authType: "JWT",
    securityScore: 94,
    status: "healthy" as const,
  },
  {
    path: "/api/auth/login",
    method: "POST" as const,
    reqPerMin: 528,
    errorRate: 2.1,
    latency: 120,
    authType: "None",
    securityScore: 78,
    status: "healthy" as const,
  },
  {
    path: "/api/auth/register",
    method: "POST" as const,
    reqPerMin: 89,
    errorRate: 1.5,
    latency: 200,
    authType: "None",
    securityScore: 72,
    status: "healthy" as const,
  },
  {
    path: "/api/products",
    method: "GET" as const,
    reqPerMin: 1205,
    errorRate: 0.3,
    latency: 32,
    authType: "API Key",
    securityScore: 96,
    status: "healthy" as const,
  },
  {
    path: "/api/orders",
    method: "POST" as const,
    reqPerMin: 234,
    errorRate: 1.2,
    latency: 180,
    authType: "JWT",
    securityScore: 91,
    status: "healthy" as const,
  },
  {
    path: "/api/admin/users",
    method: "DELETE" as const,
    reqPerMin: 12,
    errorRate: 0.5,
    latency: 95,
    authType: "OAuth",
    securityScore: 88,
    status: "healthy" as const,
  },
  {
    path: "/api/search",
    method: "GET" as const,
    reqPerMin: 876,
    errorRate: 4.7,
    latency: 340,
    authType: "API Key",
    securityScore: 65,
    status: "degraded" as const,
  },
  {
    path: "/api/profile",
    method: "PUT" as const,
    reqPerMin: 156,
    errorRate: 1.8,
    latency: 110,
    authType: "JWT",
    securityScore: 82,
    status: "healthy" as const,
  },
  {
    path: "/api/webhooks",
    method: "POST" as const,
    reqPerMin: 45,
    errorRate: 12.3,
    latency: 2400,
    authType: "API Key",
    securityScore: 41,
    status: "down" as const,
  },
  {
    path: "/api/analytics",
    method: "GET" as const,
    reqPerMin: 678,
    errorRate: 3.2,
    latency: 520,
    authType: "OAuth",
    securityScore: 58,
    status: "degraded" as const,
  },
];

const methodColors: Record<string, string> = {
  GET: "bg-primary-500/15 text-primary-400 border-primary-500/30",
  POST: "bg-success-500/15 text-success-400 border-success-500/30",
  PUT: "bg-warning-500/15 text-warning-400 border-warning-500/30",
  DELETE: "bg-danger-500/15 text-danger-400 border-danger-500/30",
};

const rateLimitTiers = [
  { tier: "Free", usage: 72, limit: "100 req/min", color: "#f59e0b" },
  { tier: "Pro", usage: 45, limit: "1,000 req/min", color: "#3b82f6" },
  { tier: "Enterprise", usage: 12, limit: "10,000 req/min", color: "#8b5cf6" },
];

const topOffendingIPs = [
  { ip: "203.0.113.42", violations: 87, country: "CN", lastSeen: "2 min ago" },
  { ip: "198.51.100.17", violations: 64, country: "RU", lastSeen: "5 min ago" },
  { ip: "45.33.32.156", violations: 52, country: "US", lastSeen: "12 min ago" },
  { ip: "91.198.174.2", violations: 38, country: "DE", lastSeen: "18 min ago" },
  { ip: "172.217.14.99", violations: 29, country: "BR", lastSeen: "25 min ago" },
];

const apiKeyUsageData = [
  { name: "Internal Services", value: 42, fill: "#3b82f6" },
  { name: "Partner APIs", value: 28, fill: "#8b5cf6" },
  { name: "Public Clients", value: 18, fill: "#22c55e" },
  { name: "Legacy Keys", value: 8, fill: "#f59e0b" },
  { name: "Deprecated", value: 4, fill: "#ef4444" },
];

const apiThreats = [
  {
    id: 1,
    description: "Injection attempt on /api/search",
    type: "SQL Injection",
    severity: "critical" as const,
    action: "Blocked",
    timestamp: "12:47:23",
  },
  {
    id: 2,
    description: "Excessive enumeration on /api/users/{id}",
    type: "BOLA",
    severity: "high" as const,
    action: "Rate Limited",
    timestamp: "12:44:11",
  },
  {
    id: 3,
    description: "Broken auth on /api/admin",
    type: "Broken Auth",
    severity: "critical" as const,
    action: "Blocked & Alerted",
    timestamp: "12:41:58",
  },
  {
    id: 4,
    description: "Mass assignment attempt on /api/profile",
    type: "Mass Assignment",
    severity: "high" as const,
    action: "Blocked",
    timestamp: "12:38:04",
  },
  {
    id: 5,
    description: "SSRF probe on /api/webhooks",
    type: "SSRF",
    severity: "medium" as const,
    action: "Blocked",
    timestamp: "12:35:22",
  },
  {
    id: 6,
    description: "Excessive data exposure on /api/users",
    type: "Data Exposure",
    severity: "medium" as const,
    action: "Flagged",
    timestamp: "12:30:17",
  },
];

const owaspApiTop10 = [
  { id: "API1", name: "Broken Object Level Authorization", compliant: true },
  { id: "API2", name: "Broken Authentication", compliant: true },
  { id: "API3", name: "Broken Object Property Level Authorization", compliant: false },
  { id: "API4", name: "Unrestricted Resource Consumption", compliant: true },
  { id: "API5", name: "Broken Function Level Authorization", compliant: true },
  { id: "API6", name: "Unrestricted Access to Sensitive Business Flows", compliant: false },
  { id: "API7", name: "Server Side Request Forgery", compliant: true },
  { id: "API8", name: "Security Misconfiguration", compliant: true },
  { id: "API9", name: "Improper Inventory Management", compliant: false },
  { id: "API10", name: "Unsafe Consumption of APIs", compliant: true },
];

const schemaValidationData = [
  { endpoint: "/api/users", compliance: 98.5, failures: 3, lastChecked: "2 min ago" },
  { endpoint: "/api/orders", compliance: 96.2, failures: 8, lastChecked: "5 min ago" },
  { endpoint: "/api/products", compliance: 99.8, failures: 1, lastChecked: "1 min ago" },
  { endpoint: "/api/auth/login", compliance: 94.1, failures: 12, lastChecked: "3 min ago" },
  { endpoint: "/api/webhooks", compliance: 87.3, failures: 24, lastChecked: "8 min ago" },
  { endpoint: "/api/analytics", compliance: 91.6, failures: 15, lastChecked: "4 min ago" },
];

const recentSchemaFailures = [
  {
    endpoint: "/api/webhooks",
    error: "Missing required field 'callback_url' in request body",
    time: "12:45:02",
  },
  {
    endpoint: "/api/auth/login",
    error: "Invalid type for 'password': expected string, got number",
    time: "12:42:18",
  },
  {
    endpoint: "/api/orders",
    error: "Response missing 'total_amount' field in schema",
    time: "12:39:44",
  },
  {
    endpoint: "/api/analytics",
    error: "Unexpected additional property 'debug_info' in response",
    time: "12:36:11",
  },
];

// --- Helpers ---

const severityBadge: Record<string, string> = {
  critical: "bg-danger-500/15 text-danger-400 border-danger-500/30",
  high: "bg-warning-500/15 text-warning-400 border-warning-500/30",
  medium: "bg-primary-500/15 text-primary-400 border-primary-500/30",
  low: "bg-dark-500/15 text-dark-400 border-dark-500/30",
};

const statusConfig: Record<string, { color: string; label: string }> = {
  healthy: { color: "bg-success-500", label: "Healthy" },
  degraded: { color: "bg-warning-500", label: "Degraded" },
  down: { color: "bg-danger-500", label: "Down" },
};

function getScoreColor(score: number): string {
  if (score >= 80) return "text-success-400";
  if (score >= 60) return "text-warning-400";
  return "text-danger-400";
}

function getScoreBarColor(score: number): string {
  if (score >= 80) return "bg-success-500";
  if (score >= 60) return "bg-warning-500";
  return "bg-danger-500";
}

function getComplianceColor(rate: number): string {
  if (rate >= 97) return "text-success-400";
  if (rate >= 92) return "text-warning-400";
  return "text-danger-400";
}

// --- Custom Tooltip ---

function TrafficTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-lg border border-dark-700/50 p-3 shadow-xl">
      <p className="mb-2 text-sm font-medium text-dark-300">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm" style={{ color: entry.color }}>
          {entry.name === "normal" ? "Normal" : "Anomalous"}: {entry.value.toLocaleString()} req
        </p>
      ))}
    </div>
  );
}

function PieTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-lg border border-dark-700/50 p-3 shadow-xl">
      <p className="text-sm font-medium" style={{ color: payload[0].payload.fill }}>
        {payload[0].name}
      </p>
      <p className="text-sm text-dark-300">{payload[0].value}%</p>
    </div>
  );
}

// --- Page ---

export default function ApiSecurityPage() {
  const [timeRange, setTimeRange] = useState("24h");
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  return (
    <div className="min-h-screen space-y-6 bg-dark-950 p-6 lg:p-8">
      {/* ====== Header ====== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/15">
            <Shield className="h-5 w-5 text-primary-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">API Security Monitor</h1>
            <p className="text-sm text-dark-400">Real-time API endpoint security & health analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Time Range Selector */}
          <div className="relative">
            <button
              onClick={() => setShowTimeDropdown(!showTimeDropdown)}
              className="glass-card flex items-center gap-2 rounded-lg border border-dark-700/50 px-4 py-2 text-sm text-dark-300 transition-colors hover:border-primary-500/50 hover:text-white"
            >
              <Clock className="h-4 w-4" />
              Last {timeRange}
              <ChevronDown className="h-3 w-3" />
            </button>
            {showTimeDropdown && (
              <div className="glass-card absolute right-0 top-full z-50 mt-1 rounded-lg border border-dark-700/50 py-1 shadow-xl">
                {timeRanges.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTimeRange(t);
                      setShowTimeDropdown(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-dark-800 ${
                      t === timeRange ? "text-primary-400" : "text-dark-300"
                    }`}
                  >
                    Last {t}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Add Endpoint Button */}
          <button className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600">
            <Plus className="h-4 w-4" />
            Add Endpoint
          </button>
        </div>
      </div>

      {/* ====== API Health Overview (4 cards) ====== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Total Endpoints",
            value: 156,
            icon: Server,
            color: "text-primary-400",
            bg: "bg-primary-500/15",
            border: "border-primary-500/30",
            trend: "+4 this week",
            trendUp: true,
          },
          {
            label: "Healthy",
            value: 148,
            icon: ShieldCheck,
            color: "text-success-400",
            bg: "bg-success-500/15",
            border: "border-success-500/30",
            trend: "95.0% uptime",
            trendUp: true,
          },
          {
            label: "Degraded",
            value: 6,
            icon: ShieldAlert,
            color: "text-warning-400",
            bg: "bg-warning-500/15",
            border: "border-warning-500/30",
            trend: "+2 from yesterday",
            trendUp: false,
          },
          {
            label: "Down",
            value: 2,
            icon: ShieldX,
            color: "text-danger-400",
            bg: "bg-danger-500/15",
            border: "border-danger-500/30",
            trend: "Investigating",
            trendUp: false,
          },
        ].map((card) => (
          <div
            key={card.label}
            className={`glass-card glow-border rounded-xl border ${card.border} p-5`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-dark-400">{card.label}</p>
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.bg}`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </div>
            <p className={`mt-2 text-3xl font-bold ${card.color}`}>{card.value}</p>
            <div className="mt-2 flex items-center gap-1">
              {card.trendUp ? (
                <TrendingUp className="h-3 w-3 text-success-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-danger-400" />
              )}
              <p className="text-xs text-dark-500">{card.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ====== Traffic Analysis Chart ====== */}
      <div className="glass-card glow-border rounded-xl border border-dark-700/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Traffic Analysis</h2>
            <p className="text-sm text-dark-400">API request volume over the last 24 hours</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-dark-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary-500" />
              Normal Traffic
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-danger-500" />
              Anomalous Traffic
            </span>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="normalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="anomalousGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#475569" tick={{ fill: "#64748b", fontSize: 12 }} />
              <YAxis stroke="#475569" tick={{ fill: "#64748b", fontSize: 12 }} />
              <Tooltip content={<TrafficTooltip />} />
              <Area
                type="monotone"
                dataKey="normal"
                stroke="#3b82f6"
                fill="url(#normalGrad)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="anomalous"
                stroke="#ef4444"
                fill="url(#anomalousGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ====== Endpoint Security Table ====== */}
      <div className="glass-card glow-border rounded-xl border border-dark-700/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Endpoint Security</h2>
            <p className="text-sm text-dark-400">Individual endpoint health & security metrics</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-dark-700/50 bg-dark-900/50 px-3 py-1.5">
              <Search className="h-4 w-4 text-dark-500" />
              <input
                type="text"
                placeholder="Search endpoints..."
                className="bg-transparent text-sm text-white placeholder:text-dark-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-800">
                {["Endpoint", "Method", "Req/min", "Error Rate", "Latency", "Auth", "Score", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-dark-500"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800/50">
              {endpoints.map((ep) => (
                <tr
                  key={ep.path}
                  onClick={() =>
                    setSelectedEndpoint(selectedEndpoint === ep.path ? null : ep.path)
                  }
                  className={`cursor-pointer transition-colors hover:bg-dark-800/40 ${
                    selectedEndpoint === ep.path ? "bg-dark-800/60" : ""
                  }`}
                >
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-sm text-white">
                    {ep.path}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded border px-2 py-0.5 font-mono text-xs font-medium ${methodColors[ep.method]}`}
                    >
                      {ep.method}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-dark-300">
                    {ep.reqPerMin.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm ${
                        ep.errorRate >= 5
                          ? "text-danger-400"
                          : ep.errorRate >= 2
                          ? "text-warning-400"
                          : "text-success-400"
                      }`}
                    >
                      {ep.errorRate}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm ${
                        ep.latency >= 500
                          ? "text-danger-400"
                          : ep.latency >= 200
                          ? "text-warning-400"
                          : "text-dark-300"
                      }`}
                    >
                      {ep.latency}ms
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-sm text-dark-300">
                      {ep.authType === "JWT" && <Lock className="h-3 w-3 text-primary-400" />}
                      {ep.authType === "API Key" && <Key className="h-3 w-3 text-accent-400" />}
                      {ep.authType === "OAuth" && <Shield className="h-3 w-3 text-success-400" />}
                      {ep.authType === "None" && <AlertTriangle className="h-3 w-3 text-warning-400" />}
                      {ep.authType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-dark-800">
                        <div
                          className={`h-full rounded-full ${getScoreBarColor(ep.securityScore)}`}
                          style={{ width: `${ep.securityScore}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${getScoreColor(ep.securityScore)}`}>
                        {ep.securityScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`h-2 w-2 rounded-full ${statusConfig[ep.status].color}`}
                      />
                      <span
                        className={`text-xs ${
                          ep.status === "healthy"
                            ? "text-success-400"
                            : ep.status === "degraded"
                            ? "text-warning-400"
                            : "text-danger-400"
                        }`}
                      >
                        {statusConfig[ep.status].label}
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ====== Rate Limiting + Auth & Authorization ====== */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Rate Limiting Dashboard */}
        <div className="glass-card glow-border rounded-xl border border-dark-700/50 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Rate Limiting</h2>
              <p className="text-sm text-dark-400">Current utilization &amp; violations</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-danger-500/10 px-3 py-1.5">
              <Zap className="h-4 w-4 text-danger-400" />
              <span className="text-sm font-medium text-danger-400">234 violations / 24h</span>
            </div>
          </div>

          {/* Tier utilization */}
          <div className="mb-6 space-y-4">
            {rateLimitTiers.map((tier) => (
              <div key={tier.tier}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-medium text-dark-300">{tier.tier} Tier</span>
                  <span className="text-sm text-dark-400">
                    {tier.usage}% &middot; {tier.limit}
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-dark-800">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${tier.usage}%`,
                      backgroundColor: tier.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Top Offending IPs */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-dark-300">Top Offending IPs</h3>
            <div className="space-y-2">
              {topOffendingIPs.map((ip) => (
                <div
                  key={ip.ip}
                  className="flex items-center justify-between rounded-lg bg-dark-800/40 px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <Ban className="h-4 w-4 text-danger-400" />
                    <span className="font-mono text-sm text-white">{ip.ip}</span>
                    <span className="rounded bg-dark-700 px-1.5 py-0.5 text-[10px] font-medium text-dark-400">
                      {ip.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-danger-400">{ip.violations} hits</span>
                    <span className="text-xs text-dark-500">{ip.lastSeen}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Authentication & Authorization */}
        <div className="glass-card glow-border rounded-xl border border-dark-700/50 p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">Authentication & Authorization</h2>
            <p className="text-sm text-dark-400">Token validation &amp; API key analytics</p>
          </div>

          {/* Token Validation Stats */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium text-dark-300">Token Validation</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Valid", value: "99.2%", color: "text-success-400", bg: "bg-success-500/10", icon: CheckCircle2 },
                { label: "Expired", value: "0.5%", color: "text-warning-400", bg: "bg-warning-500/10", icon: Clock },
                { label: "Invalid", value: "0.3%", color: "text-danger-400", bg: "bg-danger-500/10", icon: XCircle },
              ].map((stat) => (
                <div key={stat.label} className={`rounded-lg ${stat.bg} p-3 text-center`}>
                  <stat.icon className={`mx-auto mb-1 h-5 w-5 ${stat.color}`} />
                  <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-dark-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* OAuth Flow Monitoring */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium text-dark-300">OAuth Flow Monitoring</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Auth Code Grants", value: "12,847", trend: "+5.2%" },
                { label: "Token Refreshes", value: "34,291", trend: "+2.1%" },
                { label: "Revocations", value: "156", trend: "-12%" },
                { label: "Failed Grants", value: "43", trend: "-8.3%" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-dark-800/40 p-3">
                  <p className="text-xs text-dark-500">{item.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-lg font-bold text-white">{item.value}</p>
                    <span
                      className={`text-xs ${
                        item.trend.startsWith("+") ? "text-success-400" : "text-danger-400"
                      }`}
                    >
                      {item.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API Key Usage PieChart */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-dark-300">API Key Usage Breakdown</h3>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={apiKeyUsageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {apiKeyUsageData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value: string) => (
                      <span className="text-xs text-dark-400">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ====== API Threat Detection ====== */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Threats */}
        <div className="glass-card glow-border rounded-xl border border-dark-700/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">API Threat Detection</h2>
              <p className="text-sm text-dark-400">Recent API-specific threats</p>
            </div>
            <Activity className="h-5 w-5 text-danger-400" />
          </div>
          <div className="space-y-3">
            {apiThreats.map((threat) => (
              <div
                key={threat.id}
                className="flex items-start gap-3 rounded-lg bg-dark-800/40 p-3"
              >
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    threat.severity === "critical"
                      ? "bg-danger-500/15"
                      : threat.severity === "high"
                      ? "bg-warning-500/15"
                      : "bg-primary-500/15"
                  }`}
                >
                  <Bug
                    className={`h-4 w-4 ${
                      threat.severity === "critical"
                        ? "text-danger-400"
                        : threat.severity === "high"
                        ? "text-warning-400"
                        : "text-primary-400"
                    }`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-white">{threat.description}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex rounded border px-1.5 py-0.5 text-[10px] font-medium ${
                        severityBadge[threat.severity]
                      }`}
                    >
                      {threat.severity.toUpperCase()}
                    </span>
                    <span className="inline-flex rounded border border-dark-600 bg-dark-700/50 px-1.5 py-0.5 text-[10px] text-dark-300">
                      {threat.type}
                    </span>
                    <span
                      className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-medium ${
                        threat.action.includes("Blocked")
                          ? "bg-success-500/15 text-success-400"
                          : threat.action.includes("Rate")
                          ? "bg-warning-500/15 text-warning-400"
                          : "bg-primary-500/15 text-primary-400"
                      }`}
                    >
                      {threat.action}
                    </span>
                    <span className="text-[10px] text-dark-500">{threat.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OWASP API Top 10 Compliance */}
        <div className="glass-card glow-border rounded-xl border border-dark-700/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">OWASP API Top 10</h2>
              <p className="text-sm text-dark-400">Compliance checklist</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-accent-500/10 px-3 py-1.5">
              <ShieldCheck className="h-4 w-4 text-accent-400" />
              <span className="text-sm font-medium text-accent-400">
                {owaspApiTop10.filter((x) => x.compliant).length}/{owaspApiTop10.length} Compliant
              </span>
            </div>
          </div>
          <div className="space-y-2">
            {owaspApiTop10.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${
                  item.compliant ? "bg-dark-800/30" : "bg-danger-500/5 border border-danger-500/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-12 text-xs font-mono font-medium text-dark-500">
                    {item.id}
                  </span>
                  <span
                    className={`text-sm ${
                      item.compliant ? "text-dark-300" : "text-danger-300"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                {item.compliant ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-success-400" />
                ) : (
                  <XCircle className="h-4 w-4 shrink-0 text-danger-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====== Schema Validation ====== */}
      <div className="glass-card glow-border rounded-xl border border-dark-700/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Schema Validation</h2>
            <p className="text-sm text-dark-400">API schema compliance rates &amp; recent validation failures</p>
          </div>
          <button className="flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300">
            <RefreshCw className="h-4 w-4" />
            Re-validate All
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Compliance Rates */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-dark-300">Compliance Rates</h3>
            <div className="space-y-3">
              {schemaValidationData.map((item) => (
                <div key={item.endpoint} className="rounded-lg bg-dark-800/40 p-3">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="font-mono text-sm text-white">{item.endpoint}</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-medium ${getComplianceColor(item.compliance)}`}>
                        {item.compliance}%
                      </span>
                      <span className="text-[10px] text-dark-500">{item.lastChecked}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-dark-700">
                      <div
                        className={`h-full rounded-full ${
                          item.compliance >= 97
                            ? "bg-success-500"
                            : item.compliance >= 92
                            ? "bg-warning-500"
                            : "bg-danger-500"
                        }`}
                        style={{ width: `${item.compliance}%` }}
                      />
                    </div>
                    <span className="text-xs text-dark-500">{item.failures} failures</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Validation Failures */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-dark-300">Recent Validation Failures</h3>
            <div className="space-y-3">
              {recentSchemaFailures.map((failure, i) => (
                <div key={i} className="rounded-lg border border-danger-500/10 bg-danger-500/5 p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-mono text-sm text-danger-300">{failure.endpoint}</span>
                    <span className="text-[10px] text-dark-500">{failure.time}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileWarning className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger-400" />
                    <p className="text-xs leading-relaxed text-dark-400">{failure.error}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary stats */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: "Total Checks", value: "14,238" },
                { label: "Pass Rate", value: "96.4%" },
                { label: "Avg Failures/hr", value: "12.3" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-dark-800/40 p-3 text-center">
                  <p className="text-lg font-bold text-white">{s.value}</p>
                  <p className="text-[10px] text-dark-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
