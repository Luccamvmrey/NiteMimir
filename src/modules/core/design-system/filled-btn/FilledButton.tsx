import React, {MouseEventHandler} from "react";

import "./FilledButton.css";

type FilledButtonProps = {
    className?: string;
    onClick?: MouseEventHandler;
    type?: 'button' | 'submit' | 'reset';
    title: string;
};

const FilledButton: React.FC<FilledButtonProps> = ({className, onClick, type = "button", title}) => {
    return (
        <button onClick={onClick} type={type} className={`filled-btn ${className}`}>
            {title}
        </button>
    );
};

export default FilledButton;