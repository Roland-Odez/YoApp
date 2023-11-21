import Chat from '@/components/Chat';
import Header from '@/components/Header';
import Keyboard from '@/components/Keyboard';
import SendMessage from '@/components/SendMessage';
import SearchBar from '@/components/SearchBar';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { SlOptionsVertical } from 'react-icons/sl';
import RecieveMessage from '@/components/RecieveMessage';

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
  }
]

export default function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
console.log(searchParams)

  return (
    <main className='h-full md:h-screen w-full bg-lighter-bg lg:max-h-[95%] lg:max-w-[98%]'>
      <div className='flex items-start h-full'>
      {/* contact area area */}
        <section className='border-r border-r-[rgba(134,150,160,0.27)] w-full h-full md:w-1/2 lg:max-w-[470px]'>
          {/* header */}
         <Header />
         <SearchBar />
          <main className='max-h-[calc(100%-110px)] overflow-y-auto overflow-x-hidden hover:on-scrollbar no-scrollbar duration-700'>
            {
              users.map((user, idx) => (
                <Chat key={idx} {...user} />
              ))
            }
          </main>
        </section>
      {/* chat area */}
        <section className='w-full h-full'>
            <div className='h-full relative flex flex-col bg-element'>
              {/* header */}
                <div className='flex w-full self-start items-center gap-4 p-1 sm:pl-4 pr-2 bg-light-bg'>
                  <div>
                      <div className='rounded-full flex items-center justify-center w-[43px] h-[43px] overflow-hidden'>
                      <Image src='/roland.jpg' className='w-full h-full object-cover' width={49} height={49} alt='profile image' />
                      </div>
                  </div>
                  <div className='w-full flex items-center justify-between'>
                  <Link href='/profile' className='flex flex-col w-full'>
                      <span className='capitalize text-white-txt'>Roland Odenore</span>
                      <span className='text-xs font-light text-read-msg'>last seen today at 09:23</span>
                  </Link>
                  <div className='flex items-center'>
                  <button title='Search...' className='p-3'><AiOutlineSearch className='text-light-txt w-6 h-6' /></button>
                  <button title='Menu' className='p-3'><SlOptionsVertical className='text-tab-icon w-6 h-4' /></button>
                  </div>
                  </div>
                </div>
                {/* message area */}
                <div className='w-full justify-end flex flex-col gap-1 max-h-[calc(100%-113px)]'>
                  <div className='overflow-y-auto py-2 hover:on-scrollbar'>
                  <RecieveMessage message='what is your name?... 1' />
                  <SendMessage message='i am Roland' />
                  <RecieveMessage message='what is your name?... 2' />
                  <SendMessage message='i am Roland' />
                  <RecieveMessage message='what is your name?... 3' />
                  <SendMessage message='i am Roland' />
                  <RecieveMessage message='what is your name?... 4' />
                  <SendMessage message='i am Roland' />
                  <RecieveMessage message='what is your name?... 5' />
                  <SendMessage message='i am Roland' />
                  <RecieveMessage message='what is your name?... 6' />
                  <SendMessage message='i am Roland' />
                  <RecieveMessage message='what is your name?... 7 here we go gain, what is your name?... 7 here we go gain' />
                  <SendMessage message='i am Roland' />

                  </div>
                </div>

                {/* keyboard area */}
                <Keyboard />
          </div>
        </section>
      </div>
    </main>
  )
}
