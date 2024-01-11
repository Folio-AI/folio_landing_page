import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
    try {
        // Parse request body
        const body = await request.json();
        const { userEmail, onboardInfo } = body;

        if (!userEmail || !onboardInfo) {
            return new Response(JSON.stringify({ error: "Missing data" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        const db = (await clientPromise).db('test');
        const usersCollection = db.collection('users');
        const resumeInfoCollection = db.collection('resumeInfo');

        // Update users collection
        await usersCollection.updateOne(
            { email: userEmail },
            {
                $set: {
                    name: { firstName: onboardInfo.bio.firstName, lastName: onboardInfo.bio.lastName },
                    address: onboardInfo.bio.address,
                    phoneNumbers: [onboardInfo.bio.phone],
                    skills: onboardInfo.skills,
                    links: {
                        personalWebsite: onboardInfo.bio.website,
                        github: onboardInfo.bio.github,
                        linkedin: onboardInfo.bio.linkedin,
                        devpost: onboardInfo.bio.devpost
                    }
                }
            },
            { upsert: true }
        );

        // Get user's ObjectId
        const user = await usersCollection.findOne({ email: userEmail });
        const userId = user?._id;

        // Update resumeInfo collection
        await resumeInfoCollection.updateOne(
            { userId: userId },
            { $set: { workExperience: onboardInfo.workExperience } },
            { upsert: true }
        );

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error in POST:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
