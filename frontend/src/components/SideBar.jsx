import React,{useState,useEffect} from 'react'
import { ELECTRONICS_TYPE } from '../utils/constant'
import arrow from '../assets/arrow-down-sign-to-navigate.png'
function SideBar({selectCategory, setSelectCategory, checkboxes,setCheckboxes}) {
    
  const [sideBar, setSideBar] = useState(false)
  const [sideBarCss,setSideBarCss] = useState("collapse-close")
    useEffect(() => {
        if (sideBar) {
          setSideBarCss("collapse-open")
        } else {
          setSideBarCss("collapse-close")
        }
      }, [sideBar])

      const handleCheckboxChange = (key) => {
        setCheckboxes(prev => ({
          ...prev,
          [key]: !prev[key]
        }));
        setSelectCategory(false)
    
      };
      useEffect(() => {
        console.log("selectCategory", selectCategory)
        if (selectCategory) {
          setCheckboxes(() => {
            const updatedCheckboxes = {};
            Object.values(ELECTRONICS_TYPE).forEach((key) => {
              updatedCheckboxes[key] = true;
            });
            return updatedCheckboxes;
          });
        } }
      , [selectCategory])

  return (
    <div className='col-span-3 mr-5'>
    <div className='mt-2 '>
        <div tabIndex={0} className={`collapse border  mt-10 ${sideBarCss}`} >
          <div className="collapse-title pr-4 text-xl font-medium flex items-center">
          <input
            type="checkbox"
            checked={selectCategory}
            onClick={()=>{setSelectCategory((s)=> !s)}}
            className="checkbox_css" />
            <div className='w-full flex justify-between items-center'>
            <div>Categories</div>

            <img src={arrow} className='w-5 h-5 cursor-pointer'onClick={()=>{setSideBar((s)=> !s)}} alt="" />
            </div>
            </div>
            
          <div className="collapse-content">
          {Object.values(ELECTRONICS_TYPE).map((key) => (
                <div className='flex mb-2' key={key}>
                  <input
                    type="checkbox"
                    className="checkbox_css"
                    checked={checkboxes[key]}
                    onChange={() => handleCheckboxChange(key)}
                  /><h1 className='ml-2'>{key}</h1>
                </div>
              )
            )}
            
          </div>
          
        </div> 
      </div>
      </div>
  )
}

export default SideBar