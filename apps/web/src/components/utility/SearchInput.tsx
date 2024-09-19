import React from "react";

interface SearchInputProps {
    input: string;
    setInput: (value: string) => void;
    setSearchResultDialogBox: (value: boolean) => void;
}

export default function SearchInput({ input, setInput, setSearchResultDialogBox }: SearchInputProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);

        // Only show search result dialog box if input is not empty
        if (value.trim() === "") {
            setSearchResultDialogBox(false);
        } else {
            setSearchResultDialogBox(true);
        }
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onBlur={() => {
                    // Optional: You can hide the dialog on blur if needed
                    // setSearchResultDialogBox(false);
                }}
                className="rounded-full px-4 font-extralight text-xs py-[9px] w-full border border-gray-300 focus:outline-none pl-10"
                placeholder="Search..."
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500">🔍</span>
        </div>
    );
}
