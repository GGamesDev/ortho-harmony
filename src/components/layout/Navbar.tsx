
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  return (
    <nav className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-ortho-dark mr-6">OrthoHarmony</h1>
        <div className="hidden md:flex relative">
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          <Input
            placeholder="Search patients, appointments..."
            className="pl-10 w-[260px] bg-gray-50"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 bg-ortho-primary rounded-full w-2 h-2"></span>
        </button>
        <div className="h-9 w-9 bg-ortho-primary rounded-full flex items-center justify-center text-white cursor-pointer">
          <User className="h-5 w-5" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
