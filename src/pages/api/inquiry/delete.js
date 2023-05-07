import connectDB from "@/middleware/mongoos"
import Inquiry from "@/models/inquiries"

async function handler(req, res) {

    if (req.method === 'DELETE') {
        await Inquiry.findByIdAndDelete(req.query.inquiryId)
        res.status(200).json({
            message: 'Fee has been deleted.'
        })
    }


}

export default connectDB(handler)