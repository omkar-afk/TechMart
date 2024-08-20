import axios from 'axios';
import React, { useEffect, useState ,useRef} from 'react';
import { useNavigate } from 'react-router-dom';

function InputSearchBox({suggest}) {
  const [suggestText, setSuggestText] = useState(suggest||"");
  const [suggestions, setSuggestions] = useState([]);
  const [focus, setFocus] = useState(false);
  const link = useNavigate();
  const inputRef = useRef(null);
  
  useEffect(()=>{
    setSuggestText(suggest)
  },[suggest])
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (suggestText.length > 1) {
        try {
          const response = await axios.get(`http://localhost:3000/api/electronics/getSuggestion/${suggestText}`);
          setSuggestions(response.data.body);
        } catch (err) {
          console.log(err);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [suggestText]);

  const handleBlur = () => {
    // Delay the blur action to allow the click event on the <li> to be registered
    setTimeout(() => setFocus(false), 200);
  };

  return (
    <div className="relative"> 
      <label className="input text-xl no-outline font-semibold bg-gray-50 rounded-full flex items-center gap-2">
        <i className="fa-solid fa-magnifying-glass mr-1 mb-1"></i>
        <input
          ref = {inputRef}
          type="text"
          className="grow mb-0.5"
          onChange={e => setSuggestText(e.target.value)}
          placeholder='Search'
          onFocus={() => setFocus(true)}
          onBlur={handleBlur} // Use the delayed blur handler
          value={suggestText}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              link(`/${suggestText}`);
              inputRef.current.blur(); // Blur the input field
            }
          }}
        />
      </label>

      {suggestions.length > 0 && focus && (
        <ul className="menu menu-sm rounded-box w-56 absolute top-full left-0 mt-2 z-50 bg-gray-100">
          {suggestions.map((item, index) => (
            <li key={index} className="p-2 hover:bg-gray-200 rounded-md hover:cursor-pointer" onClick={() => {link(`/${item.suggestion}`);}}>
              {item.suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InputSearchBox;
