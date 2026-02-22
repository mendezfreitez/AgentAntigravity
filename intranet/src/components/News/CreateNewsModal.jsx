import React, { useState, useContext } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';

const CreateNewsModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        category: 'Compañía',
        author: '',
        image: '',
        content: ''
    });
    const { theme } = useContext(ThemeContext);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData(prev => ({
                ...prev,
                image: imageUrl
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
            id: Date.now()
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div
                className={`border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 ${theme.subMain} ${theme.border}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`flex justify-between items-center p-6 border-b ${theme.main} ${theme.border}`}>
                    <h2 className={`text-xl font-bold ${theme.textMain}`}>Nueva Noticia</h2>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-full transition-colors ${theme.hover} ${theme.textSubmain}`}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Image Input */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${theme.textMain}`}>
                            Imagen de portada
                        </label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <ImageIcon className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${theme.textSubmain}`} />
                                <input
                                    type="file"
                                    accept="image/jpeg, image/png, image/webp"
                                    onChange={handleImageChange}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-green/10 file:text-primary-green hover:file:bg-primary-green/20 ${theme.input}`}
                                    required={!formData.image}
                                />
                            </div>
                        </div>
                        {formData.image && (
                            <div className={`mt-2 h-40 rounded-lg overflow-hidden border ${theme.main} ${theme.border}`}>
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${theme.textMain}`}>
                            Título
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Escribe un título llamativo"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green outline-none transition-all ${theme.input}`}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${theme.textMain}`}>
                                Categoría
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green outline-none transition-all ${theme.input} cursor-pointer`}
                            >
                                <option value="Compañía">Compañía</option>
                                <option value="RRHH">RRHH</option>
                                <option value="Negocios">Negocios</option>
                                <option value="Tecnología">Tecnología</option>
                                <option value="Cultura">Cultura</option>
                            </select>
                        </div>

                        {/* Author */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${theme.textMain}`}>
                                Autor
                            </label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="Nombre del autor"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green outline-none transition-all ${theme.input}`}
                                required
                            />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${theme.textMain}`}>
                            Resumen (Excerpt)
                        </label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            rows="2"
                            placeholder="Breve descripción que aparecerá en la tarjeta..."
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green outline-none transition-all resize-none ${theme.input}`}
                            required
                        />
                    </div>

                    {/* Full Content */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${theme.textMain}`}>
                            Contenido Completo
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows="6"
                            placeholder="Escribe el contenido completo de la noticia aquí..."
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green outline-none transition-all resize-none ${theme.input}`}
                        />
                    </div>

                    <div className={`flex justify-end gap-3 pt-4 border-t ${theme.border}`}>
                        <button
                            type="button"
                            onClick={onClose}
                            className={`px-4 py-2 text-sm font-medium bg-transparent border rounded-lg transition-colors ${theme.textMain} ${theme.border} ${theme.hover}`}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 text-sm font-medium text-white bg-primary-green hover:bg-primary-green/90 rounded-lg shadow-sm hover:shadow transition-all"
                        >
                            Publicar Noticia
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNewsModal;
