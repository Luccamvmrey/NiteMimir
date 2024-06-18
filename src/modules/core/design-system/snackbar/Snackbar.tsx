import React, {useEffect} from "react";

import "./Snackbar.css";

import FilledButton from "../filled-btn/FilledButton";

type SnackbarActions = {
    cancelLabel?: string;
    onCancel?: () => void;
    confirmLabel?: string;
    onConfirm?: () => void;
}

type SnackbarProps = {
    message: string;
    type: "top" | "bottom";
    action?: SnackbarActions;
    duration?: number;
    onDurationEnd?: () => void;
}

const Snackbar: React.FC<SnackbarProps> = (
    {message, type, action, duration, onDurationEnd}
) => {
    const snackbarClassName = `snackbar ${type}`;
    const actionsClassName = action ? action.cancelLabel ? "two-actions" : "one-action" : "";

    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                onDurationEnd?.();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, onDurationEnd]);
    
    return (
        <div className={snackbarClassName}>
            <p>{message}</p>
            {action && (
                <div className={actionsClassName}>
                    <FilledButton
                        className="snackbar-cancel-btn"
                        onClick={action.onCancel}
                        title={action.cancelLabel}
                    />
                    <FilledButton
                        onClick={action.onConfirm}
                        title={action.confirmLabel}
                    />
                </div>
            )}
        </div>
    );
};

export default Snackbar;