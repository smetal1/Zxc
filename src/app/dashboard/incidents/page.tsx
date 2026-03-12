"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Clock,
  Plus,
  Filter,
  Users,
  Zap,
  Play,
  CheckCircle2,
  Circle,
  ArrowUpRight,
  BookOpen,
  Bot,
  Timer,
  TrendingUp,
  ChevronRight,
  AlertCircle,
  Search,
  X,
  Activity,
  Target,
  Eye,
  Lock,
  RefreshCw,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";

// --- Types ---

type Severity = "All" | "Critical" | "High" | "Medium" | "Low";
type Status = "All" | "Open" | "In Progress" | "Resolved";
type KanbanColumn = "New" | "Investigating" | "Mitigating" | "Resolved";

interface Incident {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  column: KanbanColumn;
  time: string;
  assignee?: string;
  detail?: string;
}

interface TimelineStep {
  label: string;
  time: string;
  status: "completed" | "active" | "pending";
  description: string;
}

interface Playbook {
  name: string;
  triggerCount: number;
  lastTriggered: string;
  successRate: number;
  icon: React.ReactNode;
}

// --- Data ---

const incidents: Incident[] = [
  {
    id: "INC-001",
    title: "Unauthorized access attempt on production DB",
    severity: "Critical",
    column: "New",
    time: "15 min ago",
  },
  {
    id: "INC-002",
    title: "Suspicious outbound traffic detected",
    severity: "High",
    column: "New",
    time: "1h ago",
  },
  {
    id: "INC-003",
    title: "Failed authentication spike",
    severity: "Medium",
    column: "New",
    time: "2h ago",
  },
  {
    id: "INC-004",
    title: "Malware signature found in container",
    severity: "Critical",
    column: "Investigating",
    time: "3h ago",
    assignee: "Sarah Chen",
  },
  {
    id: "INC-005",
    title: "Data exfiltration attempt blocked",
    severity: "High",
    column: "Investigating",
    time: "4h ago",
    assignee: "Mike Ross",
  },
  {
    id: "INC-006",
    title: "DDoS attack on API gateway",
    severity: "High",
    column: "Mitigating",
    time: "5h ago",
    detail: "60% mitigated",
  },
  {
    id: "INC-007",
    title: "Compromised service account",
    severity: "Medium",
    column: "Mitigating",
    time: "6h ago",
    detail: "Credentials rotated",
  },
  {
    id: "INC-008",
    title: "Phishing campaign targeting employees",
    severity: "Medium",
    column: "Resolved",
    time: "Resolved 4h ago",
  },
  {
    id: "INC-009",
    title: "SSL certificate expiration",
    severity: "Low",
    column: "Resolved",
    time: "Resolved 1d ago",
  },
  {
    id: "INC-010",
    title: "Brute force attack blocked",
    severity: "High",
    column: "Resolved",
    time: "Resolved 2d ago",
  },
];

const timelineSteps: TimelineStep[] = [
  {
    label: "Detection",
    time: "14:23:01",
    status: "completed",
    description: "Anomalous database query pattern detected by AI engine",
  },
  {
    label: "Triage",
    time: "14:23:45",
    status: "completed",
    description: "Auto-classified as Critical severity, P1 priority assigned",
  },
  {
    label: "Investigation",
    time: "14:25:12",
    status: "completed",
    description: "Source IP traced to compromised VPN endpoint. Lateral movement confirmed.",
  },
  {
    label: "Containment",
    time: "14:31:00",
    status: "active",
    description: "Network segment isolated. Affected services quarantined.",
  },
  {
    label: "Eradication",
    time: "--:--:--",
    status: "pending",
    description: "Remove threat artifacts, patch vulnerabilities",
  },
  {
    label: "Recovery",
    time: "--:--:--",
    status: "pending",
    description: "Restore services, validate integrity",
  },
  {
    label: "Lessons Learned",
    time: "--:--:--",
    status: "pending",
    description: "Post-incident review and documentation",
  },
];

const playbooks: Playbook[] = [
  {
    name: "DDoS Mitigation",
    triggerCount: 12,
    lastTriggered: "2h ago",
    successRate: 94,
    icon: <Shield className="w-5 h-5" />,
  },
  {
    name: "Account Lockout",
    triggerCount: 45,
    lastTriggered: "30m ago",
    successRate: 99,
    icon: <Lock className="w-5 h-5" />,
  },
  {
    name: "Malware Quarantine",
    triggerCount: 8,
    lastTriggered: "5h ago",
    successRate: 87,
    icon: <ShieldAlert className="w-5 h-5" />,
  },
  {
    name: "Data Loss Prevention",
    triggerCount: 3,
    lastTriggered: "1d ago",
    successRate: 100,
    icon: <Eye className="w-5 h-5" />,
  },
];

