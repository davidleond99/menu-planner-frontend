import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, Topbar } from '../../modules/app/components';


export const MainLayout = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <main className="relative h-screen overflow-hidden bg-gray-100">
      <div className="flex items-start justify-between">
        <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <div className="z-0 flex w-full flex-col pl-0">
          <Topbar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
          <div className="h-screen overflow-auto p-2 pb-24 md:px-0 md:pt-0 main-layout">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};
