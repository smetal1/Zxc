import { NextRequest, NextResponse } from "next/server";

const mockThreats = [
  {
    id: "THR-001",
    type: "Malware",
    severity: "critical" as const,
    source: "185.220.101.34",
    target: "prod-db-01.internal",
    status: "blocked" as const,
    timestamp: "2026-03-12T08:23:41Z",
    description:
      "Ransomware payload detected attempting lateral movement from compromised endpoint to production database server.",
    aiConfidence: 0.97,
  },
  {
    id: "THR-002",
    type: "Phishing",
    severity: "high" as const,
    source: "spoofed-hr@company-login.xyz",
    target: "employees@acme.com",
    status: "mitigating" as const,
    timestamp: "2026-03-12T07:55:12Z",
    description:
      "Sophisticated spear-phishing campaign targeting HR department with credential-harvesting links disguised as benefits enrollment.",
    aiConfidence: 0.94,
  },
  {
    id: "THR-003",
    type: "DDoS",
    severity: "high" as const,
    source: "Botnet (multiple IPs)",
    target: "api-gateway.acme.com",
    status: "mitigating" as const,
    timestamp: "2026-03-12T06:30:00Z",
    description:
      "Distributed denial-of-service attack generating 2.4 Tbps of traffic targeting the primary API gateway with UDP amplification.",
    aiConfidence: 0.99,
  },
  {
    id: "THR-004",
    type: "SQL Injection",
    severity: "critical" as const,
    source: "203.0.113.42",
    target: "checkout.acme.com/api/orders",
    status: "blocked" as const,
    timestamp: "2026-03-12T05:17:33Z",
    description:
      "Automated SQL injection attempts against order processing endpoint attempting to extract customer payment data.",
    aiConfidence: 0.96,
  },
  {
    id: "THR-005",
    type: "Insider Threat",
    severity: "medium" as const,
    source: "user:jdoe@acme.com",
    target: "s3://acme-confidential-docs",
    status: "investigating" as const,
    timestamp: "2026-03-12T04:45:20Z",
    description:
      "Anomalous data access pattern detected: user downloaded 847 confidential documents within a 2-hour window outside business hours.",
    aiConfidence: 0.82,
  },
  {
    id: "THR-006",
    type: "Zero-Day Exploit",
    severity: "critical" as const,
    source: "198.51.100.78",
    target: "vpn-gateway.acme.com",
    status: "investigating" as const,
    timestamp: "2026-03-12T03:12:09Z",
    description:
      "Potential zero-day exploitation of VPN gateway firmware vulnerability allowing unauthenticated remote code execution.",
    aiConfidence: 0.88,
  },
  {
    id: "THR-007",
    type: "Credential Stuffing",
    severity: "medium" as const,
    source: "Rotating proxy network",
    target: "auth.acme.com/login",
    status: "blocked" as const,
    timestamp: "2026-03-12T02:58:44Z",
    description:
      "Large-scale credential stuffing attack using leaked database credentials with 12,400 unique username/password combinations attempted.",
    aiConfidence: 0.93,
  },
  {
    id: "THR-008",
    type: "Data Exfiltration",
    severity: "high" as const,
    source: "compromised-app-server-03",
    target: "45.33.32.156:443",
    status: "blocked" as const,
    timestamp: "2026-03-11T23:41:15Z",
    description:
      "DNS tunneling detected exfiltrating encoded data packets to external command-and-control server via seemingly legitimate DNS queries.",
    aiConfidence: 0.91,
  },
  {
    id: "THR-009",
    type: "Brute Force",
    severity: "low" as const,
    source: "192.0.2.100",
    target: "ssh://bastion.acme.com",
    status: "blocked" as const,
    timestamp: "2026-03-11T22:10:30Z",
    description:
      "SSH brute force attack detected with 5,200 failed authentication attempts against bastion host from single source IP.",
    aiConfidence: 0.98,
  },
  {
    id: "THR-010",
    type: "Supply Chain",
    severity: "high" as const,
    source: "npm:malicious-utils@2.1.0",
    target: "ci/cd-pipeline",
    status: "investigating" as const,
    timestamp: "2026-03-11T20:05:55Z",
    description:
      "Compromised npm dependency detected in CI/CD pipeline containing obfuscated code that exfiltrates environment variables during build.",
    aiConfidence: 0.86,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockThreats,
    meta: {
      total: mockThreats.length,
      critical: mockThreats.filter((t) => t.severity === "critical").length,
      high: mockThreats.filter((t) => t.severity === "high").length,
      medium: mockThreats.filter((t) => t.severity === "medium").length,
      low: mockThreats.filter((t) => t.severity === "low").length,
      blocked: mockThreats.filter((t) => t.status === "blocked").length,
      investigating: mockThreats.filter((t) => t.status === "investigating")
        .length,
      mitigating: mockThreats.filter((t) => t.status === "mitigating").length,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.target || !body.scanType) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: target, scanType",
        },
        { status: 400 }
      );
    }

    const scanId = `SCAN-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json(
      {
        success: true,
        data: {
          scanId,
          target: body.target,
          scanType: body.scanType,
          status: "initiated",
          estimatedDuration: "4-6 minutes",
          initiatedAt: new Date().toISOString(),
          message: `Threat scan initiated for target "${body.target}" using ${body.scanType} scan profile.`,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
