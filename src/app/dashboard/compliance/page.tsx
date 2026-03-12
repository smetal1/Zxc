"use client";

import { Fragment, useState } from "react";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  FileText,
  Calendar,
  Clock,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MinusCircle,
  Download,
  CalendarClock,
  Search,
  Filter,
  ExternalLink,
  ClipboardList,
  FileCheck,
  FileClock,
  AlertCircle,
  Activity,
  TrendingUp,
  Eye,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ─── Data ──────────────────────────────────────────────────────────────────────

const frameworkData = [
  {
    id: "pci-dss",
    name: "PCI DSS",
    fullName: "Payment Card Industry Data Security Standard",
    score: 96,
    issues: 2,
    status: "compliant" as const,
    lastAudit: "2026-01-15",
    nextAudit: "2026-04-15",
    icon: Shield,
    color: "#3b82f6",
  },
  {
    id: "soc2",
    name: "SOC 2 Type II",
    fullName: "Service Organization Control 2",
    score: 92,
    issues: 5,
    status: "compliant" as const,
    lastAudit: "2025-12-01",
    nextAudit: "2026-06-01",
    icon: ShieldCheck,
    color: "#8b5cf6",
  },
  {
    id: "gdpr",
    name: "GDPR",
    fullName: "General Data Protection Regulation",
    score: 98,
    issues: 1,
    status: "compliant" as const,
    lastAudit: "2026-02-10",
    nextAudit: "2026-08-10",
    icon: FileCheck,
    color: "#22c55e",
  },
  {
    id: "hipaa",
    name: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act",
    score: 89,
    issues: 7,
    status: "at-risk" as const,
    lastAudit: "2025-11-20",
    nextAudit: "2026-05-20",
    icon: ShieldAlert,
    color: "#f59e0b",
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    fullName: "Information Security Management System",
    score: 95,
    issues: 3,
    status: "compliant" as const,
    lastAudit: "2026-01-05",
    nextAudit: "2026-07-05",
    icon: ClipboardList,
    color: "#06b6d4",
  },
  {
    id: "nist-csf",
    name: "NIST CSF",
    fullName: "NIST Cybersecurity Framework",
    score: 91,
    issues: 4,
    status: "compliant" as const,
    lastAudit: "2025-12-15",
    nextAudit: "2026-06-15",
    icon: BarChart3,
    color: "#ec4899",
  },
];

const controlsData = [
  {
    id: "AC-001",
    framework: "PCI DSS",
    category: "Access Control",
    description: "Access control policy review and enforcement for cardholder data environments",
    status: "pass" as const,
    evidence: "Policy document v3.2, access logs",
    lastChecked: "2026-03-10",
  },
  {
    id: "DE-002",
    framework: "SOC 2 Type II",
    category: "Data Encryption",
    description: "Data encryption at rest using AES-256 for all sensitive data stores",
    status: "pass" as const,
    evidence: "Encryption audit report, config snapshots",
    lastChecked: "2026-03-09",
  },
  {
    id: "IR-003",
    framework: "ISO 27001",
    category: "Incident Response",
    description: "Incident response plan documentation and annual tabletop exercises",
    status: "pass" as const,
    evidence: "IR plan v2.1, exercise reports",
    lastChecked: "2026-03-08",
  },
  {
    id: "DP-004",
    framework: "GDPR",
    category: "Data Protection",
    description: "Data subject access request handling within 30-day SLA",
    status: "pass" as const,
    evidence: "DSAR tracking system, response logs",
    lastChecked: "2026-03-07",
  },
  {
    id: "RA-005",
    framework: "HIPAA",
    category: "Risk Assessment",
    description: "Annual risk assessment of ePHI handling and storage systems",
    status: "fail" as const,
    evidence: "Assessment overdue by 15 days",
    lastChecked: "2026-03-06",
  },
  {
    id: "NM-006",
    framework: "PCI DSS",
    category: "Network Monitoring",
    description: "Continuous network segmentation testing and monitoring controls",
    status: "warning" as const,
    evidence: "Partial scan results, pending full validation",
    lastChecked: "2026-03-05",
  },
  {
    id: "AM-007",
    framework: "NIST CSF",
    category: "Asset Management",
    description: "Complete hardware and software asset inventory with classification labels",
    status: "pass" as const,
    evidence: "CMDB export, classification tags",
    lastChecked: "2026-03-04",
  },
  {
    id: "VL-008",
    framework: "HIPAA",
    category: "Vulnerability Management",
    description: "Quarterly vulnerability scanning and remediation within defined SLAs",
    status: "fail" as const,
    evidence: "3 critical CVEs unpatched beyond SLA",
    lastChecked: "2026-03-03",
  },
];

