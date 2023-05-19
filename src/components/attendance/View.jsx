import { useEffect, useState } from "react"
import { BarChart } from "../charts/BarChart"
import { getMonthName } from "@/utils/getMonth"
import { getDaysInMonth } from "@/utils/getDaysInMonth";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const View = ({ setEmployee, employee, year }) => {
    const [time, setTime] = useState(employee?.Time ? Object.values(employee?.Time) : [])
    const [filtered, setFiltered] = useState([])
    const [month, setMonth] = useState(new Date().getMonth() + 1)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    const computeData = () => {
        if(!month) return

        const values = time.filter((t) => new Date(t.Date).getMonth() + 1 === month)
        let data = []
        values.forEach((value) => {
            const date1 = new Date(value.in);
            const date2 = new Date(value.out);

            const diffInMilliseconds = Math.abs(date2 - date1);
            const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
            data.push({
                date: value.Date.trim(),
                time: diffInHours,
                tin: value.in,
                tout: value.out
            })
        })
        const days = getDaysInMonth(year, month)
        let newData = []
        let i = 1

        while (i <= days) {
            let day = i
            newData.push({
                date: `${getMonthName(month).substring(0, 3)}-${day > 9 ? day : '0' + day}`,
                time: data.filter((t) => t.date === `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`)[0] ? data.filter((t) => t.date === `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`)[0].time : 8.143,
                tin:data.filter((t) => t.date === `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`)[0]?.tin,
                tout:data.filter((t) => t.date === `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`)[0]?.tout,
                fulldate: `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`
            })
            i++
        }
        console.log(newData)
        setFiltered(newData)
    }

    useEffect(() => {
        computeData()
    }, [month])

    return (
        <div className='fixed animate-bg-opacity top-0 left-0 w-full z-50 h-screen overflow-auto flex justify-center bg-black bg-opacity-60 backdrop-blur-sm'>
            <div className='w-full lg:w-[90%] bg-white rounded-md md:my-10 h-fit scale-up'>
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
                    <div className="flex gap-5 flex-wrap items-center">
                        <select className="base__select bg-white px-3" onChange={(e) => setMonth(parseInt(e.target.value))}>
                            <option value="" >Select Month</option>
                            {months.map((month, index) => (
                                <option value={index + 1}>{month}</option>
                            ))}
                        </select>
                        <div className="flex gap-3 flex-wrap">
                        {/* return value >= 6 ? 'rgb(3, 90, 252)' : value <= 2.5&&'rgb(247, 45, 45)'; */}
                            <div className="flex gap-1 items-center">
                                <span className="w-10 h-5 bg-[#035afc] rounded"></span>
                                <span className="font-medium text-gray-800">Present</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                <span className="w-10 h-5 bg-[#f72d2d] rounded"></span>
                                <span className="font-medium text-gray-800">Absent</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                <span className="w-10 h-5 bg-[gray] rounded"></span>
                                <span className="font-medium text-gray-800">Sunday</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                <span className="w-10 h-5 bg-[#BE6DB7] rounded"></span>
                                <span className="font-medium text-gray-800">Half Day</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                <span className="w-10 h-5 bg-[#FF8400] rounded"></span>
                                <span className="font-medium text-gray-800">Short Time</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                <span className="w-10 h-5 bg-[#fa469d] rounded"></span>
                                <span className="font-medium text-gray-800">Late Absent</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[400px]">
                        <BarChart data={filtered} title={employee.name + ' Attendance for ' + getMonthName(month)} datasetTitle='Employees' />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default View