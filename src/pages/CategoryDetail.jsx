import { geteCategoryDetail } from "../services/movieServies";
import Header from "../components/Header";
import useMovieList from "../hooks/useMovieList";
import MovieGrid from "../components/movie/MovieGrid";

const CategoryDetail = () => {
    const { movies, titlePage, loading, error, description, pagination, page, setPage } = useMovieList(geteCategoryDetail);

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
                titlePrefix="Danh sách thể loại"
            />
        </>

    )
}

export default CategoryDetail;