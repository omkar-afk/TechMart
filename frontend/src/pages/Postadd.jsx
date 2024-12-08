import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import { ELECTRONICS_TYPE, backendUrl } from "../../src/assets/constants";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
function Postadd() {
  const { user, } = useUser();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  console.log(user);
  const [formData, setFormData] = useState({
    name: { val: "", valid: true },
    description: { val: "", valid: true },
    price: { val: "", valid: true },
    type: { val: "", valid: true },
  });

  const fileInputRef = useRef(null); // Reference for the hidden file input
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
    e.target.value = ""; // Clear input to allow re-selection
  };
  
  const removeImage = (indexToRemove) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((_, index) => index !== indexToRemove)
    );
    // No need to clear the input value, as it's hidden
  };

  useEffect(() => {
    if(!user.phoneNumber){
      alert("Please add your phone Number first")
      navigate("/setting")
    }
  }, [])
  useEffect(() => {
    const previews = selectedFiles.map((file) => {
      if (file instanceof Blob) {
        return URL.createObjectURL(file);
      }
      return null;
    }).filter(src => src !== null);
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
        const uploadResponses = await Promise.all((selectedFiles || []).map((file) => {
          const nformData = new FormData();
          nformData.append('file', file);
          return axios.post(`${backendUrl}/api/upload`, nformData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }));
        const images = uploadResponses.map((res) => res.data.filePath);
        console.log(images)
        let newFormData = {};
        Object.keys(formData).forEach((key) => {

          newFormData[key] = formData[key].val;
        });
        newFormData.owner = user._id; // Hardcoded owner ID
        newFormData.customerAddress = "60f1b0b3b3b3b40015f1b3b3"; // Hardcoded address ID
        newFormData.status = "available"; // Default status
        newFormData.images = images;
        console.log("Submitting form data", newFormData);

        const res = await axios.post(`${backendUrl}/api/electronics/post/add`,newFormData);
        console.log("Response:", res.data);
        
        alert("Post added successfully!");
        navigate("/");
        
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
                      className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow min-w-[23vw] bg-gray-50 "
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
                  name="description" // Changed name to "description"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between font-semibold text-lg mt-4">
                <div className="pl-[10vw]">Price</div>
                <input
                  type="text"
                  className={`input input-bordered min-w-[23vw] text-bg no-outline font-semibold bg-white mr-[8vw]`}
                  name="price" // Changed name to "price"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between font-semibold text-lg mt-4">
                <div className="pl-[10vw]">Upload Images</div>
                <label className="cursor-pointer min-w-[23vw] bg-black text-white px-4 py-2 rounded-md mr-[8vw]">
                  Upload File
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    multiple
                    onChange={handleImageChange} // Fixed to use onChange instead of onClick
                    className="hidden" // Hides the default file input
                  />
                </label>
              </div>
              <div className="flex items-center justify-between font-semibold text-lg mt-4">
                <div></div>
                <div className="grid grid-cols-3 gap-[2vh] mt-2 mr-[8vw]">
                  {previewImages.map((src, index) => (
                    <div key={index} className="relative">
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        onClick={() => removeImage(index)} // Pass the image index to remove
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
