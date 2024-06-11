import React from "react";

import "./CustomInput.css";

type CustomInputProps = {
    type: string;
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = (
    {type, label, name, onChange}
) => {
    return (
        <input
            type={type}
            placeholder={label}
            name={name}
            onChange={onChange}
        />
    );
};

export default CustomInput;