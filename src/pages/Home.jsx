import Footer from "../components/Footer";
import Header from "../components/Header";
import ListMovie from "./ListMovie";

const Home = () => {
    return (
        <>
            <div className="text-center py-10 min-h-[80vh]">
                <h1 className="text-3xl font-bold text-blue-400 mb-4">Chào mừng đến với MovieWeb</h1>
                <p className="text-lg text-gray-600">Khám phá hàng ngàn bộ phim hấp dẫn mỗi ngày!</p>
                <ListMovie />
            </div>

        </>

    )
}

export default Home;