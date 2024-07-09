import React from 'react'

function InputAddressBox() {
  return (
    <div>
        <label className="input text-xl no-outline font-semibold bg-gray-50 rounded-full flex items-center gap-2 mr-5 ">
            <i class="fa-solid fa-location-dot mr-1 mb-1"></i>
            <input type="text" className="grow mb-0.5 outline-none" onChange= {e => setSearch(e.target.value)} placeholder='Address' />
        </label>
    </div>
  )
}

export default InputAddressBox