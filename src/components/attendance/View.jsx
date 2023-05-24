import React, { useEffect, useRef, useState } from "react"
import { BarChart } from "../charts/BarChart"
import { getMonthName } from "@/utils/getMonth"
import { getDaysInMonth } from "@/utils/getDaysInMonth";
import ReactToPrint from "react-to-print";
import moment from "moment";
import { schoolName } from "@/utils/schoolName";

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
    const ref = useRef(null)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    const computeData = () => {
        if (!month) return

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
                tin: data.filter((t) => t.date === `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`)[0]?.tin,
                tout: data.filter((t) => t.date === `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`)[0]?.tout,
                fulldate: `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`
            })
            i++
        }
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
                    <div className="flex gap-5 flex-wrap items-center justify-between">
                        <div className="flex items-center flex-wrap gap-3">
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

                        <div>
                            <ReactToPrint
                                trigger={() => {
                                    return <button className="base__button gap-2 px-3 group active:ring active:ring-gray-600 active:ring-offset-[2px]">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-active:scale-150 transition-all duration-100 ease-in-out">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                                            </svg>
                                        </div>
                                        <span>
                                            Print
                                        </span>
                                    </button>
                                }}
                                content={() => ref.current}
                            />
                            <div style={{ display: "none" }}>
                                <EmpReport ref={ref} employee={employee} data={filtered} month={month} year={year}/>
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

const EmpReport = React.forwardRef(({ data, employee, month, year }, ref) => {
    // const day = new Date(value.fulldate).getDay();
    // if (days[day] ==='Sunday') {
    return (
        <div ref={ref} className="p-5">
            <div className="flex flex-col">
                <div className="flex items-center gap-3">
                    <img className="h-12 w-12" src="/favicon.ico" alt="" />
                    <h1 className="font-bold text-xl">{schoolName}</h1>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <span>Name: <b>{employee.name}</b></span>
                        <span>Attendance Month: <b>{getMonthName(month)}</b></span>
                    </div>
                    <h1 className="text-xl font-bold m-0">Attendance</h1>
                    <table className="">
                        <thead>
                            <th className="text-left px-2 border border-gray-400">Sr.no</th>
                            <th className="text-left px-2 border border-gray-400">Date</th>
                            <th className="text-left px-2 border border-gray-400">Time in</th>
                            <th className="text-left px-2 border border-gray-400">Time out</th>
                            <th className="text-left px-2 border border-gray-400">Total Time (Hours)</th>
                        </thead>
                        <tbody>
                            {data.map((item, i) => (
                                <tr className="" key={item.data}>
                                    <td className="border border-gray-400 px-2">{i + 1}</td>
                                    <td className="border border-gray-400 px-2">{item.date}, {year}</td>
                                    <td className="border border-gray-400 px-2">{item.tin?moment(item.tin).format('LT'):'-----'}</td>
                                    <td className="border border-gray-400 px-2">{item.tout?moment(item.tout).format('LT'):'----'}</td>
                                    <td className="border border-gray-400 px-2">{
                                        !isNaN(item.time) ?
                                            new Date(item.fulldate).getDay() === 6 ? 'Sunday' :
                                                item.time === 8.143 ?
                                                    'Absent' :
                                                    item.time.toFixed(1).toString() + 'h' :
                                            '....'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
})