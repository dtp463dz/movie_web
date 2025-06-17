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

// the loai
const getCategory = async () => {
    try {
        const res = await api.get(`/the-loai`);
        return res.data
    } catch (e) {
        console.log("Lỗi khi lấy danh sách thể loại: ", e)
    }
}

// chi tiết thể loại 
const geteCategoryDetail = async ({
    type_list,
    page = 1,
    sort_field = "modified.time",
    sort_type = "desc ",
    limit = 24,
}) => {
    try {

        const res = await api.get(`/v1/api/the-loai/${type_list}`, {
            params: {
                page,
                sort_field,
                sort_type,
                limit,
            },
        });
        return res.data;
    } catch (e) {
        console.log("Lỗi khi lấy chi tiết thể loại: ", e);
        throw e;
    }
};

export {
    getListMovie, getCategory, geteCategoryDetail
}