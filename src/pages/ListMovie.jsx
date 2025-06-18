import { useEffect, useState } from "react";
import { getListMovie } from "../services/movieServies";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
const ListMovie = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const navigation = useNavigate();
    useEffect(() => {
        const fetchListMovie = async () => {
            try {
                const data = await getListMovie(page);
                // console.log('check response: ', data)
                setMovies(data.items || [])
                setPagination(data.pagination || {})
            } catch (e) {
                console.log('Lỗi khi lấy danh sách phim', e)
            }
        };
        fetchListMovie();
    }, [page])

    const handleClickView = (slug) => {
        navigation(`/xem-phim/${slug}`)
    }
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-blue-400 mb-6">Phim mới cập nhật</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 cursor-pointer" >
                    {movies.map((item) => (
                        <div key={item._id}
                            className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
                            onClick={() => handleClickView(item.slug)}
                        >
                            <img src={item.poster_url} alt={item.name} className="w-full h-64 object-cover" />
                            <div className="p-2">
                                <h3 className="text-sm font-semibold">{item.name}</h3>
                                <p className="text-xs text-gray-500 italic">{item.origin_name} ({item.year})</p>
                            </div>
                        </div>
                    ))}


                </div>
                {pagination?.totalPages && (
                    <Pagination
                        currentPage={page}
                        totalPages={pagination.totalPages}
                        totalItems={pagination.totalItems}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                )}

            </div>
        </>
    )
}
export default ListMovie;