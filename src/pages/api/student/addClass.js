import connectDB from "@/middleware/mongoos"
import Student from "@/models/student"

async function handler(req, res) {

    if (!req.method === 'PUT') return


    const teststu = await Student.findOne({
        _id: req.body.studentId,
        classes: {
            $elemMatch: {
                class: req.body.class,
                session: req.body.session
            }
        }
    })

    if(teststu) return res.status(400).json({
        error: true,
        message: 'This class is already added.'
    })

    const stu = await Student.findByIdAndUpdate(
        req.body.studentId,
        {
            $push: {
                classes: {
                    class: req.body.class,
                    session: req.body.session,
                    started: req.body.started
                }
            },
        },
        { new: true }
    );

    res.status(201).json(stu)

}

export default connectDB(handler)