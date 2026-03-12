import { NextRequest, NextResponse } from "next/server";

const existingEmails = ["alex@acme.com", "sarah@acme.com", "david@acme.com"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.company || !body.password) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: name, email, company, password",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email format",
        },
        { status: 400 }
      );
    }

    if (body.password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          error: "Password must be at least 8 characters long",
        },
        { status: 400 }
      );
    }

    if (existingEmails.includes(body.email)) {
      return NextResponse.json(
        {
          success: false,
          error: "An account with this email already exists",
        },
        { status: 409 }
      );
    }

    const userId = `USR-${Date.now().toString(36).toUpperCase()}`;
    const token = `mock-jwt-${Buffer.from(`${userId}:${body.email}:${Date.now()}`).toString("base64")}`;

    return NextResponse.json(
      {
        success: true,
        data: {
          token,
          user: {
            id: userId,
            name: body.name,
            email: body.email,
            company: body.company,
            role: "viewer",
          },
        },
        message: "Account created successfully.",
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
