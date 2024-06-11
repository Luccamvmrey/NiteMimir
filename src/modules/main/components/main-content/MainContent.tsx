import React, {PropsWithChildren} from "react";

type MainContentProps = PropsWithChildren<{
    className?: string;
}>

const MainContent: React.FC<MainContentProps> = ({children, className}) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default MainContent;