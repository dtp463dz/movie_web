import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = () => {
    return (
        <>
            <Header />
            <main className="min-h-[80vh]">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
