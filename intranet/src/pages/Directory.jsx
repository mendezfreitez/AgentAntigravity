import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Mail, Phone, MapPin, X, Upload, Paperclip } from 'lucide-react';
import { TitleView } from '../components/Layout/TitleView';
import { ThemeContext } from '../context/ThemeContext';
import { useChat } from '../context/ChatContext';
import { useEscapeKey } from '../hooks/useEscapeKey';
import clsx from 'clsx';

const Directory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('Todos');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [messageData, setMessageData] = useState({ subject: '', description: '', files: [] });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  const employees = [
    { id: 1, name: 'Jane Doe', role: 'Diseñadora de Producto', dept: 'Diseño', email: 'jane@company.com', location: 'Nueva York' },
    { id: 2, name: 'John Smith', role: 'Desarrollador Senior', dept: 'Ingeniería', email: 'john@company.com', location: 'Londres' },
    { id: 3, name: 'Sarah Wilson', role: 'Gerente de Marketing', dept: 'Marketing', email: 'sarah@company.com', location: 'Nueva York' },
    { id: 4, name: 'Mike Brown', role: 'Ingeniero DevOps', dept: 'Ingeniería', email: 'mike@company.com', location: 'Remoto' },
    { id: 5, name: 'Emily Davis', role: 'Especialista RRHH', dept: 'RRHH', email: 'emily@company.com', location: 'Londres' },
    { id: 6, name: 'Alex Turner', role: 'Gerente de Producto', dept: 'Producto', email: 'alex@company.com', location: 'Nueva York' },
  ];

  const departments = ['Todos', ...new Set(employees.map(e => e.dept))];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'Todos' || employee.dept === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleOpenMessageModal = (employee) => {
    setSelectedEmployee(employee);
    setMessageData({ subject: '', description: '', files: [] });
    setIsMessageModalOpen(true);
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setMessageData(prev => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setMessageData(prev => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const removeFile = (index) => {
    setMessageData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const { addConversation } = useChat();

  const handleSendMessage = async () => {
    try {
      const newMessageData = {
        to: selectedEmployee.email,
        subject: messageData.subject,
        description: messageData.description,
        files: messageData.files.map(f => f.name) // Sending only file names for mock
      };

      await axios.post('http://localhost:3001/nuevo_mensaje', newMessageData);

      // Obtener fecha y hora actuales
      const now = new Date();
      const hora = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
      const fecha = now.getDate().toString().padStart(2, '0') + '-' +
        (now.getMonth() + 1).toString().padStart(2, '0') + '-' +
        now.getFullYear();

      const newConvId = Date.now();
      const newConversation = {
        id: newConvId,
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        avatar: selectedEmployee.name.split(' ').map(n => n[0]).join(''),
        status: 'online', // Mock status
        lastMessage: messageData.subject,
        time: hora, // Mostrar hora en la lista
        unread: 0,
        messages: [
          { id: 1, sender: 'me', text: messageData.description, hora: hora, fecha: fecha }
        ]
      };

      // Add to global context
      addConversation(newConversation);

      handleCloseMessageModal();
      // Navigate to inbox and select the new conversation
      navigate('/inbox', {
        state: {
          selectedChatId: newConvId
        }
      });

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEscapeKey(handleCloseMessageModal, isMessageModalOpen);

  return (
    <div className="space-y-6 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TitleView title="Directorio de Empleados" subtitle="Encuentra y conecta con tus colegas" />
        <button className="bg-primary-green text-white px-4 py-2 rounded-lg hover:bg-primary-green/90 transition-colors">
          Añadir Empleado
        </button>
      </div>

      <div className={`p-4 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4 transition-colors duration-200 bg-primary/50 border border-text-primary/10`}>
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme.textSubmain}`} />
          <input
            type="text"
            placeholder="Buscar por nombre o rol..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-0 transition-colors bg-tertiary border border-text-primary/10 text-text-tertiary`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/50 transition-colors ${theme.input} cursor-pointer`}
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="rounded-xl shadow-sm p-3 hover:shadow-md transition-shadow bg-tertiary border border-text-primary/10">
            <div className="flex items-start justify-between mb-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${theme.main} ${theme.textSubmain}`}>
                {employee.name.split(' ').map(n => n[0]).join('')}
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${theme.bgPrimary} ${theme.textMain}`}>
                {employee.dept}
              </span>
            </div>
            <div className='flex flex-row justify-between'>
              <div className='w-[1/2]'>
                <h3 className="text-lg font-bold text-text-secondary">{employee.name}</h3>
                <p className="text-primary-green font-medium text-sm mb-4">{employee.role}</p>
              </div>
              <div className={`space-y-1 text-sm ${theme.textSubmain} w-[1/2]`}>
                <div className="flex justify-end">
                  <Mail className="w-4 h-4 mr-2" />
                  {employee.email}
                </div>
                <div className="flex justify-end">
                  <MapPin className="w-4 h-4 mr-2" />
                  {employee.location}
                </div>
              </div>
            </div>

            <div className="mt-2 pt-4 border-t flex gap-2">
              <button className={`flex-1 py-2 text-sm font-medium cursor-pointer rounded-lg hover:bg-secondary/10 transition-colors border border-text-primary/10 bg-secondary text-text-tertiary`}>
                Ver Perfil
              </button>
              <button
                onClick={() => handleOpenMessageModal(employee)}
                className="flex-1 py-2 text-sm font-medium cursor-pointer rounded-lg text-text-primary bg-button-primary/70 border border-primary-green/30 hover:bg-button-primary/80 transition-colors"
              >
                Mensaje
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Message Modal */}
      {isMessageModalOpen && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className={`border rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 ${theme.subMain} ${theme.border}`}>
            <div className={`p-4 border-b flex justify-between items-center ${theme.border} ${theme.main}`}>
              <h3 className={`text-lg font-bold ${theme.textMain}`}>Nuevo Mensaje para {selectedEmployee.name}</h3>
              <button
                onClick={handleCloseMessageModal}
                className="text-gray-400 hover:text-gray-500 transition-colors p-1 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <X className={`w-5 h-5 ${theme.textSubmain}`} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme.textMain}`}>Asunto</label>
                <input
                  type="text"
                  placeholder="Ej: Consulta sobre proyecto"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/50 ${theme.input}`}
                  value={messageData.subject}
                  onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${theme.textMain}`}>Descripción</label>
                <textarea
                  rows="4"
                  placeholder="Escribe tu mensaje aquí..."
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/50 resize-none ${theme.input}`}
                  value={messageData.description}
                  onChange={(e) => setMessageData({ ...messageData, description: e.target.value })}
                />
              </div>

              {/* Drag and Drop Area */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme.textMain}`}>Adjuntar Archivos</label>
                <div
                  className={clsx(
                    "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
                    isDragging ? "border-primary-green bg-primary-green/5" : `hover:border-primary-green/50 ${theme.subMain} ${theme.border}`
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                  />
                  <Upload className={`w-8 h-8 mx-auto mb-2 ${theme.textSubmain}`} />
                  <p className={`text-sm ${theme.textSubmain}`}>
                    Arrastra archivos aquí o <span className="text-primary-green font-medium">haz clic para seleccionar</span>
                  </p>
                </div>

                {/* File List */}
                {messageData.files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {messageData.files.map((file, index) => (
                      <div key={index} className={`flex items-center justify-between p-2 rounded-lg border ${theme.main} ${theme.border}`}>
                        <div className="flex items-center truncate">
                          <Paperclip className={`w-4 h-4 mr-2 flex-shrink-0 ${theme.textSubmain}`} />
                          <span className={`text-sm truncate ${theme.textMain}`}>{file.name}</span>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                          className={`p-1 rounded-full transition-colors ${theme.hover} ${theme.textSubmain}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={`p-4 border-t flex gap-3 ${theme.main} ${theme.border}`}>
              <button
                onClick={handleCloseMessageModal}
                className={`flex-1 py-2 font-medium border hover:brightness-95 rounded-lg transition-colors ${theme.textMain} ${theme.subMain} ${theme.border}`}
              >
                Cancelar
              </button>
              <button
                onClick={handleSendMessage}
                className="flex-1 bg-primary-green text-white py-2 rounded-lg font-medium hover:bg-primary-green/90 transition-colors"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Directory;
