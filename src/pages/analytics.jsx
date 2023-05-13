import Navbar from '@/components/nav/Navbar'
import Sidebar from '@/components/sidebar/Sidebar'
import Head from 'next/head'
import { authenticate } from '@/utils/authenticate';
import FeeByAmount from '@/components/analytics/FeeByAmount';
import { schoolName } from '@/utils/schoolName';

export default function Analytics() {
  

  return (
    <>
      <Head>
        <title>Analytics - {schoolName}</title>
        <meta name="description" content={schoolName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=''>

        <Navbar />
        <div className="flex">
          <Sidebar currentPage='Analytics' />
          <div className="flex-1 p-3">

            <div className="flex flex-col">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FeeByAmount />
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