import { useEffect, useState } from "react"
import { BarChart } from "../charts/BarChart"
import { getMonthName } from "@/utils/getMonth"

const View = ({ setEmployee, employee }) => {
    const [time, setTime] = useState(employee?.Time ? Object.values(employee?.Time) : [])
    const [filtered, setFiltered] = useState([])
    const [month, setMonth] = useState(new Date().getMonth() - 1)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    const computeData = () => {
        const values = time.filter((t) => new Date(t.Date).getMonth() === month)
        let data = []
        values.forEach((value) => {
            const date1 = new Date(value.in);
            const date2 = new Date(value.out);

            const diffInMilliseconds = Math.abs(date2 - date1);
            const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
            data.push({
                date: value.Date,
                time: diffInHours
            })
        })
        setFiltered(data)
    }

    useEffect(() => {
        computeData()
    }, [month])
console.log(month, new Date().getMonth())
    return (
        <div className='fixed animate-bg-opacity top-0 left-0 w-full z-50 h-screen overflow-auto flex justify-center bg-black bg-opacity-60 backdrop-blur-sm'>
            <div className='w-full lg:w-2/3 bg-white md:my-10 h-fit scale-up'>
                <div className="flex justify-between items-center border-b border-gray-200 px-5 py-3">
                    <h1 className='font-semibold flex items-center gap-2 tracking-widest  md:text-lg lg:text-xl'>
                        <span>{employee.name}</span>
                    </h1>

                    <div onClick={() => setEmployee({})} className='bg-gray-50 p-2 rounded-full text-gray-700 cursor-pointer hover:scale-125 active:scale-90 transition-all duration-200 ease-in-out'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className="flex p-5 flex-col gap-3">

                    <div className="w-full h-[400px]">
                        <BarChart data={filtered} title={employee.name+' Attendance for '+getMonthName(month)} datasetTitle='Employees' />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default View