import { Document, Model } from "mongoose";

export interface IPurchaseOrder {
    modelNumber: String;
    unitPrice: Number;
    quantity: Number;
}

export interface IPurchaseOrderDocument extends IPurchaseOrder, Document { }
export interface IPurchaseOrderModel extends Model<IPurchaseOrderDocument> { }