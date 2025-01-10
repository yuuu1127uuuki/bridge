import React, { useState } from 'react';

const DropDown = ({ label = 'Select an option', options = [], onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <div className="dropdown" style={styles.dropdown}>
            <button onClick={handleToggle} className="dropdown-toggle" style={styles.dropdownToggle}>
                {selectedOption ? selectedOption.label : label}
            </button>
            {isOpen && (
                <ul className="dropdown-menu" style={styles.dropdownMenu}>
                    {options.map((option) => (
                        <li key={option.value} onClick={() => handleSelect(option)} style={styles.dropdownMenuItem}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const styles = {
    dropdown: {
        width: '25%',
    },
    dropdownToggle: {
        width: '100%',
        backgroundColor: '#c9fdd7',
        color: '#8c7676',
        outline: '1px solid #99f0ca',
        textAlign: 'center',
        padding: '10px',
        boxSizing: 'border-box',
    },
    dropdownMenu: {
        width: '100%',
        backgroundColor: '#c9fdd7',
        color: '#8c7676',
        outline: '1px solid #99f0ca',
        textAlign: 'center',
        listStyle: 'none',
        padding: '0',
        margin: '0',
    },
    dropdownMenuItem: {
        padding: '10px',
        cursor: 'pointer',
    },
};

export default DropDown;

