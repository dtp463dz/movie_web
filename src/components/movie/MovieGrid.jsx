import { useNavigate } from "react-router-dom";
import ListPagination from "../ListPagination";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MovieGrid = (props) => {
    const navigation = useNavigate();
    const handleClickView = (slug) => {
        navigation(`/xem-phim/${slug}`)
    }
    const {
        movies, titlePage, loading, error, titlePrefix = "Danh sách", description,
        currentPage, totalItems, totalItemsPerPage, totalPages, setPage, refresh, page
    } = props;

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">Đang tải...</span>
            </div>
        )
    }
    if (error || movies.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-red-500 text-xl mb-2">⚠️</div>
                    <p className="text-red-700">Có lỗi xảy ra: {error}</p>
                    <button
                        onClick={refresh}
                        className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }
    if (!movies || movies.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-gray-400 text-4xl mb-4">🎬</div>
                    <p className="text-gray-600">Không có phim nào được tìm thấy</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="container mx-auto px-4 py-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {titlePrefix} : {titlePage}
                    </h1>
                    <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">{description?.descriptionHead}</p>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-gray-600">
                            Tìm thấy {totalItems} bộ phim
                        </p>
                        <p className="text-gray-600">
                            Trang {currentPage} / {totalPages}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    {movies.map((item) => (
                        <div
                            key={item._id}
                            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
                        >
                            <div className="relative overflow-hidden">
                                <LazyLoadImage
                                    src={`https://img.phimapi.com/${item.poster_url}`}
                                    alt={item.name}
                                    effect="blur"
                                    className="w-full h-64 sm:h-72 md:h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                                    onError={(e) => {
                                        e.target.src = '/placeholder-movie.jpg'; // fallback image
                                    }}
                                />
                                <div className="absolute top-2 right-2 bg-red-500  text-black text-xs font-bold px-2 py-1 rounded">
                                    {item.quality || "N/A"}
                                </div>
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    onClick={() => handleClickView(item?.slug)}
                                >
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <button className="w-full bg-white bg-opacity-90 text-gray-800 py-2 px-3 rounded-md text-sm font-medium hover:bg-opacity-100 transition-all cursor-pointer hover:bg-indigo-600 hover:text-white">
                                            Xem ngay
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3">
                                <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-gray-500 text-xs line-clamp-1">
                                    {item.origin_name || item.name}
                                </p>

                                {item.episode_current && (
                                    <div className="mt-2 inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                        {item.episode_current}
                                    </div>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
                {/* loading de xem them */}
                {loading && movies.length > 0 && (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-gray-600">Đang tải thêm...</span>
                    </div>
                )}

                {/* pagination: chuyển trang */}
                <ListPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    totalItemsPerPage={totalItemsPerPage}
                    onPageChange={(newPage) => setPage(newPage)}
                    loading={loading}
                    page={page}
                    setPage={setPage}
                    showLoadMore={true}
                    showPageNumbers={true}
                    maxPagesToShow={5}
                />
            </div>

        </>


    )
}

export default MovieGrid;