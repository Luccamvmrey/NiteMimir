import React, {PropsWithChildren} from "react";

import "./ModalBox.css";

type ModalBoxProps = PropsWithChildren<{
    onClick: React.MouseEventHandler<HTMLDivElement>;
    className?: string;
}>;

const ModalBox: React.FC<ModalBoxProps> = (
    {onClick, className, children}
) => {
    return (
        <div className="modal-box" onClick={onClick}>
            <div className={`modal-content ${className}`}>
                {children}
            </div>
        </div>
    );
};

export default ModalBox;