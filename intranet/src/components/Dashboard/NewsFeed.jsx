import React, { useContext } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsModal from '../News/NewsModal';
import { ThemeContext } from '../../context/ThemeContext';

const NewsFeed = () => {
    const [selectedArticle, setSelectedArticle] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const { theme } = useContext(ThemeContext);

    const news = [
        {
            id: 1,
            title: 'Resumen de la Reunión Trimestral',
            excerpt: 'Conoce los puntos clave discutidos en nuestra última reunión trimestral y los objetivos para el próximo período.',
            category: 'Compañía',
            date: 'hace 2 horas',
            author: 'María González',
            image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=200&h=150',
            content: 'En la reunión trimestral de hoy, discutimos los logros del último trimestre y establecimos nuevas metas para el próximo período. Los resultados han superado nuestras expectativas y el equipo ha demostrado un compromiso excepcional.'
        },
        {
            id: 2,
            title: 'Nuevos Beneficios de Salud para 2026',
            excerpt: 'Descubre los nuevos beneficios de salud que estarán disponibles para todos los empleados a partir de enero.',
            category: 'RRHH',
            date: 'hace 1 día',
            author: 'Carlos Ramírez',
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=200&h=150',
            content: 'Nos complace anunciar una ampliación significativa de nuestros beneficios de salud para 2026. Esto incluye cobertura dental mejorada, programas de bienestar mental y acceso a gimnasios premium.'
        },
        {
            id: 3,
            title: 'Bienvenida a nuestro nuevo CTO',
            excerpt: 'Damos la bienvenida a nuestro nuevo Director de Tecnología, quien liderará nuestra transformación digital.',
            category: 'Equipo',
            date: 'hace 2 días',
            author: 'Ana Martínez',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=150',
            content: 'Estamos emocionados de dar la bienvenida a nuestro nuevo CTO, quien trae más de 15 años de experiencia en transformación digital y liderazgo tecnológico. Su visión ayudará a impulsar nuestra innovación.'
        }
    ];

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedArticle(null), 200);
    };

    return (
        <>
            <div className={`rounded-xl shadow-sm p-6 border transition-colors duration-200 ${theme.subMain} ${theme.border}`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-lg font-bold ${theme.textMain}`}>Últimas Noticias</h3>
                    <Link to="/news" className="text-primary-green text-sm font-medium flex items-center hover:underline">
                        Ver Todo <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
                <div className="space-y-4">
                    {news.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleArticleClick(item)}
                            className={`flex gap-4 group cursor-pointer p-2 border border-gray-200 rounded-2xl transition-colors ${theme.hover}`}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-20 h-20 object-cover rounded-lg shrink-0"
                            />
                            <div>
                                <span className="text-xs font-semibold text-primary-green bg-primary-green/10 px-2 py-0.5 rounded-full">
                                    {item.category}
                                </span>
                                <h4 className={`text-sm font-bold mt-1 group-hover:text-primary-green transition-colors line-clamp-2 ${theme.textMain}`}>
                                    {item.title}
                                </h4>
                                <p className={`text-xs mt-1 ${theme.textSubmain}`}>{item.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <NewsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                article={selectedArticle}
            />
        </>
    );
};

export default NewsFeed;
