import connectDB from "@/middleware/mongoos"
import Student from "@/models/student"

async function handler(req, res) {

    if (!req.method === 'GET') return

    if (req.query.byClass) {
        const students = await Student.find({
            classes: {
                $elemMatch: {
                    class: req.query.class,
                    session: req.query.session
                }
            }
        })
        return res.status(200).json(students)
    }

    if (req.query.byText) {
        const students = await Student.find({
            name: { $regex: new RegExp(req.query.text, 'i') }
        })
        return res.status(200).json(students)
    }


}

export default connectDB(handler)