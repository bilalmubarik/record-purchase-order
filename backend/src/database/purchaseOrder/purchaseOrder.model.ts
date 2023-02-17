import { model } from "mongoose";
import { IPurchaseOrderDocument } from "./purchaseOrder.types";
import PurchaseOrderSchema from "./purchaseOrder.schema";

export const PurchaseOrderModel = model<IPurchaseOrderDocument>("PurchaseOrder", PurchaseOrderSchema);