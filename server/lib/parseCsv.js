import { Lead } from "../models/ContactList.js";
import * as csv from "csv";
function parseCsv(rawData) {
    return new Promise((resolve, reject) => {
        csv.parse(rawData, { columns: false, trim: true }, (err, rows) => {
            if (err) {
                reject(err);
            } else resolve(rows);
        });
    });
}

async function handleCsv(dataString) {
    const columnIndex = {
        name: -1,
        cellphone: -1,
        country: -1,
    };
    const data = await parseCsv(dataString);

    for (let [key, _] of Object.entries(columnIndex)) {
        const formattedHeadings = data[0].map((el) => el.toLowerCase());
        columnIndex[key] = formattedHeadings.indexOf(key);
    }

    for (let i = 1; i < 2; i++) {
        const row = data[i];
        const { name, cellphone, country } = columnIndex;
        const lead = new Lead(row[name], row[cellphone], row[country]);
        Lead.allLeads.push(lead);
    }
}

function handleJson(dataString) {
    const data = JSON.parse(dataString);
    for (let item of data) {
        const lead = new Lead(item.name, item.cellphone, item.country);
        Lead.allLeads.push(lead);
    }
}

export { handleCsv, handleJson };
