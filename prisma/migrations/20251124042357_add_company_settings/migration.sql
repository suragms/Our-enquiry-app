-- CreateTable
CREATE TABLE "CompanySettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT NOT NULL DEFAULT 'HexaStack Solutions',
    "primaryEmail" TEXT NOT NULL DEFAULT 'anandukrishnapa2000@gmail.com',
    "primaryWhatsApp" TEXT NOT NULL DEFAULT '+917591999365',
    "secondaryWhatsApp" TEXT DEFAULT '+917012714150',
    "leadName1" TEXT NOT NULL DEFAULT 'Anandu Krishna',
    "leadEmail1" TEXT NOT NULL DEFAULT 'anandukrishnapa2000@gmail.com',
    "leadWhatsApp1" TEXT NOT NULL DEFAULT '+917591999365',
    "leadName2" TEXT NOT NULL DEFAULT 'Surag',
    "leadWhatsApp2" TEXT NOT NULL DEFAULT '+917012714150',
    "address" TEXT DEFAULT 'Kerala, India',
    "tagline" TEXT DEFAULT 'Building Digital Excellence',
    "description" TEXT DEFAULT 'We create innovative web applications, mobile solutions, and AI-powered tools that transform your business ideas into reality.',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
