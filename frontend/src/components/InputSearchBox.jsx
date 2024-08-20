import axios from 'axios';
import React, { useEffect, useState } from 'react'

function InputSearchBox() {
  const [suggestText , setSuggestText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    // Define the async function inside useEffect
    const fetchSuggestions = async () => {
      if (suggestText.length > 1) {
        try {
          const response = await axios.get(`http://localhost:3000/api/electronics/getSuggestion/${suggestText}`);
          setSuggestions(response.data.body);
        } catch (err) {
          setError(err);
        }
      }else{
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [suggestText]);
  return (
    <div className="relative"> 
  <label className="input text-xl no-outline font-semibold bg-gray-50 rounded-full flex items-center gap-2">
    <i className="fa-solid fa-magnifying-glass mr-1 mb-1"></i>
    <input
      type="text"
      className="grow mb-0.5"
      onChange={e => setSuggestText(e.target.value)}
      placeholder='Search'
    />
  </label>

  {suggestions.length>0 && (
        <ul className="menu menu-sm bg-base-200 rounded-box w-56 absolute top-full left-0 mt-2 z-50 bg-gray-100">
          {suggestions.map((item, index) => (
            <li key={index} className="p-2 hover:bg-gray-200">
              <a>{item.suggestion}</a>
            </li>
          ))}
        </ul>
      )}
</div>

  )
}

export default InputSearchBox