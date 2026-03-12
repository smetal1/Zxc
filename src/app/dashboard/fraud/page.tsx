"use client";

import { useState } from "react";
import {
  ShieldAlert,
  Download,
  TrendingUp,
  TrendingDown,
  Activity,
  CreditCard,
  UserX,
  Fingerprint,
  Banknote,
  Landmark,
  HandCoins,
  Eye,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Globe,
  Brain,
  Target,
  Zap,
  BarChart3,
  Copy,
  CircleDollarSign,
  ShieldCheck,
  Percent,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts";

// ── Date ranges ──
const dateRanges = ["24h", "7d", "30d", "90d"] as const;
type DateRange = (typeof dateRanges)[number];

// ── 30-day transaction data ──
const transactionData = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const base = 35000 + Math.sin(i * 0.4) * 8000 + Math.random() * 5000;
  const fraud = Math.round(8 + Math.sin(i * 0.6) * 5 + Math.random() * 6);
  return {
    day: `Mar ${day}`,
    transactions: Math.round(base),
    fraud,
  };
});

// ── Fraud patterns ──
const fraudPatterns = [
  {
    name: "Card Cloning",
    icon: CreditCard,
    count: 45,
    trend: "up" as const,
    change: 12.5,
    color: "text-danger-400",
    bg: "bg-danger-500/10",
    sparkline: [3, 5, 4, 7, 6, 8, 9, 7, 10, 8, 11, 9],
  },
  {
    name: "Account Takeover",
    icon: UserX,
    count: 28,
    trend: "down" as const,
    change: -8.3,
    color: "text-warning-400",
    bg: "bg-warning-500/10",
    sparkline: [8, 7, 9, 6, 5, 7, 4, 6, 5, 3, 4, 3],
  },
  {
    name: "Synthetic Identity",
    icon: Fingerprint,
    count: 12,
    trend: "up" as const,
    change: 5.1,
    color: "text-accent-400",
    bg: "bg-accent-500/10",
    sparkline: [1, 2, 1, 3, 2, 3, 2, 4, 3, 4, 3, 5],
  },
  {
    name: "Payment Fraud",
    icon: Banknote,
    count: 67,
    trend: "up" as const,
    change: 18.2,
    color: "text-danger-400",
    bg: "bg-danger-500/10",
    sparkline: [4, 6, 5, 8, 7, 9, 10, 8, 12, 11, 14, 13],
  },
  {
    name: "Money Laundering",
    icon: Landmark,
    count: 8,
    trend: "down" as const,
    change: -15.0,
    color: "text-primary-400",
    bg: "bg-primary-500/10",
    sparkline: [4, 3, 4, 2, 3, 2, 1, 2, 1, 1, 1, 0],
  },
  {
    name: "Friendly Fraud",
    icon: HandCoins,
    count: 23,
    trend: "up" as const,
    change: 3.4,
    color: "text-warning-400",
    bg: "bg-warning-500/10",
    sparkline: [2, 3, 2, 4, 3, 4, 5, 4, 5, 6, 5, 6],
  },
];

// ── Risk scoring data ──
const riskTransactions = [
  {
    id: "TXN-84291",
    amount: 2847.5,
    riskScore: 92,
    type: "Transfer",
    location: "🇷🇺 Russia",
    status: "Blocked",
  },
  {
    id: "TXN-84292",
    amount: 159.99,
    riskScore: 15,
    type: "Purchase",
    location: "🇺🇸 United States",
    status: "Approved",
  },
  {
    id: "TXN-84293",
    amount: 5200.0,
    riskScore: 87,
    type: "Withdrawal",
    location: "🇳🇬 Nigeria",
    status: "Blocked",
  },
  {
    id: "TXN-84294",
    amount: 340.25,
    riskScore: 45,
    type: "Purchase",
    location: "🇧🇷 Brazil",
    status: "Flagged",
  },
  {
    id: "TXN-84295",
    amount: 89.0,
    riskScore: 8,
    type: "Purchase",
    location: "🇬🇧 United Kingdom",
    status: "Approved",
  },
  {
    id: "TXN-84296",
    amount: 1750.0,
    riskScore: 73,
    type: "Transfer",
    location: "🇹🇷 Turkey",
    status: "Flagged",
  },
  {
    id: "TXN-84297",
    amount: 4999.99,
    riskScore: 95,
    type: "Withdrawal",
    location: "🇷🇺 Russia",
    status: "Blocked",
  },
  {
    id: "TXN-84298",
    amount: 225.75,
    riskScore: 22,
    type: "Purchase",
    location: "🇯🇵 Japan",
    status: "Approved",
  },
];

