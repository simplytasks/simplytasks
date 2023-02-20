import React from "react";

const SortSelect = ({changeSort}) => {
    const handleUserSelection = (event) => {
        changeSort(event.target.value); 
        //event.target.value is the value of the option that was selected
    }

    return (
    <>  
        <div className="sort-selector">
            <label className="label" htmlFor="sortby">Sort by:</label>
            <select className="selector" id="sortby" onChange={handleUserSelection}>
                <option value="Latest">Latest</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Highlighted">Highlighted</option>
                <option value="Message">Message</option>
            </select>
        </div>
    </>
    );
}

export default SortSelect;