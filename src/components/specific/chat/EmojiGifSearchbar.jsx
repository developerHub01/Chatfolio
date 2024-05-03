import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { SearchIcon } from "../../../constants/icons.js";
const EmojiGifSearchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchQueryChange = (e) =>
    setSearchQuery((prev) => e.target.value);
  return (
    <Input
      variant="faded"
      color="primary"
      type="text"
      size="sm"
      value={searchQuery}
      onChange={handleSearchQueryChange}
      placeholder="Search"
      className="w-full"
      classNames={{
        inputWrapper: [
          "bg-foreground-900",
          "dark:bg-background-900",
          "text-foreground-100",
        ],
      }}
      startContent={
        <SearchIcon className="text-xl pointer-events-none flex-shrink-0 text-foreground-100" />
      }
    />
  );
};

export default EmojiGifSearchbar;
