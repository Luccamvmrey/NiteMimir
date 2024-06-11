import React, {ChangeEvent, useState} from "react";

import "../ClassesEditor.css";

import check from "../../../assets/check.png";
import cancel from "../../../assets/cancel.png";

import IconButton from "../../../../core/design-system/icon-btn/IconButton.tsx";
import Dropdown from "../../../../core/design-system/dropdown/Dropdown.tsx";
import {DayOfWeek, getDayOfWeek} from "../../../types/DayOfWeek.ts";
import {getGroup, Group} from "../../../types/Group.ts";
import {IClass} from "../../../types/Class";
import {useClasses} from "../../../hooks/useClasses.ts";
import {useSubject} from "../../../hooks/useSubject.ts";
import Loading from "../../../../core/design-system/loading/Loading.tsx";

type NewClassSectionProps = {
    setIsNewClassOpen: (value: boolean) => void;
    subjectId: string;
    refreshSubjects: () => void;
}

type InputValues = {
    professorName: string;
    timeIn: string;
    timeOut: string;
    roomNumber: string;
    roomFloor: string;
    building: string;
}

const NewClassSection: React.FC<NewClassSectionProps> = (
    {setIsNewClassOpen, subjectId, refreshSubjects}
) => {
    const {
        addClass
    } = useClasses();
    const {
        updateSubject
    } = useSubject();

    const [isLoading, setIsLoading] = useState(false);
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<DayOfWeek | undefined>();
    const [selectedGroup, setSelectedGroup] = useState<Group | undefined>();
    const [inputValues, setInputValues] = useState<InputValues>({
        professorName: "",
        timeIn: "",
        timeOut: "",
        roomNumber: "",
        roomFloor: "",
        building: ""
    });

    const getDaysOfWeek = (): DayOfWeek[] => {
        return Object.values(DayOfWeek).filter((day): day is DayOfWeek => typeof day === "number");
    }

    const getGroups = (): Group[] => {
        return Object.values(Group).filter((group): group is Group => typeof group === "number");
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    }

    const onCancel = () => {
        setIsNewClassOpen(false);
    }

    const isError = ():boolean => {
        if (selectedDayOfWeek === undefined || selectedGroup === undefined) return true;
        const isAnyFieldEmpty = Object.values(inputValues).some(value => value === "");
        if (isAnyFieldEmpty) return true;
        return subjectId === "";
    }

    const onAddNewClass = async () => {
        if (isError()) return;
        setIsLoading(true);

        const newClass: IClass = {
            classId: "",
            dayOfWeek: selectedDayOfWeek as DayOfWeek,
            professorName: inputValues.professorName,
            timeIn: inputValues.timeIn,
            timeOut: inputValues.timeOut,
            group: selectedGroup as Group,
            room: {
                roomNumber: parseInt(inputValues.roomNumber),
                roomFloor: parseInt(inputValues.roomFloor),
                building: parseInt(inputValues.building)
            },
        }

        const newClassId = await addClass(newClass);
        updateSubject(subjectId, newClassId)
            .then(() => {
                refreshSubjects();
                setIsNewClassOpen(false);
                setIsLoading(false);
            })
    }

    return (
        <div className="new-class-section">
            <span>Dados da Aula</span>

            <div className="new-class-input-area">
                <div className="new-class-row">
                    <Dropdown<DayOfWeek>
                        options={getDaysOfWeek()}
                        selectedOption={selectedDayOfWeek}
                        setSelectedOption={setSelectedDayOfWeek}
                        transformOption={getDayOfWeek}
                        placeholder="Dia da Semana"
                    />
                    <input
                        type="text"
                        placeholder="Professor"
                        name="professorName"
                        className="new-class-input"
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        placeholder="Horário de Início"
                        name="timeIn"
                        className="new-class-input"
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        placeholder="Horário de Término"
                        name="timeOut"
                        className="new-class-input"
                        onChange={onChange}
                    />
                </div>
                <div className="new-class-row">
                    <Dropdown<Group>
                        options={getGroups()}
                        selectedOption={selectedGroup}
                        setSelectedOption={setSelectedGroup}
                        transformOption={getGroup}
                        placeholder="Turma"
                    />
                    <input
                        type="text"
                        placeholder="Número da Sala"
                        name="roomNumber"
                        className="new-class-input"
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        placeholder="Andar"
                        name="roomFloor"
                        className="new-class-input"
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        placeholder="Prédio"
                        name="building"
                        className="new-class-input"
                        onChange={onChange}
                    />
                </div>
            </div>

            <div className="new-class-btn-area">
                <IconButton
                    icon={cancel}
                    onClick={onCancel}
                />
                <IconButton
                    icon={check}
                    onClick={onAddNewClass}
                />
            </div>

            {isLoading && <Loading/>}
        </div>
    );
};

export default NewClassSection;