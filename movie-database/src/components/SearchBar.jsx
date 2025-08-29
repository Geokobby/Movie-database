import React from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchBar = () => {
  return (
      <div className='   border-b'>
          <div className='flex items-center place-content-around py-3'>
              <div className='bg-white shadow-xl flex items-center rounded-xl pl-4 w-1/2'>
          <FaSearch className='text-gray-400' />    
          <input type="text" placeholder='Movie Search' className='bg-transparent font-bold w-full focus:outline-none  my-2 px-3' />
          </div>
           
          </div>
          
    </div>
  )
}

export default SearchBar