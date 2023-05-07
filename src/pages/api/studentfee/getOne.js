import connectDB from "@/middleware/mongoos"
import StudentFee from "@/models/studentfee"

async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            let fees = {}
            if (req.query.getLast) {
                fees = await StudentFee.findOne({
                    studentId: req.query.studentId
                }).sort({createdAt: -1})
            } else {
                fees = await StudentFee.findOne({
                    month: req.query.month,
                    studentId: req.query.studentId,
                    class: {
                        title: req.query.class,
                        session: req.query.session
                    },
                })
            }

            res.status(200).json(fees)

        } catch (e) {

        }

    }

}

export default connectDB(handler)