import * as Mongoose from "mongoose";
import moment from 'moment';

const VendorSchema = new Mongoose.Schema({
    name: String,
    date: {
        type: String,
        default: moment(new Date()).format('YYYY-MM-DD')
    },
    purchaseOrders: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "PurchaseOrder",
        required: true
    }]
})

export default VendorSchema;