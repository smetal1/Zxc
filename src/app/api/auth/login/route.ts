import { NextRequest, NextResponse } from "next/server";

const mockUsers = [
  {
    id: "USR-001",
    name: "Alex Morgan",
    email: "alex@acme.com",
    role: "admin",
    password: "admin123",
  },
  {
    id: "USR-002",
    name: "Sarah Chen",
    email: "sarah@acme.com",
    role: "analyst",
    password: "analyst123",
  },
  {
    id: "USR-003",
    name: "David Kim",
    email: "david@acme.com",
    role: "viewer",
    password: "viewer123",
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: email, password",
        },
        { status: 400 }
      );
    }

    const user = mockUsers.find(
      (u) => u.email === body.email && u.password === body.password
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const token = `mock-jwt-${Buffer.from(`${user.id}:${user.email}:${Date.now()}`).toString("base64")}`;

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
