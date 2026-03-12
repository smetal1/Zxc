"use client";

import { useState } from "react";
import {
  Search,
  Plug,
  Settings,
  CheckCircle2,
  Circle,
  Filter,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  category: "Communication" | "Monitoring" | "Cloud" | "DevOps";
  connected: boolean;
  letter: string;
  letterBg: string;
}

const integrations: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    description: "Send real-time security alerts and incident notifications to your Slack channels.",
    category: "Communication",
    connected: true,
    letter: "S",
    letterBg: "from-[#4A154B] to-[#611f69]",
  },
  {
    id: "pagerduty",
    name: "PagerDuty",
    description: "Trigger PagerDuty incidents for critical security events and automate escalation.",
    category: "Communication",
    connected: true,
    letter: "P",
    letterBg: "from-[#06AC38] to-[#058B2E]",
  },
  {
    id: "jira",
    name: "Jira",
    description: "Automatically create and sync security tickets with your Jira projects.",
    category: "Communication",
    connected: true,
    letter: "J",
    letterBg: "from-[#0052CC] to-[#0747A6]",
  },
  {
    id: "aws-cloudtrail",
    name: "AWS CloudTrail",
    description: "Ingest CloudTrail logs for threat detection and compliance monitoring.",
    category: "Cloud",
    connected: true,
    letter: "A",
    letterBg: "from-[#FF9900] to-[#E88B00]",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Scan repositories for vulnerabilities, secrets, and misconfigurations.",
    category: "DevOps",
    connected: false,
    letter: "G",
    letterBg: "from-[#333333] to-[#1a1a1a]",
  },
  {
    id: "splunk",
    name: "Splunk",
    description: "Forward security events and correlate data with your Splunk SIEM deployment.",
    category: "Monitoring",
    connected: false,
    letter: "S",
    letterBg: "from-[#65A637] to-[#4D8C2A]",
  },
  {
    id: "datadog",
    name: "Datadog",
    description: "Stream security metrics and create unified dashboards in Datadog.",
    category: "Monitoring",
    connected: false,
    letter: "D",
    letterBg: "from-[#632CA6] to-[#4F2287]",
  },
  {
    id: "azure-sentinel",
    name: "Azure Sentinel",
    description: "Bi-directional integration with Microsoft Sentinel for threat intelligence sharing.",
    category: "Cloud",
    connected: true,
    letter: "A",
    letterBg: "from-[#0078D4] to-[#005A9E]",
  },
  {
    id: "google-cloud-scc",
    name: "Google Cloud SCC",
    description: "Import findings from Google Cloud Security Command Center for unified visibility.",
    category: "Cloud",
    connected: false,
    letter: "G",
    letterBg: "from-[#4285F4] to-[#356AC3]",
  },
  {
    id: "terraform",
    name: "Terraform",
    description: "Scan Terraform plans and state files for infrastructure security misconfigurations.",
    category: "DevOps",
    connected: true,
    letter: "T",
    letterBg: "from-[#7B42BC] to-[#5C2D91]",
  },
  {
    id: "jenkins",
    name: "Jenkins",
    description: "Integrate security scanning into your Jenkins CI/CD pipelines.",
    category: "DevOps",
    connected: false,
    letter: "J",
    letterBg: "from-[#D33833] to-[#B52E2A]",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    description: "Monitor Kubernetes clusters for runtime threats and policy violations.",
    category: "DevOps",
    connected: true,
    letter: "K",
    letterBg: "from-[#326CE5] to-[#2756B8]",
  },
];

const categories = ["All", "Communication", "Monitoring", "Cloud", "DevOps"];

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"All" | "Connected" | "Not Connected">("All");

  const filtered = integrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || integration.category === selectedCategory;
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Connected" && integration.connected) ||
      (statusFilter === "Not Connected" && !integration.connected);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const connectedCount = integrations.filter((i) => i.connected).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-100">Integrations</h1>
          <p className="text-dark-400 mt-1">
            Connect your security stack for unified visibility and automated response
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 px-3 py-1.5 bg-success-500/10 text-success-400 text-sm font-medium rounded-lg border border-success-500/20">
            <CheckCircle2 className="w-4 h-4" />
            {connectedCount} Connected
          </span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search integrations..."
            className="w-full bg-dark-800/70 border border-dark-700/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-dark-200 placeholder:text-dark-500 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 focus:outline-none transition-all"
          />
        </div>

        <div className="flex gap-1 p-1 bg-dark-800/50 rounded-lg border border-dark-700/50">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-primary-500/15 text-primary-400"
                  : "text-dark-400 hover:text-dark-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "All" | "Connected" | "Not Connected")}
          className="bg-dark-800/70 border border-dark-700/50 rounded-lg px-3 py-2.5 text-sm text-dark-200 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 focus:outline-none transition-all appearance-none cursor-pointer"
        >
          <option value="All">All Status</option>
          <option value="Connected">Connected</option>
          <option value="Not Connected">Not Connected</option>
        </select>
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((integration) => (
          <div
            key={integration.id}
            className={`glass-card rounded-xl p-5 hover:border-dark-600/50 transition-all duration-200 group ${
              integration.connected ? "glow-border" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${integration.letterBg} flex items-center justify-center text-white text-lg font-bold shadow-lg shrink-0`}
                >
                  {integration.letter}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-dark-100">{integration.name}</h3>
                  <span className="text-xs text-dark-500">{integration.category}</span>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full shrink-0 ${
                  integration.connected
                    ? "bg-success-500/10 text-success-400 border border-success-500/20"
                    : "bg-dark-700/50 text-dark-500 border border-dark-600/30"
                }`}
              >
                {integration.connected ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <Circle className="w-3 h-3" />
                )}
                {integration.connected ? "Connected" : "Not Connected"}
              </span>
            </div>

            <p className="text-sm text-dark-400 mb-5 leading-relaxed line-clamp-2">
              {integration.description}
            </p>

            <button
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                integration.connected
                  ? "bg-dark-700/50 hover:bg-dark-700 text-dark-200 border border-dark-600/50"
                  : "bg-primary-500/15 hover:bg-primary-500/25 text-primary-400 border border-primary-500/20"
              }`}
            >
              {integration.connected ? (
                <>
                  <Settings className="w-4 h-4" />
                  Configure
                </>
              ) : (
                <>
                  <Plug className="w-4 h-4" />
                  Connect
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Filter className="w-12 h-12 text-dark-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-dark-300 mb-2">No integrations found</h3>
          <p className="text-sm text-dark-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
