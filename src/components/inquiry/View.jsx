import { useEffect } from "react"

const View = ({ setInquiry, inquiry }) => {


    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    return (
        <div className='fixed animate-bg-opacity top-0 left-0 w-full z-50 h-screen overflow-auto flex justify-center bg-black bg-opacity-60 backdrop-blur-sm'>
            <div className='w-full lg:w-1/3 rounded-md bg-white md:my-10 h-fit scale-up'>
                <div className="flex justify-between items-center border-b border-gray-200 px-5 py-3">
                    <h1 className='font-semibold flex items-center gap-2 tracking-widest  md:text-lg lg:text-xl'>
                        <span>{inquiry.reportername}</span>
                    </h1>

                    <div onClick={() => setInquiry({})} className='bg-gray-50 p-2 rounded-full text-gray-700 cursor-pointer hover:scale-125 active:scale-90 transition-all duration-200 ease-in-out'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className="flex p-5 flex-col gap-3">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <span className="font-medium text-lg">Reporter Name</span>
                            <p>{inquiry.reportername}</p>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-lg">Student</span>
                            <p>{inquiry.student}</p>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-lg">Relation</span>
                            <p>{inquiry.relation}</p>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-lg">Other</span>
                            <p>{inquiry.other}</p>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-lg">Whatsapp</span>
                            <p>{inquiry.whatsappnumber}</p>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-lg">Email</span>
                            <p>{inquiry.email}</p>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-lg">Inquiry</span>
                            <p>{inquiry.inquiry}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View