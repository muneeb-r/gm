import connectDB from "@/middleware/mongoos"
import Campus from "@/models/campus"
async function handler(req, res) {

    if (!req.method === 'PUT') return

    const camp = await Campus.findByIdAndUpdate(req.query.campusId,
        {
            $set: req.body,
        },
        { new: true })

    res.status(201).json(camp)

}

export default connectDB(handler)