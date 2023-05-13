import connectDB from "@/middleware/mongoos"
import Student from "@/models/student"

async function handler(req, res) {

    if (!req.method === 'GET' || !req.query.campus) return

    const items = 10;
    let page = parseInt(req.query.page || '0');
    let total = 0;
    let students = [];

    if (req.query.byClass) {
        total = await Student.countDocuments({
            campus: req.query.campus,
            classes: {
                $elemMatch: {
                    class: req.query.class,
                    session: req.query.session
                }
            }
        })

        students = await Student.find({
            campus: req.query.campus,
            classes: {
                $elemMatch: {
                    class: req.query.class,
                    session: req.query.session
                }
            }
        }).sort({ createdAt: -1 }).limit(items).skip(items * page)
        
    }else if (req.query.byText) {
        total = await Student.countDocuments({
            name: { $regex: new RegExp(req.query.text, 'i') },
            campus: req.query.campus
        })
        students = await Student.find({
            name: { $regex: new RegExp(req.query.text, 'i') },
            campus: req.query.campus
        }).sort({ createdAt: -1 }).limit(items).skip(items * page)
    }

    res.status(200).json({ total, pages: Math.ceil(total / items), students })


}

export default connectDB(handler)