const trendData = [
  { month: "Apr", "PCI DSS": 91, "SOC 2 Type II": 87, GDPR: 93 },
  { month: "May", "PCI DSS": 92, "SOC 2 Type II": 88, GDPR: 94 },
  { month: "Jun", "PCI DSS": 90, "SOC 2 Type II": 86, GDPR: 95 },
  { month: "Jul", "PCI DSS": 93, "SOC 2 Type II": 89, GDPR: 94 },
  { month: "Aug", "PCI DSS": 94, "SOC 2 Type II": 90, GDPR: 96 },
  { month: "Sep", "PCI DSS": 93, "SOC 2 Type II": 88, GDPR: 95 },
  { month: "Oct", "PCI DSS": 95, "SOC 2 Type II": 91, GDPR: 97 },
  { month: "Nov", "PCI DSS": 94, "SOC 2 Type II": 90, GDPR: 96 },
  { month: "Dec", "PCI DSS": 95, "SOC 2 Type II": 91, GDPR: 97 },
  { month: "Jan", "PCI DSS": 96, "SOC 2 Type II": 92, GDPR: 98 },
  { month: "Feb", "PCI DSS": 95, "SOC 2 Type II": 91, GDPR: 97 },
  { month: "Mar", "PCI DSS": 96, "SOC 2 Type II": 92, GDPR: 98 },
];

const auditLogEntries = [
  {
    id: 1,
    message: "PCI DSS quarterly review completed",
    time: "2 days ago",
    icon: CheckCircle2,
    color: "text-success-500",
  },
  {
    id: 2,
    message: "New GDPR data processing agreement uploaded",
    time: "5 days ago",
    icon: FileText,
    color: "text-primary-500",
  },
  {
    id: 3,
    message: "SOC 2 evidence collection automated",
    time: "1 week ago",
    icon: Activity,
    color: "text-accent-500",
  },
  {
    id: 4,
    message: "ISO 27001 risk assessment updated",
    time: "2 weeks ago",
    icon: TrendingUp,
    color: "text-warning-500",
  },
  {
    id: 5,
    message: "HIPAA training records submitted",
    time: "3 weeks ago",
    icon: ClipboardList,
    color: "text-dark-400",
  },
];

const policiesData = [
  {
    id: 1,
    name: "Data Classification Policy",
    status: "active" as const,
    reviewDate: "2024-01-15",
    dueDate: null,
  },
  {
    id: 2,
    name: "Incident Response Plan",
    status: "active" as const,
    reviewDate: "2024-02-01",
    dueDate: null,
  },
  {
    id: 3,
    name: "Access Control Policy",
    status: "needs-review" as const,
    reviewDate: null,
    dueDate: "2024-03-01",
  },
  {
    id: 4,
    name: "Encryption Standards",
    status: "active" as const,
    reviewDate: "2024-01-20",
    dueDate: null,
  },
  {
    id: 5,
    name: "Employee Security Training",
    status: "in-progress" as const,
    reviewDate: null,
    dueDate: null,
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function statusBadge(status: "pass" | "fail" | "warning") {
  const map = {
    pass: {
      label: "Pass",
      bg: "bg-success-500/15",
      text: "text-success-400",
      Icon: CheckCircle2,
    },
    fail: {
      label: "Fail",
      bg: "bg-danger-500/15",
      text: "text-danger-400",
      Icon: XCircle,
    },
    warning: {
      label: "Warning",
      bg: "bg-warning-500/15",
      text: "text-warning-400",
      Icon: AlertTriangle,
    },
  };
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.bg} ${s.text}`}
    >
      <s.Icon className="h-3 w-3" />
      {s.label}
    </span>
  );
}

function policyStatusBadge(status: "active" | "needs-review" | "in-progress") {
  const map = {
    active: { label: "Active", bg: "bg-success-500/15", text: "text-success-400" },
    "needs-review": { label: "Needs Review", bg: "bg-warning-500/15", text: "text-warning-400" },
    "in-progress": { label: "In Progress", bg: "bg-primary-500/15", text: "text-primary-400" },
  };
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.bg} ${s.text}`}
    >
      {s.label}
    </span>
  );
}

