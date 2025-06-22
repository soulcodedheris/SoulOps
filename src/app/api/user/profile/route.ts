import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";

function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded === "object" && "userId" in decoded) {
      return decoded as JwtPayload;
    }
    return null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId as string },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        displayName: true,
        age: true,
        gender: true,
        location: true,
        occupation: true,
        education: true,
        familyStatus: true,
        religion: true,
        culturalContext: true,
        language: true,
        interests: true,
        mentalHealthHistory: true,
        preferences: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const body = await request.json();
    const {
      age,
      gender,
      location,
      occupation,
      education,
      familyStatus,
      religion,
      culturalContext,
      language,
      interests,
      mentalHealthHistory,
      preferences,
    } = body;
    // Validate required fields
    if (!age || !gender || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId as string },
      data: {
        age: parseInt(age),
        gender,
        location,
        occupation,
        education,
        familyStatus,
        religion,
        culturalContext,
        language,
        interests: interests ? JSON.stringify(interests) : null,
        mentalHealthHistory: mentalHealthHistory
          ? JSON.stringify(mentalHealthHistory)
          : null,
        preferences: preferences ? JSON.stringify(preferences) : null,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        displayName: true,
        age: true,
        gender: true,
        location: true,
        occupation: true,
        education: true,
        familyStatus: true,
        religion: true,
        culturalContext: true,
        language: true,
        interests: true,
        mentalHealthHistory: true,
        preferences: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
