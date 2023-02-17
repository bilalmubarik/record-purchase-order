import { Document, Model } from "mongoose";

export interface IVendor {
    name: String;
    date: Date;
}

export interface IVendorDocument extends IVendor, Document { }
export interface IVendorModel extends Model<IVendorDocument> { }