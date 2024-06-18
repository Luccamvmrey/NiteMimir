import React, {ChangeEvent, useEffect, useState} from "react";

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
    selectedClass?: IClass;
    onClose: () => void;
    setHasAddedSnackbar: (value: boolean) => void;
    setHasEditedSnackbar: (value: boolean) => void;
}

const getInitialState = (selectedClass?: IClass) => ({
    dayOfWeek: selectedClass?.dayOfWeek,
    group: selectedClass?.group,
    professorName: selectedClass?.professorName || "",
    timeIn: selectedClass?.timeIn || "",
    timeOut: selectedClass?.timeOut || "",
    roomNumber: selectedClass?.room.roomNumber.toString() || "",
    roomFloor: selectedClass?.room.roomFloor.toString() || "",
    building: selectedClass?.room.building.toString() || ""
});

const NewClassSection: React.FC<NewClassSectionProps> = (
    {setIsNewClassOpen, subjectId, refreshSubjects, selectedClass, onClose, setHasEditedSnackbar, setHasAddedSnackbar}
) => {
    const {
        addClass,
        updateClass
    } = useClasses();
    const {
        updateSubject
    } = useSubject();

    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState(getInitialState(selectedClass));

    const title = selectedClass ? "Editar Aula" : "Dados da Aula";

    const getDaysOfWeek = (): DayOfWeek[] => {
        return Object.values(DayOfWeek).filter((day): day is DayOfWeek => typeof day === "number");
    }

    const getGroups = (): Group[] => {
        return Object.values(Group).filter((group): group is Group => typeof group === "number");
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const setSelectedOption = <T,>(name: string, option: T) => {
        setState({
            ...state,
            [name]: option
        });
    }

    const onCancel = () => {
        setIsNewClassOpen(false);
        onClose();
    }

    const isError = () =>
        state.dayOfWeek === undefined ||
        state.group === undefined ||
        Object.values(state).some(value => value === "") ||
        subjectId === "";

    const onConfirm = async () => {
        if (isError()) return;
        setIsLoading(true);

        const newClass: IClass = {
            classId: selectedClass?.classId || "",
            dayOfWeek: state.dayOfWeek as DayOfWeek,
            professorName: state.professorName,
            timeIn: state.timeIn,
            timeOut: state.timeOut,
            group: state.group as Group,
            room: {
                roomNumber: parseInt(state.roomNumber),
                roomFloor: parseInt(state.roomFloor),
                building: parseInt(state.building)
            },
        }

        if (selectedClass) {
            // Update class
            onUpdateClass(newClass)
                .then(() => {
                    setHasEditedSnackbar(true);
                })
        } else {
            // Add new class
            onAddNewClass(newClass)
                .then(() => {
                    setHasAddedSnackbar(true);
                })
        }
    }
    const onUpdateClass = async (newClass: IClass) => {
        await updateClass(newClass)
            .then(() => {
                endOperation();
                onClose();
            })
    }

    const onAddNewClass = async (newClass: IClass) => {
        const newClassId = await addClass(newClass);
        updateSubject(subjectId, newClassId)
            .then(() => {
                endOperation();
            })
    }
    const endOperation = () => {
        refreshSubjects();
        setIsNewClassOpen(false);
        setIsLoading(false);
        setState(getInitialState());
    }

    useEffect(() => {
        if (selectedClass) {
            setState(getInitialState(selectedClass));
        }
    }, [selectedClass]);

    return (
        <div className="new-class-section">
            <span>{title}</span>

            <div className="new-class-input-area">
                <div className="new-class-row">
                    <Dropdown<DayOfWeek>
                        name="dayOfWeek"
                        options={getDaysOfWeek()}
                        selectedOption={state.dayOfWeek}
                        setSelectedOption={setSelectedOption}
                        transformOption={getDayOfWeek}
                        placeholder="Dia da Semana"
                    />
                    <input
                        type="text"
                        placeholder="Professor"
                        name="professorName"
                        className="new-class-input"
                        onChange={onChange}
                        value={state.professorName}
                    />
                    <input
                        type="text"
                        placeholder="Horário de Início"
                        name="timeIn"
                        className="new-class-input"
                        onChange={onChange}
                        value={state.timeIn}
                    />
                    <input
                        type="text"
                        placeholder="Horário de Término"
                        name="timeOut"
                        className="new-class-input"
                        onChange={onChange}
                        value={state.timeOut}
                    />
                </div>
                <div className="new-class-row">
                    <Dropdown<Group>
                        name="group"
                        options={getGroups()}
                        selectedOption={state.group}
                        setSelectedOption={setSelectedOption}
                        transformOption={getGroup}
                        placeholder="Turma"
                    />
                    <input
                        type="text"
                        placeholder="Número da Sala"
                        name="roomNumber"
                        className="new-class-input"
                        onChange={onChange}
                        value={state.roomNumber}
                    />
                    <input
                        type="text"
                        placeholder="Andar"
                        name="roomFloor"
                        className="new-class-input"
                        onChange={onChange}
                        value={state.roomFloor}
                    />
                    <input
                        type="text"
                        placeholder="Prédio"
                        name="building"
                        className="new-class-input"
                        onChange={onChange}
                        value={state.building}
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
                    onClick={onConfirm}
                />
            </div>

            {isLoading && <Loading/>}
        </div>
    );
};

export default NewClassSection;