import connectDB from "@/middleware/mongoos"
import Student from "@/models/student"

async function handler(req, res) {

    if (req.method === 'GET'){

        const rn = await Student.countDocuments({campus: req.query.campus})
        const englishStudents = await Student.countDocuments({campus: req.query.campus, medium: 'English'})
        const urduStudents = await Student.countDocuments({campus: req.query.campus, medium: 'Urdu'})
    
        res.status(200).json({rn, englishStudents,urduStudents})
    }


}

export default connectDB(handler)