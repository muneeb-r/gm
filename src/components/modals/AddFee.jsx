import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import moment from 'moment/moment';
import { getMonthName, getMonthsBetweenDates } from '@/utils/getMonth';

const initialValues = {
  class: '',
  session: '',
  month: '',
  feeamount: 0,
  remainings: 0
}

const AddFee = ({ setFeeStudent, feeStudent }) => {
  const [formData, setFormData] = useState(initialValues)
  const [classForFee, setClassForFee] = useState({})
  const [datesForFeeDetail, setDatesForFeeDetail] = useState([])
  const [filters, setFilters] = useState({
    class: '',
    session: ''
  })
  const [fees, setFees] = useState([])
  const [scale, setScale] = useState(100)
  const [marginTop, setMarginTop] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  useEffect(() => {
    if (formData.class !== '' && formData.session !== '') {
      setClassForFee(feeStudent.classes?.filter((c) => c.class === formData.class && c.session === formData.session)[0])

    } else {
      setClassForFee({})
    }
  }, [formData.class, formData.session])


  const fetchFees = async () => {
    if (filters.class && filters.session) {
      try {
        setDatesForFeeDetail([]);
        let classes = feeStudent.classes?.filter((c) => c.class === filters.class && c.session === filters.session)[0]
        setDatesForFeeDetail(getMonthsBetweenDates(classes.started, classes.endingDate))
        // const loading = toast.loading('loading...')
        // const res = await axios.get(`/api/studentfee/get?studentId=${feeStudent._id}&class=${filters.class}&session=${filters.session}`)
        // setFees(res.data)
        // toast.success('finished...', { id: loading })
      } catch (e) {

      }
    } else {
      setDatesForFeeDetail([]);
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
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
        studentId: feeStudent._id,
        monthlyfee: feeStudent.monthlyfee,
        campus: localStorage.getItem('campus')
      }

      createFee(data)
        .then((fee) => {
          if (filters.class === formData.class && filters.session === formData.session) {
            const olddetails = datesForFeeDetail
            setDatesForFeeDetail(new Array(olddetails.length))
            setTimeout(() => {
              setDatesForFeeDetail(olddetails)
            }, 100);
          }
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
    <div className='fixed top-0 left-0 w-full z-50 h-screen overflow-auto flex justify-center bg-black bg-opacity-60 backdrop-blur-sm'>
      <div className='w-full lg:w-2/3 bg-white md:my-10 h-fit scale-up'>

        {/* <div className="flex w-full fixed top-0 h-screen left-0 bg-white justify-center">
          <div className='flex flex-col justify-between relative'>

          <div className="flex border border-gray-100 p-3 absolute" style={{transform: `scale(${scale}%)`, marginTop: marginTop}}>
            <div className="flex w-96">
              <img src={feeStudent.picture} className='w-16 h-16 object-cover' alt="" />
              <span>{feeStudent.name}</span>
              <span>class 10</span>
              <span>2023-2024</span>
            </div>
            <div className="flex"></div>
          </div>

          <div className="flex mt-64">
            <input type="range" min='50' max='200' onChange={(e)=> setScale(parseInt(e.target.value))} />
            <input type="range" min='0' max='200' onChange={(e)=> setMarginTop(parseInt(e.target.value))} />
          </div>

          </div>
        </div> */}

        <div className="flex justify-between items-center border-b border-gray-200 px-5 py-3">
          <h1 className='font-semibold tracking-widest  md:text-lg lg:text-xl'>Fee Details</h1>

          <div onClick={() => setFeeStudent(false)} className='bg-gray-50 p-2 rounded-full text-gray-700 cursor-pointer hover:scale-125 active:scale-90 transition-all duration-200 ease-in-out'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <div className="flex p-5">

          <div className="flex flex-col">

            <div className='flex justify-between space-x-2'>
              <div className="flex border border-gray-200 rounded-xl py-3 px-3 flex-col shadow">
                <div>
                  <Image src={feeStudent.picture} className='object-cover w-40 h-40 rounded' width={200} height={200} alt='' />
                </div>
                <div className='mt-3 text-center font-roboto text-gray-800'>{feeStudent.name}</div>
              </div>
              <div className="flex flex-1 border border-gray-200 rounded-xl shadow p-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae exercitationem rem ut, sapiente totam sed ad voluptatibus eos, magni corrupti voluptatum nam in repudiandae a consectetur unde vero ipsam obcaecati! Velit magni, numquam ducimus beatae ex inventore corrupti, natus harum tempore atque illum a aliquam error saepe. Cupiditate aliquam perferendis dolore culpa porro soluta deserunt veniam deleniti. Necessitatibus maiores ipsum enim illum nisi asperiores, inventore iure dolor ipsa fuga aliquam beatae, error iusto aliquid similique quae possimus iste sapiente. Unde vel labore aspernatur dolore at accusamus facere architecto officia nesciunt?</div>
            </div>
            <hr className="my-3 mx-3" />
            <div className='flex justify-between space-x-2 items-start'>
              <div className="flex border border-gray-200 rounded-xl px-3 py-3 shadow">

                <form className='flex flex-col w-60 space-y-3' onSubmit={handleSubmit}>
                  <select className='base__select' onChange={handleChange} value={formData.class} name='class'>
                    <option value="">Select a class...</option>
                    {feeStudent.classes.map((c) => (
                      <option value={c.class}>{c.class}</option>
                    ))}
                  </select>

                  <select className='base__select' onChange={handleChange} value={formData.session} name='session'>
                    <option value="">Select Session</option>
                    {feeStudent.classes.map((c) => (
                      <option value={c.session}>{c.session}</option>
                    ))}
                  </select>
                  {classForFee && Object.keys(classForFee).length > 0 && <select name="month" className='base__select' onChange={handleChange} value={formData.month}>
                    <option value="">Select Month</option>
                    {getMonthsBetweenDates(classForFee.started, classForFee.endingDate).map((date) => (
                      <option value={date} >{getMonthName(date.split('-')[1])} - {date.split('-')[2]}</option>
                    ))}
                    {/* <option value="January" >January</option>
                    <option value="February" >February</option>
                    <option value="March" >March</option>
                    <option value="April" >April</option>
                    <option value="May" >May</option>
                    <option value="June" >June</option>
                    <option value="July" >July</option>
                    <option value="August" >August</option>
                    <option value="September" >September</option>
                    <option value="October" >October</option>
                    <option value="November" >November</option>
                    <option value="December" >December</option> */}
                  </select>}
                  <input className='base__input' type="number" placeholder='Fee Amount' name='feeamount' value={formData.feeamount === 0 ? '' : formData.feeamount} onChange={handleChange} />
                  <input className='base__input' type="number" placeholder='Remainings (optional)' value={formData.remainings === 0 ? '' : formData.remainings} name='remainings' onChange={handleChange} />
                  <button className='base__button text-center flex justify-center items-center'>Add</button>
                </form>

              </div>
              <div className="flex-1 space-y-2">
                <div className='flex space-x-2'>
                  <select className='base__select' onChange={handleFilterChange} name='class'>
                    <option value="">Select a class...</option>
                    {feeStudent.classes.map((c) => (
                      <option value={c.class}>{c.class}</option>
                    ))}
                  </select>

                  <select className='base__select' onChange={handleFilterChange} name='session'>
                    <option value="">Select Session</option>
                    {feeStudent.classes.map((c) => (
                      <option value={c.session}>{c.session}</option>
                    ))}
                  </select>
                  <button onClick={fetchFees} className='base__button'>View</button>
                </div>
                <div className='flex border border-gray-200 rounded-xl p-2 shadow'>
                  <div className="flex flex-col flex-1 space-y-2">
                    {datesForFeeDetail.map((date, i) => (
                      <FeeItem key={date + i} date={date} i={i + 1} studentId={feeStudent._id} classes={filters.class} session={filters.session} />
                    ))}
                    {(!filters.class || !filters.session) && fees.length === 0 && (
                      <div className="flex p-3 text-xl font-roboto text-gray-500">
                        Select class and session to view fee details.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div >
      </div >
    </div >
  )
}

export default AddFee

const FeeItem = ({ date, i, studentId, classes, session }) => {
  const [fee, setFee] = useState({})

  useEffect(() => {
    const fetchFe = async () => {
      const res = await axios.get(`/api/studentfee/getOne?studentId=${studentId}&class=${classes}&session=${session}&month=${date}`)
      if (res.data) {
        setFee(res.data)
      } else {
        setFee({})
      }
    }
    fetchFe()
  }, [])

  const handleDelete = async () => {
    if (fee?._id) {
      const res = await axios.delete(`/api/studentfee/delete?feeId=${fee._id}`)
      toast.success(res.data.message)
      setFee({})
    }
  }

  return date?(
    <div className={`flex animate-slow p-3 group rounded-lg shadow border border-gray-200 items-center justify-between ${fee && Object.keys(fee).length > 0 ? 'bg-green-100' : 'bg-gray-100'}`}>
      <div className="flex space-x-2 items-center">
        <div className='font-roboto text-gray-700'>{i}.</div>
        <div className='text-sm font-roboto'>{getMonthName(date.split('-')[1])}</div>
        <div className='text-md text-gray-600'>Rs.{fee?.feeamount}/-</div>
        <div className={`${fee?.remainings > 0 ? 'text-red-500' : 'text-gray-500'} text-xs`}>Remainings: {fee?.remainings}</div>
      </div>
      <div className="flex space-x-2">
        <div className='text-xs text-gray-500'>{fee?.class?.title}</div>
        <div className='text-xs text-gray-500'>{fee?.class?.session}</div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="text-sm">{fee?.createdAt && moment(fee?.createdAt).format('L')}</div>
        <div onClick={handleDelete} className='scale-0 cursor-pointer group-hover:scale-100 transition-all duration-300'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-red-600 p-1 rounded-md shadow-md">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </div>
      </div>
    </div>
  ):(
    <div className={`flex animate-slow p-3 h-14 animate-pulse group rounded-lg shadow border border-gray-200 items-center justify-between bg-gray-200`}>
    </div>
  )
}