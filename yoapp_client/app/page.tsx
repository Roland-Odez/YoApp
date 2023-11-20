import Chat from '@/components/Chat';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import Image from 'next/image';
import { AiOutlineSearch } from 'react-icons/ai';
import { SlOptionsVertical } from 'react-icons/sl';

const users = [
  {
    id: 1,
    name: 'Roland',
    message: 'how are you? i was thinking of seeing you today... are you chance?',
    read: false,
    time: 1695988799,
    img: 'roland.jpg'
  },
  {
    id: 2,
    name: 'Sam Okes',
    message: 'how are you? i was thinking of seeing you today... are you chance?',
    read: false,
    time: 8635988799,
    img: 'okes.jpeg'
  },
  {
    id: 3,
    name: 'Titus',
    message: 'You dey come today?',
    read: true,
    time: 1835999799,
    img: 'titus.jpeg'
  },
  {
    id: 4,
    name: 'Titus',
    message: 'You dey come today?',
    read: true,
    time: 1835999799,
    img: 'titus.jpeg'
  },
  {
    id: 5,
    name: 'Titus',
    message: 'You dey come today?',
    read: true,
    time: 1835999799,
    img: 'titus.jpeg'
  },
  {
    id: 6,
    name: 'Titus',
    message: 'You dey come today?',
    read: true,
    time: 1835999799,
    img: 'titus.jpeg'
  },
  {
    id: 7,
    name: 'Titus',
    message: 'You dey come today?',
    read: true,
    time: 1835999799,
    img: 'titus.jpeg'
  },
  {
    id: 8,
    name: 'Titus',
    message: 'You dey come today?',
    read: true,
    time: 1835999799,
    img: 'titus.jpeg'
  },
  {
    id: 9,
    name: 'Titus',
    message: 'You dey come today?',
    read: true,
    time: 1835999799,
    img: 'titus.jpeg'
  }
]

export default function Home() {
  return (
    <main className='h-full md:h-screen w-full bg-lighter-bg lg:max-h-[95%] lg:max-w-[98%]'>
      <div className='flex items-start h-full'>
      {/* contact area area */}
        <section className='border-r border-r-slate-800 w-full h-full md:w-1/2 lg:max-w-[470px]'>
          {/* header */}
         <Header />
         <SearchBar />
          <main className='max-h-[calc(100%-110px)] overflow-y-auto overflow-x-hidden'>
            {
              users.map((user, idx) => (
                <Chat key={idx} {...user} />
              ))
            }
          </main>
        </section>
      {/* chat area */}
        <section className='w-full h-full'>
            <div>
            <div className='flex items-center gap-4 p-1 sm:pl-4 pr-2 bg-light-bg'>
              <div>
                  <div className='rounded-full flex items-center justify-center w-[43px] h-[43px] overflow-hidden'>
                  <Image src='/roland.jpg' className='w-full h-full object-cover' width={49} height={49} alt='profile image' />
                  </div>
              </div>
              <div className='w-full flex items-center justify-between'>
              <div className='flex flex-col w-full'>
                  <span className='capitalize text-white-txt'>Roland Odenore</span>
                  <span className='text-xs font-light text-read-msg'>last seen today at 09:23</span>
              </div>
              <div className='flex items-center'>
              <button title='Search...' className='p-3'><AiOutlineSearch className='text-light-txt w-6 h-6' /></button>
              <button title='Menu' className='p-3'><SlOptionsVertical className='text-tab-icon w-6 h-4' /></button>
              </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
