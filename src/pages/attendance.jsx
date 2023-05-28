import UpdateEmployee from '@/components/attendance/UpdateEmployee'
import View from '@/components/attendance/View'
import CreateAttendance from '@/components/modals/CreateAttendance'
import Navbar from '@/components/nav/Navbar'
import Sidebar from '@/components/sidebar/Sidebar'
import { authenticate } from '@/utils/authenticate'
import { database } from '@/utils/firebase'
import { schoolName } from '@/utils/schoolName'
import { equalTo, onValue, orderByChild, query, ref, remove } from 'firebase/database'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'

const Attendance = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showCreateAttendance, setShowCreateAttendance] = useState(false)
    const [filters, setFilters] = useState(new Date().getFullYear())
    const [employees, setEmployees] = useState([])
    const [filteredEmployees, setFilteredEmployees] = useState([])
    const [employee, setEmployee] = useState({})
    const router = useRouter() 
    const employeeToUpdate = employees.filter((e)=> e.id===router.query?.u)[0]?employees.filter((e)=> e.id===router.query.u)[0]:null

    const fetchEmployees = async () => {
        setIsLoading(true)
        setFilteredEmployees([])
        try {
            const q = query(ref(database, 'attendance/' + filters), orderByChild("campus"), equalTo(localStorage.getItem('campus')))
            onValue(q, (snapshot) => {
                let data = []
                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    data.push(childData)
                });
                setEmployees(data)
                setFilteredEmployees(data)
            }, {
                onlyOnce: false
            });
            setIsLoading(false)
        } catch (error) {
            toast.error('Something went wrong.')
            setIsLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [filters])

    const handleChange = async (e) => {
        setFilteredEmployees(employees.filter((employee) => employee.name.toLowerCase().match(e.target.value.toLowerCase())))
    }

    return (
        <div>
            <Head>
                <title>Attendance - {schoolName}</title>
                <meta name="description" content={schoolName} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Navbar />
                <div className="flex">
                    <Sidebar currentPage={'Attendance'} />
                    <div className="flex w-full lg:w-auto lg:flex-1 flex-col p-4 md:p-5">
                        <section className="bg-gray-50 border border-gray-100 rounded-md">
                            <div className="mx-auto max-w-screen-xl">
                                <div className="bg-white relative shadow sm:rounded-lg overflow-hidden">
                                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                            <div className="flex gap-3 items-center flex-wrap">
                                                <div className="flex">
                                                    <input onChange={handleChange} type="text" className='base__search bg-white shadow-none' placeholder='Search by name' />
                                                </div>
                                                <input onChange={(e) => setFilters(new Date(e.target.value).getFullYear())} value={filters.startedDate} name='startedDate' type="date" className='base__input py-[5px] px-3 shadow-none mt-0 border-gray-200 bg-white text-sm' />
                                            </div>
                                        </div>
                                        <div className="">
                                            <button onClick={() => setShowCreateAttendance(prev => !prev)} className='base__button flex items-center gap-3 px-3'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>
                                                    Add Attendance
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left text-gray-500 ">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-4 py-3 min-w-[30px] max-w-[30px]">Srno.</th>
                                                    <th scope="col" className="px-4 py-3">ID</th>
                                                    <th scope="col" className="px-4 py-3">Name</th>
                                                    <th scope="col" className="px-4 py-3">CNIC</th>
                                                    <th scope="col" className="px-4 py-3">Age</th>
                                                    <th scope="col" className="px-4 py-3">Qualification</th>
                                                    <th scope="col" className="px-4 py-3">Date</th>
                                                    {/* <th scope="col" className="px-4 py-3"></th> */}
                                                    <th scope="col" className="px-4 py-3 text-center">
                                                       Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredEmployees?.map((employee, i) => (
                                                    <EmployeeRow year={filters} setEmployee={setEmployee} employee={employee} key={employee.name + i.toString()} i={i + 1} />
                                                ))}
                                            </tbody>
                                        </table>
                                        {isLoading && <div className='p-5 flex flex-1 justify-center items-center '>
                                            <ClipLoader
                                                color="orange"
                                                cssOverride={{}}
                                                size={35}
                                                speedMultiplier={1}
                                            />
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                {showCreateAttendance && <CreateAttendance employees={employees} setShowCreateAttendance={setShowCreateAttendance} />}
                {employeeToUpdate && <UpdateEmployee employeeToUpdate={employeeToUpdate} year={filters} />}
                {Object.keys(employee).length > 0 && <View setEmployee={setEmployee} employee={employee} year={filters} />}
            </main>
        </div>
    )
}

export default Attendance

export async function getServerSideProps(context) {
    authenticate(context)

    return {
        props: {}
    }
}

const EmployeeRow = ({ employee, i, setEmployee, year }) => {

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this?')) {
            remove(ref(database, 'attendance/' + year + '/' + employee.id + '/'));
        }
    }

    return (
        <tr className="border-b animate-slow group">
            <th scope="row" className="px-4 py-3 font-medium text-gray-900 max-w-[30px]">{i}</th>
            <td className="px-4 py-3">
                {employee.id}
            </td>
            <td className="px-4 py-3">{employee.name}</td>
            <td className="px-4 py-3">{employee.cnic}</td>
            <td className="px-4 py-3">{employee.age}</td>
            <td className="px-4 py-3">{employee.qualification}</td>

            <td className="px-4 py-3">{employee.date}</td>
            <td className="px-4 py-3 flex items-center justify-end">
                <div className="flex gap-3">

                    <div onClick={() => setEmployee(employee)} className='text-gray-800 cursor-pointer hover:scale-150 transition-all duration-200 ease-in-out'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <Link href={'/attendance?u='+employee.id}>
                        <div className='hover:scale-150 transition-all duration-200 ease-in-out'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-orange-600 cursor-pointer w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </div>
                    </Link>
                    <div onClick={handleDelete} className='cursor-pointer text-red-500 scale-0 group-hover:scale-110 transition-all duration-200 ease-in-out'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </div>
                </div>
            </td>
        </tr>

    )
}