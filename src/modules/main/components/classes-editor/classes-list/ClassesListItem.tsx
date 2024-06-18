import React, {MouseEventHandler, useState} from "react";
import {IClass} from "../../../types/Class";
import {getDayOfWeek} from "../../../types/DayOfWeek.ts";

import "../ClassesEditor.css";

import deleteIcon from "../../../assets/delete.png";
import Snackbar from "../../../../core/design-system/snackbar/Snackbar.tsx";
import {useClasses} from "../../../hooks/useClasses.ts";
import Loading from "../../../../core/design-system/loading/Loading.tsx";

type ClassesListItemProps = {
    classItem: IClass;
    isSelected: boolean;
    onDoubleClick: MouseEventHandler<HTMLDivElement>;
    refreshClasses: () => void;
}

const ClassesListItem: React.FC<ClassesListItemProps> = (
    {classItem, isSelected, onDoubleClick, refreshClasses}
) => {
    const {
        deleteClass
    } = useClasses();

    const [hasSnackbar, setHasSnackbar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const className = isSelected ? "classes-list-item selected" : "classes-list-item";
    const dayOfWeek = getDayOfWeek(classItem.dayOfWeek);

    const onDelete = () => {
        setHasSnackbar(true);
    }

    const onConfirmDelete = () => {
        setIsLoading(true);
        deleteClass(classItem.classId)
            .then(() => {
                setIsLoading(false);
                setHasSnackbar(false);
                refreshClasses();
            })
    }

    return (
        <>
            <div className={className} onDoubleClick={onDoubleClick}>
                <span className="class-professor">{classItem.professorName}</span>
                <div className="room-info">
                    <span className="class-room">Sala: {classItem.room.roomNumber}</span>
                    <span className="class-floor">Andar: {classItem.room.roomFloor}</span>
                    <span className="class-building">Prédio: {classItem.room.building}</span>
                </div>
                <div className="time-info">
                    <span className="class-day">{dayOfWeek}</span>
                    <span className="class-time">{classItem.timeIn}</span>
                    <span className="class-time">{classItem.timeOut}</span>
                </div>
                <div className="delete-btn">
                    <img
                        src={deleteIcon}
                        alt="delete"
                        onClick={onDelete}
                    />
                </div>
            </div>
            {hasSnackbar && (
                <Snackbar
                    message="Quer mesmo deletar essa aula? Essa ação não pode ser desfeita."
                    type="top"
                    action={{
                        cancelLabel: "Cancelar",
                        onCancel: () => setHasSnackbar(false),
                        confirmLabel: "Deletar",
                        onConfirm: onConfirmDelete
                    }}
                />
            )}
            {isLoading && <Loading/>}
        </>

    );
};

export default ClassesListItem;