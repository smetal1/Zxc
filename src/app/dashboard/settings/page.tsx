"use client";

import { useState } from "react";
import {
  Settings,
  Shield,
  Bell,
  CreditCard,
  Building2,
  Globe,
  Languages,
  Moon,
  Sun,
  Smartphone,
  Clock,
  Network,
  KeyRound,
  Mail,
  MessageSquare,
  Webhook,
  AlertTriangle,
  FileCheck,
  ScanLine,
  Users,
  Zap,
  Database,
  HardDrive,
  Download,
  Save,
  CheckCircle2,
} from "lucide-react";

const tabs = [
  { id: "general", label: "General", icon: Settings },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
];

const timezones = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Australia/Sydney",
];

const languages = [
  "English (US)",
  "English (UK)",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Portuguese",
  "Chinese (Simplified)",
];

const notificationEvents = [
  {
    id: "critical_threats",
    label: "Critical Threats",
    description: "Immediate alerts for critical severity threat detections",
    icon: AlertTriangle,
    iconColor: "text-danger-400",
  },
  {
    id: "high_threats",
    label: "High Threats",
    description: "Alerts for high severity threats requiring attention",
    icon: Shield,
    iconColor: "text-warning-400",
  },
  {
    id: "compliance_failures",
    label: "Compliance Failures",
    description: "Notifications when compliance checks fail or drift is detected",
    icon: FileCheck,
    iconColor: "text-accent-400",
  },
  {
    id: "scan_completions",
    label: "Scan Completions",
    description: "Updates when vulnerability or security scans finish",
    icon: ScanLine,
    iconColor: "text-primary-400",
  },
  {
    id: "team_changes",
    label: "Team Changes",
    description: "Notifications about team member additions, removals, or role changes",
    icon: Users,
    iconColor: "text-success-400",
  },
];

