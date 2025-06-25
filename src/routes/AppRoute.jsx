import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from '../pages/Home';
import CategoryDetail from "../pages/CategoryDetail";
import WatchMovie from "../pages/WatchMovie";
import GeneralList from "../pages/GeneralList";
import Layout from "../Layout";
const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/the-loai/:type_list" element={<CategoryDetail />} />
                <Route path="/xem-phim/:slug" element={<WatchMovie />} />
                <Route path="/danh-sach/:type_list" element={<GeneralList />} />
            </Route >
        </Routes>
    )
}

export default AppRoute;


