import connectDB from "@/middleware/mongoos";
import Student from "@/models/student";

async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(400).json({ message: 'Invalid request!' });
    }

    try {
        // const studs = await Student.find().sort({ createdAt: 1 }).select('_id');
        // // Initialize a variable to track the roll number.
        // const updatePromises = studs.map(async (student, i) => {
        //     // Update the student's rn field with the new roll number and increment it.
        //      return Student.findByIdAndUpdate(student._id, {
        //         $set: { rn: (i+1) }
        //     })
        // });

        // await Promise.all(updatePromises);
        res.status(200).json({});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default connectDB(handler);
