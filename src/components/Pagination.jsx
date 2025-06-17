import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
const Pagination = (props) => {
    const { currentPage, totalPages, totalItems, onPageChange } = props;

    const getPageNumber = () => {
        const maxVisible = 5;
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1)
        }
        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }

    const pageNumbers = getPageNumber();
    return (
        <div className="flex items-center justify-between mt-6 gap-3 text-black">
            <div className="text-sm">
                Trang {currentPage} / {totalPages} | Tổng {totalItems} kết quả
            </div>
            <div className="flex items-center space-x-1">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-700 rounded hover:bg-gray-700 disabled:opacity-40"
                >
                    <GrFormPreviousLink />
                </button>
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 border border-gray-700 rounded hover:bg-gray-500 ${currentPage === page ? 'bg-indigo-600 border-indigo-500 text-white' : ''}`}
                    >
                        {page}
                    </button>
                ))
                }
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-700 rounded hover:bg-gray-700 disabled:opacity-40"
                >
                    <GrFormNextLink />
                </button>
            </div>
        </div>
    )
}

export default Pagination;