import { PurchaseOrderModel } from '../database';

/**
 * Create purchase order
 * @param {Object} purchaseOrderBody
 * @returns {Promise<PurchaseOrder>}
 */
export const create = (purchaseOrderBody: Object) => new Promise((resolve, reject) => {
    return PurchaseOrderModel.create(purchaseOrderBody)
    .then(data => {
        resolve(data);
    })
    .catch(err => {
        reject(new Error(err));
    });
})