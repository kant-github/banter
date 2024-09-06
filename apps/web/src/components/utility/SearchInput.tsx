"use client";
import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchInputProps {
    input: string;
    setInput: (value: string) => void;
}

export default function SearchInput({ input, setInput }: SearchInputProps) {
    return (
        <div className="relative w-full">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="rounded-full px-4 font-extralight text-xs py-[9px] w-full border border-gray-300 focus:outline-none pl-10"
                placeholder="Search..."
            />
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>
    );
}
