"use client";

import { useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Shield,
  Eye,
  BarChart3,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronDown,
  X,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Analyst" | "Viewer";
  status: "Active" | "Invited";
  lastActive: string;
  avatarColor: string;
}

const initialMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@aegis.ai",
    role: "Admin",
    status: "Active",
    lastActive: "Just now",
    avatarColor: "from-primary-500 to-accent-500",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus.j@aegis.ai",
    role: "Analyst",
    status: "Active",
    lastActive: "5 min ago",
    avatarColor: "from-success-500 to-primary-500",
  },
  {
    id: "3",
    name: "Aisha Patel",
    email: "aisha.p@aegis.ai",
    role: "Analyst",
    status: "Active",
    lastActive: "1 hour ago",
    avatarColor: "from-accent-500 to-danger-500",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.w@aegis.ai",
    role: "Viewer",
    status: "Active",
    lastActive: "3 hours ago",
    avatarColor: "from-warning-500 to-danger-500",
  },
  {
    id: "5",
    name: "Elena Rodriguez",
    email: "elena.r@aegis.ai",
    role: "Analyst",
    status: "Invited",
    lastActive: "Never",
    avatarColor: "from-primary-500 to-success-500",
  },
  {
    id: "6",
    name: "David Kim",
    email: "david.k@aegis.ai",
    role: "Viewer",
    status: "Invited",
    lastActive: "Never",
    avatarColor: "from-danger-500 to-warning-500",
  },
];

const permissions = [
  { action: "View dashboards & reports", admin: true, analyst: true, viewer: true },
  { action: "Manage threat detections", admin: true, analyst: true, viewer: false },
  { action: "Run security scans", admin: true, analyst: true, viewer: false },
  { action: "Manage incidents", admin: true, analyst: true, viewer: false },
  { action: "Configure integrations", admin: true, analyst: false, viewer: false },
  { action: "Manage team members", admin: true, analyst: false, viewer: false },
  { action: "Access billing & settings", admin: true, analyst: false, viewer: false },
  { action: "Export data & reports", admin: true, analyst: true, viewer: true },
  { action: "Delete resources", admin: true, analyst: false, viewer: false },
];

const activityLog = [
  { user: "Sarah Chen", action: "updated the role of Marcus Johnson to Analyst", time: "10 minutes ago", type: "role_change" },
  { user: "Sarah Chen", action: "invited Elena Rodriguez to the team", time: "2 hours ago", type: "invite" },
  { user: "Marcus Johnson", action: "completed a full vulnerability scan", time: "3 hours ago", type: "scan" },
  { user: "Aisha Patel", action: "resolved incident #INC-2847", time: "5 hours ago", type: "incident" },
  { user: "Sarah Chen", action: "invited David Kim to the team", time: "1 day ago", type: "invite" },
  { user: "James Wilson", action: "exported compliance report Q1-2026", time: "1 day ago", type: "export" },
];

