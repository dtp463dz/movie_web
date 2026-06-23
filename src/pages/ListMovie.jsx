import { useEffect, useState } from "react";
import { getGeneralList } from "../services/movieServies";
import MovieSlider from "../components/MovieSlider";

const categories = [
    { title: "Phim Bộ Mới Nhất", slug: "phim-bo" },
    { title: "Phim Lẻ Hay Nhất", slug: "phim-le" },
    { title: "Hoạt Hình Đặc Sắc", slug: "hoat-hinh" },
    { title: "TV Shows", slug: "tv-shows" },
    { title: "Phim Thuyết Minh", slug: "phim-thuyet-minh" },
    { title: "Phim Lồng Tiếng", slug: "phim-long-tieng" },
    { title: "Phim Vietsub", slug: "phim-vietsub" },
];

const ListMovie = () => {
    const [movieData, setMovieData] = useState({});

    useEffect(() => {
        const fetchAll = async () => {
            const data = {};
            await Promise.all(
                categories.map(async (cat) => {
                    try {
                        const res = await getGeneralList({ type_list: cat.slug, page: 1, limit: 20 });
                        data[cat.slug] = res.data?.items || [];
                    } catch {
                        data[cat.slug] = [];
                    }
                })
            );
            setMovieData(data);
        };
        fetchAll();
    }, []);

    return (
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '48px 24px' }}>
            {categories.map((cat) => (
                <MovieSlider
                    key={cat.slug}
                    title={cat.title}
                    movies={movieData[cat.slug] || []}
                    viewMoreLink={`/danh-sach/${cat.slug}`}
                />
            ))}
        </div>
    );
};

export default ListMovie;
