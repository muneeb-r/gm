import connectDB from "@/middleware/mongoos"
import Employee from "@/models/employee"

async function handler(req, res) {

    if (req.method === 'DELETE') {
        await Employee.findByIdAndDelete(req.query.employeeId)
        res.status(200).json({
            message: 'Employee has been deleted.'
        })
    }


}

export default connectDB(handler)