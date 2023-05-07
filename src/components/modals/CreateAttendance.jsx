import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { database } from '@/utils/firebase';
import { onValue, ref, set } from 'firebase/database';

const teacherSchema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string().required("Name is required"),
    cnic: Yup.string(),
    age: Yup.number(),
    qualification: Yup.string(),
    date: Yup.date().required("Date is required"),
});

const CreateAttendance = ({ setShowCreateAttendance }) => {
    const [id, setId] = useState('')

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    useEffect(() => {
        const fetchId = () => {
            const starCountRef = ref(database, 'Register');
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                setId(data)
            });
        }
        fetchId()
    }, [])

    return (
        <div className='fixed top-0 left-0 w-full z-50 h-screen overflow-auto flex justify-center bg-black bg-opacity-60'>
            <div className='w-full md:w-1/2 lg:w-1/3 bg-white md:my-10 h-fit scale-up rounded-lg'>
                <div className="flex justify-between items-center border-b border-gray-200 px-5 py-3">
                    <h1 className='font-semibold tracking-widest  md:text-lg lg:text-xl'>Add Attendance</h1>

                    <div onClick={() => setShowCreateAttendance(false)} className='bg-gray-50 p-2 rounded-full text-gray-700 cursor-pointer hover:scale-125 active:scale-90 transition-all duration-200 ease-in-out'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className="flex p-5">

                    <Formik
                        initialValues={{
                            id: "",
                            name: "",
                            cnic: "",
                            age: "",
                            qualification: "",
                            dob: "",
                        }}
                        validationSchema={teacherSchema}
                        onSubmit={(values, { resetForm }) => {
                            const date = new Date(values.date).getFullYear().toString()

                            set(ref(database, 'attendance/'+date+'/'+id+'/'), {
                                ...values,
                                date
                              });
                            set(ref(database, 'Register'), '');
                              
                            resetForm();
                        }}
                    >
                        {({ errors, touched, setFieldValue }) => (
                            <Form className='w-full flex flex-col gap-3'>
                                <div className='flex flex-col'>
                                    <label htmlFor="id">ID</label>
                                    <Field className='base__input' disabled value={id} type="text" name="id" />
                                    <ErrorMessage name="id" />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="name">Name</label>
                                    <Field className='base__input' type="text" name="name" />
                                    <ErrorMessage name="name" />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="cnic">CNIC</label>
                                    <Field className='base__input' type="text" name="cnic" />
                                    <ErrorMessage name="cnic" />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="age">Age</label>
                                    <Field className='base__input' type="number" name="age" />
                                    <ErrorMessage name="age" />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="qualification">Qualification</label>
                                    <Field className='base__input' type="text" name="qualification" />
                                    <ErrorMessage name="qualification" />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="date">Date</label>
                                    <Field className='base__input'
                                        type="date"
                                        name="date"
                                        onChange={(e) => {
                                            setFieldValue("date", e.target.value);
                                        }}
                                    />
                                    {touched.date && errors.date && (
                                        <div className="error">{errors.date}</div>
                                    )}
                                </div>
                                <div>
                                    <button className='base__button' type="submit">Submit</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div >
            </div >
        </div >
    )
}

export default CreateAttendance