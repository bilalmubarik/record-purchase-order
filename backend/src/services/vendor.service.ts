import { VendorModel } from '../database';

/**
 * Create vendor
 * @param {Object} vendorBody
 * @returns {Promise<Vendor>}
 */
export const create = (vendorBody: Object) => new Promise((resolve, reject) => {
    return VendorModel.create(vendorBody)
    .then(data => {
        resolve(data);
    })
    .catch(err => {
        reject(new Error(err));
    });
})