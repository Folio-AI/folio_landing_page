import {exampleData, candidateInfo} from './testData'
import {Resume} from './tool'
import * as fs from 'fs';

const {Packer} = require('docx')
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);


export async function GET(request: Request) {
    // const data = await request.json();
    const res = new Resume(candidateInfo, exampleData);
    const value = await res.render(); 
    const buffer: Buffer = await Packer.toBuffer(value); // contains a docx file in the buffer
    
    const ext = '.pdf'
    let pdfBuf = await libre.convertAsync(buffer, ext, undefined)
    console.log(pdfBuf);

    const responseData = JSON.stringify(exampleData);
    return new Response(pdfBuf, {  // Return the HTML string, not the entire object
        status: 200
    });
}