export default function TeamPage() {
  const [members, setMembers] = useState(initialMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleChange = (id: string, newRole: TeamMember["role"]) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role: newRole } : m))
    );
  };

  const handleRemove = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setOpenMenuId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-100">Team Management</h1>
          <p className="text-dark-400 mt-1">Manage your team members, roles, and permissions</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary-500/20 w-fit"
        >
          <UserPlus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 w-full max-w-md glow-border animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-dark-100">Invite Team Member</h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-1.5 rounded-lg hover:bg-dark-700/50 text-dark-400 hover:text-dark-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="colleague@company.com"
                  className="w-full bg-dark-800/70 border border-dark-700/50 rounded-lg px-4 py-2.5 text-sm text-dark-200 placeholder:text-dark-500 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Role</label>
                <select className="w-full bg-dark-800/70 border border-dark-700/50 rounded-lg px-4 py-2.5 text-sm text-dark-200 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 focus:outline-none transition-all appearance-none cursor-pointer">
                  <option>Viewer</option>
                  <option>Analyst</option>
                  <option>Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2.5 bg-dark-700/50 hover:bg-dark-700 text-dark-200 rounded-lg text-sm font-medium transition-colors border border-dark-600/50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary-500/20"
                >
                  Send Invite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search team members..."
            className="w-full bg-dark-800/70 border border-dark-700/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-dark-200 placeholder:text-dark-500 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 focus:outline-none transition-all"
          />
        </div>
        <div className="text-sm text-dark-500">
          {filteredMembers.length} member{filteredMembers.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Team Members Table */}
      <div className="glass-card rounded-xl overflow-hidden glow-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700/50 bg-dark-800/30">
                <th className="text-left text-xs font-medium text-dark-500 uppercase tracking-wider px-6 py-4">Member</th>
                <th className="text-left text-xs font-medium text-dark-500 uppercase tracking-wider px-6 py-4">Role</th>
                <th className="text-left text-xs font-medium text-dark-500 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-xs font-medium text-dark-500 uppercase tracking-wider px-6 py-4">Last Active</th>
                <th className="text-right text-xs font-medium text-dark-500 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700/30">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-dark-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${member.avatarColor} flex items-center justify-center text-white text-sm font-semibold shadow-sm shrink-0`}>
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-dark-200">{member.name}</p>
                        <p className="text-xs text-dark-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <select
                        value={member.role}
                        onChange={(e) => handleRoleChange(member.id, e.target.value as TeamMember["role"])}
                        className={`appearance-none cursor-pointer bg-transparent border rounded-lg px-3 py-1.5 pr-7 text-xs font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-primary-500/20 ${
                          member.role === "Admin"
                            ? "border-primary-500/30 text-primary-400 bg-primary-500/10"
                            : member.role === "Analyst"
                            ? "border-accent-500/30 text-accent-400 bg-accent-500/10"
                            : "border-dark-600/50 text-dark-400 bg-dark-700/30"
                        }`}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Analyst">Analyst</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-dark-500 pointer-events-none" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
                      member.status === "Active"
                        ? "bg-success-500/10 text-success-400"
                        : "bg-warning-500/10 text-warning-400"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${member.status === "Active" ? "bg-success-400" : "bg-warning-400"}`} />
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-dark-400">{member.lastActive}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1 relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === member.id ? null : member.id)}
                        className="p-2 rounded-lg hover:bg-dark-700/50 text-dark-400 hover:text-dark-200 transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {openMenuId === member.id && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
                          <div className="absolute right-0 top-full mt-1 w-40 bg-dark-800 border border-dark-700/50 rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden animate-fade-in-up">
                            <button
                              onClick={() => setOpenMenuId(null)}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-dark-300 hover:text-dark-100 hover:bg-dark-700/50 transition-colors w-full text-left"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleRemove(member.id)}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-danger-400 hover:bg-danger-500/10 transition-colors w-full text-left"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Remove
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permissions Matrix */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-accent-500/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-accent-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-dark-100">Role Permissions</h3>
            <p className="text-sm text-dark-400">Overview of permissions granted to each role</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700/50">
                <th className="text-left text-xs font-medium text-dark-500 uppercase tracking-wider pb-3 pr-4">Permission</th>
                <th className="text-center text-xs font-medium text-dark-500 uppercase tracking-wider pb-3 px-4">
                  <span className="flex items-center justify-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-primary-400" />
                    Admin
                  </span>
                </th>
                <th className="text-center text-xs font-medium text-dark-500 uppercase tracking-wider pb-3 px-4">
                  <span className="flex items-center justify-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-accent-400" />
                    Analyst
                  </span>
                </th>
                <th className="text-center text-xs font-medium text-dark-500 uppercase tracking-wider pb-3 px-4">
                  <span className="flex items-center justify-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-dark-400" />
                    Viewer
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700/30">
              {permissions.map((perm, i) => (
                <tr key={i} className="hover:bg-dark-800/20 transition-colors">
                  <td className="py-3 pr-4 text-sm text-dark-300">{perm.action}</td>
                  <td className="py-3 px-4 text-center">
                    {perm.admin ? (
                      <CheckCircle2 className="w-4 h-4 text-success-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-dark-600 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {perm.analyst ? (
                      <CheckCircle2 className="w-4 h-4 text-success-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-dark-600 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {perm.viewer ? (
                      <CheckCircle2 className="w-4 h-4 text-success-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-dark-600 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Log */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-dark-100">Activity Log</h3>
            <p className="text-sm text-dark-400">Recent team activity and changes</p>
          </div>
        </div>
        <div className="space-y-1">
          {activityLog.map((entry, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-dark-800/30 transition-colors">
              <div className="w-8 h-8 rounded-full bg-dark-700/50 flex items-center justify-center shrink-0 mt-0.5">
                {entry.type === "role_change" && <Users className="w-3.5 h-3.5 text-primary-400" />}
                {entry.type === "invite" && <UserPlus className="w-3.5 h-3.5 text-success-400" />}
                {entry.type === "scan" && <Shield className="w-3.5 h-3.5 text-accent-400" />}
                {entry.type === "incident" && <AlertTriangle className="w-3.5 h-3.5 text-warning-400" />}
                {entry.type === "export" && <FileText className="w-3.5 h-3.5 text-dark-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-dark-300">
                  <span className="font-medium text-dark-200">{entry.user}</span>{" "}
                  {entry.action}
                </p>
                <p className="text-xs text-dark-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  {entry.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
