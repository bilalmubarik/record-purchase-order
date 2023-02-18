import { Document, Model } from "mongoose";

export interface IVendor {
    name: String;
    date: String;
}

export interface IVendorDocument extends IVendor, Document { }
export interface IVendorModel extends Model<IVendorDocument> { }