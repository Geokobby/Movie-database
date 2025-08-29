import React from 'react'

const SearchBar = () => {
  return (
      <div className='   mx-10 shadow-lg'>
          <div className='flex items-center place-content-around'>
              <div>
              <input type="text" placeholder='search' className='bg-gray-200 rounded-lg  my-2 px-3 '/>
          </div>
           
          <div className='flex'>
              <h2 className=' mx-4 '>Review</h2>
              <h2>Browse Movie</h2>
          </div></div>
          
    </div>
  )
}

export default SearchBar