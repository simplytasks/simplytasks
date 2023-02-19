import React from "react";

const SortSelect = ({handleSortChange}) => {
    const handleChange = (event) => {
        const newSortType = event.target.value;
        console.log('my new sort type is: ' + newSortType);
        handleSortChange(newSortType);
    }

    return (
    <React.Fragment>
        <label htmlFor="sortby">Sort by:</label>
        <select id="sortby" onChange={handleChange}>
            <option value="None">None</option>
            <option value="Message">Message</option>
            <option value="Date">Date</option>
        </select>
    </React.Fragment>
    );
}

export default SortSelect;