import { X, Calendar, User, Tag } from 'lucide-react';
import { useEscapeKey } from '../../hooks/useEscapeKey';

const NewsModal = ({ isOpen, onClose, article }) => {

    useEscapeKey(onClose, isOpen && !!article);

    if (!isOpen || !article) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div
                className="bg-secondary rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 border border-text-primary/10"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative h-64 md:h-80">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-primary/30 hover:bg-primary/60 text-white rounded-full backdrop-blur-md transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                        <span className="inline-block px-3 py-1 bg-primary-green text-xs font-bold rounded-full mb-3 shadow-sm">
                            {article.category}
                        </span>
                        <h2 className="text-2xl md:text-4xl font-bold leading-tight shadow-sm">
                            {article.title}
                        </h2>
                    </div>
                </div>

                <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-6 text-sm mb-5 border-b pb-3">
                        <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-primary-green" />
                            <span className="font-medium text-text-secondary">{article.author}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-primary-green" />
                            <span className="text-text-secondary">{article.date}</span>
                        </div>
                        <div className="flex items-center">
                            <Tag className="w-4 h-4 mr-2 text-primary-green" />
                            <span className="text-text-secondary">{article.category}</span>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <p className="text-xl leading-relaxed mb-5 text-text-primary">
                            {article.excerpt}
                        </p>
                        {article.content ? (
                            <div className="whitespace-pre-wrap text-text-tertiary">{article.content}</div>
                        ) : (
                            <>
                                <p className="mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <p className="mb-4">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat margin nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                <p>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsModal;
