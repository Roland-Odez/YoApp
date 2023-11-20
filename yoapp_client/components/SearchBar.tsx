'use client'
import React, {useState, useRef} from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoFilter } from 'react-icons/io5'
import { HiArrowLeft } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";

const SearchBar = () => {
  const [showInput, setShowInput] = useState(false)
  // const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  inputRef.current?.focus()

  const changeInput = () => {
    setShowInput(!showInput)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ''; // Clearing the input value
      inputRef.current.focus(); // Optionally, focus on the input after clearing
    }
  }
  return (
    <div className='flex items-center justify-between p-2'>
        <div className='rounded-md bg-light-bg flex items-center pl-3 w-full p-2'>
        <button onClick={changeInput}>
          {
            showInput ? 
            <HiArrowLeft className='text-primary w-5 h-5' />
            :
            <AiOutlineSearch className='text-light-txt w-5 h-5' />
            }
        </button>
        {
          showInput ? 
          (
            <div className='flex items-center justify-between w-full'>
              <input ref={inputRef} type="text" className='w-full h-full text-white text-sm pl-5 bg-transparent outline-none' />
              <button onClick={clearInput} className='outline-none'>
                <IoCloseOutline className='text-light-txt w-5 h-5' />
              </button>
            </div>
          )
          :
          <p onClick={changeInput} className='text-light-txt pl-10 pr-8 text-sm'>Search or start new chat</p>
        }
        </div>
        <button className='ml-2'>
        <IoFilter className='text-light-txt w-5 h-5' />
        </button>
    </div>
  )
}

export default SearchBar