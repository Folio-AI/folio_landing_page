import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data.link) {
            return new Response("Error: Request body contains incorrect fields.", {
                status: 400
            });
        }

        const link = data.link;
        const response = await fetch(link);
        const body = await response.text();

        const { document } = (new JSDOM(body)).window;
        let jobInfo = { titles: [], descriptions: [] };

        // Extract potential job titles
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(element => {
            const potentialTitle = element.textContent.trim();
            if (potentialTitle.length > 10 && potentialTitle.length < 100) {
                jobInfo.titles.push(potentialTitle);
            }
        });

        // Extract potential job descriptions
        const textElements = document.querySelectorAll('p, li');
        textElements.forEach(element => {
            const potentialDescription = element.textContent.trim();
            if (potentialDescription.length > 50 && potentialDescription.length < 1000) {
                jobInfo.descriptions.push(potentialDescription);
            }
        });

        const result = { 
            jobHTML: body,
            jobInfo
        };

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (e) {
        return new Response(`An unexpected error occurred (${e.name}): ${e.message}`, {
            status: 400,
            headers: {
                'X-Error-Name': e.name,
                'X-Error-Message': e.message
            }
        });
    }
}
