import { useEffect,useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { backendUrl } from "../assets/constants";
import { useParams,useNavigate } from "react-router-dom";
import { ELECTRONICS_TYPE } from '../utils/constant';
function Product() {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [electronics, setElectronics] = useState(null);
  useEffect(() => {
    axios.get(`${backendUrl}/api/electronics/get/item/${id}`).then((res) => {
      const {images,...main} = res.data.body;
      setImages(images);
      setElectronics(main);
    }).catch((error) => {
      console.error("There was an error fetching the product data:", error);
    });
  }, [id]);
  console.log(electronics);
  return (
    <div>
      <NavBar search={""} />
      <div className="grid grid-cols-12 mt-[5vh]">
        <div className="col-start-2 col-span-10 grid mt-10">
          <div className="grid grid-cols-12">
            <div className="col-span-8">
              <div className="carousel w-[55vw] h-[60vh] bg-white">
                {images.map((image, index) => (
                  <div key={index} id={`item${index + 1}`} className="carousel-item w-full">
                    <img
                      src={`${backendUrl}${image.url}`}
                      className="object-contain object-center w-full h-full rounded-lg"
                    />
                  </div>
                ))}
              </div>
              <div className="flex w-full justify-center gap-2 py-2">
                {images.map((_, index) => (
                  <a key={index} href={`#item${index + 1}`} className="btn btn-sm bg-white border-none text-black shadow-none hover:bg-white">
                    {index + 1}
                  </a>
                ))}
              </div>
              
            </div>
            <div className="col-span-4">
              <div className="h-[21vh] w-full mx-[2vh] mb-[2vh] rounded-lg bg-gray-100">
                <div className="pt-[3vh] pl-[5vh] font-bold text-xl">
                  Type : 
                </div>
                <div className="pl-[5vh] pt-[1vh]  text-xl">
                { electronics && electronics.type}
                  </div>
                  <div className="pt-[1vh] pl-[5vh] font-bold text-xl">
                    name:
                </div>

                <div className="pl-[5vh] pt-[1vh]  text-xl">
                { electronics && electronics.name}

                  </div>
              </div>
              <div className="h-[21vh] w-full mx-[2vh] mb-[2vh] rounded-lg bg-gray-100">
              <div className="pt-[3vh] pl-[5vh] font-bold text-xl">
                  Description : 
                </div>
                <div className="pl-[5vh] pt-[1vh]  text-xl">
                { electronics && electronics.description}
                  </div>
                  

                
              </div>
              <div className="h-[14vh] w-full mx-[2vh] mb-[1vh] rounded-lg bg-gray-100">
              <div className="pt-[3vh] pl-[5vh] font-bold text-xl">
                  Owner : { electronics && electronics.owner.firstName} { electronics && electronics.owner.lastName}
                </div>
                <div className="pt-[2vh] pl-[5vh] font-bold text-xl">
                  PhoneNumber : { electronics && electronics.owner.phoneNumber} 
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Product;
