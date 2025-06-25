import { Link } from 'react-router-dom';
import Category from '../pages/Category';
import SearchBar from './SearchBar';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (

        <header className='bg-gray-900 text-white px-4 py-4 shadow-md'>
            <div className='flex justify-between items-center'>
                <Link to="/" className='text-blue-300 font-bold text-xl'>
                    MovieWeb
                </Link>

                {/* Toggle button for mobile */}
                <button
                    onClick={toggleMenu}
                    className='text-white text-2xl md:hidden focus:outline-none'
                >
                    {isMenuOpen ? <FiX /> : <FiMenu />}
                </button>

                {/* Desktop nav */}
                <nav className='hidden md:flex space-x-6 items-center'>
                    <Link to="/danh-sach/phim-le" className='hover:text-blue-300'>Phim Lẻ</Link>
                    <Link to="/danh-sach/phim-bo" className='hover:text-blue-300'>Phim Bộ</Link>
                    <Link to="/danh-sach/tv-shows" className='hover:text-blue-300'>TV Shows</Link>
                    <Link to="/danh-sach/hoat-hinh" className='hover:text-blue-300'>Hoạt Hình</Link>
                    <Category />
                    <Link to="/country" className='hover:text-blue-300'>Quốc gia</Link>
                    <Link to="/year" className='hover:text-blue-300'>Năm</Link>
                </nav>
            </div>

            {/* SearchBar always visible */}
            <div className='mt-4 md:mt-0 md:flex md:justify-end'>
                <SearchBar />
            </div>

            {/* Mobile nav */}
            {isMenuOpen && (
                <div className='flex flex-col mt-4 space-y-4 md:hidden'>
                    <Link to="/danh-sach/phim-le" onClick={toggleMenu} className='hover:text-blue-300'>Phim Lẻ</Link>
                    <Link to="/danh-sach/phim-bo" onClick={toggleMenu} className='hover:text-blue-300'>Phim Bộ</Link>
                    <Link to="/danh-sach/tv-shows" onClick={toggleMenu} className='hover:text-blue-300'>TV Shows</Link>
                    <Link to="/danh-sach/hoat-hinh" onClick={toggleMenu} className='hover:text-blue-300'>Hoạt Hình</Link>
                    <Category />
                    <Link to="/country" onClick={toggleMenu} className='hover:text-blue-300'>Quốc gia</Link>
                    <Link to="/year" onClick={toggleMenu} className='hover:text-blue-300'>Năm</Link>
                </div>
            )}
        </header>
    )
}

export default Header;