import connectDB from "@/middleware/mongoos"
import Expense from "@/models/expense"

async function handler(req, res) {

    if (req.method === 'DELETE') {
        await Expense.findByIdAndDelete(req.query.expenseId)
        res.status(200).json({
            message: 'Expense has been deleted.'
        })
    }


}

export default connectDB(handler)