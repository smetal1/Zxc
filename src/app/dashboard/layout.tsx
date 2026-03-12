"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Brain,
  ShieldAlert,
  Search,
  ClipboardCheck,
  Siren,
  Lock,
  Users,
  Settings,
  Plug,
  Shield,
  Bell,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  HelpCircle,
} from "lucide-react";

const mainNavItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Threat Detection", icon: Brain, href: "/dashboard/threats" },
  { label: "Fraud Detection", icon: ShieldAlert, href: "/dashboard/fraud" },
  { label: "Vulnerability Scanner", icon: Search, href: "/dashboard/vulnerabilities" },
  { label: "Compliance", icon: ClipboardCheck, href: "/dashboard/compliance" },
  { label: "Incidents", icon: Siren, href: "/dashboard/incidents" },
  { label: "API Security", icon: Lock, href: "/dashboard/api-security" },
];

const secondaryNavItems = [
  { label: "Team", icon: Users, href: "/dashboard/team" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  { label: "Integrations", icon: Plug, href: "/dashboard/integrations" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const sidebarWidth = collapsed ? "w-[72px]" : "w-[280px]";

  return (
    <div className="flex h-screen bg-dark-950 text-dark-100 overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          ${sidebarWidth}
          bg-dark-900 border-r border-dark-700/50
          flex flex-col
          transition-all duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-dark-700/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-success-400 rounded-full border-2 border-dark-900" />
            </div>
            {!collapsed && (
              <span className="text-lg font-bold tracking-tight gradient-text whitespace-nowrap">
                Aegis AI
              </span>
            )}
          </div>
          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto lg:hidden p-1.5 rounded-lg hover:bg-dark-800 text-dark-400 hover:text-dark-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200 group relative
                  ${
                    active
                      ? "bg-primary-500/15 text-primary-400 shadow-sm"
                      : "text-dark-400 hover:text-dark-200 hover:bg-dark-800/70"
                  }
                `}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary-400 rounded-r-full" />
                )}
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    active
                      ? "text-primary-400"
                      : "text-dark-500 group-hover:text-dark-300"
                  }`}
                />
                {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-dark-800 text-dark-200 text-xs font-medium rounded-md shadow-xl border border-dark-700/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}

          {/* Separator */}
          <div className="my-4 mx-3 border-t border-dark-700/50" />

          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200 group relative
                  ${
                    active
                      ? "bg-primary-500/15 text-primary-400 shadow-sm"
                      : "text-dark-400 hover:text-dark-200 hover:bg-dark-800/70"
                  }
                `}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary-400 rounded-r-full" />
                )}
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    active
                      ? "text-primary-400"
                      : "text-dark-500 group-hover:text-dark-300"
                  }`}
                />
                {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-dark-800 text-dark-200 text-xs font-medium rounded-md shadow-xl border border-dark-700/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="hidden lg:block p-3 border-t border-dark-700/50 shrink-0">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full gap-2 px-3 py-2 rounded-lg text-sm text-dark-400 hover:text-dark-200 hover:bg-dark-800/70 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header bar */}
        <header className="h-16 bg-dark-900/80 backdrop-blur-md border-b border-dark-700/50 flex items-center justify-between px-4 lg:px-6 shrink-0 z-30">
          {/* Left section */}
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-dark-800 text-dark-400 hover:text-dark-200 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 bg-dark-800/70 border border-dark-700/50 rounded-lg px-3 py-2 w-64 lg:w-80 focus-within:border-primary-500/50 focus-within:ring-1 focus-within:ring-primary-500/20 transition-all">
              <Search className="w-4 h-4 text-dark-500 shrink-0" />
              <input
                type="text"
                placeholder="Search threats, alerts, reports..."
                className="bg-transparent text-sm text-dark-200 placeholder:text-dark-500 outline-none w-full"
              />
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-dark-500 bg-dark-700/50 rounded border border-dark-600/50">
                /
              </kbd>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-dark-800 text-dark-400 hover:text-dark-200 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full ring-2 ring-dark-900" />
              <span className="absolute top-0.5 right-0 min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[10px] font-bold text-white bg-danger-500 rounded-full">
                5
              </span>
            </button>

            {/* Divider */}
            <div className="w-px h-8 bg-dark-700/50 mx-1" />

            {/* User avatar dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-lg hover:bg-dark-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                  A
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-dark-200 leading-tight">Admin User</p>
                  <p className="text-xs text-dark-500 leading-tight">admin@aegis.ai</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-dark-500 hidden md:block transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown menu */}
              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-dark-800 border border-dark-700/50 rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden animate-fade-in-up">
                    <div className="px-4 py-3 border-b border-dark-700/50">
                      <p className="text-sm font-medium text-dark-200">Admin User</p>
                      <p className="text-xs text-dark-500 mt-0.5">admin@aegis.ai</p>
                    </div>
                    <div className="py-1.5">
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-dark-300 hover:text-dark-100 hover:bg-dark-700/50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-dark-300 hover:text-dark-100 hover:bg-dark-700/50 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-dark-300 hover:text-dark-100 hover:bg-dark-700/50 transition-colors"
                      >
                        <HelpCircle className="w-4 h-4" />
                        Help & Support
                      </Link>
                    </div>
                    <div className="border-t border-dark-700/50 py-1.5">
                      <button className="flex items-center gap-2.5 px-4 py-2 text-sm text-danger-400 hover:text-danger-400 hover:bg-danger-500/10 transition-colors w-full text-left">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 xl:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