// ─── Circular Progress ─────────────────────────────────────────────────────────

function CircularProgress({
  value,
  size = 180,
  strokeWidth = 14,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(148,163,184,0.1)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-white">{value}%</span>
        <span className="text-xs text-dark-400 mt-0.5">Overall Score</span>
      </div>
    </div>
  );
}

// ─── Custom Tooltip ────────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-lg px-4 py-3 border border-dark-700/50 shadow-xl">
      <p className="text-xs text-dark-400 mb-2 font-medium">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-sm">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-dark-300">{p.name}:</span>
          <span className="font-semibold text-white">{p.value}%</span>
        </div>
      ))}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState<
    "controls" | "trends" | "audit" | "policies"
  >("controls");
  const [frameworkFilter, setFrameworkFilter] = useState("all");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredControls = controlsData.filter((c) => {
    const matchesFramework =
      frameworkFilter === "all" ||
      c.framework.toLowerCase().replace(/\s/g, "-") ===
        frameworkFilter.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFramework && matchesSearch;
  });

  const tabs = [
    { key: "controls" as const, label: "Control Details", icon: ClipboardList },
    { key: "trends" as const, label: "Compliance Trends", icon: TrendingUp },
    { key: "audit" as const, label: "Audit Log", icon: FileClock },
    { key: "policies" as const, label: "Policy Management", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-dark-950 p-6 space-y-6">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Compliance &amp; Audit Center
          </h1>
          <p className="text-dark-400 text-sm mt-1">
            Monitor regulatory compliance, manage audits, and track policy
            adherence
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="glass-card glow-border flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-primary-400 hover:bg-primary-500/10 transition-colors">
            <CalendarClock className="h-4 w-4" />
            Schedule Audit
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/20">
            <Download className="h-4 w-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* ── Overall Score + Summary ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Card */}
        <div className="glass-card glow-border rounded-2xl p-6 flex flex-col items-center justify-center">
          <h2 className="text-sm font-semibold text-dark-300 uppercase tracking-wider mb-4">
            Overall Compliance Score
          </h2>
          <CircularProgress value={94} />
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-6 w-full max-w-xs">
            {[
              {
                label: "Passed",
                count: 284,
                Icon: CheckCircle2,
                color: "text-success-400",
                bg: "bg-success-500/15",
              },
              {
                label: "Failed",
                count: 12,
                Icon: XCircle,
                color: "text-danger-400",
                bg: "bg-danger-500/15",
              },
              {
                label: "Warning",
                count: 8,
                Icon: AlertTriangle,
                color: "text-warning-400",
                bg: "bg-warning-500/15",
              },
              {
                label: "N/A",
                count: 16,
                Icon: MinusCircle,
                color: "text-dark-400",
                bg: "bg-dark-700/40",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.bg}`}
                >
                  <item.Icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <div>
                  <p className="text-lg font-bold text-white leading-none">
                    {item.count}
                  </p>
                  <p className="text-[11px] text-dark-400">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Framework Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {frameworkData.map((fw) => {
            const FwIcon = fw.icon;
            return (
              <div
                key={fw.id}
                className="glass-card rounded-xl p-4 hover:border-dark-600 transition-all group cursor-pointer border border-transparent"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${fw.color}15` }}
                    >
                      <FwIcon
                        className="h-4.5 w-4.5"
                        style={{ color: fw.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {fw.name}
                      </h3>
                      <p className="text-[10px] text-dark-500 leading-tight mt-0.5 max-w-[140px] truncate">
                        {fw.fullName}
                      </p>
                    </div>
                  </div>
                  {fw.status === "compliant" ? (
                    <CheckCircle2 className="h-4 w-4 text-success-400 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-warning-400 shrink-0" />
                  )}
                </div>

                {/* Score */}
                <div className="flex items-end justify-between mb-2">
                  <span className="text-2xl font-bold text-white">
                    {fw.score}%
                  </span>
                  <span className="text-xs text-dark-400">
                    {fw.issues} issue{fw.issues !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full rounded-full bg-dark-800 overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${fw.score}%`,
                      background: `linear-gradient(90deg, ${fw.color}, ${fw.color}aa)`,
                    }}
                  />
                </div>

                {/* Dates */}
                <div className="flex items-center justify-between text-[11px] text-dark-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Last: {fw.lastAudit}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Next: {fw.nextAudit}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────────────── */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-dark-800">
          {tabs.map((t) => {
            const TabIcon = t.icon;
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors relative ${
                  isActive
                    ? "text-primary-400"
                    : "text-dark-400 hover:text-dark-200"
                }`}
              >
                <TabIcon className="h-4 w-4" />
                {t.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-t" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="p-6">
          {/* ── Controls Tab ────────────────────────────────────────────── */}
          {activeTab === "controls" && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-500" />
                  <input
                    type="text"
                    placeholder="Search controls..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg bg-dark-900 border border-dark-700 py-2 pl-9 pr-4 text-sm text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-colors"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-500" />
                  <select
                    value={frameworkFilter}
                    onChange={(e) => setFrameworkFilter(e.target.value)}
                    className="appearance-none rounded-lg bg-dark-900 border border-dark-700 py-2 pl-9 pr-10 text-sm text-white focus:outline-none focus:border-primary-500/50 cursor-pointer"
                  >
                    <option value="all">All Frameworks</option>
                    {frameworkData.map((fw) => (
                      <option
                        key={fw.id}
                        value={fw.name
                          .toLowerCase()
                          .replace(/\s/g, "-")}
                      >
                        {fw.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-500 pointer-events-none" />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-dark-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-dark-800 bg-dark-900/50">
                      <th className="w-8 px-4 py-3" />
                      <th className="px-4 py-3 text-left font-semibold text-dark-300">
                        Control ID
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-dark-300">
                        Framework
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-dark-300">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-dark-300 hidden lg:table-cell">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-dark-300">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-dark-300 hidden md:table-cell">
                        Last Checked
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredControls.map((c) => {
                      const isExpanded = expandedRows.has(c.id);
                      return (
                        <Fragment key={c.id}>
                          <tr
                            onClick={() => toggleRow(c.id)}
                            className="border-b border-dark-800/60 hover:bg-dark-800/30 cursor-pointer transition-colors"
                          >
                            <td className="px-4 py-3 text-dark-500">
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </td>
                            <td className="px-4 py-3 font-mono text-xs text-primary-400">
                              {c.id}
                            </td>
                            <td className="px-4 py-3 text-dark-200">
                              {c.framework}
                            </td>
                            <td className="px-4 py-3 text-dark-300">
                              {c.category}
                            </td>
                            <td className="px-4 py-3 text-dark-400 hidden lg:table-cell max-w-xs truncate">
                              {c.description}
                            </td>
                            <td className="px-4 py-3">
                              {statusBadge(c.status)}
                            </td>
                            <td className="px-4 py-3 text-dark-400 hidden md:table-cell">
                              {c.lastChecked}
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr className="bg-dark-900/40 border-b border-dark-800/60">
                              <td colSpan={7} className="px-8 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-dark-500 text-xs uppercase tracking-wider">
                                      Description
                                    </span>
                                    <p className="text-dark-200 mt-1">
                                      {c.description}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-dark-500 text-xs uppercase tracking-wider">
                                      Evidence
                                    </span>
                                    <p className="text-dark-200 mt-1 flex items-center gap-2">
                                      <Eye className="h-3.5 w-3.5 text-dark-500" />
                                      {c.evidence}
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })}
                    {filteredControls.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-12 text-center text-dark-500"
                        >
                          No controls match the current filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Trends Tab ──────────────────────────────────────────────── */}
          {activeTab === "trends" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-dark-200">
                  Compliance Score Trends (12 Months)
                </h3>
                <div className="flex items-center gap-4 text-xs text-dark-400">
                  {[
                    { name: "PCI DSS", color: "#3b82f6" },
                    { name: "SOC 2 Type II", color: "#8b5cf6" },
                    { name: "GDPR", color: "#22c55e" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-1.5"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={trendData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(148,163,184,0.08)"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      axisLine={{ stroke: "rgba(148,163,184,0.1)" }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[80, 100]}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      axisLine={{ stroke: "rgba(148,163,184,0.1)" }}
                      tickLine={false}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                    />
                    <Line
                      type="monotone"
                      dataKey="PCI DSS"
                      stroke="#3b82f6"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: "#3b82f6" }}
                      activeDot={{ r: 5, fill: "#3b82f6" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="SOC 2 Type II"
                      stroke="#8b5cf6"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: "#8b5cf6" }}
                      activeDot={{ r: 5, fill: "#8b5cf6" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="GDPR"
                      stroke="#22c55e"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: "#22c55e" }}
                      activeDot={{ r: 5, fill: "#22c55e" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* ── Audit Log Tab ───────────────────────────────────────────── */}
          {activeTab === "audit" && (
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-dark-200 mb-4">
                Recent Audit Activities
              </h3>
              {auditLogEntries.map((entry, idx) => {
                const EntryIcon = entry.icon;
                return (
                  <div
                    key={entry.id}
                    className="flex items-start gap-4 py-3.5 px-4 rounded-lg hover:bg-dark-800/30 transition-colors group"
                  >
                    <div className="relative flex flex-col items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-dark-800 border border-dark-700 group-hover:border-dark-600 transition-colors">
                        <EntryIcon className={`h-4 w-4 ${entry.color}`} />
                      </div>
                      {idx < auditLogEntries.length - 1 && (
                        <div className="w-px h-full bg-dark-800 absolute top-9 left-1/2 -translate-x-1/2" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="text-sm text-dark-200">
                        {entry.message}
                      </p>
                      <p className="text-xs text-dark-500 mt-0.5 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {entry.time}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-dark-600 group-hover:text-dark-400 transition-colors mt-1.5 shrink-0" />
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Policies Tab ────────────────────────────────────────────── */}
          {activeTab === "policies" && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-dark-200 mb-2">
                Security Policies
              </h3>
              <div className="overflow-x-auto rounded-xl border border-dark-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-dark-800 bg-dark-900/50">
                      <th className="px-4 py-3 text-left font-semibold text-dark-300">
                        Policy Name
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-dark-300">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-dark-300">
                        Details
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-dark-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {policiesData.map((policy) => (
                      <tr
                        key={policy.id}
                        className="border-b border-dark-800/60 hover:bg-dark-800/30 transition-colors"
                      >
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <FileText className="h-4 w-4 text-dark-500" />
                            <span className="text-dark-200 font-medium">
                              {policy.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          {policyStatusBadge(policy.status)}
                        </td>
                        <td className="px-4 py-3.5 text-dark-400 text-xs">
                          {policy.status === "active" &&
                            policy.reviewDate &&
                            `Reviewed ${policy.reviewDate}`}
                          {policy.status === "needs-review" &&
                            policy.dueDate &&
                            `Review due ${policy.dueDate}`}
                          {policy.status === "in-progress" &&
                            "Currently being updated"}
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <button className="text-xs text-primary-400 hover:text-primary-300 transition-colors font-medium">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

