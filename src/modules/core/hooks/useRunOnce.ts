import React, { useEffect, useRef } from 'react';

export type useRunOnceProps = {
    fn: () => void;
    sessionKey?: string;
};

const useRunOnce: React.FC<useRunOnceProps> = ({fn, sessionKey}) => {
    const triggered = useRef(false);

    useEffect(() => {
        const hasBeenTriggered = sessionKey
            ? sessionStorage.getItem(sessionKey)
            : triggered.current;

        if (!hasBeenTriggered) {
            fn();
            triggered.current = true;
            if (sessionKey) {
                sessionStorage.setItem(sessionKey, 'true');
            }
        }

        if (sessionKey) {
            sessionStorage.setItem(sessionKey, 'true');
        }
    }, [fn, sessionKey]);

    return null;
};

export default useRunOnce;