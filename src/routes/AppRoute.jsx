import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from '../pages/Home';
import Category from "../pages/Category";
import CategoryDetail from "../pages/CategoryDetail";

const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/category" element={<Category />} /> */}
            <Route path="/the-loai/:type_list" element={<CategoryDetail />} />
        </Routes>
    )
}

export default AppRoute;