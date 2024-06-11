import React, {useEffect, useState} from "react";
import "./ClassesEditor.css";
import {ISubject} from "../../types/Subject";
import {useClasses} from "../../hooks/useClasses.ts";
import useRunOnce from "../../../core/hooks/useRunOnce.ts";
import Loading from "../../../core/design-system/loading/Loading.tsx";
import {IClass} from "../../types/Class";
import ClassesList from "./classes-list/ClassesList.tsx";
import ClassesEditorHeader from "./ClassesEditorHeader/ClassesEditorHeader.tsx";
import NewClassSection from "./new-class-section/NewClassSection.tsx";

type ClassesEditorProps = {
    selectedSubject: ISubject | undefined;
    refreshSubjects: () => void;
}

const ClassesEditor: React.FC<ClassesEditorProps> = ({selectedSubject, refreshSubjects}) => {
    const {
        getClasses
    } = useClasses();

    const [isLoading, setIsLoading] = useState(false);
    const [classesList, setClassesList] = useState<IClass[]>([]);
    const [selectedClassId, setSelectedClassId] = useState("");
    const [isNewClassOpen, setIsNewClassOpen] = useState(false);

    const onNewClass = () => {
        setIsNewClassOpen(true);
    }

    const refreshClasses = async () => {
        if (!selectedSubject) return;

        setIsLoading(true);
        
        const classes = await getClasses(selectedSubject.classes);
        setClassesList(classes);

        setIsLoading(false);
    }

    useEffect(() => {
        refreshClasses().then(() => {})
        // eslint-disable-next-line
    }, [selectedSubject]);

    useRunOnce({
        fn: refreshClasses
    })

    return (
        <section className="classes-editor-container">
            <ClassesEditorHeader
                title={selectedSubject?.subjectName}
                subtitle="Aulas:"
                onClick={onNewClass}
            />

            {isNewClassOpen &&
                <NewClassSection
                    setIsNewClassOpen={setIsNewClassOpen}
                    subjectId={selectedSubject?.subjectId || ""}
                    refreshSubjects={refreshSubjects}
                />
            }

            <ClassesList
                classes={classesList}
                selectedClassId={selectedClassId}
                setSelectedClassId={setSelectedClassId}
            />

            {isLoading && <Loading/>}
        </section>
    );
};

export default ClassesEditor;