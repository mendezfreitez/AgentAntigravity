import React, { useContext } from 'react';
import { Calendar, User, ArrowRight, Tag, Plus } from 'lucide-react';
import NewsModal from '../components/News/NewsModal';
import CreateNewsModal from '../components/News/CreateNewsModal';
import { TitleView } from '../components/Layout/TitleView';
import { ThemeContext } from '../context/ThemeContext';

const News = () => {
    const [selectedArticle, setSelectedArticle] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
    const { theme } = useContext(ThemeContext);

    const [featuredArticle, setFeaturedArticle] = React.useState({
        id: 1,
        title: 'Retiro Anual de la Empresa 2025: ¡Destino Revelado!',
        excerpt: 'Prepárate para una experiencia inolvidable. Nos vamos a las montañas para una semana de trabajo en equipo, sesiones de estrategia y diversión.',
        author: 'Sarah Wilson',
        date: '22 Nov, 2025',
        category: 'Cultura',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1000&h=500'
    });

    const [articles, setArticles] = React.useState([
        {
            id: 2,
            title: 'Resultados Financieros Q3 Superan Expectativas',
            excerpt: 'Estamos orgullosos de anunciar un crecimiento récord en el tercer trimestre...',
            author: 'John Smith',
            date: '20 Nov, 2025',
            category: 'Negocios',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=250'
        },
        {
            id: 3,
            title: 'Nuevo Programa de Bienestar Próximamente',
            excerpt: 'Tu salud importa. Revisa el nuevo paquete de beneficios incluyendo membresías de gimnasio...',
            author: 'Emily Davis',
            date: '18 Nov, 2025',
            category: 'RRHH',
            image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400&h=250'
        },
        {
            id: 4,
            title: 'Charla Tech: El Futuro de la IA en Nuestro Producto',
            excerpt: 'Únete a nosotros para profundizar en cómo estamos integrando LLMs en nuestra plataforma principal...',
            author: 'Mike Brown',
            date: '15 Nov, 2025',
            category: 'Tecnología',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400&h=250'
        }
    ]);

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedArticle(null), 200);
    };

    const handleCreateNews = (newArticle) => {
        setArticles(prev => [newArticle, ...prev]);
    };

    return (
        <div className="space-y-8 transition-colors duration-200">
            <div className="flex justify-between items-center">
                <TitleView title="Noticias de la Compañía" subtitle="Mantente actualizado con los últimos anuncios" />
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-primary-green/90 transition-colors shadow-sm font-medium"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Nueva Noticia
                    </button>
                    <div className="flex gap-2">
                        {['Todos', 'Compañía', 'RRHH', 'Negocios', 'Tecnología'].map(tag => (
                            <button key={tag} className={`px-3 py-1 text-sm font-medium rounded-full border transition-colors ${theme.subMain} ${theme.border} ${theme.textSubmain} hover:border-primary-green hover:text-primary-green`}>
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Article */}
            <div
                onClick={() => handleArticleClick(featuredArticle)}
                className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-[400px]"
            >
                <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent">
                    <div className="absolute bottom-0 left-0 p-8 text-white max-w-3xl">
                        <span className="inline-block px-3 py-1 bg-primary-green text-xs font-bold rounded-full mb-4">
                            {featuredArticle.category}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                            {featuredArticle.title}
                        </h2>
                        <p className="text-gray-200 text-lg mb-6 line-clamp-2">
                            {featuredArticle.excerpt}
                        </p>
                        <div className="flex items-center text-sm text-gray-300 gap-6">
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                {featuredArticle.author}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                {featuredArticle.date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Articles Grid */}
            <TitleView title="Historias Recientes" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <div
                        key={article.id}
                        onClick={() => handleArticleClick(article)}
                        className={`rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all cursor-pointer group ${theme.subMain} ${theme.border}`}
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <span className="absolute top-4 left-4 px-2 py-1 bg-black/60 backdrop-blur-sm text-xs font-bold text-white rounded-md">
                                {article.category}
                            </span>
                        </div>
                        <div className="p-6">
                            <h4 className={`text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary-green transition-colors ${theme.textMain}`}>
                                {article.title}
                            </h4>
                            <p className={`text-sm mb-4 line-clamp-2 ${theme.textSubmain}`}>
                                {article.excerpt}
                            </p>
                            <div className={`flex items-center justify-between text-xs border-t pt-4 ${theme.textSubmain} ${theme.border}`}>
                                <div className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {article.date}
                                </div>
                                <div className="flex items-center text-primary-green font-medium">
                                    Leer Más <ArrowRight className="w-3 h-3 ml-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <NewsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                article={selectedArticle}
            />

            <CreateNewsModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateNews}
            />
        </div>
    );
};

export default News;
