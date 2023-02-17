import { Request, Response } from 'express';
import moment from 'moment';
import formidable from 'formidable';
import * as fs from 'fs';
import { VendorService, PurchaseOrderService } from '../services';

/**
 * Create vendor and add child purchase orders
 * @param {req} Request
 * @param {res} Response
 * @returns {Response}
 */
export const createVendor = async (req: Request, res: Response) => {
    try {
        const { name, date, csv } = await parseFormData(req);

        // Create purchase order children
        const purchaseOrders = await Promise.all(
            csv.map(async (child: Object) => {
                return await PurchaseOrderService.create(child);
            })
        );

        //  Create vendor parent and add purchase orders inside it
        await VendorService.create({
            name: name,
            date: date,
            purchaseOrders: purchaseOrders.map((purchaseOrder: any) => (purchaseOrder._id)),
        });

        return res.status(201).json({ message: "Vendor has been added successfully!" });
    } catch (err) {
        return res.status(422).json({
            error: true,
            message: `${err}`
        });
    }
}

/**
 * Process form data coming from frontend
 * @param {req} Request
 * @returns {name: String, date: String, csv: Object}
 */
function parseFormData(req: any): Promise<{ name: string, date: String, csv: {}[] }> {
    return new Promise((resolve, reject) => {
        const form = formidable({});

        form.parse(req, (err: any, fields: any, files: any) => {
            if (err) {
                reject(err);
                return;
            }

            const name = fields.name;
            if (!name) {
                reject(new Error('Name field is required'));
                return;
            }

            const date = moment(new Date(fields.date)).format('YYYY-MM-DD');

            const csvFile = files.csv;
            if (!csvFile) {
                reject(new Error('CSV file is required'));
                return;
            }

            // Read the contents of the CSV file
            fs.readFile(csvFile.filepath as string, 'utf8', (err: any, data: any) => {
                if (err) {
                    reject(err);
                    return;
                }

                parseCsv(data)
                    .then(csvData => {
                        resolve({ name, date, csv: csvData });
                    })
                    .catch(err => {
                        reject(err);
                        return;
                    });
            });
        });
    });
}

/**
 * Process uploaded CSV file
 * @param {csvData} String
 * @returns {Promise<Object>}
 */
function parseCsv(csvData: string): Promise<{}[]> {
    return new Promise((resolve, reject) => {
        const result = [];

        const rows = csvData.trim().split('\n');

        const headers = rows[0].split(',');
        if (headers.length !== 3) {
            reject(new Error('CSV file must have exactly 3 columns: "Model Name", "Unit Price", "Quantity"'));
            return;
        }

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(',');
            if (row.length !== 3) {
                reject(new Error(`Row ${i} has ${row.length} columns, but expected 3`));
                return;
            }
            const modelNumber = row[0].trim();
            const unitPrice = parseFloat(row[1].trim());
            const quantity = parseInt(row[2].trim(), 10);
            if (!modelNumber || isNaN(unitPrice) || isNaN(quantity)) {
                reject(new Error(`Missing or invalid data in row ${i}: "${modelNumber}", ${unitPrice}, ${quantity}`));
                return;
            }
            result.push({ modelNumber, unitPrice, quantity });
        }

        resolve(result);
    });
}
