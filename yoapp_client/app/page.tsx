import Image from 'next/image'
import { MdGroups } from "react-icons/md";
import { PiCircleDashedBold } from "react-icons/pi";
import { BiSolidMessageAdd } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineSearch } from "react-icons/ai";
import { IoFilter } from "react-icons/io5";

export default function Home() {
  return (
    <main className='h-[calc(100vh-50px)] md:h-screen w-full'>
      <div className='flex items-start h-full'>
      {/* contact area area */}
        <section className='border-r border-r-slate-800 w-full h-full max-w-md'>
          {/* header */}
          <header>
            <div className='bg-light-bg flex items-center py-2 px-4'>
              <div className='w-full'>
                <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
                  <Image src='/profile.jpg' className='fw-full h-full object-cover' width={40} height={40} alt='profile image' />
                </div>
              </div>
              <div className='w-full flex items-center justify-between'>
                <button className='p-2'>
                  <MdGroups className='text-tab-icon w-6 h-6' />
                </button>
                <button className='p-2 relative'>
                  <PiCircleDashedBold className='text-tab-icon w-6 h-6' />
                  <span className='w-[12px] h-[12px] rounded-full top-[35%] left-[35%] bg-tab-icon absolute'></span>
                  {/* <div className='  rounded-full'> */}
                    <span className='absolute top-[25%] right-[20%] border-[3px] border-light-bg w-[5px] h-[5px] bg-primary rounded-full p-[2px] inline-block'></span>
                  {/* </div> */}
                </button>
                <button className='p-2'>
                  <BiSolidMessageAdd className='text-tab-icon w-6 h-6' />
                </button>
                <button className='p-2'>
                  <SlOptionsVertical className='text-tab-icon w-6 h-4' />
                </button>
              </div>
            </div>
            <div className='flex items-center justify-between p-2'>
              <div className='rounded-md bg-light-bg flex items-center pl-3 w-full p-2'>
                <AiOutlineSearch className='text-light-txt w-5 h-5' />
                <p className='text-light-txt pl-10 pr-8 text-sm'>Search or start new chat</p>
                <input type="text" className='w-full h-full hidden' />
              </div>
              <div className='ml-2'>
              <IoFilter className='text-light-txt w-5 h-5' />
              </div>
            </div>
          </header>
        </section>
      {/* chat area */}
        <section className='w-full h-full'>
          <div>
            chat mesaages
          </div>
        </section>
      </div>

    </main>
  )
}
