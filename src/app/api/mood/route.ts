import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get mood entries for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const moodEntries = await prisma.moodEntry.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });

    return NextResponse.json({ moodEntries });
  } catch (error) {
    console.error("Get mood entries error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create a new mood entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      mood,
      energy,
      anxiety,
      stress,
      sleep,
      notes,
      activities,
      triggers,
      location,
      weather,
    } = body;

    // Validate required fields
    if (!userId || !mood) {
      return NextResponse.json(
        { error: "User ID and mood are required" },
        { status: 400 }
      );
    }

    // Validate mood scale (1-10)
    if (mood < 1 || mood > 10) {
      return NextResponse.json(
        { error: "Mood must be between 1 and 10" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create mood entry
    const moodEntry = await prisma.moodEntry.create({
      data: {
        userId,
        mood,
        energy,
        anxiety,
        stress,
        sleep,
        notes,
        activities: activities ? JSON.stringify(activities) : null,
        triggers: triggers ? JSON.stringify(triggers) : null,
        location,
        weather,
      },
    });

    // Update user's last seen
    await prisma.user.update({
      where: { id: userId },
      data: { lastSeen: new Date() },
    });

    return NextResponse.json(
      {
        message: "Mood entry created successfully",
        moodEntry: {
          ...moodEntry,
          activities: activities,
          triggers: triggers,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create mood entry error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