const incidentsByCategory = [
  { category: "Unauthorized Access", count: 18, avgResolution: 2.1 },
  { category: "Malware", count: 12, avgResolution: 3.4 },
  { category: "DDoS", count: 9, avgResolution: 1.8 },
  { category: "Data Exfiltration", count: 7, avgResolution: 4.2 },
  { category: "Phishing", count: 15, avgResolution: 1.5 },
  { category: "Brute Force", count: 22, avgResolution: 0.8 },
];

const resolutionTrend = [
  { month: "Sep", mttr: 4.2, incidents: 28 },
  { month: "Oct", mttr: 3.8, incidents: 34 },
  { month: "Nov", mttr: 3.1, incidents: 31 },
  { month: "Dec", mttr: 2.9, incidents: 26 },
  { month: "Jan", mttr: 2.6, incidents: 22 },
  { month: "Feb", mttr: 2.4, incidents: 19 },
];

// --- Helpers ---

const severityColor = (severity: string) => {
  switch (severity) {
    case "Critical":
      return "text-danger-500";
    case "High":
      return "text-warning-500";
    case "Medium":
      return "text-primary-500";
    case "Low":
      return "text-dark-400";
    default:
      return "text-dark-400";
  }
};

const severityBg = (severity: string) => {
  switch (severity) {
    case "Critical":
      return "bg-danger-500/15 text-danger-400 border-danger-500/30";
    case "High":
      return "bg-warning-500/15 text-warning-400 border-warning-500/30";
    case "Medium":
      return "bg-primary-500/15 text-primary-400 border-primary-500/30";
    case "Low":
      return "bg-dark-600/40 text-dark-300 border-dark-500/30";
    default:
      return "bg-dark-600/40 text-dark-300 border-dark-500/30";
  }
};

const columnConfig: Record<
  KanbanColumn,
  { color: string; icon: React.ReactNode; dotColor: string }
> = {
  New: {
    color: "text-danger-400",
    icon: <AlertCircle className="w-4 h-4" />,
    dotColor: "bg-danger-500",
  },
  Investigating: {
    color: "text-warning-400",
    icon: <Search className="w-4 h-4" />,
    dotColor: "bg-warning-500",
  },
  Mitigating: {
    color: "text-primary-400",
    icon: <RefreshCw className="w-4 h-4" />,
    dotColor: "bg-primary-500",
  },
  Resolved: {
    color: "text-success-400",
    icon: <CheckCircle2 className="w-4 h-4" />,
    dotColor: "bg-success-500",
  },
};

// --- Custom Tooltip ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-lg p-3 border border-dark-700/50 shadow-xl">
      <p className="text-dark-200 text-sm font-medium mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
          {entry.name === "Avg Resolution" || entry.name === "MTTR" ? "h" : ""}
        </p>
      ))}
    </div>
  );
};

// --- Page Component ---

