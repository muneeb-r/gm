import Navbar from '@/components/nav/Navbar'
import Sidebar from '@/components/sidebar/Sidebar'
import Head from 'next/head'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { authenticate } from '@/utils/authenticate';
import Students from '@/components/dashboard/Students';
import Fees from '@/components/dashboard/Fees';
import LineChart from '@/components/charts/LineChart';
import { schoolName } from '@/utils/schoolName';



export default function Home() {
  const [studentData, setstudentData] = useState({})
  const [numberOfStudents, setNumberOfStudents] = useState({})
  const [filterType, setFilterType] = useState('day')
  const [studentFilters, setStudentFilters] = useState({
    startDate: '',
    endDate: '',
  })

  async function fetchStudentsStats(type) {
    try {

      let res = [];
      if (studentFilters.startDate && studentFilters.endDate) {
        res = await axios.get(`/api/student/stats?type=${type}&startDate=${studentFilters.startDate}&endDate=${studentFilters.endDate}&campus=${localStorage.getItem('campus')}`)
      } else {
        res = await axios.get(`/api/student/stats?type=${type}&campus=${localStorage.getItem('campus')}`)
      }

      let newData = {};

      if (res.data[0]._id.split('-')[2]) {
        newData = {
          labels: res.data?.map((s) => s._id.split('-')[0].slice(2) + '-' + s._id.split('-')[1] + '-' + s._id.split('-')[2]),
          data: res.data?.map((s) => s.count),
        }
      } else if (res.data[0]._id.split('-')[2]) {
        newData = {
          labels: res.data?.map((s) => s._id.split('-')[0].slice(2) + '-' + s._id.split('-')[1]),
          data: res.data?.map((s) => s.count),
        }
      } else {
        newData = {
          labels: res.data?.map((s) => s._id),
          data: res.data?.map((s) => s.count),
        }
      }

      setstudentData(newData)
    } catch (error) {
    }
  }

  const getNumberOfStudents = async () => {
    try {
      const res = await axios.get(`/api/student/getNumberOfStudents?campus=${localStorage.getItem('campus')}`)
      setNumberOfStudents(res.data)

    } catch (error) {
    }
  }

  useEffect(() => {
    getNumberOfStudents()
    fetchStudentsStats(filterType)
  }, [])

  const handleChange = async (event) => {
    const { name, value } = event.target
    setStudentFilters({ ...studentFilters, [name]: value })
  }

  const handeTypeChange = (e) => {
    setFilterType(e.target.value)
    fetchStudentsStats(e.target.value)
  }

  const handleClear = () => {
    setStudentFilters({
      startDate: '',
      endDate: '',
    })
  }

  return (
    <>
      <Head>
        <title>Dashboard - {schoolName}</title>
        <meta name="description" content={schoolName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=''>

        <Navbar />
        <div className="flex">
          <Sidebar currentPage='Dashboard' />
          <div className="flex-1 p-3">

            <div className="flex flex-col">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

                {/* Graph box */}
                <div className="col-span-1">
                  <div className="flex p-2 bg-white border border-gray-300 rounded-xl flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center flex-wrap">
                        <select onChange={handeTypeChange} name="type" className='base__select bg-white px-1 text-sm'>
                          <option value="day">Day</option>
                          <option value="month">Month</option>
                          <option value="year">Year</option>
                        </select>
                        <input onChange={handleChange} value={studentFilters.startDate} name='startDate' type="date" className='base__input py-[5px] px-1 mt-0 border-gray-100 bg-white text-sm' />
                        <input onChange={handleChange} value={studentFilters.endDate} name='endDate' type="date" className='base__input py-[5px] px-1 mt-0 border-gray-100 bg-white text-sm' />
                        <button onClick={() => fetchStudentsStats(filterType)} className="base__button px-3 text-sm">Apply</button>

                        {studentFilters.startDate !== '' && studentFilters.endDate !== '' && <div onClick={handleClear} className='flex p-1 bg-gray-100 rounded-full shadow cursor-pointer hover:scale-125 transition-all duration-300'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>}

                      </div>

                      <div onClick={() => fetchStudentsStats(filterType)} className='w-6 h-8 font-bold rounded-full flex justify-center items-center bg-gray-50 hover:scale-125 active:rotate-180 transition-all duration-300 ease-in-out cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                      </div>

                    </div>

                    <div className="bg-white flex-1">
                      <LineChart title='Students Stats' xData={studentData.labels} yData={studentData.data} />
                    </div>

                  </div>
                </div>

                {/* small boxes box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 col-span-1 gap-2">

                  <div className="col-span-1 flex rounded-xl">
                    <div className='flex flex-col items-center overflow-hidden border border-gray-300 rounded-xl w-full bg-white'>
                      <div className='flex gap-3 p-3 bg-green-500 border-b border-gray-300 items-center w-full'>
                        <div className='p-2 bg-orange-200 text-orange-600 rounded-md'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                          </svg>
                        </div>
                        <span className='text-white'>Total Students</span>
                      </div>
                      <span className='text-2xl p-4 font-semibold'>
                        {numberOfStudents.rn?new Intl.NumberFormat().format(numberOfStudents.rn):0}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-1 flex rounded-xl">
                    <div className='flex flex-col items-center overflow-hidden border border-gray-300 rounded-xl w-full bg-white'>
                      <div className='flex gap-3 p-3 bg-teal-500 border-b border-gray-300 items-center w-full'>
                        <div className='p-2 bg-pink-200 text-pink-600 rounded-md'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                          </svg>

                        </div>
                        <span className='text-white'>In English Medium</span>
                      </div>
                      <span className='text-2xl p-4 font-semibold'>
                        {numberOfStudents.englishStudents?new Intl.NumberFormat().format(numberOfStudents.englishStudents):0}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-1 flex rounded-xl">
                    <div className='flex flex-col items-center overflow-hidden border border-gray-300 rounded-xl w-full bg-white'>
                      <div className='flex gap-3 p-3 bg-pink-500 border-b border-gray-300 items-center w-full'>
                        <div className='p-2 bg-cyan-200 text-cyan-600 rounded-md'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                          </svg>

                        </div>
                        <span className='text-white'>In Urdu Medium</span>
                      </div>
                      <span className='text-2xl p-4 font-semibold'>
                        {numberOfStudents.urduStudents?new Intl.NumberFormat().format(numberOfStudents.urduStudents):0}
                      </span>
                    </div>
                  </div>


                </div>


                <Students />
                <Fees />
              </div>


            </div>

          </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  authenticate(context)

  return {
    props: {}
  }
}