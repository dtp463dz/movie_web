// src/components/MovieSlider.jsx
import Slider from "react-slick";
import 'react-lazy-load-image-component/src/effects/blur.css';
import SliderHeader from "./slider/SliderHeader";
import { useMovieSlider } from "../hooks/useMovieSlider";
import MovieCard from "./movie/MovieCard";
import { PrevArrow, NextArrow } from "./slider/SliderArrows";
import "../style/MovieSlider.css"
const MovieSlider = ({ title, movies }) => {

    const {
        handleMovieClick,
        handleImageError,
        getImageUrl,
    } = useMovieSlider();
    if (!movies || movies.length === 0) return null;

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 4 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 480, settings: { slidesToShow: 2 } }
        ]
    }
    // xem them
    const handleViewMore = () => {

    }

    return (
        <div className="mb-10 text-white relative">
            <SliderHeader
                title={title}
                onViewMore={handleViewMore}
            />
            {/* Slider phim */}
            <Slider  {...settings}>
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
    );
};

export default MovieSlider;
