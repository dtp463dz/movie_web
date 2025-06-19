import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const ListPagination = (props) => {
    const {
        currentPage,
        totalPages,
        totalItems,
        totalItemsPerPage,
        page,
        setPage,
        loading = false,
        maxPagesToShow = 5
    } = props;
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };
    const startItem = (currentPage - 1) * totalItemsPerPage + 1;
    const endItem = Math.min(currentPage * totalItemsPerPage, totalItems);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && !loading) {
            setPage(newPage);
        }
    };

    const pageNumbers = getPageNumbers();
    return (
        <div className=" flex mt-12 space-y-6 justify-between items-center">
            <div className="text-center text-gray-600 ">
                <p className="text-sm">
                    Hiển thị <span className="font-semibold">{startItem}</span> đến <span className="font-semibold">{endItem}</span> trong tổng số {' '}
                    <span className="font-semibold">{totalItems}</span> kết quả
                </p>
            </div>
            <div className="flex items-center space-x-1">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-700 rounded hover:bg-indigo-600 hover:text-white hover:border-indigo-500 disabled:opacity-40 cursor-pointer"
                >
                    <GrFormPreviousLink />
                </button>
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`cursor-pointer px-3 py-1 border border-gray-700 rounded hover:bg-indigo-600 hover:text-white hover:border-indigo-500 ${currentPage === page ? 'bg-indigo-600 border-indigo-500 text-white ' : ''}`}
                    >
                        {page}
                    </button>
                ))
                }
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-700 rounded hover:bg-indigo-600 hover:text-white hover:border-indigo-500 disabled:opacity-40 cursor-pointer"
                >
                    <GrFormNextLink />
                </button>
            </div>
        </div>


    )
}

export default ListPagination;