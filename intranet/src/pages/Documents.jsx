import React, { useState, useContext } from 'react';
import { Folder, FileText, Download, ChevronRight, Upload, Search, FolderPlus, Plus } from 'lucide-react';
import { TitleView } from '../components/Layout/TitleView';
import FolderModal from '../components/Documents/FolderModal';
import { ThemeContext } from '../context/ThemeContext';

const Documents = () => {
    const [currentPath, setCurrentPath] = useState(['Documentos']);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const { theme } = useContext(ThemeContext);

    const folders = [
        { id: 1, name: 'Políticas RRHH', items: 12, updated: 'hace 2 días' },
        { id: 2, name: 'Activos de Marca', items: 45, updated: 'hace 1 semana' },
        { id: 3, name: 'Docs Técnicos', items: 8, updated: 'hace 3 días' },
        { id: 4, name: 'Plantillas', items: 15, updated: 'hace 1 mes' },
    ];

    const files = [
        { id: 1, name: 'Manual_Empleado_2025.pdf', size: '2.4 MB', type: 'PDF', updated: '20 Nov, 2025' },
        { id: 2, name: 'Plantilla_Reporte_Gastos.xlsx', size: '45 KB', type: 'Excel', updated: '15 Oct, 2025' },
        { id: 3, name: 'Revision_Objetivos_Q4.docx', size: '1.2 MB', type: 'Word', updated: '10 Nov, 2025' },
        { id: 4, name: 'Calendario_Festivos.pdf', size: '150 KB', type: 'PDF', updated: '01 Nov, 2025' },
    ];

    return (
        <div className="space-y-6 transition-colors duration-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <TitleView title="Documentos" subtitle="Gestiona y accede a los recursos de la empresa" />
                <button className="bg-primary-green text-white px-4 py-2 rounded-lg hover:bg-primary-green/90 transition-colors flex items-center shadow-sm">
                    <FolderPlus className="w-5 h-5 mr-2" />
                    <span>Agregar carpeta</span>
                </button>
            </div>

            <div className="p-4 rounded-2xl shadow-sm border transition-colors duration-200  bg-primary border-text-primary/10">
                {/* Breadcrumbs & Search */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                    <div>
                    </div>
                    <div className="relative w-full sm:w-64">
                        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme.textSubmain}`} />
                        <input
                            type="text"
                            placeholder="Buscar documentos..."
                            className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-0 text-text-tertiary transition-colors bg-tertiary border-text-primary/10"
                        />
                    </div>
                </div>

                {/* Folders Grid */}
                <h3 className={`text-sm font-bold uppercase mb-3 text-text-primary`}>Carpetas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {folders.map((folder) => (
                        <div
                            key={folder.id}
                            onClick={() => setSelectedFolder(folder)}
                            className="p-4 border rounded-2xl cursor-pointer transition-all group bg-tertiary border-text-primary/10"
                        >
                            <Folder className="w-8 h-8 text-yellow-400 mb-3 group-hover:scale-110 transition-transform" />
                            <h4 className={`font-medium text-text-primary`}>{folder.name}</h4>
                            <p className={`text-xs text-text-tertiary`}>{folder.items} elementos</p>
                        </div>
                    ))}
                </div>

                {/* Files List */}
                <h3 className="text-sm font-bold uppercase mb-2 text-text-primary">Archivos Recientes</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border border-text-primary/40">
                        <thead>
                            <tr className="border-b border-text-primary/40 text-xs uppercase bg-tertiary text-text-primary">
                                <th className="py-3 pl-2 font-medium">Nombre</th>
                                <th className="py-3 font-medium">Tamaño</th>
                                <th className="py-3 font-medium">Última Modificación</th>
                                <th className="py-3 pr-2 font-medium text-right">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file) => (
                                <tr key={file.id} className={`border-b border-text-primary/40 transition-colors cursor-pointer group`}>
                                    <td className="py-2 pl-2 items-center">
                                        <div className='flex flex-row'>
                                            <FileText className="w-5 h-5 mr-3 text-text-tertiary" />
                                            <span className="text-sm font-medium group-hover:text-primary-green transition-colors text-text-tertiary">{file.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-2 text-sm text-text-tertiary">{file.size}</td>
                                    <td className="py-2 text-sm text-text-tertiary">{file.updated}</td>
                                    <td className="py-2 pr-2 text-right">
                                        <button className={`p-2 hover:bg-button-primary/70 rounded-full transition-colors text-text-primary`}>
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Folder Modal */}
            <FolderModal
                folder={selectedFolder}
                onClose={() => setSelectedFolder(null)}
            />
        </div>
    );
};

export default Documents;
