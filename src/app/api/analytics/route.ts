import { NextResponse } from "next/server";

function generateThreatTimeline(): Array<{
  date: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
}> {
  const timeline = [];
  const now = new Date("2026-03-12");

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseMultiplier = isWeekend ? 0.6 : 1.0;

    timeline.push({
      date: dateStr,
      critical: Math.floor((Math.random() * 5 + 1) * baseMultiplier),
      high: Math.floor((Math.random() * 12 + 3) * baseMultiplier),
      medium: Math.floor((Math.random() * 25 + 8) * baseMultiplier),
      low: Math.floor((Math.random() * 40 + 15) * baseMultiplier),
    });
  }

  return timeline;
}

const mockAnalytics = {
  threatStats: {
    totalThreats: 15_847,
    blockedThreats: 14_923,
    activeThreats: 42,
    investigatingThreats: 18,
    avgResponseTime: "2.3 minutes",
    blockRate: 94.2,
    threatsToday: 237,
    threatsTrend: +12.4,
  },
  securityScore: {
    overall: 87,
    network: 92,
    application: 84,
    data: 89,
    identity: 91,
    endpoint: 78,
    cloud: 83,
    trend: +3,
    lastCalculated: "2026-03-12T09:00:00Z",
  },
  recentActivity: [
    {
      id: "ACT-001",
      type: "threat_blocked",
      message: "Ransomware payload blocked on prod-db-01",
      severity: "critical",
      timestamp: "2026-03-12T08:23:41Z",
    },
    {
      id: "ACT-002",
      type: "scan_completed",
      message: "Full vulnerability scan completed across 142 assets",
      severity: "info",
      timestamp: "2026-03-12T08:00:00Z",
    },
    {
      id: "ACT-003",
      type: "policy_updated",
      message: "Firewall rules updated: blocked 34 new malicious IP ranges",
      severity: "medium",
      timestamp: "2026-03-12T07:45:00Z",
    },
    {
      id: "ACT-004",
      type: "incident_created",
      message: "New incident: Spear-phishing campaign targeting executives",
      severity: "high",
      timestamp: "2026-03-12T07:55:12Z",
    },
    {
      id: "ACT-005",
      type: "fraud_detected",
      message: "Wire transfer fraud blocked: $150,000 from compromised account",
      severity: "high",
      timestamp: "2026-03-12T05:30:45Z",
    },
    {
      id: "ACT-006",
      type: "compliance_alert",
      message: "PCI DSS quarterly scan overdue - requires immediate attention",
      severity: "medium",
      timestamp: "2026-03-12T06:00:00Z",
    },
    {
      id: "ACT-007",
      type: "user_locked",
      message: "Account jdoe@acme.com locked due to anomalous access pattern",
      severity: "medium",
      timestamp: "2026-03-12T04:45:20Z",
    },
    {
      id: "ACT-008",
      type: "threat_blocked",
      message: "DDoS mitigation engaged: 2.4 Tbps attack absorbed",
      severity: "high",
      timestamp: "2026-03-12T06:30:00Z",
    },
    {
      id: "ACT-009",
      type: "patch_deployed",
      message: "Emergency patch deployed for OpenSSL vulnerability on 3 servers",
      severity: "critical",
      timestamp: "2026-03-12T03:00:00Z",
    },
    {
      id: "ACT-010",
      type: "threat_blocked",
      message: "Credential stuffing attack blocked: 12,400 attempts from proxy network",
      severity: "medium",
      timestamp: "2026-03-12T02:58:44Z",
    },
    {
      id: "ACT-011",
      type: "incident_resolved",
      message: "DNS tunneling incident resolved - server reimaged",
      severity: "info",
      timestamp: "2026-03-12T04:20:00Z",
    },
    {
      id: "ACT-012",
      type: "ai_model_updated",
      message: "Threat detection ML model retrained with 24,000 new samples",
      severity: "info",
      timestamp: "2026-03-12T01:00:00Z",
    },
  ],
  threatTimeline: generateThreatTimeline(),
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockAnalytics,
    meta: {
      generatedAt: new Date().toISOString(),
      timelineRange: "30 days",
      dataPoints: mockAnalytics.threatTimeline.length,
    },
  });
}
