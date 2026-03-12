import { NextResponse } from "next/server";

const mockVulnerabilities = {
  summary: {
    critical: 4,
    high: 12,
    medium: 28,
    low: 45,
  },
  vulnerabilities: [
    {
      id: "VLN-001",
      cve: "CVE-2026-21345",
      title: "Remote Code Execution in OpenSSL 3.2.x",
      description:
        "A buffer overflow vulnerability in the X.509 certificate verification allows an attacker to execute arbitrary code via a crafted certificate chain.",
      cvss: 9.8,
      severity: "critical",
      affectedAssets: ["web-server-01", "web-server-02", "api-gateway"],
      status: "open",
      discoveredAt: "2026-03-11T14:20:00Z",
    },
    {
      id: "VLN-002",
      cve: "CVE-2026-18742",
      title: "Privilege Escalation in Linux Kernel 6.x",
      description:
        "A use-after-free vulnerability in the netfilter subsystem allows local attackers to escalate privileges to root via crafted network packets.",
      cvss: 8.8,
      severity: "high",
      affectedAssets: [
        "prod-server-01",
        "prod-server-02",
        "prod-server-03",
        "staging-server-01",
      ],
      status: "patching",
      discoveredAt: "2026-03-10T09:15:00Z",
    },
    {
      id: "VLN-003",
      cve: "CVE-2026-15234",
      title: "SQL Injection in Custom ORM Layer",
      description:
        "Improper input sanitization in the internal ORM query builder allows authenticated users to inject arbitrary SQL via search parameters.",
      cvss: 9.1,
      severity: "critical",
      affectedAssets: ["order-service", "user-service"],
      status: "open",
      discoveredAt: "2026-03-12T02:30:00Z",
    },
    {
      id: "VLN-004",
      cve: "CVE-2026-22198",
      title: "Cross-Site Scripting in Admin Dashboard",
      description:
        "Stored XSS vulnerability in the admin dashboard user management module allows injection of malicious scripts through the display name field.",
      cvss: 6.1,
      severity: "medium",
      affectedAssets: ["admin-dashboard-v3"],
      status: "in_review",
      discoveredAt: "2026-03-09T16:45:00Z",
    },
    {
      id: "VLN-005",
      cve: "CVE-2026-11987",
      title: "Insecure Deserialization in Message Queue Consumer",
      description:
        "The RabbitMQ message consumer deserializes untrusted data without validation, allowing remote code execution via crafted message payloads.",
      cvss: 9.4,
      severity: "critical",
      affectedAssets: ["mq-consumer-01", "mq-consumer-02"],
      status: "patching",
      discoveredAt: "2026-03-08T11:00:00Z",
    },
    {
      id: "VLN-006",
      cve: "CVE-2026-09876",
      title: "Authentication Bypass in SSO Module",
      description:
        "A logic flaw in the SAML response validation allows attackers to bypass single sign-on authentication by manipulating assertion timestamps.",
      cvss: 8.6,
      severity: "high",
      affectedAssets: ["sso-gateway", "identity-provider"],
      status: "open",
      discoveredAt: "2026-03-11T08:20:00Z",
    },
    {
      id: "VLN-007",
      cve: "CVE-2026-30145",
      title: "Weak Cryptographic Algorithm in Data Encryption",
      description:
        "The payment processing module uses deprecated DES encryption for storing card tokens, making data susceptible to brute-force attacks.",
      cvss: 7.5,
      severity: "high",
      affectedAssets: ["payment-service"],
      status: "patching",
      discoveredAt: "2026-03-07T13:10:00Z",
    },
    {
      id: "VLN-008",
      cve: "CVE-2026-27654",
      title: "Information Disclosure via Error Messages",
      description:
        "Verbose error messages in the API layer expose internal stack traces, database schema details, and server configuration to unauthenticated users.",
      cvss: 5.3,
      severity: "medium",
      affectedAssets: ["api-v2", "api-v3"],
      status: "resolved",
      discoveredAt: "2026-03-06T17:30:00Z",
    },
    {
      id: "VLN-009",
      cve: "CVE-2026-33421",
      title: "Server-Side Request Forgery in Image Processor",
      description:
        "The image upload service allows server-side request forgery via crafted SVG files, enabling access to internal metadata services and cloud credentials.",
      cvss: 8.2,
      severity: "high",
      affectedAssets: ["media-service", "cdn-origin"],
      status: "open",
      discoveredAt: "2026-03-12T06:00:00Z",
    },
    {
      id: "VLN-010",
      cve: "CVE-2026-14567",
      title: "Denial of Service via Regex in Input Validator",
      description:
        "A ReDoS vulnerability in the email validation regex causes catastrophic backtracking, allowing attackers to consume server resources with crafted input.",
      cvss: 5.9,
      severity: "medium",
      affectedAssets: ["registration-service", "contact-form"],
      status: "resolved",
      discoveredAt: "2026-03-05T10:45:00Z",
    },
    {
      id: "VLN-011",
      cve: "CVE-2026-41289",
      title: "Missing Rate Limiting on Password Reset",
      description:
        "The password reset endpoint lacks rate limiting, allowing attackers to enumerate valid email addresses and flood users with reset emails.",
      cvss: 4.3,
      severity: "medium",
      affectedAssets: ["auth-service"],
      status: "in_review",
      discoveredAt: "2026-03-10T14:00:00Z",
    },
    {
      id: "VLN-012",
      cve: "CVE-2026-08321",
      title: "Outdated TLS Configuration on Load Balancer",
      description:
        "Load balancer supports TLS 1.0 and weak cipher suites, enabling potential man-in-the-middle attacks on encrypted communications.",
      cvss: 3.7,
      severity: "low",
      affectedAssets: ["lb-prod-01", "lb-prod-02"],
      status: "in_review",
      discoveredAt: "2026-03-04T09:20:00Z",
    },
    {
      id: "VLN-013",
      cve: "CVE-2026-19283",
      title: "Critical RCE in Container Runtime",
      description:
        "A container escape vulnerability in the runtime allows a compromised container to execute arbitrary commands on the host operating system.",
      cvss: 9.6,
      severity: "critical",
      affectedAssets: [
        "k8s-node-01",
        "k8s-node-02",
        "k8s-node-03",
        "k8s-node-04",
      ],
      status: "patching",
      discoveredAt: "2026-03-12T01:15:00Z",
    },
  ],
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockVulnerabilities,
    meta: {
      totalVulnerabilities: mockVulnerabilities.vulnerabilities.length,
      openCount: mockVulnerabilities.vulnerabilities.filter(
        (v) => v.status === "open"
      ).length,
      patchingCount: mockVulnerabilities.vulnerabilities.filter(
        (v) => v.status === "patching"
      ).length,
      resolvedCount: mockVulnerabilities.vulnerabilities.filter(
        (v) => v.status === "resolved"
      ).length,
      averageCvss: +(
        mockVulnerabilities.vulnerabilities.reduce((s, v) => s + v.cvss, 0) /
        mockVulnerabilities.vulnerabilities.length
      ).toFixed(1),
      lastUpdated: new Date().toISOString(),
    },
  });
}
