import React, { Children } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { ELECTRONICS_TYPE } from "../utils/constant";
import SideBar from "../components/SideBar";

function Home() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { searchValue } = useParams();
  if (searchValue && searchValue != search) {
    setSearch(searchValue);
  } else if (!searchValue && search != "") {
    setSearch("");
  }

  let initialCheckboxState = {};
  Object.values(ELECTRONICS_TYPE).forEach((type) => {
    initialCheckboxState[type] = true;
  });
  const [checkboxes, setCheckboxes] = useState(initialCheckboxState);
  const [selectCategory, setSelectCategory] = useState(true);

  useEffect(() => {
    const type = Object.keys(checkboxes).filter(
      (key) => checkboxes[key] === true
    );
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/api/electronics/get/${search}`, {
        params: type,
      })
      .then((res) => {
        setIsLoading(false);
        const duplicatedItems = Array(10)
          .fill([...res.data.body])
          .flat();
        setItems(duplicatedItems);
      });
  }, [search, checkboxes]);

  return (
    <div>
      <NavBar search={search} />

      {isLoading ? (
        <Wrapper
          condition={searchValue}
          selectCategory={selectCategory}
          setSelectCategory={setSelectCategory}
          checkboxes={checkboxes}
          setCheckboxes={setCheckboxes}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="card bg-white shadow-md outline-black text-black"
            >
              <img className="aspect-[4/3] object-cover skeleton bg-gray-100 rounded-2xl mx-4 mt-4" />
              <div className="card-body p-4 pt-3">
                <h2 className="skeleton w-28 h-8 bg-gray-100"></h2>
                <div className="font-medium skeleton w-full h-6 bg-gray-100"></div>
                <div className="card-actions justify-end items-end mt-2">
                  <button className="btn btn-primary rounded-lg border-0 bg-gray-100 skeleton w-[91px] h-10 hover:bg-gray-100"></button>
                </div>
              </div>
            </div>
          ))}
        </Wrapper>
      ) : (
        <Wrapper
          condition={searchValue}
          selectCategory={selectCategory}
          setSelectCategory={setSelectCategory}
          checkboxes={checkboxes}
          setCheckboxes={setCheckboxes}
        >
          {items.map((item) => {
            return (
              <div className="card bg-white shadow-md outline-black text-black ">
                <img
                  src="https://th.bing.com/th/id/OIP.p85NSH7Ra7R4fouWWuUd0wHaJo?rs=1&pid=ImgDetMain"
                  className="aspect-[4/3] object-cover  rounded-2xl mx-4 mt-4"
                />
                <div className="card-body p-4 pt-3">
                  <h2 className="card-title font-semibold text-2xl">
                    Rs{item.price}
                  </h2>
                  <div className="font-medium">
                    {item.name} | {item.description}
                  </div>
                  <div className="card-actions justify-end items-end">
                    <button className="btn btn-primary border-0 bg-black text-white hover:bg-gray-800 " onClick={() => navigate(`/product/${item._id}`)}>
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </Wrapper>
      )}
    </div>

    // </div>
  );
}
const Wrapper = ({
  children,
  condition,
  selectCategory,
  setSelectCategory,
  checkboxes,
  setCheckboxes,
}) =>
  condition ? (
    <div className="grid grid-cols-12 mx-5">
      <SideBar
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
        checkboxes={checkboxes}
        setCheckboxes={setCheckboxes}
      />{" "}
      <div className="col-span-9">
        <div className="grid grid-cols-12">
          <div className="col-start-2 col-span-10 grid grid-cols-3 gap-5 mt-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-span-10 grid grid-cols-4 gap-5 mt-10">
        {children}
      </div>
    </div>
  );
export default Home;
