import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ELECTRONICS_TYPE from "../../src/assets/constants";

function Postadd() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: { val: "", valid: true },
    description: { val: "", valid: true },
    price: { val: "", valid: true },
    type: { val: "", valid: true },
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const handleImageChange = (e) => {
    setSelectedFiles((prev)=>[...prev,e.target.files[0]]);
  };
  useEffect(() => {
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    console.log(previews)
    setPreviewImages(previews);
    }, [selectedFiles]);

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: { ...prevFormData[name], val: value },
    }));
  };

  // Handle type selection from dropdown
  const handleTypeChange = (value) => {
    setDropdownOpen(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      type: { ...prevFormData.type, val: value },
    }));
  };

  // Form submission logic
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = Object.values(formData).every((field) => field.val);
    if (isValid) {
      try {
        // Call API to submit form data
        console.log("Submitting form data", formData);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert("Post added successfully!");
      } catch (error) {
        console.error("Error submitting post:", error);
        alert("Failed to add post. Please try again.");
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar search={""} />
      <div className="grid grid-cols-12 mt-[8vh]">
        <div className="col-start-3 col-span-8 bg-gray-100 h-fit p-[5vh] rounded-3xl">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <div className="flex items-center justify-between font-semibold text-lg mt-4">
                <div className="pl-[10vw]">Type</div>
                <div className="dropdown dropdown-bottom pr-[8vw] ">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn mb-1 min-w-[23vw] bg-white border-none text-black hover:bg-white"
                    onClick={() => setDropdownOpen(!isDropdownOpen)} // Toggle dropdown open/close
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
                          <a
                            onClick={(event) => {
                              handleTypeChange(type);
                            }}
                          >
                            {type}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between font-semibold text-lg mt-4">
                <div className="pl-[10vw]">Name</div>
                <input
                  type="text"
                  className={`input input-bordered min-w-[23vw] text-bg no-outline font-semibold bg-white mr-[8vw]`}
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between font-semibold text-lg mt-4">
                <div className="pl-[10vw]">Description</div>
                <input
                  type="text"
                  className={`input input-bordered min-w-[23vw] text-bg no-outline font-semibold bg-white mr-[8vw]`}
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between font-semibold text-lg mt-4">
                <div className="pl-[10vw]">Price</div>
                <input
                  type="text"
                  className={`input input-bordered min-w-[23vw] text-bg no-outline font-semibold bg-white mr-[8vw]`}
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between font-semibold text-lg mt-4">
                <div className="pl-[10vw]">Upload Images</div>
                <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="block min-w-[23vw] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mr-[8vw]"
      />
              </div>
    <div className="flex items-center justify-between font-semibold text-lg mt-4">
        <div></div>
    <div className="grid grid-cols-3 gap-[2vh] mt-2 mr-[8vw]">
        {previewImages.map((src, index) => (
          <div key={index} className="relative">
            <img
              src={src}
              alt={`Preview ${index + 1}`}
              className="h-[13vh] w-[13vh] object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
      

              <div className="flex justify-between">
                <div></div>
                <div>
                  <button
                    type="submit"
                    className="btn my-5 ml-3 min-h-2 h-10 min-w-[14vw] btn-primary border-0 bg-black text-white hover:bg-gray-800 mr-[12vw]"
                  >
                    Add Post
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
