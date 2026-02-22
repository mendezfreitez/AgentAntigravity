import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Directory from './pages/Directory';
import Documents from './pages/Documents';
import News from './pages/News';
import Events from './pages/Events';
import Inbox from './pages/Inbox';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="directory" element={<Directory />} />
              <Route path="documents" element={<Documents />} />
              <Route path="news" element={<News />} />
              <Route path="events" element={<Events />} />
              <Route path="inbox" element={<Inbox />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
