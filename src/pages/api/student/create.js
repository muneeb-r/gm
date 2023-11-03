import connectDB from "@/middleware/mongoos"
import Student from "@/models/student"

async function handler(req, res) {
    try {
        if (!req.method === 'POST') return

        const rn = await Student.countDocuments() + 1
        const stu = await Student.create({ ...req.body, rn })

        res.status(201).json(stu)
    } catch (e) {
        res.status(500).json({message:'Internal server error', e})
    }

}

export default connectDB(handler)