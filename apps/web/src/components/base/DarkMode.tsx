import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { useState, useEffect } from 'react';

export default function () {
    const [isDarkMode, setIsDarkMode] = useState(true);
    useEffect(() => {
        const darkModePreference = localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDarkMode(darkModePreference);
        if (darkModePreference) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    return (
        <>
            {
                isDarkMode ? (
                    <MdDarkMode
                        onClick={toggleDarkMode}
                        className="cursor-pointer text-gray-400 hover:text-gray-300 transition-colors duration-300 ease-in-out "
                        size={24}
                    />

                ) : (
                    <MdLightMode
                        onClick={toggleDarkMode}
                        className="cursor-pointer text-yellow-500 hover:text-yellow-400 transition-colors ease-in-out duration-300"
                        size={24}
                    />
                )
            }
        </>
    );
}
