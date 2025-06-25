import { getGeneralList } from "../services/movieServies";
import useMovieList from "../hooks/useMovieList";
import MovieGrid from "../components/movie/MovieGrid";
const GeneralList = () => {
    const { movies, titlePage, loading, error, description, pagination, page, setPage } = useMovieList(getGeneralList);
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
                titlePrefix="Danh sách tổng hợp"
            />
        </>

    )
}

export default GeneralList;