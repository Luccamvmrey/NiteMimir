import React from "react";

import "../ClassesEditor.css";
import {IClass} from "../../../types/Class";
import ClassesListItem from "./ClassesListItem.tsx";
import {getGroup, Group} from "../../../types/Group.ts";

type ClassesListProps = {
    classes: IClass[];
    selectedClassId: string;
    setSelectedClassId: (classId: string) => void;
}

const ClassesList: React.FC<ClassesListProps> = (
    {classes, selectedClassId, setSelectedClassId}
) => {
    const groups = Object.values(Group);

    return (
        <>
            {groups.map(group => {
                const groupClasses = classes.filter(classItem => classItem.group === group);
                const sortedClasses = groupClasses.sort((a, b) => a.dayOfWeek - b.dayOfWeek)

                return groupClasses.length > 0 && (
                    <div className="classes-list">
                        <h3 className="group-title">Turma: {getGroup(group as Group)}</h3>
                        {sortedClasses.map(classItem => (
                            <ClassesListItem
                                key={classItem.classId}
                                classItem={classItem}
                                isSelected={classItem.classId === selectedClassId}
                                onClick={() => setSelectedClassId(classItem.classId)}
                            />
                        ))}
                    </div>
                )
            })}
        </>
    );
};

export default ClassesList;