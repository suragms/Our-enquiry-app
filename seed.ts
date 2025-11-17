import { createUser } from './src/lib/auth';
import { db } from './src/lib/db';

async function seed() {
  try {
    // Create default admin user
    const adminUser = await createUser(
      'admin@example.com',
      'admin123',
      'Admin User',
      'SUPER_ADMIN'
    );
    
    console.log('Admin user created:', adminUser);

    // Create some sample projects
    const project1 = await db.project.create({
      data: {
        name: 'E-Commerce Platform',
        overview: 'A modern e-commerce platform built with React and Node.js, featuring real-time inventory management, secure payment processing, and responsive design.',
        techStack: 'React, Node.js, MongoDB, Stripe, Tailwind CSS',
        status: 'DELIVERED',
        createdById: adminUser.id,
      },
    });

    const project2 = await db.project.create({
      data: {
        name: 'AI-Powered Chatbot',
        overview: 'An intelligent customer service chatbot that uses natural language processing to provide instant responses and escalate complex issues to human agents.',
        techStack: 'Python, TensorFlow, FastAPI, React, WebSocket',
        status: 'IN_PROGRESS',
        createdById: adminUser.id,
      },
    });

    const project3 = await db.project.create({
      data: {
        name: 'Mobile Banking App',
        overview: 'A secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management features.',
        techStack: 'React Native, Node.js, PostgreSQL, JWT, Biometric APIs',
        status: 'COMPLETED',
        createdById: adminUser.id,
      },
    });

    console.log('Sample projects created:', { project1, project2, project3 });

    // Create sample feedbacks
    const feedback1 = await db.feedback.create({
      data: {
        name: 'Sarah Johnson',
        company: 'TechStart Inc.',
        content: 'Exceptional work! The team delivered a high-quality e-commerce platform that exceeded our expectations. The attention to detail and user experience design were outstanding.',
        rating: 5,
        isPublic: true,
        isApproved: true,
        projectId: project1.id,
      },
    });

    const feedback2 = await db.feedback.create({
      data: {
        name: 'Michael Chen',
        company: 'Global Finance Corp',
        content: 'The mobile banking app is secure, intuitive, and feature-rich. Our customers love the new interface and the biometric authentication works flawlessly.',
        rating: 5,
        isPublic: true,
        isApproved: true,
        projectId: project3.id,
      },
    });

    console.log('Sample feedbacks created:', { feedback1, feedback2 });

    // Create some project media
    await db.projectMedia.createMany({
      data: [
        {
          type: 'IMAGE',
          url: 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=E-Commerce+Dashboard',
          projectId: project1.id,
        },
        {
          type: 'IMAGE',
          url: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Product+Catalog',
          projectId: project1.id,
        },
        {
          type: 'IMAGE',
          url: 'https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=AI+Chatbot+Interface',
          projectId: project2.id,
        },
        {
          type: 'IMAGE',
          url: 'https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Mobile+Banking+App',
          projectId: project3.id,
        },
      ],
    });

    console.log('Sample project media created');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await db.$disconnect();
  }
}

seed();