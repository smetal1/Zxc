"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Activity,
  Gauge,
  ClipboardCheck,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Bug,
  Wifi,
  Globe,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const threatChartData = [
  { date: "Feb 10", threats: 45, blocked: 42 },
  { date: "Feb 13", threats: 62, blocked: 59 },
  { date: "Feb 16", threats: 38, blocked: 37 },
  { date: "Feb 19", threats: 91, blocked: 88 },
  { date: "Feb 22", threats: 74, blocked: 71 },
  { date: "Feb 25", threats: 53, blocked: 51 },
  { date: "Feb 28", threats: 120, blocked: 115 },
  { date: "Mar 02", threats: 85, blocked: 82 },
  { date: "Mar 04", threats: 67, blocked: 65 },
  { date: "Mar 06", threats: 98, blocked: 96 },
  { date: "Mar 08", threats: 110, blocked: 107 },
  { date: "Mar 10", threats: 78, blocked: 76 },
  { date: "Mar 12", threats: 143, blocked: 139 },
];

const recentThreats = [
  {
    id: "THR-4821",
    type: "SQL Injection Attempt",
    severity: "Critical",
    source: "203.0.113.42",
    timestamp: "2 min ago",
    status: "Blocked",
  },
  {
    id: "THR-4820",
    type: "Brute Force Attack",
    severity: "High",
    source: "198.51.100.77",
    timestamp: "8 min ago",
    status: "Blocked",
  },
  {
    id: "THR-4819",
    type: "Suspicious API Call Pattern",
    severity: "Medium",
    source: "Internal - svc-auth",
    timestamp: "15 min ago",
    status: "Investigating",
  },
  {
    id: "THR-4818",
    type: "Anomalous Data Transfer",
    severity: "High",
    source: "10.0.3.201",
    timestamp: "23 min ago",
    status: "Mitigated",
  },
  {
    id: "THR-4817",
    type: "Port Scan Detected",
    severity: "Low",
    source: "192.0.2.15",
    timestamp: "41 min ago",
    status: "Blocked",
  },
];

const securityScores = [
  { label: "Network", score: 87, color: "#3b82f6" },
  { label: "Application", score: 92, color: "#22c55e" },
  { label: "Data", score: 78, color: "#f59e0b" },
  { label: "Identity", score: 95, color: "#8b5cf6" },
];

const activeAlerts = [
  {
    id: "ALT-1093",
    type: "DDoS Attempt",
    severity: "Critical",
    source: "Edge Firewall",
    time: "12:04 PM",
    status: "Active",
  },
  {
    id: "ALT-1092",
    type: "Malware Detected",
    severity: "High",
    source: "Endpoint Agent",
    time: "11:47 AM",
    status: "Active",
  },
  {
    id: "ALT-1091",
    type: "Policy Violation",
    severity: "Medium",
    source: "IAM Module",
    time: "11:32 AM",
    status: "Acknowledged",
  },
  {
    id: "ALT-1090",
    type: "Certificate Expiring",
    severity: "Low",
    source: "SSL Monitor",
    time: "10:58 AM",
    status: "Pending",
  },
  {
    id: "ALT-1089",
    type: "Unauthorized Access",
    severity: "High",
    source: "Access Gateway",
    time: "10:21 AM",
    status: "Resolved",
  },
];

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    Critical: "bg-red-500/15 text-red-400 border-red-500/30",
    High: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    Medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    Low: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full border ${styles[severity] || styles.Low}`}
    >
      {severity}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Blocked: "text-green-400",
    Mitigated: "text-blue-400",
    Investigating: "text-yellow-400",
    Active: "text-red-400",
    Acknowledged: "text-yellow-400",
    Pending: "text-dark-400",
    Resolved: "text-green-400",
  };

  const icons: Record<string, React.ReactNode> = {
    Blocked: <ShieldCheck className="w-3.5 h-3.5" />,
    Mitigated: <CheckCircle2 className="w-3.5 h-3.5" />,
    Investigating: <Eye className="w-3.5 h-3.5" />,
    Active: <AlertTriangle className="w-3.5 h-3.5 animate-threat-pulse" />,
    Acknowledged: <Eye className="w-3.5 h-3.5" />,
    Pending: <Clock className="w-3.5 h-3.5" />,
    Resolved: <CheckCircle2 className="w-3.5 h-3.5" />,
  };

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${styles[status] || "text-dark-400"}`}>
      {icons[status]}
      {status}
    </span>
  );
}

