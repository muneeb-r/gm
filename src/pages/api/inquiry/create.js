import connectDB from "@/middleware/mongoos"
import Inquiry from "@/models/inquiries"

async function handler(req, res) {

    if (!req.method === 'POST') return

    const inquiry = await Inquiry.create({ ...req.body})

    res.status(201).json(inquiry)

}

export default connectDB(handler)