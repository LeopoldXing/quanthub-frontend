import React, { ForwardedRef, forwardRef } from "react";

interface SearchBoxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  value: string;
  viewerType?: 'self' | 'public';
}

const SearchBox = forwardRef(({
                                onChange,
                                onBlur,
                                value,
                                viewerType = 'public'
                              }: SearchBoxProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
      <input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          type="text"
          placeholder={`search articles / titles ${viewerType === 'public' ? "/ authors" : ""}`}
          className="w-full h-12 text-lg border-none bg-transparent placeholder:font-thin focus:outline-none"
      />
  );
});

export default SearchBox;
