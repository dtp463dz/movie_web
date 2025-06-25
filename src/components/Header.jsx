import { Link } from 'react-router-dom';
import Category from '../pages/Category';
import SearchBar from './SearchBar';

const Header = () => {

    return (

        <header className='bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md'>
            <Link to="/" className='text-blue-300 font-bold text-xl'>MovieWeb</Link>
            <SearchBar />
            <nav className='space-x-6'>
                <Link to="/danh-sach/phim-le" className='hover:text-blue-300'>Phim Lẻ</Link>
                <Link to="/danh-sach/phim-bo" className='hover:text-blue-300'>Phim Bộ</Link>
                <Link to="/danh-sach/tv-shows" className='hover:text-blue-300'>TV Shows</Link>
                <Link to="/danh-sach/hoat-hinh" className='hover:text-blue-300'>Hoạt Hình</Link>
                <Category />
                <Link to="/country" className='hover:text-blue-300'>Quốc gia</Link>
                <Link to="/year" className='hover:text-blue-300'>Năm</Link>

            </nav>
        </header>
    )
}

export default Header;