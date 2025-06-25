import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const MovieCard = (props) => {
    const { movie, onMovieClick, onImageError, getImageUrl } = props;
    const formattedMovie = {
        id: movie._id,
        name: movie.name,
        originName: movie.origin_name,
        slug: movie.slug,
        posterUrl: movie.poster_url,
        quality: movie.quality || "N/A",
        episodeCurrent: movie.episode_current,
        year: movie.year
    }
    return (
        <div className='px-2'>
            <div
                className=''
                onClick={() => onMovieClick(formattedMovie.slug)}
            >
                <div className='relative overflow-hidden'>
                    <LazyLoadImage
                        src={getImageUrl(formattedMovie.posterUrl)}
                        alt={formattedMovie.name}
                        effect="blur"
                        className="w-full h-64 sm:h-72 md:h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={onImageError}
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-black text-xs font-bold px-2 py-1 rounded">
                        {formattedMovie.quality}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                            <button className="w-full bg-white bg-opacity-90 text-gray-800 py-2 px-3 rounded-md text-sm font-medium hover:bg-opacity-100 transition-all cursor-pointer hover:bg-indigo-600 hover:text-white">
                                Xem ngay
                            </button>
                        </div>
                    </div>

                    {formattedMovie.episodeCurrent && (
                        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
                            {formattedMovie.episodeCurrent.toUpperCase()}
                        </span>
                    )}
                </div>
                <div className="mt-2">
                    <h3 className="text-sm font-semibold truncate">{formattedMovie.name}</h3>
                    <p className="text-xs text-gray-400 truncate">
                        {formattedMovie.originName} {formattedMovie.year ? formattedMovie.year : ''}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default MovieCard;