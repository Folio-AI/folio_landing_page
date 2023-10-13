const { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableCell, TableRow, TabStopType, BorderStyle } = require('docx');
const fs = require('fs');
const {exampleData, candidateInfo} = require('./testData')

class Item {
    constructor() {
        this.static = {}; //company, start, end, etc.
        this.dynamic = {}; // description, etc.
    }

    renderBulletPoints = (...texts) => {
        return texts.map(text => new Paragraph({
            children: [new TextRun({ text: text })],
            bullet: {
                level: 0
            }
        }));
    }

    renderItem() {
        return [
            new Paragraph({
                children : [
                    new TextRun({
                        text: this.static.company,
                        bold: true
                    }),
                    new TextRun("\t"),
                    new TextRun({
                        text: this.static.location,
                        bold: true
                    })
                ],
                tabStops : [
                    {
                        type: TabStopType.RIGHT,
                        position: 11520 // 1 inch = 1440 twips, so this is 8 inches from left because margin is 0.5
                    }
                ]
            }),
            new Paragraph({
                children : [
                    new TextRun({
                        text: this.static.title,
                        italics: true
                    }),
                    new TextRun("\t"),
                    new TextRun({
                        text: `${this.static.start} - ${this.static.end}`
                    })
                ],
                tabStops : [
                    {
                        type: TabStopType.RIGHT,
                        position: 11520 // 1 inch = 1440 twips, so this is 8 inches from left because margin is 0.5
                    }
                ]
            }),
            ...this.renderBulletPoints(...this.dynamic.description)
        ]
    }
}


class EducationSection {
    constructor(input) {
        this.info = input;
    }

    addSection = () => {
        return new Paragraph({
            border: {
                bottom: {
                    color: "auto",
                    space: 1,
                    style: BorderStyle.SINGLE,
                    size: 6
                }
            },
            children: [
                new TextRun({
                    text: "EDUCATION",
                    bold: true
                })
            ]
        })
    }

    render() {
        let res = []
        res.push(this.addSection());
        res = res.concat([
            new Paragraph({
                children : [
                    new TextRun({
                        text: this.info.institution,
                        bold: true
                    }),
                    new TextRun("\t"),
                    new TextRun({
                        text : this.info.location,
                        bold : true
                    })
                ],
                tabStops : [
                    {
                        type: TabStopType.RIGHT,
                        position: 11520 // 1 inch = 1440 twips, so this is 8 inches from left because margin is 0.5
                    }
                ]
            }),
            new Paragraph({
                children : [
                    new TextRun({
                        text: `${this.info.degree} in ${this.info.major}${this.info.minor ? `, Minor in ${this.info.minor}` : ""}`,
                        italics: true
                    }),
                    new TextRun("\t"),
                    new TextRun({
                        text: `${this.info.start} - ${this.info.end}`
                    })
                ],
                tabStops : [
                    {
                        type: TabStopType.RIGHT,
                        position: 11520 // 1 inch = 1440 twips, so this is 8 inches from left because margin is 0.5
                    }
                ]
            }),
            new Paragraph({
                children : [
                    new TextRun({
                        text: `Relevant Coursework: ${this.info.relevantCoursework.join(", ")}`
                    })
                ],
                bullet: {
                    level: 0
                }
            })
        ]);
        return res;

    }
}


class ItemizedSection {
    constructor(title, input) {
        this.title = title;
        this.items = [];
        for (const item of input) {
            const newItem = new Item();
            for (const [key, value] of Object.entries(item)) {
                if (key === "description") {
                    newItem.dynamic[key] = value;
                } else {
                    newItem.static[key] = value;
                }
            }
            this.items.push(newItem);
        }
    }

    addSection = (title) => {
        return new Paragraph({
            border: {
                bottom: {
                    color: "auto",
                    space: 1,
                    style: BorderStyle.SINGLE,
                    size: 6
                }
            },
            children: [
                new TextRun({
                    text: title,
                    bold: true
                })
            ]
        })
    }

    render() {
        let res = [];
        res.push(this.addSection(this.title));
        for (const item of this.items) {
            res = res.concat(item.renderItem());
        }
        return res;
    }
};

export class Resume {
    constructor(candidateInfo, jsonData) {
        this.candidateInfo = candidateInfo;
        this.sections = [];
        for (const key in jsonData) {
            this.sections.push(new ItemizedSection(key.toUpperCase(), jsonData[key]));
        }
    }

    async render() {
        let res = [
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: this.candidateInfo.Bio.name,
                        bold: true,
                        size: 36
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: this.candidateInfo.Bio.address,
                    }),
                    new TextRun({
                        text: `${this.candidateInfo.Bio.phone} | ${this.candidateInfo.Bio.email} ${this.candidateInfo.Bio.website ? `| ${this.candidateInfo.Bio.website}` : ""}`,
                        break:1
                    }),
                ],

            }),
            new Paragraph("")
        ];

        res = res.concat(new EducationSection(this.candidateInfo.Education).render());
        res.push(new Paragraph(""));


        for (const section of this.sections) {
            res = res.concat(section.render());
            res.push(new Paragraph(""));
        }

        const autoDoc = new Document({
            sections: [
                {
                    properties: {
                        margins: {
                            top: 1080,
                            bottom: 1080,
                            left: 1080,
                            right: 1080
                        }
                    },
                    children : res
                }
            ]
        });

        return autoDoc
    }
}