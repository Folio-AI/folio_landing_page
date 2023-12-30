import jwt from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb'; // Adjust the path to your MongoDB client

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    try {
        if (!token) {
            throw new Error('Token is required for verification.');
        }

        // Decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const db = (await clientPromise).db('test');

        // Find the user by email and verify if the token matches
        const user = await db.collection('users').findOne({ email: decoded.email });
        if (!user || user.verificationToken !== token) {
            throw new Error('Invalid or expired verification token.');
        }

        // Update the user's verified status
        const result = await db.collection('users').updateOne(
            { email: decoded.email },
            {
                $set: { isVerified: true }
            }
        );

        if (result.modifiedCount === 0) {
            throw new Error('User not found or already verified.');
        }

        return new Response(JSON.stringify({ message: 'Email successfully verified.' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: error.message || 'Invalid or expired token.' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}