// ── Geographic risk ──
const geoRiskData = [
  { region: "Russia", flag: "🇷🇺", level: "High", score: 92, incidents: 87 },
  { region: "Nigeria", flag: "🇳🇬", level: "High", score: 89, incidents: 64 },
  { region: "Brazil", flag: "🇧🇷", level: "High", score: 78, incidents: 53 },
  { region: "India", flag: "🇮🇳", level: "Medium", score: 55, incidents: 31 },
  { region: "China", flag: "🇨🇳", level: "Medium", score: 52, incidents: 28 },
  { region: "Turkey", flag: "🇹🇷", level: "Medium", score: 48, incidents: 22 },
  { region: "United States", flag: "🇺🇸", level: "Low", score: 12, incidents: 9 },
  { region: "United Kingdom", flag: "🇬🇧", level: "Low", score: 10, incidents: 7 },
  { region: "Germany", flag: "🇩🇪", level: "Low", score: 8, incidents: 5 },
  { region: "Japan", flag: "🇯🇵", level: "Low", score: 5, incidents: 3 },
];

// ── AI model radar data ──
const radarData = [
  { metric: "Precision", value: 99.1, fullMark: 100 },
  { metric: "Recall", value: 97.8, fullMark: 100 },
  { metric: "F1 Score", value: 98.4, fullMark: 100 },
  { metric: "Accuracy", value: 99.3, fullMark: 100 },
  { metric: "AUC-ROC", value: 99.7, fullMark: 100 },
  { metric: "Speed", value: 96.2, fullMark: 100 },
];

// ── Helpers ──
function getRiskColor(score: number) {
  if (score >= 75) return "bg-danger-500";
  if (score >= 40) return "bg-warning-500";
  return "bg-success-500";
}

function getRiskTrackColor(score: number) {
  if (score >= 75) return "bg-danger-500/20";
  if (score >= 40) return "bg-warning-500/20";
  return "bg-success-500/20";
}

function getRiskTextColor(score: number) {
  if (score >= 75) return "text-danger-400";
  if (score >= 40) return "text-warning-400";
  return "text-success-400";
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Approved":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-success-500/15 text-success-400 border border-success-500/20">
          <CheckCircle2 className="w-3 h-3" />
          {status}
        </span>
      );
    case "Flagged":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-warning-500/15 text-warning-400 border border-warning-500/20">
          <AlertTriangle className="w-3 h-3" />
          {status}
        </span>
      );
    case "Blocked":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-danger-500/15 text-danger-400 border border-danger-500/20">
          <XCircle className="w-3 h-3" />
          {status}
        </span>
      );
    default:
      return null;
  }
}

function getLevelColor(level: string) {
  switch (level) {
    case "High":
      return {
        bg: "bg-danger-500/15",
        border: "border-danger-500/30",
        text: "text-danger-400",
        bar: "bg-danger-500",
        glow: "shadow-danger-500/20",
      };
    case "Medium":
      return {
        bg: "bg-warning-500/15",
        border: "border-warning-500/30",
        text: "text-warning-400",
        bar: "bg-warning-500",
        glow: "shadow-warning-500/20",
      };
    default:
      return {
        bg: "bg-success-500/15",
        border: "border-success-500/30",
        text: "text-success-400",
        bar: "bg-success-500",
        glow: "shadow-success-500/20",
      };
  }
}

