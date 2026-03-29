import { X } from "lucide-react";

export const BtnCloseModal = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="p-2 rounded-full transition-colors hover:bg-tertiary cursor-pointer"
        >
            <X className="w-5 h-5 text-text-secondary" />
        </button>
    )
}