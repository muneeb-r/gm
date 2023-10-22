import connectDB from "@/middleware/mongoos"
import Campus from "@/models/campus"
import Classes from "@/models/classes"

async function handler(req, res) {

    if (!req.method === 'GET') return res.status(400).json({ message: 'Invalid request!' })
    const campus = await Campus.findOne({ title: req.query.campus })
    const classes = await Classes.find({ campusId: campus._id })

    res.status(200).json(classes)

}

export default connectDB(handler)