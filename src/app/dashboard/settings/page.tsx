"use client";
import { useState } from "react";
import { Save, Bell, CreditCard, Shield, Settings } from "lucide-react";

const tabs = [
  { id: "general", label: "General", icon: Settings },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-dark-400 mt-1">Manage your platform configuration</p>
      </div>

      <div className="flex gap-2 border-b border-dark-700 pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-primary-500 text-primary-400"
                : "border-transparent text-dark-400 hover:text-dark-200"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "general" && (
        <div className="glass-card rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Organization Name</label>
              <input type="text" defaultValue="Acme Security Inc." className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Timezone</label>
              <select className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors">
                <option>UTC (GMT+0)</option>
                <option>EST (GMT-5)</option>
                <option>PST (GMT-8)</option>
                <option>CET (GMT+1)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Language</label>
              <select className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Date Format</label>
              <select className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      )}

      {activeTab === "security" && (
        <div className="glass-card rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white">Security Settings</h2>
          {[
            { title: "Two-Factor Authentication", desc: "Add an extra layer of security to your account", enabled: true },
            { title: "Session Timeout", desc: "Automatically log out after inactivity (30 min)", enabled: true },
            { title: "IP Whitelist", desc: "Restrict access to specific IP addresses", enabled: false },
            { title: "Login Notifications", desc: "Get notified of new login attempts", enabled: true },
            { title: "Enforce Strong Passwords", desc: "Require passwords with 12+ chars, mixed case, numbers", enabled: true },
          ].map((setting) => (
            <div key={setting.title} className="flex items-center justify-between py-4 border-b border-dark-700 last:border-0">
              <div>
                <h3 className="text-white font-medium">{setting.title}</h3>
                <p className="text-sm text-dark-400 mt-0.5">{setting.desc}</p>
              </div>
              <button className={`relative w-12 h-6 rounded-full transition-colors ${setting.enabled ? "bg-primary-500" : "bg-dark-600"}`}>
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${setting.enabled ? "left-6" : "left-0.5"}`} />
              </button>
            </div>
          ))}
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="glass-card rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white">Notification Preferences</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-dark-400 text-sm">
                  <th className="pb-4 font-medium">Event</th>
                  <th className="pb-4 font-medium text-center">Email</th>
                  <th className="pb-4 font-medium text-center">Slack</th>
                  <th className="pb-4 font-medium text-center">Webhook</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { event: "Critical Threats", email: true, slack: true, webhook: true },
                  { event: "High Severity Alerts", email: true, slack: true, webhook: false },
                  { event: "Compliance Failures", email: true, slack: false, webhook: true },
                  { event: "Scan Completions", email: false, slack: true, webhook: false },
                  { event: "Team Changes", email: true, slack: false, webhook: false },
                  { event: "Weekly Reports", email: true, slack: false, webhook: false },
                ].map((row) => (
                  <tr key={row.event} className="border-t border-dark-700">
                    <td className="py-4 text-white">{row.event}</td>
                    {[row.email, row.slack, row.webhook].map((enabled, i) => (
                      <td key={i} className="py-4 text-center">
                        <input type="checkbox" defaultChecked={enabled} className="w-4 h-4 rounded border-dark-600 bg-dark-800 text-primary-500 focus:ring-primary-500" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
            <Save className="w-4 h-4" /> Save Preferences
          </button>
        </div>
      )}

      {activeTab === "billing" && (
        <div className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-white">Current Plan</h2>
                <p className="text-dark-400 text-sm">Professional Plan</p>
              </div>
              <span className="text-3xl font-bold text-white">$149<span className="text-sm text-dark-400 font-normal">/mo</span></span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[
                { label: "API Calls", used: "847K", total: "1M", pct: 85 },
                { label: "Scans", used: "18", total: "25", pct: 72 },
                { label: "Storage", used: "3.2 GB", total: "10 GB", pct: 32 },
              ].map((meter) => (
                <div key={meter.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-dark-400">{meter.label}</span>
                    <span className="text-white">{meter.used}/{meter.total}</span>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <div className={`h-2 rounded-full ${meter.pct > 80 ? "bg-warning-500" : "bg-primary-500"}`} style={{ width: `${meter.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 px-4 py-2 border border-primary-500 text-primary-400 rounded-lg hover:bg-primary-500/10 transition-colors text-sm font-medium">
              Upgrade Plan
            </button>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Billing History</h2>
            <table className="w-full">
              <thead><tr className="text-left text-dark-400 text-sm"><th className="pb-3">Date</th><th className="pb-3">Description</th><th className="pb-3">Amount</th><th className="pb-3">Status</th></tr></thead>
              <tbody>
                {[
                  { date: "Mar 1, 2026", desc: "Professional Plan", amount: "$149.00", status: "Paid" },
                  { date: "Feb 1, 2026", desc: "Professional Plan", amount: "$149.00", status: "Paid" },
                  { date: "Jan 1, 2026", desc: "Professional Plan", amount: "$149.00", status: "Paid" },
                  { date: "Dec 1, 2025", desc: "Professional Plan", amount: "$149.00", status: "Paid" },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-dark-700">
                    <td className="py-3 text-white text-sm">{row.date}</td>
                    <td className="py-3 text-dark-300 text-sm">{row.desc}</td>
                    <td className="py-3 text-white text-sm">{row.amount}</td>
                    <td className="py-3"><span className="text-xs px-2 py-1 bg-success-500/10 text-success-400 rounded-full">{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
