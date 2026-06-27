import { useNavigate } from "react-router-dom";

const SliderHeader = ({ title, viewMoreLink, onViewMore }) => {
    const navigate = useNavigate();

    const handleViewMore = () => {
        if (onViewMore) {
            onViewMore();
        } else if (viewMoreLink) {
            navigate(viewMoreLink);
        }
    };

    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-blue-700 font-bold border-l-4 border-blue-500 pl-2">
                {title}
            </h2>
            {(viewMoreLink || onViewMore) && (
                <button
                    className="text-sm text-blue-400 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={handleViewMore}
                >
                    XEM THÊM
                </button>
            )}
        </div>
    );
};
export default SliderHeader;