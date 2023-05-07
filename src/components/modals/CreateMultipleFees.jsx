import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getMonthName, getMonthsBetweenDates } from "@/utils/getMonth";
import { AuthContext } from "@/context/authcontext/AuthContext";
import { redirectEmployee } from "@/utils/redirectEmployee";

const initialValues = {
    class: '',
    session: '',
    month: '',
    feeamount: 0,
    remainings: 0
}

const CreateMultipleFees = ({ setShowCreateMultipleFees }) => {
    const [RNList, setRNList] = useState('');
    const [students, setStudents] = useState([])

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    const handleNext = async () => {
        if (RNList) {
            setStudents([])
            let loading = toast.loading('loading...')
            try {
                let RNs = [...new Set(RNList.split(','))]

                let studs = []

                for (const rn of RNs) {
                    if (rn) {
                        const res = await axios.get('/api/student/get?rn=' + parseInt(rn))
                        if (res.data) {
                            studs.push(res.data)
                        } else {
                            toast.error('No one found :(', { id: loading })
                        }
                    }
                }
                setStudents(studs)
                if (studs.length > 0) {
                    toast.success('loaded', { id: loading })
                }
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong', { id: loading })
            }
        }
    }

    const handleGoToReceipt = ()=>{
        let rns = []
        students.forEach((s)=>{
            rns.push(s.rn)
        })
        redirectEmployee('/multiplereceipts?rns='+rns)
    }

    return (
        <div className='fixed top-0 left-0 w-full z-50 h-screen overflow-auto flex justify-center bg-black bg-opacity-60'>
            <div className='w-full lg:w-1/3 bg-white md:my-10 h-fit scale-up rounded-lg'>
                <div className="flex justify-between items-center border-b border-gray-200 px-5 py-3">
                    <h1 className='font-semibold tracking-widest  md:text-lg lg:text-xl'>Add Fees</h1>

                    <div onClick={() => setShowCreateMultipleFees(false)} className='bg-gray-50 p-2 rounded-full text-gray-700 cursor-pointer hover:scale-125 active:scale-90 transition-all duration-200 ease-in-out'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className="flex p-5">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col gap-3">
                            <input onChange={(e) => setRNList(e.target.value)} type="text" placeholder='Enter RN seperated by ,' className="base__input" />
                            <div>
                                <button onClick={handleNext} className="base__button">Next</button>
                            </div>
                        </div>
                        <hr className="my-2" />
                        <div className="flex flex-col gap-3">
                            {students.map((student) => (
                                <FeeForm student={student} key={student._id} />
                            ))}
                        </div>
                        {students.length>0&&<div className="flex mt-5">
                            <button className="base__button__indigo" onClick={handleGoToReceipt}>Go to receipt</button>
                        </div>}
                    </div>
                </div >
            </div >
        </div >
    )
}

export default CreateMultipleFees

const FeeForm = ({ student }) => {
    const [formData, setFormData] = useState(initialValues)
    const [classForFee, setClassForFee] = useState({})
    const { setFees, setTotal } = useContext(AuthContext)


    useEffect(() => {
        if (formData.class !== '' && formData.session !== '') {
            setClassForFee(student.classes?.filter((c) => c.class === formData.class && c.session === formData.session)[0])

        } else {
            setClassForFee({})
        }
    }, [formData.class, formData.session])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const createFee = async (data) => {
        const res = await axios.post('/api/studentfee/create', data)
        return res.data
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.class && formData.session && formData.feeamount && formData.month) {
            let loading = toast.loading('loading...')
            let data = {
                ...formData,
                studentId: student._id,
                campus: localStorage.getItem('campus'),
                monthlyfee: student.monthlyfee,
            }

            createFee(data)
                .then((fee) => {
                    setFees(prev => [fee, ...prev])
                    setTotal(prev => ({ ...prev, total: prev.total + 1 }))
                    setFormData(initialValues)
                    toast.success('Fee has been added.', { id: loading })
                }).catch((e) => {
                    toast.error(e.response.data.message, { id: loading })
                })

        } else {
            toast.error('Please provide the required information!')
        }
    }


    return (
        <div className="border border-gray-200 rounded-md flex flex-col p-2">
            <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                    <img className="w-10 h-10 rounded shadow object-cover" src={student.picture ? student.picture : '/avatar.png'} alt={student.name} />
                    <span className="text-[16px] font-medium">{student.name}</span>
                </div>
                <div className="flex">
                    <div className="flex text-sm">Monthly Fee: <b className='ml-1'> Rs.{new Intl.NumberFormat().format(student.monthlyfee)}/-</b></div>
                </div>
            </div>
            <hr className="my-2" />
            <form className='flex flex-col w-full space-y-3' onSubmit={handleSubmit}>
                <select className='base__select' onChange={handleChange} value={formData.class} name='class'>
                    <option value="">Select a class...</option>
                    {student.classes.map((c) => (
                        <option value={c.class}>{c.class}</option>
                    ))}
                </select>

                <select className='base__select' onChange={handleChange} value={formData.session} name='session'>
                    <option value="">Select Session</option>
                    {student.classes.map((c) => (
                        <option value={c.session}>{c.session}</option>
                    ))}
                </select>
                {classForFee && Object.keys(classForFee).length > 0 && <select name="month" className='base__select' onChange={handleChange} value={formData.month}>
                    <option value="">Select Month</option>
                    {getMonthsBetweenDates(classForFee.started, classForFee.endingDate).map((date) => (
                        <option value={date} >{getMonthName(date.split('-')[1])} - {date.split('-')[2]}</option>
                    ))}
                </select>}
                <input className='base__input' type="number" placeholder='Fee Amount' name='feeamount' value={formData.feeamount === 0 ? '' : formData.feeamount} onChange={handleChange} />
                <input className='base__input' type="number" placeholder='Remainings (optional)' value={formData.remainings === 0 ? '' : formData.remainings} name='remainings' onChange={handleChange} />
                <button className='base__button text-center flex justify-center items-center'>Add</button>
            </form>
        </div>
    )
}