function CircularProgress({
  score,
  color,
  label,
}: {
  score: number;
  color: string;
  label: string;
}) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(148, 163, 184, 0.1)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-dark-100">{score}%</span>
        </div>
      </div>
      <span className="text-sm font-medium text-dark-400">{label}</span>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="glass-card rounded-lg px-4 py-3 shadow-xl border border-dark-700/50">
      <p className="text-xs font-medium text-dark-400 mb-2">{label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const statCards = [
    {
      label: "Total Threats Blocked",
      value: "2,847",
      trend: "+12.5%",
      trendUp: true,
      icon: ShieldCheck,
      iconBg: "from-primary-500 to-primary-600",
      iconShadow: "shadow-primary-500/25",
    },
    {
      label: "Active Monitors",
      value: "342",
      trend: "+3",
      trendUp: true,
      icon: Activity,
      iconBg: "from-accent-500 to-accent-600",
      iconShadow: "shadow-accent-500/25",
    },
    {
      label: "Risk Score",
      value: "24/100",
      trend: "Low",
      trendUp: false,
      isRisk: true,
      icon: Gauge,
      iconBg: "from-success-400 to-success-500",
      iconShadow: "shadow-success-500/25",
    },
    {
      label: "Compliance Score",
      value: "94%",
      trend: "+2.1%",
      trendUp: true,
      icon: ClipboardCheck,
      iconBg: "from-warning-400 to-warning-500",
      iconShadow: "shadow-warning-500/25",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-dark-100 tracking-tight">
            Security Overview
          </h1>
          <p className="text-sm text-dark-400 mt-1">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-dark-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success-400 animate-pulse" />
            All systems operational
          </span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="glass-card rounded-xl p-5 glow-border hover:border-primary-500/20 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.iconBg} flex items-center justify-center shadow-lg ${card.iconShadow}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                    card.isRisk
                      ? "bg-green-500/15 text-green-400"
                      : card.trendUp
                      ? "bg-green-500/15 text-green-400"
                      : "bg-red-500/15 text-red-400"
                  }`}
                >
                  {card.isRisk ? null : card.trendUp ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {card.trend}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-dark-100 tracking-tight">{card.value}</p>
                <p className="text-sm text-dark-400 mt-0.5">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Threat Activity Chart */}
      <div className="glass-card rounded-xl p-6 glow-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-dark-100">Threat Activity</h2>
            <p className="text-sm text-dark-500 mt-0.5">Last 30 Days</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded-full bg-primary-500" />
              <span className="text-dark-400">Total Threats</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded-full bg-accent-500" />
              <span className="text-dark-400">Blocked</span>
            </span>
          </div>
        </div>
        <div className="h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={threatChartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.08)" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                dx={-5}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="threats"
                name="Total Threats"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#threatGradient)"
              />
              <Area
                type="monotone"
                dataKey="blocked"
                name="Blocked"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#blockedGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two-column grid: Recent Threats + Security Score */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Threats */}
        <div className="glass-card rounded-xl p-6 glow-border">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-dark-100">Recent Threats</h2>
            <button className="text-xs text-primary-400 hover:text-primary-300 font-medium flex items-center gap-1 transition-colors">
              View All
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {recentThreats.map((threat) => (
              <div
                key={threat.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-dark-800/40 hover:bg-dark-800/70 border border-transparent hover:border-dark-700/50 transition-all"
              >
                <div className="mt-0.5">
                  {threat.severity === "Critical" ? (
                    <XCircle className="w-4.5 h-4.5 text-red-400" />
                  ) : threat.severity === "High" ? (
                    <AlertTriangle className="w-4.5 h-4.5 text-orange-400" />
                  ) : threat.severity === "Medium" ? (
                    <Bug className="w-4.5 h-4.5 text-yellow-400" />
                  ) : (
                    <Globe className="w-4.5 h-4.5 text-blue-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-dark-200 truncate">{threat.type}</p>
                    <SeverityBadge severity={threat.severity} />
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-dark-500">
                    <span className="font-mono">{threat.id}</span>
                    <span>{threat.source}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {threat.timestamp}
                    </span>
                  </div>
                </div>
                <StatusBadge status={threat.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Security Score Breakdown */}
        <div className="glass-card rounded-xl p-6 glow-border">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-dark-100">Security Score Breakdown</h2>
            <span className="text-xs text-dark-500 font-medium">Overall: 88%</span>
          </div>
          <div className="grid grid-cols-2 gap-6 py-4">
            {securityScores.map((item) => (
              <CircularProgress
                key={item.label}
                score={item.score}
                color={item.color}
                label={item.label}
              />
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-dark-700/50">
            <div className="grid grid-cols-2 gap-3">
              {securityScores.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-dark-400">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.label}
                  </span>
                  <span className="font-semibold text-dark-200">{item.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Alerts Table */}
      <div className="glass-card rounded-xl p-6 glow-border">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-dark-100">Active Alerts</h2>
          <span className="text-xs text-dark-500">
            {activeAlerts.filter((a) => a.status === "Active").length} active
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-700/50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                  Alert ID
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-dark-500 uppercase tracking-wider hidden sm:table-cell">
                  Source
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-dark-500 uppercase tracking-wider hidden md:table-cell">
                  Time
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700/30">
              {activeAlerts.map((alert) => (
                <tr
                  key={alert.id}
                  className="hover:bg-dark-800/40 transition-colors"
                >
                  <td className="py-3 px-4 font-mono text-xs text-dark-300">
                    {alert.id}
                  </td>
                  <td className="py-3 px-4 text-dark-200 font-medium">
                    {alert.type}
                  </td>
                  <td className="py-3 px-4">
                    <SeverityBadge severity={alert.severity} />
                  </td>
                  <td className="py-3 px-4 text-dark-400 hidden sm:table-cell">
                    {alert.source}
                  </td>
                  <td className="py-3 px-4 text-dark-500 hidden md:table-cell">
                    {alert.time}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={alert.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="px-3 py-1.5 text-xs font-medium text-primary-400 hover:text-white bg-primary-500/10 hover:bg-primary-500 rounded-lg border border-primary-500/30 hover:border-primary-500 transition-all duration-200">
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
