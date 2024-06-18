import React, {MouseEventHandler} from "react";

import "./FilledButton.css";

type FilledButtonProps = {
    className?: string;
    onClick?: MouseEventHandler;
    type?: 'button' | 'submit' | 'reset';
    title?: string;
};

const FilledButton: React.FC<FilledButtonProps> = ({className, onClick, type = "button", title}) => {
    const btnClassName = className ? className : "filled-btn";

    return (
        <button onClick={onClick} type={type} className={btnClassName}>
            {title}
        </button>
    );
};

export default FilledButton;