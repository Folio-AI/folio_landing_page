// routes.ts
import clientPromise from '@/lib/mongodb'; // Adjust the path to your MongoDB client
import bcrypt from 'bcryptjs';

import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

import { render } from '@react-email/render';
import { VerifyEmail } from '@/components/emails/VerifyEmail';

import { SES } from 'aws-sdk';

export async function POST(request: Request) {
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
  
      // Generate a verification token
      const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET || '', { expiresIn: '1d' });
      console.log(verificationToken);
  
      // Insert new user with verification token and its expiry
      await db.collection('users').insertOne({
        email,
        password: hashedPassword,
        verificationToken,
        verificationExpires: new Date(Date.now() + 86400000), // 1 day in milliseconds
        verified: false
      });
      
      // AWS SES Setup
      const ses = new SES({
        accessKeyId: process.env.AWS_SES_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SES_ACCESS_SECRET,
        region: process.env.AWS_REGION
      });

      const emailHtml = render(<VerifyEmail url={`http://localhost:3000/api/auth/verify?token=${verificationToken}`} />);

      // Send verification email
      const params = {
        Source: 'Folio AI <will@usefolio.ai>', // "From" name and address
        ReplyToAddresses: ['noreply@usefolio.ai'], // "Reply-To" address
        Destination: {
          ToAddresses: [email]
        },
        Message: {
          Subject: {
            Data: 'Folio AI - Verify Your Email'
          },
          Body: {
            Html: {
              Data: emailHtml
            }
          }
        }
      };

      await ses.sendEmail(params).promise();

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
  