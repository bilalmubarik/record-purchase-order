import { model } from "mongoose";
import { IVendorDocument } from "./vendor.types";
import VendorSchema from "./vendor.schema";

export const VendorModel = model<IVendorDocument>("Vendor", VendorSchema);