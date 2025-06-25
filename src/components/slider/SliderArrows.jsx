import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const PrevArrow = ({ onClick }) => (
    <div
        className="absolute top-1/2 -left-3 transform -translate-y-1/2 z-20 cursor-pointer bg-black/40 hover:bg-black/70 p-2 rounded-full"
        onClick={onClick}
    >
        <FaChevronLeft className="text-white text-sm" />
    </div>
);

export const NextArrow = ({ onClick }) => (
    <div
        className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-20 cursor-pointer bg-black/40 hover:bg-black/70 p-2 rounded-full"
        onClick={onClick}
    >
        <FaChevronRight className="text-white text-sm" />
    </div>
);