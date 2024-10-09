"use client";

import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

interface SearchInputProps {
    input: string;
    setInput: (value: string) => void;
    setSearchResultDialogBox: (value: boolean) => void;
}

export default function({ setInput, setSearchResultDialogBox }: SearchInputProps)  {

  const placeholders = [
    "Search - Room404",
    "Connect with Friends...",
    "Rooms accross Globe...",
    "Search for Rooms..."
  ];

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);

        if (value.trim() === "") {
            setSearchResultDialogBox(false);
        } else {
            setSearchResultDialogBox(true);
        }
    };

  return (
    <div className="flex flex-col justify-center  items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleInputChange}
      />
    </div>
  );
}

