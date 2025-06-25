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
        getSliderSettings,
        getImageUrl,
        sliderRef,
        goToPrev,
        goToNext,
    } = useMovieSlider();
    if (!movies || movies.length === 0) return null;

    const settings = getSliderSettings()
    // xem them
    const handleViewMore = () => {

    }

    return (
        <div className="mb-10 text-white relative">
            <PrevArrow onClick={goToPrev} />
            <NextArrow onClick={goToNext} />

            <SliderHeader
                title={title}
                onViewMore={handleViewMore}
            />

            {/* Slider phim */}
            <Slider ref={sliderRef} {...settings}>
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
