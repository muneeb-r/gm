import connectDB from "@/middleware/mongoos"
import Campus from "@/models/campus"

async function handler(req, res) {

    if (!req.method === 'GET') return res.status(400).json({ message: 'Invalid request!' })

    let campus = {};

    if (req.query.title) {
        campus = await Campus.findOne({ title: req.query.title })
    } else if (req.query.campusId) {
        campus = await Campus.findById(req.query.campusId)

    }
    if(campus){
        res.status(200).json(campus)
    }else{
        res.status(404).json({error:true,message:'Campus not found.'})
    }

}

export default connectDB(handler)