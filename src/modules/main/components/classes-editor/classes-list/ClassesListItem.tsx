import React, {MouseEventHandler} from "react";
import {IClass} from "../../../types/Class";
import {getDayOfWeek} from "../../../types/DayOfWeek.ts";

import "../ClassesEditor.css";
import {getGroup} from "../../../types/Group.ts";

type ClassesListItemProps = {
    classItem: IClass;
    isSelected: boolean;
    onClick: MouseEventHandler<HTMLDivElement>;
}

const ClassesListItem: React.FC<ClassesListItemProps> = (
    {classItem, isSelected, onClick}
) => {
    const className = isSelected ? "classes-list-item selected" : "classes-list-item";
    const dayOfWeek = getDayOfWeek(classItem.dayOfWeek);
    const group = getGroup(classItem.group);

    return (
        <div className={className} onClick={onClick}>
            <span className="class-professor">{classItem.professorName}</span>
            <span className="class-group">Turma: {group}</span>
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
        </div>
    );
};

export default ClassesListItem;