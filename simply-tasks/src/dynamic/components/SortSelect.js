import React from "react";
import Button from './Button'

const SortSelect = ({changeSort, contents}) => {
    const handleUserSelection = () => {
        changeSort(); 
        //event.target.value is the value of the option that was selected
    }

    return (
    <>  
        <div className="sort-selector">
            <Button className="selector" contents={contents} handleClick={handleUserSelection}/>
        </div>
    </>
    );
}

export default SortSelect;