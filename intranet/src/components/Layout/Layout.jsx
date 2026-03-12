import { useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { ThemeContext } from '../../context/ThemeContext';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`flex h-screen overflow-hidden transition-colors duration-200 ${theme.main}`}>
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />

                <main className={`flex-1 overflow-y-auto p-4 lg:p-8 transition-colors duration-200 bg-secondary`}>
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;

