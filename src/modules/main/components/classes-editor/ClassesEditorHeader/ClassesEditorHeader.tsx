import React, {MouseEventHandler} from "react";
import IconButton from "../../../../core/design-system/icon-btn/IconButton.tsx";

import addIcon from "../../../assets/add-new.png";

type ClassesEditorHeaderProps = {
    title?: string;
    subtitle: string;
    onClick: MouseEventHandler;
}

const ClassesEditorHeader: React.FC<ClassesEditorHeaderProps> = (
    {title, subtitle, onClick}
) => {
    return (
        <div className="classes-editor-header">
            <div className="titles">
                <div className="selected-subject">
                    {title ? (
                        <h3>{title}</h3>
                    ) : (
                        <h3>Selecione uma matéria</h3>
                    )}
                </div>

                <h4>{subtitle}</h4>
            </div>
            <IconButton
                icon={addIcon}
                title="Nova Aula"
                onClick={onClick}
            />
        </div>
    );
};

export default ClassesEditorHeader;