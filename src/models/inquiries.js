import { Schema, model, models } from 'mongoose';

const InquirySchema = new Schema({
    reportername: {
        type: String,
        required: true
    },
    student: {
        type: String
    },
    relation: {
        type: String
    },
    other: {
        type: String
    },
    whatsappnumber: {
        type: String
    },
    email: {
        type: String
    },
    inquiry: {
        type: String,
        required: true
    },
    campus: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

const Inquiry = models.Inquiry || model('Inquiry', InquirySchema);

export default Inquiry;