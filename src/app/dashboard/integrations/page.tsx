"use client";
import { useState } from "react";
import { Search, ExternalLink } from "lucide-react";

const integrations = [
  { name: "Slack", desc: "Real-time security alerts and notifications", connected: true, category: "Communication" },
  { name: "PagerDuty", desc: "Incident escalation and on-call management", connected: true, category: "Incidents" },
  { name: "Jira", desc: "Security issue tracking and remediation workflow", connected: true, category: "Project Mgmt" },
  { name: "AWS CloudTrail", desc: "Cloud infrastructure audit logging", connected: true, category: "Cloud" },
  { name: "GitHub", desc: "Code security scanning and PR checks", connected: false, category: "DevOps" },
  { name: "Splunk", desc: "SIEM log aggregation and analysis", connected: false, category: "Analytics" },
  { name: "Datadog", desc: "Infrastructure monitoring and APM", connected: false, category: "Monitoring" },
  { name: "Azure Sentinel", desc: "Cloud-native SIEM and SOAR", connected: true, category: "Cloud" },
  { name: "Google Cloud SCC", desc: "Security Command Center integration", connected: false, category: "Cloud" },
  { name: "Terraform", desc: "Infrastructure as code security scanning", connected: true, category: "DevOps" },
  { name: "Jenkins", desc: "CI/CD pipeline security gates", connected: false, category: "DevOps" },
  { name: "Kubernetes", desc: "Container orchestration security monitoring", connected: true, category: "Infrastructure" },
];

const colors: Record<string, string> = {
  S: "bg-purple-500", P: "bg-green-500", J: "bg-blue-500", A: "bg-orange-500",
  G: "bg-gray-500", D: "bg-cyan-500", T: "bg-indigo-500", K: "bg-blue-600",
};

export default function IntegrationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(integrations.map((i) => i.category))];
  const filtered = integrations.filter(
    (i) => (filter === "All" || i.category === filter) && i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Integrations</h1>
        <p className="text-dark-400 mt-1">Connect your security tools and services</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search integrations..."
            className="w-full pl-11 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === c ? "bg-primary-500 text-white" : "bg-dark-800 text-dark-400 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((integration) => (
          <div key={integration.name} className="glass-card rounded-xl p-6 hover:border-dark-600 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl ${colors[integration.name[0]] || "bg-dark-600"} flex items-center justify-center text-white font-bold text-lg`}>
                  {integration.name[0]}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{integration.name}</h3>
                  <span className="text-xs text-dark-500">{integration.category}</span>
                </div>
              </div>
              {integration.connected && (
                <span className="flex items-center gap-1 text-xs text-success-400 bg-success-500/10 px-2 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-success-400" /> Connected
                </span>
              )}
            </div>
            <p className="text-dark-400 text-sm mb-4">{integration.desc}</p>
            <button className={`w-full py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              integration.connected
                ? "border border-dark-600 text-dark-300 hover:bg-dark-800 hover:text-white"
                : "bg-primary-500 text-white hover:bg-primary-600"
            }`}>
              {integration.connected ? (
                <>Configure <ExternalLink className="w-3.5 h-3.5" /></>
              ) : (
                "Connect"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
