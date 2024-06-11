import React, {useState} from "react";
import {ISubject} from "../../types/Subject";

import "./Subjects.css";

import IconButton from "../../../core/design-system/icon-btn/IconButton.tsx";
import SubjectsList from "./subjects-list/SubjectsList.tsx";

import addIcon from "../../assets/add-new.png";
import NewSubjectSection from "./new-subject-section/NewSubjectSection.tsx";

type SubjectsListContainerProps = {
    subjects: ISubject[];
    refreshSubjects: () => void;
    selectedSubjectId: string;
    setSelectedSubjectId: (subjectId: string) => void;
};

const Subjects: React.FC<SubjectsListContainerProps> = (
    {subjects, refreshSubjects, selectedSubjectId, setSelectedSubjectId}
) => {
    const [isNewSubjectOpen, setIsNewSubjectOpen] = useState(false);

    const onNewSubject = () => {
        setIsNewSubjectOpen(true);
    }

    return (
        <aside className="subjects-list-container">
            <div className="subjects-list-header">
                <h3>Matérias:</h3>
                <IconButton
                    icon={addIcon}
                    title="Nova Matéria"
                    onClick={onNewSubject}
                />
            </div>

            {isNewSubjectOpen &&
                <NewSubjectSection
                    setIsNewSubjectOpen={setIsNewSubjectOpen}
                    refreshSubjects={refreshSubjects}
                />
            }

            <SubjectsList
                subjects={subjects}
                selectedSubjectId={selectedSubjectId}
                setSelectedSubjectId={setSelectedSubjectId}
            />
        </aside>
    );
};

export default Subjects;