export default function IncidentsPage() {
  const [severityFilter, setSeverityFilter] = useState<Severity>("All");
  const [statusFilter, setStatusFilter] = useState<Status>("All");
  const [selectedIncident, setSelectedIncident] = useState<string>("INC-001");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const severities: Severity[] = ["All", "Critical", "High", "Medium", "Low"];
  const statuses: Status[] = ["All", "Open", "In Progress", "Resolved"];

  const statusToColumns: Record<Status, KanbanColumn[]> = {
    All: ["New", "Investigating", "Mitigating", "Resolved"],
    Open: ["New"],
    "In Progress": ["Investigating", "Mitigating"],
    Resolved: ["Resolved"],
  };

  const filteredIncidents = incidents.filter((inc) => {
    const severityMatch =
      severityFilter === "All" || inc.severity === severityFilter;
    const statusMatch =
      statusFilter === "All" ||
      statusToColumns[statusFilter].includes(inc.column);
    return severityMatch && statusMatch;
  });

  const kanbanColumns: KanbanColumn[] = [
    "New",
    "Investigating",
    "Mitigating",
    "Resolved",
  ];

  const selectedInc = incidents.find((i) => i.id === selectedIncident);

  return (
    <div className="min-h-screen bg-dark-950 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Incident Response Center
          </h1>
          <p className="text-dark-400 mt-1">
            Real-time incident tracking, response orchestration & threat
            mitigation
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create Incident
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Severity Tabs */}
        <div className="flex items-center gap-1 glass-card rounded-lg p-1">
          {severities.map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                severityFilter === sev
                  ? "bg-primary-500/20 text-primary-400"
                  : "text-dark-400 hover:text-dark-200 hover:bg-dark-800/50"
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 glass-card rounded-lg p-1">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                statusFilter === st
                  ? "bg-accent-500/20 text-accent-400"
                  : "text-dark-400 hover:text-dark-200 hover:bg-dark-800/50"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Active Incident Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Open Incidents",
            value: "7",
            icon: <AlertTriangle className="w-5 h-5 text-danger-400" />,
            accent: "border-danger-500/30",
            change: "+2 today",
            changeColor: "text-danger-400",
          },
          {
            label: "In Progress",
            value: "4",
            icon: <Activity className="w-5 h-5 text-warning-400" />,
            accent: "border-warning-500/30",
            change: "2 assigned",
            changeColor: "text-warning-400",
          },
          {
            label: "MTTR",
            value: "2.4h",
            icon: <Timer className="w-5 h-5 text-success-400" />,
            accent: "border-success-500/30",
            change: "-18% vs last month",
            changeColor: "text-success-400",
          },
          {
            label: "Escalated",
            value: "2",
            icon: <ArrowUpRight className="w-5 h-5 text-accent-400" />,
            accent: "border-accent-500/30",
            change: "1 pending review",
            changeColor: "text-accent-400",
          },
        ].map((card, i) => (
          <div
            key={card.label}
            className={`glass-card glow-border rounded-xl p-5 border-l-2 ${card.accent} animate-slide-in`}
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-dark-400 text-sm font-medium">
                {card.label}
              </span>
              <div className="p-2 rounded-lg bg-dark-800/60">{card.icon}</div>
            </div>
            <p className="text-3xl font-bold text-white">{card.value}</p>
            <p className={`text-xs mt-1 ${card.changeColor}`}>
              {card.change}
            </p>
          </div>
        ))}
      </div>

      {/* Incident Board (Kanban) */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary-400" />
          Incident Board
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {kanbanColumns.map((col) => {
            const config = columnConfig[col];
            const colIncidents = filteredIncidents.filter(
              (inc) => inc.column === col
            );
            return (
              <div key={col} className="glass-card rounded-xl p-4 flex flex-col">
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${config.dotColor}`}
                    />
                    <span className={`text-sm font-semibold ${config.color}`}>
                      {col}
                    </span>
                  </div>
                  <span className="text-xs text-dark-500 bg-dark-800/60 px-2 py-0.5 rounded-full">
                    {colIncidents.length}
                  </span>
                </div>

                {/* Incident Cards */}
                <div className="space-y-3 flex-1">
                  {colIncidents.length === 0 ? (
                    <div className="text-dark-600 text-xs text-center py-6">
                      No incidents
                    </div>
                  ) : (
                    colIncidents.map((inc) => (
                      <button
                        key={inc.id}
                        onClick={() => setSelectedIncident(inc.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                          col === "Resolved"
                            ? "bg-dark-900/40 border-dark-700/30 opacity-60 hover:opacity-80"
                            : "bg-dark-900/60 border-dark-700/40 hover:border-dark-600/60"
                        } ${
                          selectedIncident === inc.id
                            ? "ring-1 ring-primary-500/50 border-primary-500/30 opacity-100"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-dark-500 font-mono">
                            {inc.id}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${severityBg(
                              inc.severity
                            )}`}
                          >
                            {inc.severity}
                          </span>
                        </div>
                        <p className="text-sm text-dark-200 font-medium leading-snug">
                          {inc.title}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[11px] text-dark-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {inc.time}
                          </span>
                          {inc.assignee && (
                            <span className="text-[11px] text-accent-400 flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {inc.assignee}
                            </span>
                          )}
                          {inc.detail && (
                            <span className="text-[11px] text-primary-400">
                              {inc.detail}
                            </span>
                          )}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Incident Timeline & Playbook Automation */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Incident Timeline */}
        <div className="xl:col-span-2 glass-card glow-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-400" />
                Incident Timeline
              </h2>
              {selectedInc && (
                <p className="text-xs text-dark-400 mt-1">
                  <span className="text-primary-400 font-mono">
                    {selectedInc.id}
                  </span>{" "}
                  — {selectedInc.title}
                </p>
              )}
            </div>
            {selectedInc && (
              <span
                className={`text-xs px-2 py-1 rounded border font-medium ${severityBg(
                  selectedInc.severity
                )}`}
              >
                {selectedInc.severity}
              </span>
            )}
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-dark-700" />

            <div className="space-y-1">
              {timelineSteps.map((step, i) => (
                <div
                  key={step.label}
                  className="relative flex items-start gap-4 py-3"
                >
                  {/* Status dot */}
                  <div className="relative z-10 flex-shrink-0">
                    {step.status === "completed" ? (
                      <div className="w-[30px] h-[30px] rounded-full bg-success-500/20 border border-success-500/40 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-success-400" />
                      </div>
                    ) : step.status === "active" ? (
                      <div className="w-[30px] h-[30px] rounded-full bg-primary-500/20 border border-primary-500/50 flex items-center justify-center animate-pulse-glow">
                        <Circle className="w-4 h-4 text-primary-400 fill-primary-400" />
                      </div>
                    ) : (
                      <div className="w-[30px] h-[30px] rounded-full bg-dark-800 border border-dark-600 flex items-center justify-center">
                        <Circle className="w-3.5 h-3.5 text-dark-500" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-0.5">
                      <span
                        className={`text-sm font-semibold ${
                          step.status === "completed"
                            ? "text-success-400"
                            : step.status === "active"
                            ? "text-primary-400"
                            : "text-dark-500"
                        }`}
                      >
                        {step.label}
                      </span>
                      <span className="text-[11px] text-dark-500 font-mono">
                        {step.time}
                      </span>
                      {step.status === "active" && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-500/15 text-primary-400 border border-primary-500/30 font-medium">
                          IN PROGRESS
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-xs leading-relaxed ${
                        step.status === "pending"
                          ? "text-dark-600"
                          : "text-dark-400"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Playbook Automation */}
        <div className="glass-card glow-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-5">
            <Bot className="w-5 h-5 text-accent-400" />
            Playbook Automation
          </h2>
          <div className="space-y-4">
            {playbooks.map((pb) => (
              <div
                key={pb.name}
                className="p-4 rounded-lg bg-dark-900/60 border border-dark-700/40 hover:border-dark-600/50 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-accent-500/10 text-accent-400">
                    {pb.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-dark-200">
                      {pb.name}
                    </p>
                    <p className="text-[11px] text-dark-500">
                      Last triggered {pb.lastTriggered}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-dark-400">
                    <span className="text-accent-400 font-semibold">
                      {pb.triggerCount}
                    </span>{" "}
                    auto-triggers
                  </span>
                  <span className="text-dark-400">
                    Success:{" "}
                    <span
                      className={`font-semibold ${
                        pb.successRate >= 95
                          ? "text-success-400"
                          : pb.successRate >= 85
                          ? "text-warning-400"
                          : "text-danger-400"
                      }`}
                    >
                      {pb.successRate}%
                    </span>
                  </span>
                </div>
                {/* Progress bar */}
                <div className="mt-2 h-1.5 bg-dark-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      pb.successRate >= 95
                        ? "bg-success-500"
                        : pb.successRate >= 85
                        ? "bg-warning-500"
                        : "bg-danger-500"
                    }`}
                    style={{ width: `${pb.successRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Response Metrics */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Incidents by Category */}
        <div className="glass-card glow-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5 text-primary-400" />
            Incidents by Category
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={incidentsByCategory}
                margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="category"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={{ stroke: "#334155" }}
                  tickLine={false}
                  angle={-20}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={{ stroke: "#334155" }}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }}
                />
                <Bar
                  dataKey="count"
                  name="Incidents"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="avgResolution"
                  name="Avg Resolution"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resolution Time Trends */}
        <div className="glass-card glow-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-5">
            <Timer className="w-5 h-5 text-success-400" />
            Resolution Time Trends
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={resolutionTrend}
                margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={{ stroke: "#334155" }}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={{ stroke: "#334155" }}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={{ stroke: "#334155" }}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="mttr"
                  name="MTTR"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: "#22c55e", r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="incidents"
                  name="Incidents"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  activeDot={{ r: 6 }}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Create Incident Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          />

          {/* Modal */}
          <div className="relative glass-card glow-border rounded-2xl p-6 w-full max-w-lg animate-slide-in border border-dark-700/50 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">
                Create New Incident
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-lg hover:bg-dark-800 text-dark-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-dark-300 mb-1.5">
                  Incident Title
                </label>
                <input
                  type="text"
                  placeholder="Describe the incident..."
                  className="w-full px-3 py-2.5 bg-dark-900/80 border border-dark-700/50 rounded-lg text-dark-200 text-sm placeholder:text-dark-600 focus:outline-none focus:ring-1 focus:ring-primary-500/50 focus:border-primary-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-dark-300 mb-1.5">
                    Severity
                  </label>
                  <select className="w-full px-3 py-2.5 bg-dark-900/80 border border-dark-700/50 rounded-lg text-dark-200 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500/50 appearance-none cursor-pointer">
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1.5">
                    Assign To
                  </label>
                  <select className="w-full px-3 py-2.5 bg-dark-900/80 border border-dark-700/50 rounded-lg text-dark-200 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500/50 appearance-none cursor-pointer">
                    <option>Unassigned</option>
                    <option>Sarah Chen</option>
                    <option>Mike Ross</option>
                    <option>Alex Kim</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-dark-300 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide details about the incident..."
                  className="w-full px-3 py-2.5 bg-dark-900/80 border border-dark-700/50 rounded-lg text-dark-200 text-sm placeholder:text-dark-600 focus:outline-none focus:ring-1 focus:ring-primary-500/50 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2.5 bg-dark-800 hover:bg-dark-700 text-dark-300 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-primary-500/20 cursor-pointer"
                >
                  Create Incident
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
