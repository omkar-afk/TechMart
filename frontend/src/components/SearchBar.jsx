import React from 'react'

function SearchBar({setSearch}) {
  return (
    <div className='col-start-2 col-span-10 mt-10'>
        <label className="input text-xl font-semibold bg-gray-200 flex items-center gap-2">
            <i className="fa-solid fa-magnifying-glass mr-1"></i>
            <input type="text" className="grow mb-0.5" onChange= {e => setSearch(e.target.value)} placeholder='Search' />
        </label>
    </div>
  )
}

export default SearchBar