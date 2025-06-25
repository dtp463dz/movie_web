import { useRef } from "react";
import { useNavigate } from "react-router-dom";


export const useMovieSlider = () => {
    const navigate = useNavigate();
    const sliderRef = useRef(null);

    const handleMovieClick = (slug) => {
        navigate(`/xem-phim/${slug}`);
    }

    const handleImageError = (e) => {
        e.target.src = '/placeholder-movie.jpg';
    }
    const goToPrev = () => {
        sliderRef.current?.slickPrev();
    };

    const goToNext = () => {
        sliderRef.current?.slickNext();
    };

    const getSliderSettings = (PrevArrow, NextArrow) => ({
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        arrows: false,
        nextArrow: NextArrow,
        prevArrow: PrevArrow,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 4 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 480, settings: { slidesToShow: 2 } }
        ]
    })

    const getImageUrl = (posterUrl) => {
        return `https://img.phimapi.com/${posterUrl}`;
    }

    const formatMovieData = (movie) => ({
        id: movie._id,
        name: movie.name,
        originName: movie.origin_name,
        slug: movie.slug,
        posterUrl: movie.poster_url,
        quality: movie.quality || "N/A",
        episodeCurrent: movie.episode_current,
        year: movie.year
    })

    return {
        handleMovieClick,
        handleImageError,
        getSliderSettings,
        getImageUrl,
        formatMovieData,
        goToNext,
        goToPrev
    }


}