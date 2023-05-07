import connectDB from "@/middleware/mongoos"
import Student from "@/models/student"

async function handler(req, res) {

    if (!req.method === 'GET') return res.status(400).json({message: 'Invalid request!'})

    let stud={};
    if(req.query.rn){
        stud = await Student.findOne({rn:req.query.rn}, {name:1,_id:1, classes:1, rn:1,picture:1, monthlyfee:1,fathername:1})
    } else if(req.query.studentId){
        stud = await Student.findById(req.query.studentId)
    }

    res.status(200).json(stud)

}

export default connectDB(handler)