import ListMovie from "./ListMovie";

const Home = () => {
    return (
        <div style={{ minHeight: '80vh' }}>
            {/* Hero Banner */}
            <div style={{
                background: 'linear-gradient(180deg, rgba(229,9,20,0.08) 0%, var(--bg-base) 100%)',
                borderBottom: '1px solid var(--border)',
                padding: '60px 24px 48px',
                textAlign: 'center',
            }}>
                <div style={{ maxWidth: 640, margin: '0 auto' }}>
                    <p style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
                        color: 'var(--accent)', textTransform: 'uppercase',
                        marginBottom: 16,
                    }}>
                        Xem phim trực tuyến miễn phí
                    </p>
                    <h1 style={{
                        fontSize: 42, fontWeight: 800, lineHeight: 1.15,
                        color: 'var(--text-primary)', letterSpacing: '-1px',
                        margin: '0 0 16px',
                    }}>
                        Hàng ngàn bộ phim{' '}
                        <span style={{ color: 'var(--accent)' }}>chất lượng cao</span>
                    </h1>
                    <p style={{
                        fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0,
                    }}>
                        Phim lẻ, phim bộ, hoạt hình, TV shows — cập nhật mỗi ngày, phụ đề đầy đủ.
                    </p>
                </div>
            </div>

            {/* Movie Sliders */}
            <ListMovie />
        </div>
    );
};

export default Home;
