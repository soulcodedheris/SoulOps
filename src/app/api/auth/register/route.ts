import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, language, culturalContext } =
      body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Create user (password not stored in demo)
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        language: language || "en",
        culturalContext,
        displayName: `${firstName || ""} ${lastName || ""}`.trim() || undefined,
      },
    });

    // Create user preferences
    await prisma.userPreferences.create({
      data: {
        userId: user.id,
        language: language || "en",
        culturalContext,
      },
    });

    // Create privacy settings
    await prisma.privacySettings.create({
      data: {
        userId: user.id,
      },
    });

    // Return user (no password field to remove)
    return NextResponse.json(
      {
        message: "User created successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
