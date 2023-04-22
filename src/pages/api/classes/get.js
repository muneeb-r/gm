import connectDB from "@/middleware/mongoos"
import Classes from "@/models/classes"

async function handler(req, res) {

    if (!req.method === 'GET' || !req.query.title) return res.status(400).json({message: 'Invalid request!'})

    const classes = await Classes.find({title: req.query.title})

    res.status(200).json(classes)

}

export default connectDB(handler)