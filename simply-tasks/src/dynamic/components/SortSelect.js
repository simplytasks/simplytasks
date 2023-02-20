import React from "react";

const SortSelect = ({handleSortChange}) => {
    const handleChange = (event) => {
        handleSortChange(event.target.value);
    }

    return (
    <>
        <label htmlFor="sortby">Sort by:</label>
        <select id="sortby" onChange={handleChange}>
            <option value="None">None</option>
            <option value="Message">Message</option>
            <option value="Highlighted">Highlighted</option>
            <option value="Date">Date</option>
        </select>
    </>
    );
}

export default SortSelect;