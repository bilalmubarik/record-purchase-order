import * as Mongoose from "mongoose";

const PurchaseOrderSchema = new Mongoose.Schema({
    modelNumber: String,
    unitPrice: Number,
    quantity: Number
})

export default PurchaseOrderSchema;