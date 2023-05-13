import { authenticate } from '@/utils/authenticate'
import { fetchStudent } from '@/utils/fetchStudent'
import { getMonthName, getMonthsBetweenDates } from '@/utils/getMonth'
import { schoolName } from '@/utils/schoolName'
import axios from 'axios'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const MultipleReceipts = ({ queries }) => {
    const [showSliders, setShowSliders] = useState(true)
    const [scaleX, setScaleX] = useState(100)
    const [scaleY, setScaleY] = useState(100)
    const [marginTop, setMarginTop] = useState(0)
    const [moveX, setMoveX] = useState(0)
    const router = useRouter()
    const [students, setStudents] = useState([])
    const [error, setError] = useState(false)
    const [gap, setGap] = useState(8)

    const fetchStudents = async () => {
        if (queries.rns) {
            setStudents([])
            try {
                let RNs = [...new Set(queries.rns.split(','))]

                let studs = []

                for (const rn of RNs) {
                    if (rn) {
                        const res = await axios.get('/api/student/get?rn=' + parseInt(rn))
                        if (res.data) {
                            studs.push(res.data)
                        }
                    }
                }
                setStudents(studs)
                if (studs.length === 0) {
                    setError(true)
                }
            } catch (error) {
                setError(true)
            }
        }

    }

    useEffect(() => {
        setGap(localStorage.getItem('gap'))
        setScaleX(localStorage.getItem('scalex'))
        setScaleY(localStorage.getItem('scaley'))
        setMoveX(parseInt(localStorage.getItem('movex')))
        setMarginTop(parseInt(localStorage.getItem('movey')))

        fetchStudents()
    }, [])


    useEffect(() => {
        const callback = (event) => {
            var name = event.key;
            var code = event.code;
            if (name === 'k') {
                setShowSliders(prev => !prev)
            }
        }
        document.addEventListener('keydown', callback, false);
        return () => {
            document.removeEventListener('keydown', callback, false);
        }
    }, [])

    return error ? (
        <div className='w-full h-screen flex justify-center items-center flex-col'>
            <h1 className='text-red-500 text-lg'>Oops! Something went wrong. Please try again by changing some information.</h1>
            <button className='base__button mt-3' onClick={() => router.back()}>Go back</button>
        </div>
    ) : (
        <>
            <Head>
                <title>Multiple Receipts</title>
                <meta name="description" content={schoolName} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href={"/favicon.ico"} />
            </Head>
            <div className="flex w-full fixed top-0 h-screen left-0 bg-white justify-center">
                <div className="flex border border-gray-200 p-3 absolute" style={{ transform: `scaleX(${scaleX}%) scaleY(${scaleY}%)`, marginTop: marginTop, marginLeft: moveX }}>
                    <div className="flex flex-col gap-1">
                        <div className='flex items-center gap-3 pb-2 mb-1 border-b border-gray-200'>
                            <img src="favicon.ico" alt="GM School" className='h-10 w-10' />
                            <h1 className='text-lg font-semibold'>GM School And Colleges Of Sciences</h1>
                        </div>
                        <div className="flex justify-between items center">
                            <span>Date</span>
                            <span className=''>{moment(new Date()).format('L')}</span>
                        </div>
                        {students.map((student, index) => (
                            <Student student={student} key={student._id} gap={gap} />
                        ))}
                    </div>
                </div>

                {showSliders && <div className="flex mt-64 absolute bottom-0 gap-3 items-center">
                    <div className='flex items-center'>
                        Gap: <input type="range" min='0' max='100' onChange={(e) => {
                            setGap(parseInt(e.target.value))
                            localStorage.setItem('gap', parseInt(e.target.value))
                        }} />
                    </div>
                    <div className='flex items-center'>
                        ScaleX: <input type="range" min='0' max='200' onChange={(e) => {
                            setScaleX(parseInt(e.target.value))
                            localStorage.setItem('scalex', parseInt(e.target.value))
                        }} />
                    </div>
                    <div className='flex items-center'>
                        ScaleY: <input type="range" min='0' max='200' onChange={(e) => {
                            setScaleY(parseInt(e.target.value))
                            localStorage.setItem('scaley', parseInt(e.target.value))
                        }} />
                    </div>
                    <div className='flex items-center'>
                        Move Y: <input type="range" min='-300' max='300' onChange={(e) => {
                            setMarginTop(parseInt(e.target.value))
                            localStorage.setItem('movey', parseInt(e.target.value))
                        }} />
                    </div>
                    <div className='flex items-center'>
                        Move X:<input type="range" min='-600' max='600' onChange={(e) => {
                            setMoveX(parseInt(e.target.value))
                            localStorage.setItem('movex', parseInt(e.target.value))
                        }} />
                    </div>
                </div>}

            </div>
        </>
    )
}

export default MultipleReceipts

export async function getServerSideProps(context) {
    authenticate(context)
    const queries = context.query

    return {
        props: {
            queries
        }
    }
}

const Student = ({ student, gap }) => {
    const [fee, setFee] = useState({})

    useEffect(() => {
        const fetchFe = async () => {
            const res = await axios.get(`/api/studentfee/getOne?studentId=${student._id}&getLast=true`)
            if (res.data) {
                setFee(res.data)
            } else {
                setFee({})
            }
        }
        fetchFe()
    }, [])

    return (
        <div className={`flex justify-between p-1 py-2 border-b border-gray-200 items-center`} style={{gap: `${gap}px`}}>
            <div className="flex gap-2 items-center">
                <img className='w-10 h-10 rounded object-cover' src={student.picture ? student.picture : '/avatar.png'} alt={student.name} />
                <div className="flex flex-col">
                    <span className='text-[16px] font-medium'>{student.name}</span>
                    <span className='text-gray-600 text-sm font-thin'>{student.fathername}</span>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className='font-semibold text-sm'>{fee?.class?.title}</div>
                <div className='text-md text-gray-600 text-sm'>{fee?.class?.session}</div>
            </div>
            <div className="flex flex-col items-center">
                <div className='font-semibold text-sm'>Remainings</div>
                {Object.keys(fee).length > 0 && <div className='text-md text-gray-600 text-sm'>Rs.{fee?.remainings ? new Intl.NumberFormat().format(fee?.remainings) : 0}/-</div>}
            </div>
            <div className="flex flex-col items-end">
                <div className='font-semibold text-sm'>{getMonthName(fee.month?.split('-')[1])}</div>
                <div className='text-md text-gray-600 text-sm'>Rs.{fee?.feeamount ? new Intl.NumberFormat().format(fee?.feeamount) : 0}/-</div>
            </div>
        </div>
    )
}
