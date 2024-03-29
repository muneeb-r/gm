import connectDB from "@/middleware/mongoos"
import Student from "@/models/student"

async function handler(req, res) {

    if (req.method === 'GET') {
        let stats = [];

        if (req.query.startDate && req.query.endDate) {

            stats = await Student.aggregate([
                {
                    $match: {
                        campus: req.query.campus,
                        createdAt: {
                            $gte: new Date(req.query.startDate),
                            $lte: new Date(req.query.endDate)
                        }
                    }
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $project: {
                        [req.query.type]: {
                            $dateToString: {
                                format: req.query.type === 'month' ? "%Y-%m" : req.query.type === 'day' ? "%Y-%m-%d" : req.query.type === 'year' && '%Y',
                                date: "$createdAt"
                            }
                        }

                    }
                },
                {
                    $group: {
                        _id: `$${req.query.type}`,
                        count: { $sum: 1 }
                    }
                },
                {
                    $limit: 10
                }
            ])


        } else {
            stats = await Student.aggregate([
                {
                    $match: {
                        campus: req.query.campus
                    }
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $project: {
                        [req.query.type]: {
                            $dateToString: {
                                format: req.query.type === 'month' ? "%Y-%m" : req.query.type === 'day' ? "%Y-%m-%d" : req.query.type === 'year' && '%Y',
                                date: "$createdAt"
                            }
                        }

                    }
                },
                {
                    $group: {
                        _id: `$${req.query.type}`,
                        count: { $sum: 1 }
                    }
                },
                {
                    $limit: 14
                }
            ])
        }
        stats = stats.sort((s1, s2) => new Date(s1._id).getTime() - new Date(s2._id).getTime())
        res.status(200).json(stats)
    }


}

export default connectDB(handler)
  // {
                //     $sort: {
                //         _id: 1
                //     }
                // },