import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Fetch single portfolio
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const portfolio = await db.portfolio.findUnique({
      where: { id: params.id },
      include: {
        media: true,
        teamMembers: true,
      },
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ portfolio }, { status: 200 });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}

// PUT - Update portfolio
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Delete existing media and team members, then create new ones
    await db.portfolioMedia.deleteMany({
      where: { portfolioId: params.id },
    });
    await db.portfolioTeamMember.deleteMany({
      where: { portfolioId: params.id },
    });

    const portfolio = await db.portfolio.update({
      where: { id: params.id },
      data: {
        title,
        description,
        techStack,
        projectUrl,
        featured,
        displayOrder,
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

    return NextResponse.json({ portfolio }, { status: 200 });
  } catch (error) {
    console.error('Error updating portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio' },
      { status: 500 }
    );
  }
}

// DELETE - Delete portfolio
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.portfolio.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: 'Portfolio deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to delete portfolio' },
      { status: 500 }
    );
  }
}
