import { useEffect, useState } from "react";
import { geteCategoryDetail } from "../services/movieServies";
import { useParams } from "react-router-dom";

const CategoryDetail = () => {
    const { type_list } = useParams(); // lấy thể loại slug từ URL
    const [movies, setMovies] = useState([]);
    const [titlePage, setTitlePage] = useState("");
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await geteCategoryDetail({
                    type_list,
                    page: 1,
                    sort_field: 'modified.time',
                    sort_type: 'desc',
                    limit: 24,
                })
                console.log("check the loai phim", res.data);
                setMovies(res.data.items || []);
                setTitlePage(res.data.titlePage || "");
            } catch (e) {
                console.log('Lấy chi tiết thể loại phim thất bại', e)
            }
        };
        fetchMovies();
    }, [type_list])
    return (
        <div className="text-black p-4">
            <h2 className="text-xl font-bold mb-4">Danh sách phim: {titlePage}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map((item) => (
                    <div key={item._id} className="bg-gray-300 p-3 rounded shadow">
                        <img
                            src={`https://img.phimapi.com/${item.poster_url}`}
                            alt={item.name}
                            className="w-full h-64 object-cover rounded"
                        />
                        <h3 className="mt-2 text-center">{item.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryDetail;