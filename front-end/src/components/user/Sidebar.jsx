
import React from 'react';
import { LayoutDashboard, UserCircle, PenSquare, BookOpen } from 'lucide-react';

const Sidebar = ({ isOpen }) => {
    const menuItems = [
        { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard/userdashboard' },
        { title: 'Profile', icon: <UserCircle size={20} />, path: '/dashboard/editprofile' },
        { title: 'Artikelku', icon: <BookOpen size={20} />, path: '/dashboard/artikelku' },
        
      ];
      

  return (
    <div className={`bg-slate-900 fixed h-full transition-all duration-300 ${isOpen ? 'w-64' : 'w-0 -translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-white text-xl font-bold">Menu</h2>
        </div>
        <nav className="flex-1 p-4">
          {menuItems.map((item, index) => (
            <a
              key={index}   
              href={item.path}
              className="flex items-center gap-3 text-white p-3 rounded-lg hover:bg-red-500 transition-colors mb-2"
            >
              {item.icon}
              <span>{item.title}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;