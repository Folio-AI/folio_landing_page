// routes.ts
import clientPromise from '@/lib/mongodb'; // Adjust the path to your MongoDB client
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import { render } from '@react-email/render';
import { VerifyEmail } from '@/components/emails/VerifyEmail';

import { SES } from 'aws-sdk';

async function sendVerificationEmail(firstName: string, email: string, baseUrl: string, verificationToken: string) {
  const ses = new SES({
  accessKeyId: process.env.AWS_SES_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SES_ACCESS_SECRET,
  region: process.env.AWS_REGION
  });

  const emailHtml = render(<VerifyEmail firstName={firstName} inviteLink={`${baseUrl}/api/auth/verify?token=${verificationToken}`} />);

  const params = {
    Source: 'Folio AI <will@usefolio.ai>',
    ReplyToAddresses: ['noreply@usefolio.ai'],
    Destination: {
      ToAddresses: [email]
    },
    Message: {
      Subject: {
        Data: 'Folio AI - Confirm Your Account'
      },
      Body: {
        Html: {
          Data: emailHtml
        }
      }
    }
  };

  await ses.sendEmail(params).promise();
}


export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    const { firstName, lastName, email, password } = reqBody;

    const host = request.headers.get('host');
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;

    const db = (await clientPromise).db('test');

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'The email you entered already exists. Sign in instead.' }), {
        status: 409,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET || '', { expiresIn: '1d' });

    const newUser = await db.collection('users').insertOne({
      email,
      password: hashedPassword,
      verificationToken,
      verificationExpires: new Date(Date.now() + 86400000), // 1 day in milliseconds
      isVerified: false
    });

    // Sending the verification email is now a non-blocking operation
    sendVerificationEmail(firstName, email, baseUrl, verificationToken).catch(error => {
      console.error('Failed to send verification email:', error);
    });

    return new Response(JSON.stringify({ message: 'User created successfully. Please check your email to verify.'}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Something went wrong on our end. Please try again later.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}