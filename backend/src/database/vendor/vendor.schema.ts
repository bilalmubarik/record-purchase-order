import * as Mongoose from "mongoose";

const VendorSchema = new Mongoose.Schema({
    name: String,
    date: String,
    purchaseOrders: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "PurchaseOrder",
        required: true
    }]
})

export default VendorSchema;