import React from "react";

const SearchBox = ({value, onChange}) =>{
    // my3 apply margin on y-axis that is on top and bottom with 3
    return(
        <input 
            type="text"
            name="query"
            className="form-control my-3"
            placeholder="Search..."
            value={value}
            onChange={e => onChange(e.currentTarget.value)}
        />
    )
}

export default SearchBox;