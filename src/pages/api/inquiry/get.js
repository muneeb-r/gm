import connectDB from "@/middleware/mongoos"
import Inquiry from "@/models/inquiries";

async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const items = 8;
            let page = parseInt(req.query.page || '0');
            let total = 0;
            let inquiries = [];

            if (req.query.startedDate && req.query.endedDate) {

                const startDate = new Date(req.query.startedDate);
                const endDate = new Date(req.query.endedDate);

                total = await Inquiry.countDocuments({
                    campus: req.query.campus,
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                })

                inquiries = await Inquiry.find({
                    campus: req.query.campus,
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }).sort({ createdAt: -1 }).limit(items).skip(items * page)

            }else if (req.query.limit) {

                inquiries = await Inquiry.find({
                    campus: req.query.campus
                }).sort({ createdAt: -1 }).limit(req.query.limit)

                return res.status(200).json(inquiries)

            } else {
                total = await Inquiry.countDocuments({
                    campus: req.query.campus
                })
                inquiries = await Inquiry.find({
                    campus: req.query.campus
                }).sort({ createdAt: -1 }).limit(items).skip(items * page)
            }

            res.status(200).json({ total, pages: Math.ceil(total / items), inquiries })

        } catch (e) {

        }

    }

}

export default connectDB(handler)