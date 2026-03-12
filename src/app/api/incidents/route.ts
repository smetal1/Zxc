import { NextRequest, NextResponse } from "next/server";

const mockIncidents = [
  {
    id: "INC-001",
    title: "Ransomware Outbreak on Production Database Cluster",
    severity: "critical",
    status: "investigating",
    assignee: "Sarah Chen",
    createdAt: "2026-03-12T08:23:41Z",
    updatedAt: "2026-03-12T09:15:00Z",
    description:
      "Ransomware payload detected on prod-db-01 with lateral movement attempts to prod-db-02 and prod-db-03. Affected systems isolated. Backup integrity verification in progress.",
  },
  {
    id: "INC-002",
    title: "Spear-Phishing Campaign Targeting Executive Team",
    severity: "high",
    status: "mitigating",
    assignee: "Marcus Johnson",
    createdAt: "2026-03-12T07:55:12Z",
    updatedAt: "2026-03-12T08:40:00Z",
    description:
      "Coordinated phishing campaign impersonating the CEO sent to 15 executive team members. Three users clicked the link; credentials have been rotated and sessions invalidated.",
  },
  {
    id: "INC-003",
    title: "DDoS Attack on API Gateway - 2.4 Tbps",
    severity: "high",
    status: "mitigating",
    assignee: "Aisha Patel",
    createdAt: "2026-03-12T06:30:00Z",
    updatedAt: "2026-03-12T08:00:00Z",
    description:
      "Volumetric DDoS attack utilizing UDP amplification vectors. Upstream mitigation engaged. API latency elevated but services remain available through CDN failover.",
  },
  {
    id: "INC-004",
    title: "Unauthorized Access to Customer Payment Records",
    severity: "critical",
    status: "investigating",
    assignee: "David Kim",
    createdAt: "2026-03-12T05:17:33Z",
    updatedAt: "2026-03-12T07:30:00Z",
    description:
      "SQL injection exploit on checkout API resulted in unauthorized query execution. Preliminary analysis indicates 2,300 customer records may have been accessed. Forensic investigation underway.",
  },
  {
    id: "INC-005",
    title: "Suspicious Data Exfiltration via DNS Tunneling",
    severity: "high",
    status: "resolved",
    assignee: "Elena Rodriguez",
    createdAt: "2026-03-11T23:41:15Z",
    updatedAt: "2026-03-12T04:20:00Z",
    description:
      "DNS tunneling channel detected from compromised application server to external C2. Approximately 340MB of encoded data transmitted before detection. Server reimaged and credentials rotated.",
  },
  {
    id: "INC-006",
    title: "Compromised NPM Dependency in CI/CD Pipeline",
    severity: "medium",
    status: "investigating",
    assignee: "James Wright",
    createdAt: "2026-03-11T20:05:55Z",
    updatedAt: "2026-03-12T06:00:00Z",
    description:
      "Malicious code found in npm package 'malicious-utils@2.1.0' that exfiltrates environment variables during build. Package removed from lockfile. Auditing all recent builds for exposure.",
  },
  {
    id: "INC-007",
    title: "Brute Force Attack on Bastion Host SSH",
    severity: "low",
    status: "resolved",
    assignee: "Nina Kowalski",
    createdAt: "2026-03-11T22:10:30Z",
    updatedAt: "2026-03-11T23:00:00Z",
    description:
      "5,200 failed SSH login attempts from 192.0.2.100 against bastion host. Source IP blocked at firewall. No successful authentications detected. Fail2ban rules tightened.",
  },
  {
    id: "INC-008",
    title: "Anomalous Insider Data Access Pattern",
    severity: "medium",
    status: "new",
    assignee: "Unassigned",
    createdAt: "2026-03-12T04:45:20Z",
    updatedAt: "2026-03-12T04:45:20Z",
    description:
      "User jdoe@acme.com downloaded 847 confidential documents from S3 bucket 'acme-confidential-docs' between 02:00-04:00 outside normal working hours. Account temporarily suspended pending HR review.",
  },
  {
    id: "INC-009",
    title: "VPN Gateway Zero-Day Exploitation Attempt",
    severity: "critical",
    status: "new",
    assignee: "Unassigned",
    createdAt: "2026-03-12T03:12:09Z",
    updatedAt: "2026-03-12T03:12:09Z",
    description:
      "Potential zero-day exploit targeting VPN gateway firmware. Unusual memory allocation patterns detected. Vendor notified and emergency patch requested. Alternate VPN path activated.",
  },
  {
    id: "INC-010",
    title: "Wire Transfer Fraud Attempt - $150,000",
    severity: "high",
    status: "resolved",
    assignee: "Carlos Mendez",
    createdAt: "2026-03-12T05:30:45Z",
    updatedAt: "2026-03-12T06:45:00Z",
    description:
      "Fraudulent wire transfer of $150,000 intercepted by AI fraud detection system. Originated from compromised business email account. Transaction reversed and account secured.",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockIncidents,
    meta: {
      total: mockIncidents.length,
      new: mockIncidents.filter((i) => i.status === "new").length,
      investigating: mockIncidents.filter((i) => i.status === "investigating")
        .length,
      mitigating: mockIncidents.filter((i) => i.status === "mitigating").length,
      resolved: mockIncidents.filter((i) => i.status === "resolved").length,
      critical: mockIncidents.filter((i) => i.severity === "critical").length,
      high: mockIncidents.filter((i) => i.severity === "high").length,
      medium: mockIncidents.filter((i) => i.severity === "medium").length,
      low: mockIncidents.filter((i) => i.severity === "low").length,
      lastUpdated: new Date().toISOString(),
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.severity || !body.description) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: title, severity, description",
        },
        { status: 400 }
      );
    }

    const validSeverities = ["critical", "high", "medium", "low"];
    if (!validSeverities.includes(body.severity)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid severity. Must be one of: ${validSeverities.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const incidentId = `INC-${Date.now().toString(36).toUpperCase()}`;

    const newIncident = {
      id: incidentId,
      title: body.title,
      severity: body.severity,
      status: "new",
      assignee: body.assignee || "Unassigned",
      createdAt: now,
      updatedAt: now,
      description: body.description,
    };

    return NextResponse.json(
      {
        success: true,
        data: newIncident,
        message: `Incident ${incidentId} created successfully.`,
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
