import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    reportername: Yup.string().required('Reporter name is required'),
    student: Yup.string(),
    relation: Yup.string(),
    other: Yup.string(),
    whatsappnumber: Yup.string(),
    email: Yup.string().email('Invalid email'),
    inquiry: Yup.string().required('Inquiry is required'),
});

export default function CreateInquiry({ setShowCreateInquiry, setInquiries }) {

    const createInquiry = async(data)=>{
        const res = await axios.post('/api/inquiry/create', {...data, campus:localStorage.getItem('campus')})
        return res.data
    }

    return (
        <div className='fixed top-0 left-0 w-full z-50 h-screen overflow-auto flex justify-center bg-black bg-opacity-60'>
            <div className='w-full md:w-1/2 lg:w-1/3 bg-white md:my-10 h-fit scale-up rounded-lg'>
                <div className="flex justify-between items-center border-b border-gray-200 px-5 py-3">
                    <h1 className='font-semibold tracking-widest  md:text-lg lg:text-xl'>Add Inquiry</h1>

                    <div onClick={() => setShowCreateInquiry(false)} className='bg-gray-50 p-2 rounded-full text-gray-700 cursor-pointer hover:scale-125 active:scale-90 transition-all duration-200 ease-in-out'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className="flex p-5">
                    <Formik
                        initialValues={{
                            reportername: '',
                            student: '',
                            relation: '',
                            other: '',
                            whatsappnumber: '',
                            email: '',
                            inquiry: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            const loading = toast.loading('loading...')
                            createInquiry(values)
                            .then((data)=>{
                                setInquiries(prev=> [data, ...prev])
                                resetForm()
                                toast.success('Inquiry created.', {id:loading})
                            }).catch((error)=>{
                                console.log(error)
                                toast.error('something went wrong.', {id:loading})
                            })
                            
                            setSubmitting(false);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className='flex flex-col w-full gap-3'>
                                <div className='flex flex-col'>
                                    <label className='font-medium' htmlFor="reportername">Reporter Name</label>
                                    <Field className='base__input' type="text" name="reportername" />
                                    <p className="form__error"><p className="form__error"><ErrorMessage name="reportername" /></p></p>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-medium' htmlFor="student">Student</label>
                                    <Field className='base__input' type="text" name="student" />
                                    <p className="form__error"><ErrorMessage name="student" /></p>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-medium' htmlFor="relation">Relation</label>
                                    <Field className='base__input' type="text" name="relation" />
                                    <p className="form__error"><ErrorMessage name="relation" /></p>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-medium' htmlFor="other">Other</label>
                                    <Field className='base__input' type="text" name="other" />
                                    <p className="form__error"><ErrorMessage name="other" /></p>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-medium' htmlFor="whatsappnumber">WhatsApp Number</label>
                                    <Field className='base__input' type="text" name="whatsappnumber" />
                                    <p className="form__error"><ErrorMessage name="whatsappnumber" /></p>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-medium' htmlFor="email">Email</label>
                                    <Field className='base__input' type="email" name="email" />
                                    <p className="form__error"><ErrorMessage name="email" /></p>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-medium' htmlFor="inquiry">Inquiry</label>
                                    <Field className='base__input' as="textarea" name="inquiry" />
                                    <p className="form__error"><ErrorMessage name="inquiry" /></p>
                                </div>
                                <div>
                                    <button className='base__button' type="submit" disabled={isSubmitting}>
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};
