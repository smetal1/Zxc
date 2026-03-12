"use client";
import { useState } from "react";
import { UserPlus, MoreVertical, Shield, Eye, Edit3 } from "lucide-react";

const members = [
  { name: "Sarah Chen", email: "sarah@acme.com", role: "Admin", status: "Active", lastActive: "2 min ago", color: "bg-primary-500" },
  { name: "Mike Ross", email: "mike@acme.com", role: "Analyst", status: "Active", lastActive: "15 min ago", color: "bg-accent-500" },
  { name: "Emily Zhang", email: "emily@acme.com", role: "Analyst", status: "Active", lastActive: "1 hour ago", color: "bg-success-500" },
  { name: "James Wilson", email: "james@acme.com", role: "Viewer", status: "Active", lastActive: "3 hours ago", color: "bg-warning-500" },
  { name: "Alex Kumar", email: "alex@acme.com", role: "Analyst", status: "Invited", lastActive: "—", color: "bg-danger-500" },
  { name: "Lisa Park", email: "lisa@acme.com", role: "Viewer", status: "Invited", lastActive: "—", color: "bg-primary-400" },
];

const permissions = [
  { feature: "View Dashboard", admin: true, analyst: true, viewer: true },
  { feature: "Manage Threats", admin: true, analyst: true, viewer: false },
  { feature: "Run Scans", admin: true, analyst: true, viewer: false },
  { feature: "Manage Incidents", admin: true, analyst: true, viewer: false },
  { feature: "View Reports", admin: true, analyst: true, viewer: true },
  { feature: "Manage Team", admin: true, analyst: false, viewer: false },
  { feature: "Billing & Settings", admin: true, analyst: false, viewer: false },
  { feature: "API Access", admin: true, analyst: true, viewer: false },
];

export default function TeamPage() {
  const [showInvite, setShowInvite] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Team Management</h1>
          <p className="text-dark-400 mt-1">{members.length} members</p>
        </div>
        <button onClick={() => setShowInvite(!showInvite)} className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
          <UserPlus className="w-4 h-4" /> Invite Member
        </button>
      </div>

      {showInvite && (
        <div className="glass-card rounded-xl p-6 animate-fade-in-up">
          <h3 className="text-white font-semibold mb-4">Invite New Member</h3>
          <div className="flex gap-3">
            <input type="email" placeholder="Email address" className="flex-1 px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500" />
            <select className="px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500">
              <option>Viewer</option>
              <option>Analyst</option>
              <option>Admin</option>
            </select>
            <button className="px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">Send Invite</button>
          </div>
        </div>
      )}

      <div className="glass-card rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-dark-400 text-sm border-b border-dark-700">
              <th className="px-6 py-4 font-medium">Member</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Last Active</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.email} className="border-t border-dark-700/50 hover:bg-dark-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${m.color} flex items-center justify-center text-white font-semibold text-sm`}>
                      {m.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-white font-medium">{m.name}</p>
                      <p className="text-dark-400 text-sm">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    m.role === "Admin" ? "bg-accent-500/10 text-accent-400" :
                    m.role === "Analyst" ? "bg-primary-500/10 text-primary-400" :
                    "bg-dark-600/50 text-dark-300"
                  }`}>{m.role}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 text-sm ${m.status === "Active" ? "text-success-400" : "text-warning-400"}`}>
                    <span className={`w-2 h-2 rounded-full ${m.status === "Active" ? "bg-success-400" : "bg-warning-400"}`} />
                    {m.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-dark-400 text-sm">{m.lastActive}</td>
                <td className="px-6 py-4">
                  <button className="p-1.5 hover:bg-dark-700 rounded-lg transition-colors text-dark-400 hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Role Permissions</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-dark-400 text-sm">
              <th className="pb-3 font-medium">Feature</th>
              <th className="pb-3 font-medium text-center"><span className="flex items-center justify-center gap-1"><Shield className="w-3.5 h-3.5" /> Admin</span></th>
              <th className="pb-3 font-medium text-center"><span className="flex items-center justify-center gap-1"><Edit3 className="w-3.5 h-3.5" /> Analyst</span></th>
              <th className="pb-3 font-medium text-center"><span className="flex items-center justify-center gap-1"><Eye className="w-3.5 h-3.5" /> Viewer</span></th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((p) => (
              <tr key={p.feature} className="border-t border-dark-700">
                <td className="py-3 text-white text-sm">{p.feature}</td>
                {[p.admin, p.analyst, p.viewer].map((has, i) => (
                  <td key={i} className="py-3 text-center">
                    <span className={`text-sm ${has ? "text-success-400" : "text-dark-600"}`}>{has ? "✓" : "—"}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { user: "Sarah Chen", action: "updated security settings", time: "5 min ago" },
            { user: "Mike Ross", action: "resolved incident INC-008", time: "4 hours ago" },
            { user: "Emily Zhang", action: "ran vulnerability scan", time: "6 hours ago" },
            { user: "Sarah Chen", action: "invited Alex Kumar to the team", time: "1 day ago" },
            { user: "James Wilson", action: "exported compliance report", time: "2 days ago" },
          ].map((a, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-dark-700/50 last:border-0">
              <p className="text-sm"><span className="text-white font-medium">{a.user}</span> <span className="text-dark-400">{a.action}</span></p>
              <span className="text-xs text-dark-500">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
