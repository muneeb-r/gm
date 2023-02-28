import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from "yup";

const classSchema = Yup.object().shape({
    class: Yup.string().required("Class is required"),
    session: Yup.string().required("Session is required"),
    started: Yup.string().required("Started Date is required"),
});

function ClassForm({ student: stu }) {
    const [student, setStudent] = useState(stu)

    const createClass = async (data) => {
        const res = await axios.put('/api/student/addClass', { ...data, studentId: student._id })
        return res.data
    }

    return (
        <div className='flex flex-col'>
            <Formik
                initialValues={{ class: '', session: '', started: '' }}
                validationSchema={classSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    createClass(values)
                        .then((res) => {
                            setStudent(res)
                            resetForm()
                            setSubmitting(false)
                        }).catch(e => {
                            setSubmitting(false)
                            toast.error(e.response.data.message);
                        })
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='flex space-x-3 flex-wrap items-start'>
                        <div className='flex flex-col'>
                            <Field as="select" className='base__select' name="class" id="class">
                                <option value="">Select a class...</option>
                                <option value="Nursery Red">Nursery Red</option>
                                <option value="Nursery Blue">Nursery Blue</option>
                                <option value="Prep">Prep</option>
                                <option value="PG Red">PG Red</option>
                                <option value="PG Blue">PG Blue</option>
                                <option value="PG Green">PG Green</option>
                                <option value="KG1 Red">KG1 Red</option>
                                <option value="KG1 Blue">KG1 Blue</option>
                                <option value="KG1 Green">KG1 Green</option>
                                <option value="KG2 Red">KG2 Red</option>
                                <option value="KG2 Blue">KG2 Blue</option>
                                <option value="KG2 Green">KG2 Green</option>
                                <option value="Class 1 Red">Class 1 Red</option>
                                <option value="Class 1 Blue">Class 1 Blue</option>
                                <option value="Class 1 Green">Class 1 Green</option>
                                <option value="Class 1">Class 1 English</option>
                                <option value="Class 2">Class 2</option>
                                <option value="Class 3">Class 3</option>
                                <option value="Class 4">Class 4</option>
                                <option value="Class 5">Class 5</option>
                                <option value="Class 6">Class 6</option>
                                <option value="Class 7">Class 7</option>
                                <option value="Class 8">Class 8</option>
                                <option value="Class Pre-9">Class Pre-9</option>
                                <option value="Class 9">Class 9</option>
                                <option value="Class 10">Class 10</option>
                            </Field>
                            <p className='form__error'><ErrorMessage name="class" /></p>

                        </div>

                        <div className="flex flex-col">
                            <Field as="select" className='base__select' name="session" id="session">
                                <option value="">Select Session</option>
                                <option value="2023-2024">2023-2024</option>
                                <option value="2024-2025">2024-2025</option>
                                <option value="2025-2026">2025-2026</option>
                                <option value="2026-2027">2026-2027</option>
                                <option value="2027-2028">2027-2028</option>
                                <option value="2028-2029">2028-2029</option>
                                <option value="2029-2030">2029-2030</option>
                                <option value="2030-2031">2030-2031</option>
                            </Field>
                            <p className='form__error'><ErrorMessage name="session" /></p>
                        </div>

                        <div className="flex flex-col">
                            <Field type='date' className='base__select' name="started" />
                            <p className='form__error'><ErrorMessage name="started" /></p>
                        </div>

                        <button type="submit" className='base__button' disabled={isSubmitting}>
                            Add
                        </button>
                    </Form>)}
            </Formik>
            <div className="flex my-3 flex-wrap">
                {student.classes.map((c) => (
                    <div className='flex m-2 flex-col space-y-1 shadow-md border border-gray-100 px-4 py-2 rounded-md' key={c.class + c.session}>
                        <div className="flex font-roboto">
                            {c.class}
                        </div>
                        <div className="flex text-gray-600">
                            {c.session}
                        </div>
                        <div className="flex text-gray-500 text-xs">
                            {c.started}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClassForm