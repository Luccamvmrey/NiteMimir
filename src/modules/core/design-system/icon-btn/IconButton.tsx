import React, {MouseEventHandler} from "react";

import "./IconButton.css";

type IconButtonProps = {
    onClick?: MouseEventHandler;
    icon: string;
    title?: string;
    className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({onClick, icon, title, className}) => {
    const btnClass = title ? "icon-btn" : "icon-btn-no-title";

    return (
        <button onClick={onClick} className={`${btnClass} ${className}`}>
            <img src={icon} alt={title}/>
            {title ? <span>{title}</span> : null}
        </button>
    );
};

export default IconButton;