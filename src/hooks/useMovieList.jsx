import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const useMovieList = (apiFunction) => {
    const { type_list } = useParams();
    const [movies, setMovies] = useState([]);
    const [titlePage, setTitlePage] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await apiFunction({
                    type_list,
                    page: 1,
                    sort_field: 'modified.time',
                    sort_type: 'desc',
                    limit: 24,
                });
                setMovies(res.data.items || []);
                setTitlePage(res.data.titlePage || "");
                setDescription(res.data.seoOnPage || "");

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [type_list, apiFunction])
    return {
        movies, titlePage, loading, error, description
    }
}

export default useMovieList;