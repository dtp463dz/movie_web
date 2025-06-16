import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Tuỳ chỉnh tốc độ và style của progress bar (không bắt buộc)
NProgress.configure({ showSpinner: false, speed: 500 });

const api = axios.create({
    baseURL: 'https://phimapi.com/',
    timeout: 3000,
});

api.interceptors.request.use((config) => {
    NProgress.start(); // Bắt đầu thanh loading
    return config;
}, (error) => {
    NProgress.done();
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    NProgress.done(); // Kết thúc loading nếu thành công
    return response;
}, (error) => {
    NProgress.done(); // Kết thúc loading nếu lỗi
    return Promise.reject(error);
});

export default api;
