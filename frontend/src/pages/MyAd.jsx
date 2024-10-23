import React from 'react'
import NavBar from '../components/NavBar'

function MyAd() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar search={""} />
      <div className="grid grid-cols-12 mt-[8vh]">
        <div className="col-start-3 col-span-8  p-[5vh]  ">
            <div className='h-[17vh] bg-gray-100 rounded-lg flex items-center justify-around mb-[2vh] hover:cursor-pointer' onClick={()=>{}}>
            <div className="">
                      <img
                        src="http://localhost:3000/data/1729618027428-mermaid-diagram-2024-10-20-224554.png"
                        // alt={`Preview ${index + 1}`}
                        // onClick={() => removeImage(index)} // Pass the image index to remove
                        className="h-[13vh] w-[13vh] object-cover rounded-lg shadow-lg"
                      />
                     </div> 
                     <div className='font-semibold text-lg'>
                        I phone 6 s s
                     </div>
                     <div className='font-medium text-lg'>
                        Rs6000
                     </div>
                     <button className='btn'>
                        Not sold
                     </button>
                     <div className='flex flex-col '>
                     <button className='btn min-h-[2vh] h-[4.5vh] mb-3'>
                        Sold?
                     </button>
                     <button className='btn min-h-[2vh] h-[4.5vh]'>
                        remove
                     </button>
                     </div>
                     
            </div>
            <div className='h-[17vh] bg-gray-100 rounded-lg flex items-center justify-around'>
            <div className="">
                      <img
                        src="http://localhost:3000/data/1729618027428-mermaid-diagram-2024-10-20-224554.png"
                        // alt={`Preview ${index + 1}`}
                        // onClick={() => removeImage(index)} // Pass the image index to remove
                        className="h-[13vh] w-[13vh] object-cover rounded-lg shadow-lg"
                      />
                     </div> 
                     <div className='font-semibold text-lg'>
                        I phone 6 s s
                     </div>
                     <div className='font-medium text-lg'>
                        Rs6000
                     </div>
                     <button className='btn'>
                        Not sold
                     </button>
                     <div className='flex flex-col '>
                     <button className='btn min-h-[2vh] h-[4.5vh] mb-3'>
                        Sold?
                     </button>
                     <button className='btn min-h-[2vh] h-[4.5vh]'>
                        remove
                     </button>
                     </div>
                     
            </div>
        </div>
        </div>
        </div>
  )
}

export default MyAd