import React, {useEffect, useRef, useState} from "react";
import "./ClassesEditor.css";
import {ISubject} from "../../types/Subject";
import {useClasses} from "../../hooks/useClasses.ts";
import useRunOnce from "../../../core/hooks/useRunOnce.ts";
import Loading from "../../../core/design-system/loading/Loading.tsx";
import {IClass} from "../../types/Class";
import ClassesList from "./classes-list/ClassesList.tsx";
import ClassesEditorHeader from "./ClassesEditorHeader/ClassesEditorHeader.tsx";
import NewClassSection from "./new-class-section/NewClassSection.tsx";
import useClickOutside from "../../../core/hooks/useClickOutside.ts";
import Snackbar from "../../../core/design-system/snackbar/Snackbar.tsx";

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
    const [selectedClass, setSelectedClass] = useState<IClass | undefined>();
    const [selectedClassId, setSelectedClassId] = useState("");
    const [isNewClassOpen, setIsNewClassOpen] = useState(false);

    const [hasAddedSnackbar, setHasAddedSnackbar] = useState(false);
    const [hasEditedSnackbar, setHasEditedSnackbar] = useState(false);

    const classesEditorRef = useRef<HTMLElement | null>(null)

    useClickOutside(classesEditorRef, () => {
        if (selectedClassId !== "") {
            setSelectedClassId("")
            setIsNewClassOpen(false);
        }
    })

    const onNewClass = () => {
        setIsNewClassOpen(true);
        setSelectedClassId("");
    }

    const selectClassToEdit = (classId: string) => {
        setSelectedClassId(classId);
        setSelectedClass(classesList.find(c => c.classId === classId));
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
        <section className="classes-editor-container" ref={classesEditorRef}>
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
                    selectedClass={selectedClass}
                    onClose={() => setSelectedClassId("")}
                    setHasAddedSnackbar={setHasAddedSnackbar}
                    setHasEditedSnackbar={setHasEditedSnackbar}
                />
            }

            <ClassesList
                classes={classesList}
                selectedClassId={selectedClassId}
                setSelectedClassId={selectClassToEdit}
                refreshClasses={refreshClasses}
            />

            {isLoading && <Loading/>}
            {hasAddedSnackbar &&
                <Snackbar
                    message="Aula adicionada com sucesso!"
                    type="top"
                    duration={2500}
                    onDurationEnd={() => setHasAddedSnackbar(false)}
                />
            }
            {hasEditedSnackbar &&
                <Snackbar
                    message="Aula editada com sucesso!"
                    type="top"
                    duration={2500}
                    onDurationEnd={() => setHasEditedSnackbar(false)}
                />
            }
        </section>
    );
};

export default ClassesEditor;