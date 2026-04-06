import { BtnCloseModal } from '../formComponents/btnCloseModal';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { FileText, Download, Plus } from 'lucide-react';

const FolderModal = ({ folder, onClose }) => {
    useEscapeKey(onClose, !!folder);
    if (!folder) return null;

    // Mock files for the folder
    const folderFiles = [
        { id: 1, name: `Documento_1_${folder.name}.pdf`, size: '2.4 MB', type: 'PDF', updated: '20 Nov, 2025' },
        { id: 2, name: `Hoja_Calculo_${folder.name}.xlsx`, size: '45 KB', type: 'Excel', updated: '15 Oct, 2025' },
        { id: 3, name: `Notas_${folder.name}.docx`, size: '1.2 MB', type: 'Word', updated: '10 Nov, 2025' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-primary rounded-2xl shadow-xl w-full max-w-2xl transform scale-100 flex flex-col max-h-[80vh] border border-text-primary/10">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b bg-primary rounded-t-2xl">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-2 text-text-primary">
                            <span className="text-yellow-400">📁</span> {folder.name}
                        </h3>
                        <p className="text-sm mt-1 text-text-tertiary">{folder.items} elementos</p>
                    </div>
                    <BtnCloseModal onClick={onClose} />
                </div>

                {/* Body - File List */}
                <div className="flex-1 overflow-y-auto p-6 bg-secondary">
                    <div className="space-y-2">
                        {folderFiles.map((file) => (
                            <div key={file.id} className={`flex items-center justify-between p-4  transition-colors border border-text-primary/10 text-text-primary bg-tertiary/10 hover:bg-tertiary rounded-lg group shadow-sm`}>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-button-primary/50 rounded-lg">
                                        <FileText className="w-6 h-6 text-text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-text-primary cursor-pointer group-hover:text-primary-green transition-colors">{file.name}xxx</h4>
                                        <p className="text-xs text-text-tertiary">{file.size} • {file.updated}</p>
                                    </div>
                                </div>
                                <button className="p-2 text-text-primary hover:bg-button-primary/70 rounded-full transition-colors">
                                    <Download className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer / Action */}
                <div className="p-6 border-t border-text-primary/10 bg-tertiary rounded-b-xl flex justify-end">
                    <button className="flex items-center gap-2 px-4 py-2 bg-button-primary text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm">
                        <Plus className="w-5 h-5" />
                        <span>Agregar archivo</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FolderModal;
