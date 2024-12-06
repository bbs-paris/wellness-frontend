"use client";

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    // État pour stocker la valeur
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    // Initialisation depuis localStorage
    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.error("Error reading from localStorage:", error);
        }
    }, [key]);

    // Fonction pour mettre à jour la valeur
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    };

    return [storedValue, setValue] as const;
}