import {useRef, useState} from "react";
import useClickOutside from "../../hooks/useClickOutside.ts";

import "./Dropdown.css";

type DropdownProps<T> = {
    options: T[];
    selectedOption: T | undefined;
    setSelectedOption: (option: T) => void;
    transformOption: (option: T) => string;
    placeholder: string;
}

const Dropdown = <T,>({options, setSelectedOption, selectedOption, transformOption, placeholder}: DropdownProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const onSelectOption = (option: T) => {
        setSelectedOption(option);
        toggleDropdown();
    }

    useClickOutside(dropdownRef, () => setIsOpen(false));

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div className="dropdown-header" onClick={toggleDropdown}>
                {transformOption(selectedOption!) || placeholder}
            </div>
            {isOpen && (
                <div className="dropdown-list-container">
                    <ul className="dropdown-list">
                        {Object.values(options)
                            .map((option, index) => {
                                return <li
                                    className="dropdown-item"
                                    onClick={onSelectOption.bind(null, option)}
                                    key={index}
                                >{transformOption(option)}</li>
                            })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;