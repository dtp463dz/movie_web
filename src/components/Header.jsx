import { Link } from 'react-router-dom';
import Category from '../pages/Category';

const Header = () => {
    return (
        <header className='bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md'>
            <Link to="/" className='text-blue-300 font-bold text-xl'>MovieWeb</Link>
            <nav className='space-x-6'>
                <Link to="/" className='hover:text-blue-300'>Trang chủ</Link>
                {/* <Link to="/category" className='hover:text-blue-300'>Thể loại</Link> */}
                <Category />
                <Link to="/country" className='hover:text-blue-300'>Quốc gia</Link>
                <Link to="/year" className='hover:text-blue-300'>Năm phát hành</Link>
                <Link to="/search" className='hover:text-blue-300'>Tìm kiếm </Link>
            </nav>
        </header>
    )
}

export default Header;