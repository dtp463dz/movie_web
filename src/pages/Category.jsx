import { useEffect, useState } from "react";
import { getCategory } from "../services/movieServies";
import { Link } from 'react-router-dom';
import { IoMdArrowDropdown } from "react-icons/io";
const Category = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await getCategory();
                // console.log('check data: ', data)
                setCategories(data);
            } catch (e) {
                console.log('Lỗi khi lấy danh sách thể loại', e)
            }
        };
        fetchCategory();
    }, [])
    return (
        <div className="relative inline-block text-left group">
            <button
                className="inline-flex items-center justify-center text-sm font-medium text-white hover:text-blue-300"
                type="button"
                aria-haspopup="true"
            >
                Thể loại
                <IoMdArrowDropdown className="ml-1 w-5 h-5 text-blue-300" />
            </button>
            {/* Dropdown hiển thị khi hover */}
            <div className="absolute z-50 mt-4 w-[450px] hidden group-hover:block bg-white dark:bg-slate-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-2 py-3 grid grid-cols-3 gap-1 max-h-96 overflow-y-auto">
                    {categories.map((item) => (
                        <Link
                            key={item.slug}
                            to={`/the-loai/${item.slug}`}
                            className="px-3 py-1.5 text-sm text-gray-900 dark:text-white rounded-md hover:bg-violet-500 hover:text-white transition"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Category;