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

  return (
    <div>
      <NavBar search={""} />
      <div className="grid grid-cols-12">
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
              <div className="h-[21vh] w-[55vw] mb-[2vh] rounded-lg bg-gray-100">
                <div></div>
                type {electronics && electronics.type}
                description
                {electronics && electronics.description}
              </div>
            </div>
            <div className="col-span-4">
              <div className="h-[21vh] w-full mx-[2vh] mb-[2vh] rounded-lg bg-gray-100">
                price and shirt
              </div>
              <div className="h-[21vh] w-full mx-[2vh] mb-[2vh] rounded-lg bg-gray-100">
              </div>
              <div className="h-[14vh] w-full mx-[2vh] mb-[1vh] rounded-lg bg-gray-100">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Product;
