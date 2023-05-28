import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from 'react-hot-toast';
import { database } from '@/utils/firebase';
import { onValue, ref, set, update } from 'firebase/database';
import Link from 'next/link';

const teacherSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    cnic: Yup.string(),
    age: Yup.number(),
    qualification: Yup.string(),
    phone: Yup.number().required("Phone number is required!").test('len', 'Invalid number!', val => val.toString().length >= 10),
});

const UpdateEmployee = ({ employeeToUpdate, year }) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])


    return (
        <div className='fixed top-0 left-0 w-full z-50 h-screen overflow-auto flex justify-center bg-black bg-opacity-60'>
            <div className='w-full md:w-1/2 lg:w-1/3 bg-white md:my-10 h-fit scale-up rounded-lg'>
                <div className="flex justify-between items-center border-b border-gray-200 px-5 py-3">
                    <h1 className='font-semibold tracking-widest  md:text-lg lg:text-xl'>Update {employeeToUpdate.name}</h1>

                    <Link href={'/attendance'} className='bg-gray-50 p-2 rounded-full text-gray-700 cursor-pointer hover:scale-125 hover:bg-gray-800 hover:text-white active:scale-90 transition-all duration-200 ease-in-out'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Link>
                </div>
                <div className="flex p-5">

                    <Formik
                        initialValues={{
                            name: employeeToUpdate.name,
                            cnic: employeeToUpdate.cnic,
                            age: employeeToUpdate.age,
                            qualification: employeeToUpdate.qualification,
                            phone: employeeToUpdate.phone,
                        }}
                        validationSchema={teacherSchema}
                        onSubmit={(values, { resetForm }) => {
                           
                                const loading = toast.loading('loading...')
                                const empRef = ref(database, 'attendance/'+year+'/'+employeeToUpdate.id+'/')
                                update(empRef, values).then(()=>{
                                    toast.success('Employee successfully updated.', {id: loading})
                                    resetForm();
                                }).catch((e)=>{
                                    toast.error('Something went wrong.', {id: loading})
                                })

                        }}
                    >
                        {({ errors, touched, setFieldValue }) => (
                            <Form className='w-full flex flex-col gap-3'>
                                <div className='flex flex-col'>
                                    <label className='font-medium' htmlFor="id">ID</label>
                                    <Field className='base__input disabled:opacity-50' disabled value={employeeToUpdate.id} type="text" name="id" />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-medium' htmlFor="name">Name</label>
                                    <Field className='base__input' type="text" name="name" />
                                    <p className="form__error"><ErrorMessage name="name" /></p>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-medium' htmlFor="cnic">CNIC</label>
                                    <Field className='base__input' type="text" name="cnic" />
                                    <p className="form__error"><ErrorMessage name="cnic" /></p>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-medium' htmlFor="age">Age</label>
                                    <Field className='base__input' type="number" name="age" />
                                    <p className="form__error"><ErrorMessage name="age" /></p>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-medium' htmlFor="qualification">Qualification</label>
                                    <Field className='base__input' type="text" name="qualification" />
                                    <p className="form__error"><ErrorMessage name="qualification" /></p>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-medium' htmlFor="phone">Phone</label>
                                    <Field className='base__input' type="number" name="phone" />
                                    <p className="form__error"><ErrorMessage name="phone" /></p>
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

export default UpdateEmployee