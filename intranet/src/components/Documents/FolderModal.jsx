import React, { useContext } from 'react';
import { X, FileText, Download, Plus } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';

const FolderModal = ({ folder, onClose }) => {
    const { theme } = useContext(ThemeContext);

    if (!folder) return null;

    // Mock files for the folder
    const folderFiles = [
        { id: 1, name: `Documento_1_${folder.name}.pdf`, size: '2.4 MB', type: 'PDF', updated: '20 Nov, 2025' },
        { id: 2, name: `Hoja_Calculo_${folder.name}.xlsx`, size: '45 KB', type: 'Excel', updated: '15 Oct, 2025' },
        { id: 3, name: `Notas_${folder.name}.docx`, size: '1.2 MB', type: 'Word', updated: '10 Nov, 2025' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className={`bg-white rounded-xl shadow-xl w-full max-w-2xl transform scale-100 ${theme.subMain2} flex flex-col max-h-[80vh]`}>
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <div>
                        <h3 className={`text-xl font-bold flex items-center gap-2 text-gray-900 ${theme.txtWhite}`}>
                            <span className="text-yellow-400">📁</span> {folder.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{folder.items} elementos</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 transition-colors p-2 hover:bg-gray-100 rounded-full"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body - File List */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-2">
                        {folderFiles.map((file) => (
                            <div key={file.id} className={`flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 transition-colors group shadow-sm`}>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-blue-50 dark:bg-gray-700 rounded-lg">
                                        <FileText className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className={`font-medium text-gray-900 cursor-pointer group-hover:text-blue-600 transition-colors ${theme.txtWhite}`}>{file.name}xxx</h4>
                                        <p className="text-xs text-gray-500">{file.size} • {file.updated}</p>
                                    </div>
                                </div>
                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                                    <Download className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer / Action */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end">
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm">
                        <Plus className="w-5 h-5" />
                        <span>Agregar archivo</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FolderModal;
