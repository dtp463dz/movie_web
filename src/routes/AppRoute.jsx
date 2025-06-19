import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from '../pages/Home';
import CategoryDetail from "../pages/CategoryDetail";
import WatchMovie from "../pages/WatchMovie";
import GeneralList from "../pages/GeneralList";

const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/the-loai/:type_list" element={<CategoryDetail />} />
            <Route path="/xem-phim/:slug" element={<WatchMovie />} />
            <Route path="/danh-sach/:type_list" element={<GeneralList />} />

        </Routes>
    )
}

export default AppRoute;


