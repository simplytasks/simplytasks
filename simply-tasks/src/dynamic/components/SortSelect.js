import React from "react";

const SortSelect = ({changeSort}) => {
    const handleUserSelection = (event) => {
        changeSort(event.target.value); 
        //event.target.value is the value of the option that was selected
    }

    return (
    <>  
        <div className="sort-selector">
            <select className="selector" onChange={handleUserSelection}>
                <option value="Latest">Sort by: Latest</option>
                <option value="Upcoming">Sort by: Upcoming</option>
                <option value="Highlighted">Sort by: Highlighted</option>
                <option value="Message">Sort by: Message</option>
            </select>
        </div>
    </>
    );
}

export default SortSelect;