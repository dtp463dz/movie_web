import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from 'react-icons/io5';
const SearchBar = (props) => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/tim-kiem?keyword=${encodeURIComponent(keyword)}`);
            setKeyword('');
        }
    }
    return (
        <form onSubmit={handleSubmit} className="relative w-full md:w-96">
            <input
                type="search"
                name="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                id="search"
                className="w-full p-2 pl-10 pr-24 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder="Tìm phim..."
                required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IoSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md"
            >
                Tìm
            </button>
        </form>
    )
}

export default SearchBar;