// ── Mini Sparkline component ──
function MiniSparkline({
  data,
  color,
}: {
  data: number[];
  color: string;
}) {
  const lineData = data.map((v, i) => ({ i, v }));
  return (
    <div className="w-24 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={lineData}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Custom tooltip ──
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-lg px-3 py-2 shadow-xl border border-dark-700/50">
      <p className="text-xs text-dark-400 mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

// ── Sparkline color mapper ──
function sparklineStroke(colorClass: string) {
  if (colorClass.includes("danger")) return "#f87171";
  if (colorClass.includes("warning")) return "#fbbf24";
  if (colorClass.includes("accent")) return "#a78bfa";
  if (colorClass.includes("primary")) return "#60a5fa";
  return "#94a3b8";
}

// ══════════════════════════════════════
// Main Page Component
// ══════════════════════════════════════
export default function FraudDetectionPage() {
  const [dateRange, setDateRange] = useState<DateRange>("30d");

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-danger-500 to-warning-500 flex items-center justify-center shadow-lg shadow-danger-500/20">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-dark-100">
              Fraud Detection & Analytics
            </h1>
            <p className="text-sm text-dark-400">
              Real-time monitoring and threat analysis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Date range selector */}
          <div className="flex items-center bg-dark-800/70 border border-dark-700/50 rounded-lg p-1">
            {dateRanges.map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  dateRange === range
                    ? "bg-primary-500 text-white shadow-sm shadow-primary-500/30"
                    : "text-dark-400 hover:text-dark-200"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Export button */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-800/70 border border-dark-700/50 text-sm text-dark-300 hover:text-dark-100 hover:border-dark-600 transition-all duration-200">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* ── Metrics Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Transactions Monitored */}
        <div className="glass-card rounded-xl p-5 glow-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-dark-400">Transactions Monitored</span>
            <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary-400" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-dark-100">1.2M</span>
            <span className="text-xs text-success-400 flex items-center gap-0.5 mb-1">
              <TrendingUp className="w-3 h-3" />
              +8.2%
            </span>
          </div>
          <div className="mt-3 h-1 bg-dark-700/50 rounded-full overflow-hidden">
            <div className="h-full w-[82%] bg-gradient-to-r from-primary-500 to-primary-400 rounded-full" />
          </div>
        </div>

        {/* Fraud Detected */}
        <div className="glass-card rounded-xl p-5 glow-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-dark-400">Fraud Detected</span>
            <div className="w-8 h-8 rounded-lg bg-danger-500/10 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-danger-400" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-dark-100">342</span>
            <span className="text-xs text-dark-400 mb-1">(0.028%)</span>
          </div>
          <div className="mt-3 h-1 bg-dark-700/50 rounded-full overflow-hidden">
            <div className="h-full w-[28%] bg-gradient-to-r from-danger-500 to-danger-400 rounded-full" />
          </div>
        </div>

        {/* Amount Saved */}
        <div className="glass-card rounded-xl p-5 glow-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-dark-400">Amount Saved</span>
            <div className="w-8 h-8 rounded-lg bg-success-500/10 flex items-center justify-center">
              <CircleDollarSign className="w-4 h-4 text-success-400" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-dark-100">$2.4M</span>
            <span className="text-xs text-success-400 flex items-center gap-0.5 mb-1">
              <TrendingUp className="w-3 h-3" />
              +15.3%
            </span>
          </div>
          <div className="mt-3 h-1 bg-dark-700/50 rounded-full overflow-hidden">
            <div className="h-full w-[72%] bg-gradient-to-r from-success-500 to-success-400 rounded-full" />
          </div>
        </div>

        {/* False Positive Rate */}
        <div className="glass-card rounded-xl p-5 glow-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-dark-400">False Positive Rate</span>
            <div className="w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center">
              <Percent className="w-4 h-4 text-accent-400" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-dark-100">0.12%</span>
            <span className="text-xs text-success-400 flex items-center gap-0.5 mb-1">
              <TrendingDown className="w-3 h-3" />
              -3.1%
            </span>
          </div>
          <div className="mt-3 h-1 bg-dark-700/50 rounded-full overflow-hidden">
            <div className="h-full w-[12%] bg-gradient-to-r from-accent-500 to-accent-400 rounded-full" />
          </div>
        </div>
      </div>

      {/* ── Transaction Analysis Chart ── */}
      <div className="glass-card rounded-xl p-6 glow-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-dark-100">
              Transaction Analysis
            </h2>
            <p className="text-sm text-dark-400 mt-0.5">
              Volume vs fraud detections over {dateRange}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-500" />
              <span className="text-xs text-dark-400">Transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-danger-500" />
              <span className="text-xs text-dark-400">Fraud</span>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={transactionData}
              margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="txGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fraudGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                opacity={0.4}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
                interval={4}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
                tickFormatter={(v) =>
                  v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v
                }
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="transactions"
                name="Transactions"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#txGrad)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="fraud"
                name="Fraud"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#fraudGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Fraud Patterns ── */}
      <div>
        <h2 className="text-lg font-semibold text-dark-100 mb-4">
          Fraud Patterns
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fraudPatterns.map((pattern) => {
            const Icon = pattern.icon;
            return (
              <div
                key={pattern.name}
                className="glass-card rounded-xl p-5 hover:border-dark-600/50 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${pattern.bg} flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 ${pattern.color}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-dark-200">
                        {pattern.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xl font-bold text-dark-100">
                          {pattern.count}
                        </span>
                        <span className="text-xs text-dark-500">cases</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-xs font-medium flex items-center gap-0.5 ${
                        pattern.trend === "up"
                          ? "text-danger-400"
                          : "text-success-400"
                      }`}
                    >
                      {pattern.trend === "up" ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {pattern.change > 0 ? "+" : ""}
                      {pattern.change}%
                    </span>
                    <MiniSparkline
                      data={pattern.sparkline}
                      color={sparklineStroke(pattern.color)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Risk Scoring Table ── */}
      <div className="glass-card rounded-xl glow-border overflow-hidden">
        <div className="px-6 py-4 border-b border-dark-700/50">
          <h2 className="text-lg font-semibold text-dark-100">
            Risk Scoring
          </h2>
          <p className="text-sm text-dark-400 mt-0.5">
            Recent transactions with AI-computed risk assessment
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700/50">
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-3">
                  Transaction ID
                </th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-3">
                  Amount
                </th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-3">
                  Risk Score
                </th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-3">
                  Type
                </th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-3">
                  Location
                </th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700/30">
              {riskTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-dark-800/40 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-primary-400">
                      {tx.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-dark-200">
                      ${tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[100px]">
                        <div
                          className={`h-2 rounded-full ${getRiskTrackColor(tx.riskScore)} overflow-hidden`}
                        >
                          <div
                            className={`h-full rounded-full ${getRiskColor(tx.riskScore)} transition-all duration-500`}
                            style={{ width: `${tx.riskScore}%` }}
                          />
                        </div>
                      </div>
                      <span
                        className={`text-sm font-semibold ${getRiskTextColor(tx.riskScore)} tabular-nums`}
                      >
                        {tx.riskScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-dark-300">{tx.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-dark-300">
                      {tx.location}
                    </span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(tx.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-500/10 text-primary-400 border border-primary-500/20 hover:bg-primary-500/20 transition-colors">
                      <Eye className="w-3 h-3" />
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Bottom Grid: Geographic Risk + AI Model ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic Risk Map */}
        <div className="glass-card rounded-xl p-6 glow-border">
          <div className="flex items-center gap-2 mb-5">
            <Globe className="w-5 h-5 text-primary-400" />
            <h2 className="text-lg font-semibold text-dark-100">
              Geographic Risk Map
            </h2>
          </div>

          <div className="space-y-3">
            {geoRiskData.map((geo) => {
              const colors = getLevelColor(geo.level);
              return (
                <div
                  key={geo.region}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg ${colors.bg} border ${colors.border} transition-all duration-200 hover:scale-[1.01]`}
                >
                  <span className="text-xl w-8 text-center">{geo.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-dark-200 truncate">
                        {geo.region}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}
                      >
                        {geo.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-dark-700/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${colors.bar} transition-all duration-700`}
                          style={{ width: `${geo.score}%` }}
                        />
                      </div>
                      <span className={`text-xs font-mono ${colors.text} tabular-nums w-6 text-right`}>
                        {geo.score}
                      </span>
                    </div>
                    <p className="text-xs text-dark-500 mt-1">
                      {geo.incidents} incidents
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Model Performance */}
        <div className="glass-card rounded-xl p-6 glow-border">
          <div className="flex items-center gap-2 mb-5">
            <Brain className="w-5 h-5 text-accent-400" />
            <h2 className="text-lg font-semibold text-dark-100">
              AI Model Performance
            </h2>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="rounded-lg bg-dark-800/60 border border-dark-700/40 p-3 text-center">
              <p className="text-xs text-dark-400 mb-1">Precision</p>
              <p className="text-xl font-bold text-success-400">99.1%</p>
            </div>
            <div className="rounded-lg bg-dark-800/60 border border-dark-700/40 p-3 text-center">
              <p className="text-xs text-dark-400 mb-1">Recall</p>
              <p className="text-xl font-bold text-primary-400">97.8%</p>
            </div>
            <div className="rounded-lg bg-dark-800/60 border border-dark-700/40 p-3 text-center">
              <p className="text-xs text-dark-400 mb-1">F1 Score</p>
              <p className="text-xl font-bold text-accent-400">98.4%</p>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid
                  stroke="#334155"
                  strokeOpacity={0.6}
                />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[90, 100]}
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  axisLine={false}
                />
                <Radar
                  name="Performance"
                  dataKey="value"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="#8b5cf6"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Extra stats row */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex items-center gap-2 rounded-lg bg-dark-800/40 border border-dark-700/30 px-3 py-2">
              <Target className="w-4 h-4 text-primary-400" />
              <div>
                <p className="text-[10px] text-dark-500 uppercase tracking-wider">
                  Accuracy
                </p>
                <p className="text-sm font-semibold text-dark-200">99.3%</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-dark-800/40 border border-dark-700/30 px-3 py-2">
              <Zap className="w-4 h-4 text-warning-400" />
              <div>
                <p className="text-[10px] text-dark-500 uppercase tracking-wider">
                  Avg Latency
                </p>
                <p className="text-sm font-semibold text-dark-200">12ms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
