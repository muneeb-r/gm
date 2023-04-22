import connectDB from "@/middleware/mongoos"
import StudentFee from "@/models/studentfee"

async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            const items = 8;
            let page = parseInt(req.query.page || '0');
            let total = 0;
            let fees = [];

            if (req.query.startedDate && req.query.endedDate) {
                
                const startDate = new Date(req.query.startedDate);
                const endDate = new Date(req.query.endedDate);
                
                total = await StudentFee.countDocuments({
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                })

                fees = await StudentFee.find({
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }).sort({ createdAt: -1 }).limit(items).skip(items * page)

            } else if(req.query.limit) {

                fees = await StudentFee.find().sort({ createdAt: -1 }).limit(req.query.limit)
                
                return res.status(200).json(fees)
                
            } else {
                total = await StudentFee.countDocuments()
                fees = await StudentFee.find().sort({ createdAt: -1 }).limit(items).skip(items * page)
            }

            res.status(200).json({ total, pages: Math.ceil(total/items), fees })

        } catch (e) {

        }

    }

}

export default connectDB(handler)