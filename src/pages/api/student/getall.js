import connectDB from "@/middleware/mongoos"
import Student from "@/models/student"

async function handler(req, res) {

    if (!req.method === 'GET') return res.status(400).json({message: 'Invalid request!'})

    const students = await Student.find()

    res.status(201).json(students)

}

export default connectDB(handler)