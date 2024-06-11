import React, {useState} from "react";

import IconButton from "../../../../core/design-system/icon-btn/IconButton.tsx";

import "../Subjects.css";

import check from "../../../assets/check.png";
import cancel from "../../../assets/cancel.png"

import {useSubject} from "../../../hooks/useSubject.ts";
import {ISubject} from "../../../types/Subject";

type NewSubjectSectionProps = {
    setIsNewSubjectOpen: (value: boolean) => void;
    refreshSubjects: () => void;
}

type InputValues = {
    subjectName: string;
}

const NewSubjectSection: React.FC<NewSubjectSectionProps> = ({setIsNewSubjectOpen, refreshSubjects}) => {
    const {addSubject} = useSubject();

    const [inputValues, setInputValues] = useState<InputValues>({
        subjectName: "",
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    }

    const onClose = () => {
        setIsNewSubjectOpen(false);
    }

    const onAddNewSubject = () => {
        if (!inputValues.subjectName) {
            alert("Preencha todos os campos");
            return;
        }

        const newSubject: ISubject = {
            subjectId: "not initialized",
            subjectName: inputValues.subjectName,
            classes: []
        }

        addSubject(newSubject)
            .then(() => {
                setIsNewSubjectOpen(false);
                refreshSubjects();
            })
    }

    return (
        <div className="new-subject-section">
            <span>Dados da Matéria</span>

            <div className="new-subject-input-area">
                <input
                    type="text"
                    placeholder="Nome da Matéria"
                    name="subjectName"
                    className="new-subject-input"
                    onChange={onChange}
                />
            </div>

            <div className="new-subject-btn-area">
                <IconButton
                    icon={cancel}
                    onClick={onClose}
                />
                <IconButton
                    icon={check}
                    onClick={onAddNewSubject}
                />
            </div>
        </div>
    );
};

export default NewSubjectSection;