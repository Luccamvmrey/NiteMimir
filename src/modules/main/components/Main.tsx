import React, {useState} from "react";

import {ISubject} from "../types/Subject";

import "./Main.css";

import Header from "../../core/design-system/header/Header.tsx";
import MainContent from "./main-content/MainContent.tsx";
import Subjects from "./subjects/Subjects.tsx";
import ClassesEditor from "./classes-editor/ClassesEditor.tsx";
import {useSubject} from "../hooks/useSubject.ts";
import useRunOnce from "../../core/hooks/useRunOnce.ts";
import Loading from "../../core/design-system/loading/Loading.tsx";

const Main: React.FC = () => {
    const {
        getSubjects
    } = useSubject();

    const [isLoading, setIsLoading] = useState(false);
    const [subjectsList, setSubjectsList] = useState<ISubject[]>([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");

    const getSubjectFromList = (subjectId: string) => {
        return subjectsList.find(subject => subject.subjectId === subjectId);
    }

    const refreshSubjects = async () => {
        setIsLoading(true);

        const subjects = await getSubjects();
        setSubjectsList(subjects);

        setIsLoading(false);
    }

    useRunOnce({
        fn: refreshSubjects
    })

    return (
        <main>
            <Header/>

            <MainContent className="main-content">
                <Subjects
                    subjects={subjectsList}
                    refreshSubjects={refreshSubjects}
                    selectedSubjectId={selectedSubjectId}
                    setSelectedSubjectId={setSelectedSubjectId}
                />
                <ClassesEditor
                    selectedSubject={getSubjectFromList(selectedSubjectId)}
                    refreshSubjects={refreshSubjects}
                />
            </MainContent>

            {isLoading && <Loading/>}
        </main>
    );
};

export default Main;