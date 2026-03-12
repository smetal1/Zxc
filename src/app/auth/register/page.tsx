"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Shield,
  User,
  Mail,
  Building2,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
} from "lucide-react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: "", color: "" };
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { score: 1, label: "Weak", color: "bg-danger-500" };
    if (score <= 2) return { score: 2, label: "Fair", color: "bg-warning-500" };
    if (score <= 3) return { score: 3, label: "Good", color: "bg-primary-500" };
    if (score <= 4) return { score: 4, label: "Strong", color: "bg-success-500" };
    return { score: 5, label: "Very Strong", color: "bg-success-400" };
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-2xl shadow-primary-500/30 mb-5">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-dark-100">
            Start Your Free Trial
          </h1>
          <p className="text-dark-400 mt-2 text-sm">
            14 days free, no credit card required
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8 glow-border">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-dark-800/70 border border-dark-700/50 rounded-lg pl-10 pr-4 py-3 text-sm text-dark-200 placeholder:text-dark-500 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Work Email */}
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Work Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-dark-800/70 border border-dark-700/50 rounded-lg pl-10 pr-4 py-3 text-sm text-dark-200 placeholder:text-dark-500 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Company Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Inc."
                  className="w-full bg-dark-800/70 border border-dark-700/50 rounded-lg pl-10 pr-4 py-3 text-sm text-dark-200 placeholder:text-dark-500 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full bg-dark-800/70 border border-dark-700/50 rounded-lg pl-10 pr-11 py-3 text-sm text-dark-200 placeholder:text-dark-500 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-3">
                  <div className="flex gap-1.5 mb-1.5">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          level <= passwordStrength.score
                            ? passwordStrength.color
                            : "bg-dark-700"
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-xs font-medium ${
                      passwordStrength.score <= 1
                        ? "text-danger-400"
                        : passwordStrength.score <= 2
                        ? "text-warning-400"
                        : passwordStrength.score <= 3
                        ? "text-primary-400"
                        : "text-success-400"
                    }`}
                  >
                    {passwordStrength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    agreedToTerms
                      ? "bg-primary-500 border-primary-500"
                      : "border-dark-600 bg-dark-800 group-hover:border-dark-500"
                  }`}
                >
                  {agreedToTerms && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
              <span className="text-sm text-dark-400 leading-relaxed">
                I agree to the{" "}
                <Link
                  href="#"
                  className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={!agreedToTerms}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-dark-600 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 disabled:shadow-none hover:scale-[1.01] active:scale-[0.99]"
            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Sign in link */}
        <p className="text-center text-sm text-dark-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
