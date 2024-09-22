"use client";
import React from "react";
import { GroupChatType } from "types";

interface SearchResultDialogBoxProps {
    searchResultDialogBox: boolean;
    setSearchResultDialogBox: (value: boolean) => void;
    searchResults: GroupChatType[];
}

export default function SearchResultDialogBox({ searchResultDialogBox, setSearchResultDialogBox, searchResults }: SearchResultDialogBoxProps) {
    return (
        <div
            className={`absolute cursor-pointer right-24 mt-2 w-72 font-light bg-white rounded-[4px] shadow-lg ring-1 ring-black ring-opacity-5 ${searchResults.length > 0 && "overflow-y-auto max-h-60"} ${!searchResultDialogBox ? "hidden" : ""}`}
        >
            <div>
                {searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                        <div onClick={() => {
                            window.open(`/chat/${result.id}`, '_blank');
                            setSearchResultDialogBox(false);
                        }} key={index} className="hover:bg-gray-100 px-4 py-2 text-xs font-thin">
                            {result.title}
                        </div>
                    ))
                ) : (
                    <div className="px-4 py-2 text-center text-xs font-thin">No results found</div>
                )}
            </div>
        </div>
    );
}
