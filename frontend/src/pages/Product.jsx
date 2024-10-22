import NavBar from "../components/NavBar";
function Product() {
  return (
    <div>
      <NavBar search={""} />
      <div className="grid grid-cols-12">
        <div className="col-start-2 col-span-10 grid mt-10">
          <div className="grid grid-cols-12">
            <div className="col-span-8">
              <div className="carousel w-[55vw] h-[60vh]">
                <div id="item1" className="carousel-item w-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                    className="w-full"
                  />
                </div>
                <div id="item2" className="carousel-item w-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                    className="w-full"
                  />
                </div>
                <div id="item3" className="carousel-item w-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                    className="w-full"
                  />
                </div>
                <div id="item4" className="carousel-item w-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex w-full justify-center gap-2 py-2">
                <a href="#item1" className="btn btn-sm bg-white border-none text-black shadow-none  hover:bg-white">
                  1
                </a>
                <a href="#item2" className="btn btn-sm bg-white border-none text-black shadow-none  hover:bg-white">
                  2
                </a>
                <a href="#item3" className="btn btn-sm bg-white border-none text-black shadow-none  hover:bg-white">
                  3
                </a>
                <a href="#item4" className="btn btn-sm bg-white border-none text-black shadow-none hover:bg-white">
                  4
                </a>
              </div>
              <div className="h-[21vh] w-[55vw]  mb-[2vh] rounded-lg bg-gray-100">

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
