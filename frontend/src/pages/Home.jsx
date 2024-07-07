import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import NavBar from '../components/NavBar'
import { ELECTRONICS_TYPE } from '../utils/constant'
import SideBar from '../components/SideBar'
function Home() {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState(' ')
  let initialCheckboxState = {}
  Object.values(ELECTRONICS_TYPE).forEach((type)=>{initialCheckboxState[type] = true })
  const [checkboxes, setCheckboxes] = useState(initialCheckboxState);
  const [selectCategory, setSelectCategory] = useState(true)
  

    

  useEffect(() => {
    const type = Object.keys(checkboxes).filter(key => checkboxes[key] === true)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjdmYjU5NWZkNjFmMzIzMjA0ZWNiY2UiLCJmaXJzdE5hbWUiOiJPbWthciIsImxhc3ROYW1lIjoiRGVzaG11a2giLCJlbWFpbCI6Im9ta2FyZGVzaG11a2g3ODkwQGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjo3NzU2ODM0NTcwLCJfX3YiOjAsImlhdCI6MTcyMDA5MDg1NCwiZXhwIjoxNzIwNjk1NjU0fQ.GQ9andPANRsgC6EKQpdqBEQyK5loIv_LNtRlhC6RCGs"
    axios.get(`http://localhost:3000/api/electronics/get/${search}`,{params:type,headers:{'Authorization':`Bearer ${token}`}})
    .then(res => {const duplicatedItems = Array(10).fill([...res.data.body]).flat();
      setItems(duplicatedItems);});

  }, [search, checkboxes])

  
  return (
    <div>
      
      <NavBar />
        
      <div className='grid grid-cols-12 '>
        <SearchBar setSearch={setSearch} />
      </div>
      <div className='grid grid-cols-12 mx-5'>
      <SideBar selectCategory={selectCategory} setSelectCategory={setSelectCategory} checkboxes={checkboxes} setCheckboxes={setCheckboxes} />

      <div className='col-span-9 grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>

      {items.map(item => {
        return (
          <div className="card bg-base-100 bg-gray-200 border-2 border-gray-200 text-black">
            
              <img src="https://th.bing.com/th/id/OIP.p85NSH7Ra7R4fouWWuUd0wHaJo?rs=1&pid=ImgDetMain" className='aspect-[4/3] object-cover bg-white rounded-2xl' alt={item.name} />

            <div className="card-body p-4 pt-3">
              <h2 className="card-title font-semibold text-2xl">Rs{item.price}</h2>
              <div className='font-medium'>{item.name} | {item.description}</div>
              <div className="card-actions justify-end items-end">
``
                <button className="btn btn-primary bg-black text-white border-0 hover:bg-white hover:text-black">Buy Now</button>
              </div>
            </div>
          </div>
        )
      })}
      </div>
      </div>
    </div>
  )
}

export default Home;