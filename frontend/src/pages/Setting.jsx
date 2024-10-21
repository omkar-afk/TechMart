import React, { useState } from "react";
import NavBar from "../components/NavBar";
import ELECTRONICS_TYPE from "../../src/assets/constants";
import validator from "validator";

function Postadd() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: { blur: false, val: "", valid: true },
    description: { blur: false, val: "", valid: true },
    price: { blur: false, val: "", valid: true },
    type: { blur: false, val: "", valid: true },
  });

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: { ...prevFormData[name], val: value, valid: true },
    }));
  };

  // Handle form field blur for validation
  const handleBlur = (event) => {
    const { name, value } = event.target;
    let valid = true;

    if (name === "price") {
      valid = validator.isNumeric(value);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: { ...prevFormData[name], blur: true, valid },
    }));
  };

  // Handle dropdown change
  const handleTypeChange = (value) => {
    setDropdownOpen(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      type: { val: value, blur: true, valid: true },
    }));
  };

  // Form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = Object.values(formData).every(
      (field) => field.val && field.valid
    );

    if (isValid) {
      try {
        console.log("Submitting form data", formData);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert("Post added successfully!");
      } catch (error) {
        console.error("Error submitting post:", error);
        alert("Failed to add post. Please try again.");
      }
    } else {
      alert("Please fill out all fields correctly.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar search={""} />
      <div className="grid grid-cols-12 mt-[8vh]">
        <div className="col-start-3 col-span-8 bg-gray-100 h-fit p-[5vh] rounded-3xl">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              {/* Dropdown for selecting type */}
              <div className="flex items-center justify-between font-semibold text-lg mt-4">
                <div className="pl-[10vw]">Type</div>
                <div className="dropdown dropdown-bottom pr-[8vw]">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn mb-1 min-w-[23vw] bg-white border-none text-black hover:bg-white"
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                  >
                    {formData.type.val || `Select Type`}
                    <span>
                      <i className="fa-solid fa-caret-down"></i>
                    </span>
                  </div>
                  {isDropdownOpen && (
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow min-w-[23vw] bg-gray-50"
                    >
                      {Object.values(ELECTRONICS_TYPE).map((type) => (
                        <li key={type}>
                          <a onClick={() => handleTypeChange(type)}>{type}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {["name", "description", "price"].map((field) => (
                <div
                  className="flex items-center justify-between font-semibold text-lg mt-4"
                  key={field}
                >
                  <div className="pl-[10vw]">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </div>
                  <input
                    type={field === "price" ? "number" : "text"}
                    className={`input input-bordered min-w-[23vw] text-bg no-outline font-semibold bg-white mr-[8vw] ${
                      formData[field].blur && !formData[field].valid
                        ? "border-2 border-rose-500"
                        : ""
                    }`}
                    name={field}
                    value={formData[field].val}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              ))}
              <div className="flex justify-between">
                <div className="font-bold">hsdbaksdba</div>
                <div>
                  <button
                    type="submit"
                    className="btn my-5 ml-3 min-h-2 h-10 min-w-[8vw] btn-primary border-0 bg-black text-white hover:bg-gray-800"
                  >
                    Add asdmnas,dbansdbas
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Postadd;
