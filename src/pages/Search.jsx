import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../services/movieServies";
import MovieGrid from "../components/movie/MovieGrid";

const Search = () => {
    const [movies, setMovies] = useState([]);
    const [titlePage, setTitlePage] = useState("Kết quả tìm kiếm");
    const [description, setDescription] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get("keyword") || "";


    const fetchSearchResults = async () => {
        setLoading(true);
        try {
            const res = await searchMovies({
                keyword,
                page,
                sort_field: "modified.time",
                sort_type: "desc",
                limit: 24,
            });
            setMovies(res.data.items || []);
            setTitlePage(`Kết quả tìm kiếm cho "${keyword}"`);
            setDescription(res.data.seoOnPage || {});
            setPagination(res.data.params?.pagination || null);
        } catch (e) {
            setError("Không thể tải kết quả tìm kiếm", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (keyword) {
            fetchSearchResults();
        }
    }, [keyword, page])

    const handleRefresh = () => {
        fetchSearchResults();
    };
    return (
        <>
            <MovieGrid
                movies={movies}
                titlePage={titlePage}
                loading={loading}
                error={error}
                description={description}
                currentPage={pagination?.currentPage}
                totalItems={pagination?.totalItems}
                totalItemsPerPage={pagination?.totalItemsPerPage}
                totalPages={pagination?.totalPages}
                page={page}
                setPage={setPage}
                refresh={handleRefresh}
                titlePrefix="Kết quả tìm kiếm"
            />
        </>
    )
}

export default Search;