"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Brain,
  ShieldAlert,
  Search,
  ClipboardCheck,
  Siren,
  Lock,
  Plug,
  ScanEye,
  ShieldCheck,
  Check,
  ArrowRight,
  Menu,
  X,
  Star,
  Zap,
  Globe,
  ChevronRight,
  ExternalLink,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                              */
/* ------------------------------------------------------------------ */
function useCounter(end: number, duration = 2000, startOnMount = true) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!startOnMount) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, startOnMount]);
  return value;
}

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "Solutions", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "#" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-card border-b border-dark-700/50 shadow-lg shadow-dark-950/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/25 transition-shadow group-hover:shadow-primary-500/40">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Aegis <span className="gradient-text">AI</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-dark-300 transition-colors hover:bg-dark-800/60 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/auth/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-dark-300 transition-colors hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:shadow-primary-500/40 hover:brightness-110"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-dark-400 transition-colors hover:text-white lg:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass-card animate-fade-in-up border-t border-dark-700/50 lg:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-4 py-2.5 text-sm font-medium text-dark-300 transition-colors hover:bg-dark-800/60 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <hr className="border-dark-700/50 my-2" />
            <Link
              href="/auth/login"
              className="block rounded-lg px-4 py-2.5 text-sm font-medium text-dark-300 transition-colors hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="mt-2 block rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
function Hero() {
  const threats = useCounter(2400000, 2500);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-dark-950 pt-20 lg:pt-28">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary-500/[0.07] blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-accent-500/[0.05] blur-[100px]" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div
            className={`transition-all duration-1000 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-400">
              <Zap className="h-3.5 w-3.5" />
              Now with GPT-5 Powered Analysis
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              AI-Powered Security{" "}
              <span className="gradient-text">for the Modern Enterprise</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-dark-400 sm:text-xl">
              Protect your business with next-generation AI threat detection,
              real-time fraud prevention, and automated compliance — all in one
              unified platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-primary-500/25 transition-all hover:shadow-primary-500/40 hover:brightness-110"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-dark-700 bg-dark-800/60 px-7 py-3.5 text-base font-semibold text-dark-200 backdrop-blur transition-all hover:border-dark-600 hover:bg-dark-800"
              >
                See How It Works
              </a>
            </div>

            {/* Floating metric cards */}
            <div className="mt-12 flex flex-wrap gap-4">
              {[
                {
                  label: "Threats Blocked",
                  value: `${(threats / 1000000).toFixed(1)}M+`,
                  color: "text-danger-400",
                },
                {
                  label: "Uptime",
                  value: "99.99%",
                  color: "text-success-400",
                },
                {
                  label: "Response Time",
                  value: "<50ms",
                  color: "text-warning-400",
                },
              ].map((m, i) => (
                <div
                  key={m.label}
                  className="glass-card glow-border animate-fade-in-up rounded-xl px-5 py-3"
                  style={{ animationDelay: `${i * 150}ms`, animationFillMode: "both" }}
                >
                  <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
                  <p className="text-xs text-dark-400">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Preview Visual */}
          <div
            className={`relative transition-all delay-300 duration-1000 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Glow behind */}
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary-500/20 via-accent-500/20 to-primary-500/20 blur-2xl" />

              <div className="glass-card glow-border relative rounded-2xl p-6">
                {/* Title bar */}
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-danger-500/80" />
                  <div className="h-3 w-3 rounded-full bg-warning-500/80" />
                  <div className="h-3 w-3 rounded-full bg-success-500/80" />
                  <span className="ml-3 text-xs text-dark-500">
                    aegis-dashboard — Security Overview
                  </span>
                </div>

                {/* Scan animation bar */}
                <div className="relative mb-4 h-1.5 overflow-hidden rounded-full bg-dark-800">
                  <div className="animate-scan-line absolute inset-0 bg-gradient-to-b from-primary-500/0 via-primary-500/60 to-primary-500/0" />
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
                </div>

                {/* Mock dashboard grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Active Shields", val: "12/12", c: "text-success-400" },
                    { label: "Threats Today", val: "847", c: "text-danger-400" },
                    { label: "Risk Score", val: "Low", c: "text-primary-400" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg bg-dark-800/80 p-3 text-center"
                    >
                      <p className={`text-lg font-bold ${item.c}`}>{item.val}</p>
                      <p className="text-[10px] text-dark-500">{item.label}</p>
                    </div>
                  ))}
                </div>

                {/* Threat feed */}
                <div className="space-y-2">
                  {[
                    {
                      text: "SQL Injection blocked — 192.168.4.12",
                      severity: "HIGH",
                      color: "bg-danger-500/20 text-danger-400",
                    },
                    {
                      text: "Brute-force attempt mitigated",
                      severity: "MED",
                      color: "bg-warning-500/20 text-warning-400",
                    },
                    {
                      text: "Anomalous API traffic detected",
                      severity: "LOW",
                      color: "bg-primary-500/20 text-primary-400",
                    },
                    {
                      text: "DDoS pattern identified & blocked",
                      severity: "HIGH",
                      color: "bg-danger-500/20 text-danger-400",
                    },
                  ].map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-dark-800/60 px-3 py-2 text-xs animate-fade-in-up"
                      style={{
                        animationDelay: `${800 + i * 200}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      <div className="flex items-center gap-2 text-dark-300">
                        <span className="animate-threat-pulse inline-block h-1.5 w-1.5 rounded-full bg-current" />
                        {t.text}
                      </div>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${t.color}`}
                      >
                        {t.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Trusted By                                                         */
/* ------------------------------------------------------------------ */
function TrustedBy() {
  const logos = [
    "TechCorp",
    "FinanceHub",
    "DataFlow",
    "CloudNine",
    "SecureBank",
    "PayStream",
  ];
  return (
    <section className="relative border-y border-dark-800/60 bg-dark-950 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-dark-500">
          Trusted by industry leaders worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((name) => (
            <span
              key={name}
              className="text-xl font-bold tracking-tight text-dark-600 transition-colors hover:text-dark-400 sm:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Features Grid                                                      */
/* ------------------------------------------------------------------ */
const features = [
  {
    icon: Brain,
    title: "AI Threat Detection",
    desc: "Advanced machine learning models analyze billions of events in real time to identify and neutralize threats before they escalate.",
    gradient: "from-primary-500 to-blue-400",
  },
  {
    icon: ShieldAlert,
    title: "Fraud Prevention",
    desc: "Behavioral analytics and pattern recognition stop fraudulent transactions and account takeovers instantly.",
    gradient: "from-danger-500 to-orange-400",
  },
  {
    icon: Search,
    title: "Vulnerability Scanner",
    desc: "Continuously scan your infrastructure, containers, and code for known CVEs and zero-day vulnerabilities.",
    gradient: "from-accent-500 to-purple-400",
  },
  {
    icon: ClipboardCheck,
    title: "Compliance Management",
    desc: "Automated compliance monitoring for SOC 2, GDPR, HIPAA, and PCI-DSS with one-click audit reports.",
    gradient: "from-success-500 to-emerald-400",
  },
  {
    icon: Siren,
    title: "Incident Response",
    desc: "AI-orchestrated playbooks for instant threat containment, with automated escalation and remediation workflows.",
    gradient: "from-warning-500 to-amber-400",
  },
  {
    icon: Lock,
    title: "API Security",
    desc: "Protect every API endpoint with intelligent rate limiting, schema validation, and anomaly detection.",
    gradient: "from-cyan-500 to-teal-400",
  },
];

function Features() {
  return (
    <section id="features" className="relative bg-dark-950 py-24 lg:py-32">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent-500/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-400">
            Features
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Everything You Need to{" "}
            <span className="gradient-text">Stay Secure</span>
          </h2>
          <p className="mt-4 text-lg text-dark-400">
            A comprehensive suite of AI-powered security tools designed to
            protect your entire stack.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group glass-card rounded-2xl p-6 transition-all duration-300 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} shadow-lg`}
              >
                <f.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-dark-400">{f.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary-400 opacity-0 transition-opacity group-hover:opacity-100">
                Learn more <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  How It Works                                                       */
/* ------------------------------------------------------------------ */
function HowItWorks() {
  const steps = [
    {
      icon: Plug,
      num: "01",
      title: "Connect",
      desc: "Integrate Aegis with your existing infrastructure in minutes. We support AWS, GCP, Azure, Kubernetes, and 200+ other platforms out of the box.",
    },
    {
      icon: ScanEye,
      num: "02",
      title: "Detect",
      desc: "Our AI engine continuously analyzes network traffic, user behavior, and system events to detect anomalies with 99.7% accuracy.",
    },
    {
      icon: ShieldCheck,
      num: "03",
      title: "Protect",
      desc: "Automated response playbooks neutralize threats in under one second, with full audit logs and compliance reporting.",
    },
  ];

  return (
    <section id="how-it-works" className="relative bg-dark-900/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-400">
            How It Works
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Three Steps to{" "}
            <span className="gradient-text">Total Protection</span>
          </h2>
          <p className="mt-4 text-lg text-dark-400">
            Get from zero to fully protected faster than you ever thought
            possible.
          </p>
        </div>

        <div className="relative mt-16 grid gap-8 lg:grid-cols-3">
          {/* Connector line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-16 hidden h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent lg:block" />

          {steps.map((s, i) => (
            <div key={s.title} className="relative text-center">
              {/* Number badge */}
              <div className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/10 to-accent-500/10" />
                <div className="absolute inset-2 rounded-full border border-dark-700/60 bg-dark-900" />
                <div className="relative flex flex-col items-center">
                  <s.icon className="h-8 w-8 text-primary-400" />
                  <span className="mt-1 text-xs font-bold text-dark-500">
                    STEP {s.num}
                  </span>
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">{s.title}</h3>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-dark-400">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */
function Stats() {
  const events = useCounter(50, 2000);
  const detection = useCounter(99, 2000);
  const integrations = useCounter(200, 2000);

  const stats = [
    { value: `${events}B+`, label: "Events Analyzed", icon: Globe },
    { value: `${detection}.7%`, label: "Detection Rate", icon: ScanEye },
    { value: `${integrations}+`, label: "Integrations", icon: Plug },
    { value: "<1s", label: "Response Time", icon: Zap },
  ];

  return (
    <section className="relative bg-dark-950 py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-500/[0.03] via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group text-center transition-transform hover:-translate-y-1"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-dark-800/80 border border-dark-700/50 transition-colors group-hover:border-primary-500/30">
                <s.icon className="h-6 w-6 text-primary-400" />
              </div>
              <p className="text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm font-medium text-dark-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing                                                            */
/* ------------------------------------------------------------------ */
const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    desc: "Perfect for small teams getting started with AI security.",
    features: [
      "Up to 5 projects",
      "Basic vulnerability scanning",
      "Email alerts & notifications",
      "Community support",
      "Weekly security reports",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "$149",
    period: "/mo",
    desc: "Advanced AI protection for growing organizations.",
    features: [
      "Up to 25 projects",
      "Advanced AI threat detection",
      "Real-time alerts & dashboards",
      "Full API access",
      "Priority support",
      "Custom compliance rules",
      "Incident response playbooks",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Tailored security for large-scale deployments.",
    features: [
      "Unlimited projects",
      "Dedicated security engineer",
      "Custom AI model training",
      "On-premise deployment option",
      "Custom integrations & SLA",
      "24/7 phone support",
      "Executive security briefings",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="relative bg-dark-900/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-400">
            Pricing
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Simple, Transparent{" "}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="mt-4 text-lg text-dark-400">
            Start free for 14 days. No credit card required.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                p.popular
                  ? "border-2 border-primary-500/50 bg-dark-800/80 shadow-2xl shadow-primary-500/10"
                  : "glass-card"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                  Most Popular
                </div>
              )}

              <h3 className="text-lg font-bold text-white">{p.name}</h3>
              <p className="mt-1 text-sm text-dark-400">{p.desc}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">
                  {p.price}
                </span>
                {p.period && (
                  <span className="text-lg text-dark-400">{p.period}</span>
                )}
              </div>

              <ul className="mt-8 space-y-3">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success-400" />
                    <span className="text-dark-300">{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/dashboard"
                className={`mt-8 block rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                  p.popular
                    ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:brightness-110"
                    : "border border-dark-600 bg-dark-800/60 text-dark-200 hover:border-dark-500 hover:bg-dark-800"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */
const testimonials = [
  {
    quote:
      "Aegis AI cut our incident response time by 94%. What used to take hours now happens automatically in seconds. It's transformed how our security team operates.",
    name: "Sarah Chen",
    title: "CISO",
    company: "TechCorp",
  },
  {
    quote:
      "The AI threat detection is incredibly accurate. We went from hundreds of false positives a week to nearly zero. Our team can finally focus on real threats.",
    name: "Marcus Rodriguez",
    title: "VP of Security",
    company: "FinanceHub",
  },
  {
    quote:
      "Deploying Aegis took 15 minutes and we were immediately seeing value. The compliance automation alone saved us two full-time headcounts.",
    name: "Priya Patel",
    title: "Head of Infrastructure",
    company: "CloudNine",
  },
];

function Testimonials() {
  return (
    <section className="relative bg-dark-950 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-400">
            Testimonials
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Loved by Security Teams{" "}
            <span className="gradient-text">Everywhere</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass-card group rounded-2xl p-8 transition-all duration-300 hover:border-primary-500/20"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-warning-400 text-warning-400"
                  />
                ))}
              </div>

              <blockquote className="text-sm leading-relaxed text-dark-300">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-sm font-bold text-white">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-dark-500">
                    {t.title}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA Banner                                                         */
/* ------------------------------------------------------------------ */
function CTABanner() {
  return (
    <section className="relative bg-dark-950 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-accent-600 to-primary-700" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative px-8 py-16 text-center sm:px-16 lg:py-24">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Ready to Secure Your Infrastructure?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Join thousands of companies that trust Aegis AI to protect their
              most critical assets. Start your free trial today.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-dark-900 shadow-xl transition-all hover:bg-dark-100 hover:shadow-2xl"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-base font-bold text-white transition-all hover:border-white/60 hover:bg-white/10"
              >
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  const columns = [
    {
      title: "Product",
      links: [
        "AI Threat Detection",
        "Fraud Prevention",
        "Vulnerability Scanner",
        "Compliance Manager",
        "API Security",
        "Incident Response",
      ],
    },
    {
      title: "Solutions",
      links: [
        "Financial Services",
        "Healthcare",
        "E-Commerce",
        "SaaS Platforms",
        "Government",
        "Enterprise",
      ],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Blog", "Press", "Partners", "Contact"],
    },
    {
      title: "Legal",
      links: [
        "Privacy Policy",
        "Terms of Service",
        "Cookie Policy",
        "GDPR",
        "Security",
        "Status",
      ],
    },
  ];

  return (
    <footer className="border-t border-dark-800/60 bg-dark-950 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Aegis <span className="gradient-text">AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-dark-400">
              Next-generation AI security platform protecting enterprises from
              evolving cyber threats.
            </p>
            <div className="mt-6 flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-dark-700/50 bg-dark-800/60 text-dark-400 transition-all hover:border-primary-500/30 hover:text-primary-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-dark-400 transition-colors hover:text-primary-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-dark-800/60 pt-8 sm:flex-row">
          <p className="text-xs text-dark-500">
            &copy; {new Date().getFullYear()} Aegis AI, Inc. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-dark-500 transition-colors hover:text-dark-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-dark-950 text-white antialiased">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <Stats />
      <Pricing />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  );
}
