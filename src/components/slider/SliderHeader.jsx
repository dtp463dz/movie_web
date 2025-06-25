const SliderHeader = ({ title, onViewMore }) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-blue-700 font-bold border-l-4 border-blue-500 pl-2">
                {title}
            </h2>
            <button
                className="text-sm text-blue-400 hover:underline"
                onClick={onViewMore}
            >
                XEM THÊM
            </button>
        </div>
    )

}

export default SliderHeader;