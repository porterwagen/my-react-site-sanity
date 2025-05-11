import React from 'react';
import Link from 'next/link';

export default function FlyoutDropdown({ isOpen, items }) {
  if (!isOpen) return null;
  
  return (
    <div className="absolute top-0 left-full bg-white shadow-lg rounded-lg w-56 z-40 animate-fadeIn">
      <ul className="py-2">
        {items?.map((item, index) => (
          <li key={index}>
            <Link 
              href={item.href} 
              className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}