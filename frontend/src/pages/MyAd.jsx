import React from 'react'
import NavBar from '../components/NavBar'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useUser } from '../context/UserContext'
import { backendUrl } from '../assets/constants'
function MyAd() {

   const [items, setItems] = useState([]);
   const { user } = useUser();
   const [change, setChange] = useState(false);
   //create use eefect and call get for my ads using axios give cusimter id
   const getMyAds = async () => {
      try {
      const res = await axios.get(
         `${backendUrl}/api/electronics/get/owner/${user._id}`
      );
      const images = await axios.get(
         `${backendUrl}/api/electronics/get/owner/${user._id}`
      );
      console.log(res.data.body);
      setItems(res.data.body);
      } catch (err) {
      console.log(err);
      }
   };
   useEffect(() => {
      getMyAds();
   }
   , [user,change]);
   console.log(user);

   const ChangeStatus = async (id) => {
      try {
          const res = await axios.patch(
            `${backendUrl}/api/electronics/patch/${id}`
          );
         setChange(!change);
      } catch (err) {
         console.log(err);
      }
   }
   const deleteIt = async (id) => {
      try {
          const res = await axios.delete(
            `${backendUrl}/api/electronics/delete/${id}`
          );
         setChange(!change);
      } catch (err) {
         console.log(err);
      }
   }  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar search={""} />
      <div className="grid grid-cols-12 mt-[8vh]">
        <div className="col-start-3 col-span-8  p-[5vh]  ">
         <h1 className='text-3xl font-semibold mb-5'>My Ads</h1>

         {items.map((item) => (
            <div className='h-[17vh] bg-gray-100 rounded-lg flex items-center justify-around mb-[2vh] hover:cursor-pointer' onClick={()=>{}}>
            <div className="">
                      <img
                        src={`${backendUrl}${item.images.url}`}
                        // alt={`Preview ${index + 1}`}
                        // onClick={() => removeImage(index)} // Pass the image index to remove
                        className="h-[13vh] w-[13vh] object-cover rounded-lg shadow-lg"
                      />
                     </div> 
                     <div className='font-semibold text-lg'>
                        {item.name}
                     </div>
                     <div className='font-medium text-lg'>
                        Rs{item.price}
                     </div>
                     {item.status !== "Sold" ?  (<div className='flex flex-row justify-between items-center w-[15vw] '><button className='btn bg-green-500 text-white border-none hover:bg-green-500'>
                        {item.status}
                       </button>
                       <div className='flex flex-col '>
                       <button className='btn min-h-[2vh] h-[4.5vh] mb-3 bg-red-500 text-white border-none hover:bg-red-400' onClick={() => ChangeStatus(item._id)}>
                          Sold?
                       </button>
                       <button className='btn min-h-[2vh] h-[4.5vh] border-none hover:bg-white hover:text-black' onClick={() => deleteIt(item._id)
                       }>
                          remove
                       </button>
                       </div></div>) :(
                       <div className='flex w-[15vw] justify-around'>
                       <button className='btn min-h-[2vh] h-[4.5vh] mb-3 bg-red-500 text-white border-none hover:bg-red-500'>
                          Sold
                       </button>
                       </div>)}
                     
                     
            </div>
         ))}
            
        </div>
        </div>
        </div>
  )
}

export default MyAd