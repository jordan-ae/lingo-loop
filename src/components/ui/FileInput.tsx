/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';

interface FileInputProps {
  accept: string;
  onChange: (file: File | undefined) => void;
  register: any;
}

export const FileInput: React.FC<FileInputProps> = ({ accept, onChange, register }) => {
  const { ref, onChange: registerOnChange } = register;

  useEffect(() => {
    // Trigger validation when the file changes
    if (ref.current?.files?.[0]) {
      ref.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, [ref]);

  return (
    <input
      type="file"
      accept={accept}
      onChange={(e) => {
        const file = e.target.files?.[0];
        onChange(file);
        registerOnChange(e);
      }}
      ref={ref}
      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  );
}; 