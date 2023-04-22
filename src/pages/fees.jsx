import Navbar from '@/components/nav/Navbar'
import Sidebar from '@/components/sidebar/Sidebar'
import { fetchStudent } from '@/utils/fetchStudent'
import axios from 'axios'
import moment from 'moment'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const fees = () => {
    const [fees, setFees] = useState([])
    const [total, setTotal] = useState({})
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchFees = async () => {
            const res = await axios.get('/api/studentfee/get')
            setFees(res.data.fees)
            setTotal({
                total: res.data.total,
                pages: res.data.pages
            })
        }
        fetchFees()
    }, [])

    const fetchMore = async()=>{
        let loading = toast.loading('loading...')
        try {
            const res = await axios.get('/api/studentfee/get?page='+currentPage)
            setFees([...fees,...res.data.fees])
            setCurrentPage(prev=> prev+1)
            toast.success('finished', {id: loading})
        } catch (error) {
            toast.error('something went wrong...', {id: loading})            
        }
    }

    function getFeeSum(fee){
        let sum = 0
        for(let i = 0; i < fee.length; i++){
            sum += fee[i].feeamount
        }
        return sum
    }

    return (
        <div>
            <Head>
                <title>Students - GM School And Colleges Of Sciences</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Navbar />
                <div className="flex">
                    <Sidebar currentPage={'Fees'} />
                    <div className="flex w-full lg:w-auto lg:flex-1 flex-col p-4 md:p-5">
                        <section className="bg-gray-50 border border-gray-100 rounded-md">
                            <div className="mx-auto max-w-screen-xl">
                                <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
                                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                                        <div className="w-full md:w-1/2">
                                            <form className="flex items-center">
                                                <label for="simple-search" className="sr-only">Search</label>
                                                <div className="relative w-full">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 " placeholder="Search" required="" />
                                                </div>
                                            </form>
                                        </div>
                                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                            <button type="button" className="flex items-center justify-center text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                                                <svg className="h-3.5 w-3.5 mr-3" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                                </svg>
                                                Add product
                                            </button>
                                            <div className="flex items-center space-x-3 w-full md:w-auto">
                                                <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200" type="button">
                                                    <svg className="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                                    </svg>
                                                    Actions
                                                </button>
                                                <div id="actionsDropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:divide-gray-600">
                                                    <ul className="py-1 text-sm text-gray-700" aria-labelledby="actionsDropdownButton">
                                                        <li>
                                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100">Mass Edit</a>
                                                        </li>
                                                    </ul>
                                                    <div className="py-1">
                                                        <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Delete all</a>
                                                    </div>
                                                </div>
                                                <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 " type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                                                    </svg>
                                                    Filter
                                                    <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                                    </svg>
                                                </button>
                                                <div id="filterDropdown" className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow">
                                                    <h6 className="mb-3 text-sm font-medium text-gray-900">Choose brand</h6>
                                                    <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                                        <li className="flex items-center">
                                                            <input id="apple" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                            <label for="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple (56)</label>
                                                        </li>
                                                        <li className="flex items-center">
                                                            <input id="fitbit" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                            <label for="fitbit" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Microsoft (16)</label>
                                                        </li>
                                                        <li className="flex items-center">
                                                            <input id="razor" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                            <label for="razor" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Razor (49)</label>
                                                        </li>
                                                        <li className="flex items-center">
                                                            <input id="nikon" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                            <label for="nikon" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Nikon (12)</label>
                                                        </li>
                                                        <li className="flex items-center">
                                                            <input id="benq" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                            <label for="benq" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">BenQ (74)</label>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left text-gray-500 ">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-4 py-3 min-w-[30px] max-w-[30px]">Srno.</th>
                                                    <th scope="col" className="px-4 py-3">Student</th>
                                                    <th scope="col" className="px-4 py-3">Amount</th>
                                                    <th scope="col" className="px-4 py-3">Remainings</th>
                                                    <th scope="col" className="px-4 py-3">Created At</th>
                                                    <th scope="col" className="px-4 py-3">Rn</th>
                                                    {/* <th scope="col" className="px-4 py-3"></th> */}
                                                    <th scope="col" className="px-4 py-3">
                                                        <span className="sr-only">Actions</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {fees.map((fee, i) => (
                                                    <FeeRow fee={fee} key={fee._id + i} i={i + 1} />
                                                ))}
                                                <tr>
                                                    <td className="px-4 py-3 text-lg">Total</td>
                                                    <td className="px-4 py-3"></td>
                                                    <td className="px-4 py-3 text-lg">Rs.{getFeeSum(fees)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                                        <button onClick={fetchMore} disabled={currentPage===total?.pages} className="base__button">Show more</button>
                                    </nav>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default fees

const FeeRow = ({ fee, i }) => {
    const [student, setStudent] = useState({})

    useEffect(() => {
        fetchStudent(fee.studentId).then((data)=>{
            setStudent(data)
        })
    }, [])

    return (
        <tr className="border-b animate-slow">
            <th scope="row" className="px-4 py-3 font-medium text-gray-900 max-w-[30px]">{i}</th>
            <td className="px-4 py-3 min-w-[180px]">
                <div className="flex gap-2 items-center">
                    <img className='w-10 h-10 rounded shadow object-cover' src={student.picture?student.picture:'avatar.png'} alt={student.name} />
                    <span className='font-roboto'>
                        {student.name}
                    </span>
                </div>
            </td>
            <td className="px-4 py-3">{fee.feeamount}</td>
            <td className="px-4 py-3">{fee.remainings}</td>
            <td className="px-4 py-3">{moment(fee?.createdAt).format('L')}</td>
            <td className="px-4 py-3">{student.rn}</td>
            <td className="px-4 py-3 flex items-center justify-end">
                <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none" type="button">
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                </button>
                <div id="apple-imac-27-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow">
                    <ul className="py-1 text-sm text-gray-700" aria-labelledby="apple-imac-27-dropdown-button">
                        <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100">Show</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100">Edit</a>
                        </li>
                    </ul>
                    <div className="py-1">
                        <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Delete</a>
                    </div>
                </div>
            </td>
        </tr>

    )
}