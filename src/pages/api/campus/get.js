import connectDB from "@/middleware/mongoos"
import Campus from "@/models/campus"

async function handler(req, res) {

    if (!req.method === 'GET') return res.status(400).json({ message: 'Invalid request!' })

    let campus = {};

    if (req.query.title) {
        campus = await Campus.findOne({ title: req.query.title })
    } else if (req.query.campusId) {
        campus = await Campus.findById(req.query.campusId)

    }

    res.status(200).json(campus)

}

export default connectDB(handler)