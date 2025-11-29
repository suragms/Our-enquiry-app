import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Fetch all portfolios
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    const portfolios = await db.portfolio.findMany({
      where: featured === 'true' ? { featured: true } : {},
      include: {
        media: true,
        teamMembers: true,
      },
      orderBy: [
        { featured: 'desc' },
        { displayOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({ portfolios }, { status: 200 });
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolios' },
      { status: 500 }
    );
  }
}

// POST - Create new portfolio
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      techStack,
      projectUrl,
      featured,
      displayOrder,
      media,
      teamMembers,
    } = body;

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const portfolio = await db.portfolio.create({
      data: {
        title,
        description,
        techStack,
        projectUrl,
        featured: featured || false,
        displayOrder: displayOrder || 0,
        media: {
          create: media || [],
        },
        teamMembers: {
          create: teamMembers || [],
        },
      },
      include: {
        media: true,
        teamMembers: true,
      },
    });

    return NextResponse.json({ portfolio }, { status: 201 });
  } catch (error) {
    console.error('Error creating portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to create portfolio' },
      { status: 500 }
    );
  }
}
