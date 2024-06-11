import React from "react";

import "../Subjects.css";

import {ISubject} from "../../../types/Subject";
import SubjectsListItem from "./SubjectsListItem.tsx";

type SubjectsListProps = {
    subjects: ISubject[];
    selectedSubjectId: string;
    setSelectedSubjectId: (subjectId: string) => void;
}

const SubjectsList: React.FC<SubjectsListProps> = (
    {subjects, selectedSubjectId, setSelectedSubjectId}
) => {
    return (
        <div className="subjects-list">
            {subjects.map(subject => (
                <SubjectsListItem
                    key={subject.subjectId}
                    subject={subject}
                    isSelected={subject.subjectId === selectedSubjectId}
                    onClick={() => setSelectedSubjectId(subject.subjectId)}
                />
            ))}
        </div>
    );
};

export default SubjectsList;