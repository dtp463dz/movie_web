import { useEffect, useState } from "react";
import { getMovieDetail } from "../services/movieServies";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Header from "../components/Header";

const WatchMovie = () => {
    const { slug } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    useEffect(() => {

        const fetchWatchMovie = async () => {
            setLoading(true);
            try {
                const data = await getMovieDetail(slug);
                // console.log('check data: ', data)
                setMovie(data);
                if (data?.episodes?.[0]?.server_data?.[0]) {
                    setSelectedEpisode(data.episodes[0].server_data[0]);
                }
            } catch (e) {
                console.log('Lỗi khi lấy chi tiết phim: ', e)
                setMovie(null);
            } finally {
                setLoading(false)
            }
        };
        fetchWatchMovie();
    }, [slug])
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/3 h-96 bg-gray-700 rounded"></div>
                        <div className="flex-1 space-y-4">
                            <div className="h-4 bg-gray-700 rounded w-full"></div>
                            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                        </div>
                    </div>
                    <div className="mt-6 h-96 bg-gray-700 rounded"></div>
                </div>
            </div>
        );
    }
    if (!movie || !movie.movie) {
        return (
            <div className="container mx-auto px-4 py-8">
                <p className="text-gray-400 text-center">Không tìm thấy phim</p>
            </div>
        )
    }
    const { movie: movieData, episodes } = movie;

    console.log(selectedEpisode)
    const handleEpisodeChange = (episode) => {
        setSelectedEpisode(episode);
    };
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-blue-400">
                    {movieData?.name} {movieData.type === "series" && `(Phần ${movieData.tmdb.season || 1})`}
                </h1>

                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full md:w-1/3">
                        <img
                            src={movieData.poster_url || []}
                            alt={movieData.name}
                            className="w-full h-auto rounded-md shadow-lg object-cover"
                        />
                    </div>

                    <div className="flex-1">
                        <p className="text-gray-800 mb-4">{movieData.content}</p>
                        <div className="space-y-2">
                            <p>
                                <span className="font-semibold">Thể loại:</span>{" "}
                                {movieData.category.map((item) => item.name).join(", ")}
                            </p>
                            <p>
                                <span className="font-semibold">Quốc gia:</span>{" "}
                                {movieData.country.map((item) => item.name).join(", ")}
                            </p>
                            <p>
                                <span className="font-semibold">Năm phát hành: </span><span>{movieData.year}</span>
                            </p>
                            <p>
                                <span className="font-semibold">Thời lượng: </span><span>{movieData.time}</span>
                            </p>

                            {movieData.type && (
                                <p>
                                    <span className="font-semibold">Số tập:</span> {movieData.episode_current}
                                </p>
                            )}
                            <p>
                                <span className="font-semibold">Diễn viên: </span>{" "}
                                {movieData.actor.join(", ")}
                            </p>
                            <p>
                                <span className="font-semibold">Đạo diễn: </span>{" "}
                                {movieData.director.join(", ")}
                            </p>
                            {movieData.trailer_url && (
                                <p>
                                    <a
                                        href={movieData.trailer_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-700 hover:underline"
                                    >
                                        Xem trailer
                                    </a>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                {/* video*/}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Xem phim: {selectedEpisode ? selectedEpisode.name : "Chưa chọn tập"}
                    </h2>
                    {selectedEpisode ? (
                        <div className="">
                            <ReactPlayer
                                url={selectedEpisode.link_m3u8 || selectedEpisode.link_embed}
                                playing={true}
                                controls={true}
                                width="100%"
                                height="50%"
                                config={{
                                    file: {
                                        forceHLS: true, // Bắt buộc dùng HLS cho m3u8
                                    },
                                }}
                            />
                        </div>
                    ) : (
                        <p className="text-gray-400">Chưa có tập phim để phát</p>
                    )
                    }

                </div>

                {/* Danh sách tập (nếu là series) */}
                {movieData.type && episodes?.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Danh sách tập</h2>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                            {episodes[0].server_data.map((episode) => (
                                <button
                                    key={episode.slug}
                                    onClick={() => handleEpisodeChange(episode)}
                                    className={`px-3 py-1 text-sm rounded ${selectedEpisode?.slug === episode.slug
                                        ? "bg-violet-500 text-white"
                                        : "bg-gray-700 text-white hover:bg-violet-400"
                                        }`}
                                >
                                    {episode.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>

    )
}

export default WatchMovie;