import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from '../pages/Home';
import CategoryDetail from "../pages/CategoryDetail";
import WatchMovie from "../pages/WatchMovie";

const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/the-loai/:type_list" element={<CategoryDetail />} />
            <Route path="/xem-phim/:slug" element={<WatchMovie />} />

        </Routes>
    )
}

export default AppRoute;