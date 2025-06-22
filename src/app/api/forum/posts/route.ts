import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get all forum posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where = categoryId ? { categoryId } : {};

    const posts = await prisma.forumPost.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            avatar: true,
            isAnonymous: true,
          },
        },
        category: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Get forum posts error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create a new forum post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, categoryId, title, content, tags, isAnonymous } = body;

    // Validate required fields
    if (!userId || !categoryId || !title || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    // Check if category exists
    const category = await prisma.forumCategory.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Create post
    const post = await prisma.forumPost.create({
      data: {
        userId,
        categoryId,
        title,
        content,
        tags: tags || [],
        isAnonymous: isAnonymous || false,
      },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            avatar: true,
            isAnonymous: true,
          },
        },
        category: true,
      },
    });

    return NextResponse.json(
      {
        message: "Post created successfully",
        post,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create forum post error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
