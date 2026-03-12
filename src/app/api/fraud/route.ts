import { NextResponse } from "next/server";

const mockFraudAnalytics = {
  totalTransactions: 1_284_563,
  fraudDetected: 1_847,
  amountSaved: 4_231_890.5,
  falsePositiveRate: 0.023,
  recentFraud: [
    {
      id: "FRD-001",
      type: "Card Not Present",
      amount: 12_450.0,
      riskScore: 0.96,
      location: "Lagos, Nigeria",
      status: "blocked",
      timestamp: "2026-03-12T08:14:22Z",
    },
    {
      id: "FRD-002",
      type: "Account Takeover",
      amount: 8_320.0,
      riskScore: 0.94,
      location: "Moscow, Russia",
      status: "blocked",
      timestamp: "2026-03-12T07:42:18Z",
    },
    {
      id: "FRD-003",
      type: "Synthetic Identity",
      amount: 25_000.0,
      riskScore: 0.89,
      location: "Miami, FL",
      status: "investigating",
      timestamp: "2026-03-12T06:55:03Z",
    },
    {
      id: "FRD-004",
      type: "Wire Transfer Fraud",
      amount: 150_000.0,
      riskScore: 0.97,
      location: "Shenzhen, China",
      status: "blocked",
      timestamp: "2026-03-12T05:30:45Z",
    },
    {
      id: "FRD-005",
      type: "Payment Card Skimming",
      amount: 3_210.0,
      riskScore: 0.78,
      location: "Chicago, IL",
      status: "investigating",
      timestamp: "2026-03-12T04:12:33Z",
    },
    {
      id: "FRD-006",
      type: "Chargeback Fraud",
      amount: 1_890.0,
      riskScore: 0.72,
      location: "London, UK",
      status: "confirmed",
      timestamp: "2026-03-12T03:28:17Z",
    },
    {
      id: "FRD-007",
      type: "Business Email Compromise",
      amount: 87_500.0,
      riskScore: 0.91,
      location: "São Paulo, Brazil",
      status: "blocked",
      timestamp: "2026-03-12T02:05:50Z",
    },
    {
      id: "FRD-008",
      type: "Refund Abuse",
      amount: 4_670.0,
      riskScore: 0.65,
      location: "Toronto, Canada",
      status: "reviewing",
      timestamp: "2026-03-11T23:48:29Z",
    },
    {
      id: "FRD-009",
      type: "Loyalty Point Fraud",
      amount: 2_100.0,
      riskScore: 0.81,
      location: "Berlin, Germany",
      status: "confirmed",
      timestamp: "2026-03-11T22:15:41Z",
    },
    {
      id: "FRD-010",
      type: "Invoice Fraud",
      amount: 34_200.0,
      riskScore: 0.88,
      location: "Dubai, UAE",
      status: "blocked",
      timestamp: "2026-03-11T20:33:06Z",
    },
  ],
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockFraudAnalytics,
    meta: {
      detectionRate: (
        (mockFraudAnalytics.fraudDetected /
          mockFraudAnalytics.totalTransactions) *
        100
      ).toFixed(4),
      totalBlocked: mockFraudAnalytics.recentFraud.filter(
        (f) => f.status === "blocked"
      ).length,
      totalInvestigating: mockFraudAnalytics.recentFraud.filter(
        (f) => f.status === "investigating"
      ).length,
      lastUpdated: new Date().toISOString(),
    },
  });
}
