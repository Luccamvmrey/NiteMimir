import React, {MouseEventHandler} from "react";

import {ISubject} from "../../../types/Subject";

import "../Subjects.css";

type SubjectsListItemProps = {
    subject: ISubject;
    isSelected: boolean;
    onClick: MouseEventHandler<HTMLDivElement>;
}

const SubjectsListItem: React.FC<SubjectsListItemProps> = (
    {subject, isSelected, onClick}
) => {
    const className = isSelected ? "subjects-list-item selected" : "subjects-list-item";

    return (
        <div className={className} onClick={onClick}>
            <span className="subject-name">{subject.subjectName}</span>
        </div>
    );
};

export default SubjectsListItem;