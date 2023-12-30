import NextAuth from 'next-auth';

import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';

import clientPromise from "@/lib/mongodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter"

import { Account, User } from 'next-auth';


import bcrypt from 'bcryptjs';

const authOptions = {
    // adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              email: { label: "Email", type: "text", placeholder: "will@usefolio.ai" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log("Credentials", credentials);
                console.log("Req", req);

                const dbPromise = await clientPromise;
                const db = dbPromise.db("test");

                if (credentials) {
                    // Find user by email
                    const user = await db.collection('users').findOne({ email: credentials.email });
                    if (!user) {
                        throw new Error("The email and password you entered did not match our records. Please double-check and try again.");
                    }

                    // Validate password
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    
                    if (isValid) {
                        return { ...user, id: user._id.toString() };
                    } else {
                        throw new Error("The email and password you entered did not match our records. Please double-check and try again.");
                    }
                } else {
                    throw new Error("Invalid request. Please try again.");
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
            authorization: {
                params: {
                  prompt: "select_account",
                },
            },
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_ID || '',
            clientSecret: process.env.LINKEDIN_SECRET || '',
            authorization: {
                params: { scope: 'openid profile email' },
              },
              issuer: 'https://www.linkedin.com',
              jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
              profile(profile, tokens) {
                const defaultImage =
                  'https://cdn-icons-png.flaticon.com/512/174/174857.png';
                return {
                  id: profile.sub,
                  name: profile.name,
                  email: profile.email,
                  image: profile.picture ?? defaultImage,
                };
              },
        })
    ],
    callbacks: {
        async signIn({
            user,
            account,
            profile,
            email,
            credentials,
          }: {
            user: User,
            account: Account | null,
            profile?: any,
            email?: any,
            credentials?: any,
          }) {
            const dbPromise = await clientPromise;
            const db = dbPromise.db("test");

            console.log("User", user);
            console.log("Account", account);
            console.log("Profile", profile);
            console.log("Email", email);

            // Check if the user already exists with a different account
            const existingUser = await db.collection('users').findOne({ email: user.email });

            if (existingUser) {
                console.log("Existing user:", existingUser);

                if (account) {
                    // Check if account is already linked
                    const existingLinkedAccount = await db.collection('accounts').findOne({
                        userId: existingUser.id,
                        provider: account.provider,
                        providerAccountId: account.providerAccountId,
                    });

                    if (!existingLinkedAccount) {
                        console.log("Existing account:", existingLinkedAccount);

                        // Link the accounts
                        await db.collection('accounts').insertOne({
                            userId: existingUser.id,
                            ...account
                        });
                    }     
                }              

                return true;
            } else {
                // Create a new user in users collection using OAuth Profile info
                const newUser = await db.collection('users').insertOne({
                    email: user.email,
                    name: user.name,
                    image: user.image
                });

                // Create a new account in accounts collection linked to the user id
                const newAccount = await db.collection('accounts').insertOne({
                    userId: newUser.insertedId,
                    ...account
                });

                return true;
            }
        },
        async redirect({ url, baseUrl } : { url: string, baseUrl: string }) {
            console.log("Redirecting", url, baseUrl);

            // Redirect to the dashboard after login
            if (url === `${baseUrl}/api/auth/callback`) {
                return '/dashboard';
            }

            // Redirect to the homepage after logout
            if (url === `${baseUrl}/api/auth/signout`) {
                return '/';
            }

            // For other cases, return to the passed URL
            return url;
        },
        async jwt({ token, user, profile } : { token: any, user: any, profile? : any }) {
            console.log("JWT Token", token)
            console.log("JWT User", user);
          
            // Check if the user object exists, which indicates a new sign-in
            if (user) {
              const dbPromise = await clientPromise;
              const db = dbPromise.db("test");
          
              // Fetch user details from the database
              const userDetails = await db.collection('users').findOne({ email: user.email });
            
              // Add user details to the token
              if (userDetails) {
                token.user = userDetails;
                console.log("New Token:", token)
              }
            }
          
            return token;
        },
        async session({ session, token, user } : { session: any, token: any, user: any }) {
            console.log("Session", session);
            console.log("Token", token);
            console.log("User", user)
          
            // Use the user details from the token
            if (token.user) {
              session.user = token.user;
            }
          
            return session;
        }          
        // async jwt({ token, user } : { token: any, user: any }) {
        //     console.log("JWT", token, user);
        //     user && (token.user = user)
        //     return token
        // },
        // async session({ session, token } : { session: any, token: any }) {
        //   console.log("Session", session)
        //   console.log("Token", token)

        //   const dbPromise = await clientPromise;
        //   const db = dbPromise.db("test");

        //   // Here, you can use either the token's userId or email to fetch the user from the database
        //   const userDetails = await db.collection('users').findOne({ email: token.email });
        
        //   console.log("User from MongoDB", userDetails);

        //   if (userDetails) {
        //       // Augment the session object with user details from the database -> add new values if not present in session object, but don't overwrite existing values
        //       session.user = userDetails;
        //   }

        //   return session;
        // }
    },
    pages: {
        signIn: '/signin'
    },
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};