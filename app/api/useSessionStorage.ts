import { useState, useEffect } from "react";

const useSessionStorage = (name: string | number): string | null => {
    const [value, setValue] = useState<string | null>(null);

    useEffect(() => {
        setValue(sessionStorage.getItem(String(name)));
    }, [name]);

    return value;
};

export default useSessionStorage;