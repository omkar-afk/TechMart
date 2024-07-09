import React from 'react'

function InputSearchBox() {
  return (
    <div>
        <label className="input text-xl  no-outline font-semibold bg-gray-50 rounded-full flex items-center gap-2">
            <i className="fa-solid fa-magnifying-glass mr-1 mb-1"></i>
            <input type="text" className="grow mb-0.5 "  onChange= {e => setSearch(e.target.value)} placeholder='Search' />
        </label>
    </div>
  )
}

export default InputSearchBox