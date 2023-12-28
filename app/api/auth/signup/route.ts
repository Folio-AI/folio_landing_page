// routes.ts
import clientPromise from '@/lib/mongodb'; // Adjust the path to your MongoDB client
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const db = (await clientPromise).db('test');

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'The email you entered already exists. Sign in instead.' }), {
        status: 409,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await db.collection('users').insertOne({ email, password: hashedPassword });

    return new Response(JSON.stringify({ message: 'User created successfully'}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Something went wrong on our end. Please try again later.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
