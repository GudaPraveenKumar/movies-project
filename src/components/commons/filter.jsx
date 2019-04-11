import React from 'react';

const Filter = (props) => {
    
    const { items, textProperty, valueProperty, onItemSelect, selectedItem } = props;
    
    return (
      
        <ul className="list-group">
            {items.map(item => 
                <li 
                onClick={() => onItemSelect(item)}
                key={item[valueProperty]}
                className={item === selectedItem? "list-group-item active": "list-group-item"}>
                    {item[textProperty]}
                </li> 
            )}
            
        </ul>
    );
}

Filter.defaultProps = {
    textProperty: 'name',
    valueProperty: "_id"
}

export default Filter;
