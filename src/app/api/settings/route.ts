import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    let settings = await db.companySettings.findFirst();
    
    // If no settings exist, create default
    if (!settings) {
      settings = await db.companySettings.create({
        data: {
          companyName: 'HexaStack Solutions',
          primaryEmail: 'anandukrishnapa2000@gmail.com',
          primaryWhatsApp: '+917591999365',
          secondaryWhatsApp: '+917012714150',
          leadName1: 'Anandu Krishna',
          leadEmail1: 'anandukrishnapa2000@gmail.com',
          leadWhatsApp1: '+917591999365',
          leadName2: 'Surag',
          leadWhatsApp2: '+917012714150',
          address: 'Kerala, India',
          tagline: 'Building Digital Excellence',
          description: 'We create innovative web applications, mobile solutions, and AI-powered tools that transform your business ideas into reality.',
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to fetch company settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company settings' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get the first settings record
    let settings = await db.companySettings.findFirst();
    
    if (!settings) {
      // Create if doesn't exist
      settings = await db.companySettings.create({
        data: body,
      });
    } else {
      // Update existing
      settings = await db.companySettings.update({
        where: { id: settings.id },
        data: body,
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to update company settings:', error);
    return NextResponse.json(
      { error: 'Failed to update company settings' },
      { status: 500 }
    );
  }
}
