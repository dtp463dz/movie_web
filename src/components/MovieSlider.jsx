import Slider from "react-slick";
import 'react-lazy-load-image-component/src/effects/blur.css';
import SliderHeader from "./slider/SliderHeader";
import { useMovieSlider } from "../hooks/useMovieSlider";
import MovieCard from "./movie/MovieCard";
import { PrevArrow, NextArrow } from "./slider/SliderArrows";

const MovieSlider = ({ title, movies, viewMoreLink }) => {
    const { handleMovieClick, handleImageError, getImageUrl } = useMovieSlider();

    if (!movies || movies.length === 0) return null;

    const settings = {
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: 6,
        slidesToScroll: 3,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 5, slidesToScroll: 3 } },
            { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        ],
    };

    return (
        <div style={{ marginBottom: 48 }}>
            <SliderHeader title={title} viewMoreLink={viewMoreLink} />
            <div style={{ position: 'relative', margin: '0 -5px' }}>
                <Slider {...settings}>
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                            onMovieClick={handleMovieClick}
                            onImageError={handleImageError}
                            getImageUrl={getImageUrl}
                        />
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default MovieSlider;
