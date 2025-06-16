import api from "../utils/axios";

// danh sach phim
const getListMovie = async (page = 1) => {
    try {
        const res = await api.get(`/danh-sach/phim-moi-cap-nhat?page=${page}`)
        return res.data || []
    } catch (e) {
        console.log("Lỗi khi lấy danh sách phim", e);
        return [];
    }
}

export {
    getListMovie
}