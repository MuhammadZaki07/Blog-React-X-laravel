import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './components/user/Sidebar';
import NavDash from './components/user/NavDash';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  
  const isEditArtikelPage = location.pathname.includes('/dashboard/editartikel');

  return (
    <div className="flex h-screen">
     
      {!isEditArtikelPage && <Sidebar isOpen={isSidebarOpen} />}

      <div className="flex-1 flex flex-col">
       
        {!isEditArtikelPage && <NavDash toggleSidebar={toggleSidebar} />}

        
        <div className={`flex-1 p-4 ${!isEditArtikelPage ? 'mt-16' : ''} ${isSidebarOpen && !isEditArtikelPage ? 'ml-64' : 'ml-0'}`}>
          
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
