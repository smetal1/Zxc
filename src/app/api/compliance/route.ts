import { NextResponse } from "next/server";

const mockCompliance = {
  overallScore: 87,
  frameworks: [
    {
      name: "SOC 2 Type II",
      score: 92,
      issues: 3,
      lastAudit: "2026-01-15",
      nextAudit: "2026-07-15",
    },
    {
      name: "ISO 27001",
      score: 89,
      issues: 5,
      lastAudit: "2025-11-20",
      nextAudit: "2026-05-20",
    },
    {
      name: "PCI DSS 4.0",
      score: 84,
      issues: 8,
      lastAudit: "2026-02-10",
      nextAudit: "2026-08-10",
    },
    {
      name: "HIPAA",
      score: 91,
      issues: 2,
      lastAudit: "2025-12-05",
      nextAudit: "2026-06-05",
    },
    {
      name: "GDPR",
      score: 86,
      issues: 6,
      lastAudit: "2026-01-28",
      nextAudit: "2026-07-28",
    },
    {
      name: "NIST CSF 2.0",
      score: 78,
      issues: 11,
      lastAudit: "2025-10-30",
      nextAudit: "2026-04-30",
    },
  ],
  controls: [
    {
      id: "CTL-001",
      framework: "SOC 2 Type II",
      category: "Access Control",
      description:
        "Multi-factor authentication is enforced for all privileged accounts and remote access.",
      status: "compliant",
    },
    {
      id: "CTL-002",
      framework: "SOC 2 Type II",
      category: "Monitoring",
      description:
        "Continuous security monitoring and alerting is operational across all production systems.",
      status: "compliant",
    },
    {
      id: "CTL-003",
      framework: "SOC 2 Type II",
      category: "Incident Response",
      description:
        "Incident response playbooks are documented and tested quarterly.",
      status: "non_compliant",
    },
    {
      id: "CTL-004",
      framework: "ISO 27001",
      category: "Risk Assessment",
      description:
        "Annual risk assessment conducted with documented risk treatment plans for all identified threats.",
      status: "compliant",
    },
    {
      id: "CTL-005",
      framework: "ISO 27001",
      category: "Asset Management",
      description:
        "Complete inventory of information assets with assigned ownership and classification labels.",
      status: "partial",
    },
    {
      id: "CTL-006",
      framework: "PCI DSS 4.0",
      category: "Network Security",
      description:
        "Network segmentation isolates cardholder data environment from other network segments.",
      status: "compliant",
    },
    {
      id: "CTL-007",
      framework: "PCI DSS 4.0",
      category: "Encryption",
      description:
        "All cardholder data is encrypted at rest using AES-256 and in transit using TLS 1.3.",
      status: "compliant",
    },
    {
      id: "CTL-008",
      framework: "PCI DSS 4.0",
      category: "Vulnerability Management",
      description:
        "Quarterly vulnerability scans and annual penetration tests are performed by approved scanning vendors.",
      status: "non_compliant",
    },
    {
      id: "CTL-009",
      framework: "HIPAA",
      category: "Data Protection",
      description:
        "Protected health information access is logged and auditable with minimum necessary access enforced.",
      status: "compliant",
    },
    {
      id: "CTL-010",
      framework: "HIPAA",
      category: "Breach Notification",
      description:
        "Breach notification procedures meet the 60-day reporting requirement with documented escalation paths.",
      status: "compliant",
    },
    {
      id: "CTL-011",
      framework: "GDPR",
      category: "Data Subject Rights",
      description:
        "Automated processes for handling data subject access requests within the 30-day requirement.",
      status: "partial",
    },
    {
      id: "CTL-012",
      framework: "GDPR",
      category: "Data Processing",
      description:
        "Records of processing activities are maintained with lawful basis documented for each processing operation.",
      status: "compliant",
    },
    {
      id: "CTL-013",
      framework: "NIST CSF 2.0",
      category: "Identify",
      description:
        "Business environment and governance structures are documented with cybersecurity roles defined.",
      status: "compliant",
    },
    {
      id: "CTL-014",
      framework: "NIST CSF 2.0",
      category: "Protect",
      description:
        "Security awareness training completed by all employees within the last 12 months.",
      status: "non_compliant",
    },
    {
      id: "CTL-015",
      framework: "NIST CSF 2.0",
      category: "Recover",
      description:
        "Disaster recovery plan tested annually with documented recovery time objectives met.",
      status: "partial",
    },
  ],
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockCompliance,
    meta: {
      totalFrameworks: mockCompliance.frameworks.length,
      totalControls: mockCompliance.controls.length,
      compliantControls: mockCompliance.controls.filter(
        (c) => c.status === "compliant"
      ).length,
      nonCompliantControls: mockCompliance.controls.filter(
        (c) => c.status === "non_compliant"
      ).length,
      partialControls: mockCompliance.controls.filter(
        (c) => c.status === "partial"
      ).length,
      lastUpdated: new Date().toISOString(),
    },
  });
}