const billingHistory = [
  { date: "Mar 1, 2026", description: "Professional Plan - Monthly", amount: "$149.00", status: "Paid" },
  { date: "Feb 1, 2026", description: "Professional Plan - Monthly", amount: "$149.00", status: "Paid" },
  { date: "Jan 1, 2026", description: "Professional Plan - Monthly", amount: "$149.00", status: "Paid" },
  { date: "Dec 1, 2025", description: "Professional Plan - Monthly", amount: "$149.00", status: "Paid" },
  { date: "Nov 1, 2025", description: "Professional Plan - Monthly", amount: "$149.00", status: "Paid" },
];

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-dark-900 ${
        enabled ? "bg-primary-500" : "bg-dark-600"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function UsageMeter({
  label,
  used,
  total,
  unit,
  icon: Icon,
}: {
  label: string;
  used: number;
  total: number;
  unit: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const percentage = (used / total) * 100;
  const barColor =
    percentage > 90
      ? "bg-danger-500"
      : percentage > 70
      ? "bg-warning-500"
      : "bg-primary-500";

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-primary-500/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-dark-200">{label}</p>
          <p className="text-xs text-dark-500">
            {used.toLocaleString()} / {total.toLocaleString()} {unit}
          </p>
        </div>
      </div>
      <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-dark-500 mt-2">{percentage.toFixed(1)}% used</p>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [darkMode, setDarkMode] = useState(true);
  const [orgName, setOrgName] = useState("Aegis Security Corp");
  const [timezone, setTimezone] = useState("America/New_York");
  const [language, setLanguage] = useState("English (US)");

  const [twoFAEnabled, setTwoFAEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [ipWhitelist, setIpWhitelist] = useState("192.168.1.0/24\n10.0.0.0/8");
  const [minPasswordLength, setMinPasswordLength] = useState("12");
  const [requireSpecialChars, setRequireSpecialChars] = useState(true);
  const [requireNumbers, setRequireNumbers] = useState(true);
  const [requireUppercase, setRequireUppercase] = useState(true);

  const [notifications, setNotifications] = useState<
    Record<string, { email: boolean; slack: boolean; webhook: boolean }>
  >({
    critical_threats: { email: true, slack: true, webhook: true },
    high_threats: { email: true, slack: true, webhook: false },
    compliance_failures: { email: true, slack: false, webhook: false },
    scan_completions: { email: false, slack: true, webhook: false },
    team_changes: { email: true, slack: false, webhook: false },
  });

  const toggleNotification = (
    eventId: string,
    channel: "email" | "slack" | "webhook"
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        [channel]: !prev[eventId][channel],
      },
    }));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-100">Settings</h1>
        <p className="text-dark-400 mt-1">
          Manage your organization preferences, security, and billing
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-dark-800/50 rounded-xl border border-dark-700/50 w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-primary-500/15 text-primary-400 shadow-sm"
                  : "text-dark-400 hover:text-dark-200 hover:bg-dark-700/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* General Tab */}
      {activeTab === "general" && (
        <div className="space-y-6 animate-fade-in-up">
          <div className="glass-card rounded-xl p-6 glow-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-dark-100">Organization</h3>
                <p className="text-sm text-dark-400">Basic organization information and preferences</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Organization Name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full bg-dark-800/70 border border-dark-700/50 rounded-lg px-4 py-2.5 text-sm text-dark-200 placeholder:text-dark-500 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 focus:outline-none transition-all"
                />
                <p className="text-xs text-dark-500 mt-1.5">This will be displayed across your dashboard and reports</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-dark-400" />
                    Timezone
                  </span>
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-dark-800/70 border border-dark-700/50 rounded-lg px-4 py-2.5 text-sm text-dark-200 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
                <p className="text-xs text-dark-500 mt-1.5">All timestamps and scheduled reports will use this timezone</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">
                  <span className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-dark-400" />
                    Language
                  </span>
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-dark-800/70 border border-dark-700/50 rounded-lg px-4 py-2.5 text-sm text-dark-200 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-dark-700/30">
                <div className="flex items-center gap-3">
                  {darkMode ? (
                    <Moon className="w-5 h-5 text-accent-400" />
                  ) : (
                    <Sun className="w-5 h-5 text-warning-400" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-dark-200">Dark Mode</p>
                    <p className="text-xs text-dark-500">Toggle between dark and light theme</p>
                  </div>
                </div>
                <Toggle enabled={darkMode} onChange={setDarkMode} />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary-500/20">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-6 animate-fade-in-up">
          {/* 2FA */}
          <div className="glass-card rounded-xl p-6 glow-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-success-500/10 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-success-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-dark-100">Two-Factor Authentication</h3>
                <p className="text-sm text-dark-400">Add an extra layer of security to all accounts</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg border border-dark-700/30">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${twoFAEnabled ? "bg-success-400" : "bg-dark-500"}`} />
                <div>
                  <p className="text-sm font-medium text-dark-200">Require 2FA for all team members</p>
                  <p className="text-xs text-dark-500">Enforce two-factor authentication organization-wide</p>
                </div>
              </div>
              <Toggle enabled={twoFAEnabled} onChange={setTwoFAEnabled} />
            </div>
          </div>

          {/* Session Timeout */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-warning-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-dark-100">Session Timeout</h3>
                <p className="text-sm text-dark-400">Automatically sign out inactive users</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Timeout Duration (minutes)</label>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-full max-w-xs bg-dark-800/70 border border-dark-700/50 rounded-lg px-4 py-2.5 text-sm text-dark-200 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 focus:outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="480">8 hours</option>
              </select>
              <p className="text-xs text-dark-500 mt-1.5">Users will be signed out after this period of inactivity</p>
            </div>
          </div>

          {/* IP Whitelist */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                <Network className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-dark-100">IP Whitelist</h3>
                <p className="text-sm text-dark-400">Restrict access to specific IP addresses or CIDR ranges</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Allowed IP Addresses</label>
              <textarea
                value={ipWhitelist}
                onChange={(e) => setIpWhitelist(e.target.value)}
                rows={4}
                placeholder="Enter one IP address or CIDR range per line"
                className="w-full bg-dark-800/70 border border-dark-700/50 rounded-lg px-4 py-2.5 text-sm text-dark-200 placeholder:text-dark-500 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 focus:outline-none transition-all font-mono"
              />
              <p className="text-xs text-dark-500 mt-1.5">One IP address or CIDR range per line. Leave empty to allow all IPs.</p>
            </div>
          </div>

          {/* Password Policy */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent-500/10 flex items-center justify-center">
                <KeyRound className="w-5 h-5 text-accent-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-dark-100">Password Policy</h3>
                <p className="text-sm text-dark-400">Set minimum password requirements for all users</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Minimum Password Length</label>
                <select
                  value={minPasswordLength}
                  onChange={(e) => setMinPasswordLength(e.target.value)}
                  className="w-full max-w-xs bg-dark-800/70 border border-dark-700/50 rounded-lg px-4 py-2.5 text-sm text-dark-200 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="8">8 characters</option>
                  <option value="10">10 characters</option>
                  <option value="12">12 characters</option>
                  <option value="16">16 characters</option>
                </select>
              </div>
              <div className="space-y-3 pt-2">
                {[
                  { label: "Require special characters", description: "Must include at least one special character (!@#$%^&*)", enabled: requireSpecialChars, onChange: setRequireSpecialChars },
                  { label: "Require numbers", description: "Must include at least one numeric digit", enabled: requireNumbers, onChange: setRequireNumbers },
                  { label: "Require uppercase letters", description: "Must include at least one uppercase letter", enabled: requireUppercase, onChange: setRequireUppercase },
                ].map((policy) => (
                  <div key={policy.label} className="flex items-center justify-between p-3 bg-dark-800/30 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-dark-200">{policy.label}</p>
                      <p className="text-xs text-dark-500">{policy.description}</p>
                    </div>
                    <Toggle enabled={policy.enabled} onChange={policy.onChange} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary-500/20">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-6 animate-fade-in-up">
          <div className="glass-card rounded-xl p-6 glow-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-dark-100">Alert Preferences</h3>
                <p className="text-sm text-dark-400">Choose how you want to be notified for each event type</p>
              </div>
            </div>

            {/* Channel Headers */}
            <div className="grid grid-cols-[1fr,80px,80px,80px] gap-4 mb-4 px-4">
              <div />
              <div className="flex flex-col items-center gap-1">
                <Mail className="w-4 h-4 text-dark-400" />
                <span className="text-xs font-medium text-dark-400">Email</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <MessageSquare className="w-4 h-4 text-dark-400" />
                <span className="text-xs font-medium text-dark-400">Slack</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Webhook className="w-4 h-4 text-dark-400" />
                <span className="text-xs font-medium text-dark-400">Webhook</span>
              </div>
            </div>

            <div className="space-y-2">
              {notificationEvents.map((event) => {
                const Icon = event.icon;
                return (
                  <div
                    key={event.id}
                    className="grid grid-cols-[1fr,80px,80px,80px] gap-4 items-center p-4 bg-dark-800/30 rounded-lg hover:bg-dark-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${event.iconColor} shrink-0`} />
                      <div>
                        <p className="text-sm font-medium text-dark-200">{event.label}</p>
                        <p className="text-xs text-dark-500">{event.description}</p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Toggle
                        enabled={notifications[event.id].email}
                        onChange={() => toggleNotification(event.id, "email")}
                      />
                    </div>
                    <div className="flex justify-center">
                      <Toggle
                        enabled={notifications[event.id].slack}
                        onChange={() => toggleNotification(event.id, "slack")}
                      />
                    </div>
                    <div className="flex justify-center">
                      <Toggle
                        enabled={notifications[event.id].webhook}
                        onChange={() => toggleNotification(event.id, "webhook")}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary-500/20">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === "billing" && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Current Plan */}
          <div className="glass-card rounded-xl p-6 glow-border">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark-100">Current Plan</h3>
                  <p className="text-sm text-dark-400">Manage your subscription and billing</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-primary-500/15 text-primary-400 text-xs font-semibold rounded-full border border-primary-500/20">
                Professional
              </span>
            </div>
            <div className="p-5 bg-dark-800/50 rounded-xl border border-dark-700/30">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-dark-100">$149</span>
                <span className="text-dark-400 text-sm">/month</span>
              </div>
              <p className="text-sm text-dark-400 mb-4">Billed monthly. Next payment on April 1, 2026.</p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-dark-700/50 hover:bg-dark-700 text-dark-200 rounded-lg text-sm font-medium transition-colors border border-dark-600/50">
                  Change Plan
                </button>
                <button className="px-4 py-2 text-dark-400 hover:text-danger-400 rounded-lg text-sm font-medium transition-colors">
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>

          {/* Usage Meters */}
          <div>
            <h3 className="text-lg font-semibold text-dark-100 mb-4">Usage This Month</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UsageMeter label="API Calls" used={847320} total={1000000} unit="calls" icon={Database} />
              <UsageMeter label="Security Scans" used={234} total={500} unit="scans" icon={ScanLine} />
              <UsageMeter label="Storage" used={42} total={100} unit="GB" icon={HardDrive} />
            </div>
          </div>

          {/* Payment Method */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-dark-400" />
              <h3 className="text-lg font-semibold text-dark-100">Payment Method</h3>
            </div>
            <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg border border-dark-700/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-dark-700 rounded flex items-center justify-center text-xs font-bold text-dark-300">
                  VISA
                </div>
                <div>
                  <p className="text-sm font-medium text-dark-200">Visa ending in 4242</p>
                  <p className="text-xs text-dark-500">Expires 12/2027</p>
                </div>
              </div>
              <button className="px-3 py-1.5 text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors">
                Update
              </button>
            </div>
          </div>

          {/* Billing History */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark-100">Billing History</h3>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-dark-400 hover:text-dark-200 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-700/50">
                    <th className="text-left text-xs font-medium text-dark-500 uppercase tracking-wider pb-3 pr-4">Date</th>
                    <th className="text-left text-xs font-medium text-dark-500 uppercase tracking-wider pb-3 pr-4">Description</th>
                    <th className="text-left text-xs font-medium text-dark-500 uppercase tracking-wider pb-3 pr-4">Amount</th>
                    <th className="text-left text-xs font-medium text-dark-500 uppercase tracking-wider pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-700/30">
                  {billingHistory.map((item, i) => (
                    <tr key={i} className="hover:bg-dark-800/30 transition-colors">
                      <td className="py-3 pr-4 text-sm text-dark-300">{item.date}</td>
                      <td className="py-3 pr-4 text-sm text-dark-200">{item.description}</td>
                      <td className="py-3 pr-4 text-sm font-medium text-dark-200">{item.amount}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-success-500/10 text-success-400 text-xs font-medium rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
