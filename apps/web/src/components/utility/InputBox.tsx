import React from 'react';

interface TextInputProps {
    label: string;
    input: string;
    setInput: (value: string) => void;
    type?: string
}

export default function({ label, input, setInput, type }: TextInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor="input" className="text-xs font-mono text-gray-700">
                {label}
            </label>
            <input
                value={input}
                onChange={handleChange}
                id="input"
                type={type}
                className={`${type ? "password" : "text" } px-2 py-[9px] text-xs font-thin border border-gray-300 shadow-sm focus:outline-none rounded-[4px] }`}
            />
        </div>
    );
}
