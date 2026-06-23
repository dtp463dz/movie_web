import { Link } from 'react-router-dom';
import { FiFilm, FiHeart } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--bg-surface)',
            borderTop: '1px solid var(--border)',
            marginTop: 80,
        }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '48px 24px 32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>

                    {/* Brand */}
                    <div>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 12 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FiFilm color="white" size={15} />
                            </div>
                            <span style={{ fontWeight: 700, fontSize: 17, color: 'var(--text-primary)' }}>
                                Happy<span style={{ color: 'var(--accent)' }}>Movie</span>
                            </span>
                        </Link>
                        <p style={{ color: 'var(--text-muted)', fontSize: 13, maxWidth: 260, lineHeight: 1.7 }}>
                            Xem phim trực tuyến miễn phí, chất lượng cao, cập nhật nhanh nhất.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap' }}>
                        <div>
                            <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 13, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Thể loại</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {[
                                    { to: "/danh-sach/phim-le", label: "Phim Lẻ" },
                                    { to: "/danh-sach/phim-bo", label: "Phim Bộ" },
                                    { to: "/danh-sach/hoat-hinh", label: "Hoạt Hình" },
                                    { to: "/danh-sach/tv-shows", label: "TV Shows" },
                                ].map(link => (
                                    <Link key={link.to} to={link.to} style={{ color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                                        onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                                        onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 13, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ngôn ngữ</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {[
                                    { to: "/danh-sach/phim-vietsub", label: "Vietsub" },
                                    { to: "/danh-sach/phim-long-tieng", label: "Lồng tiếng" },
                                    { to: "/danh-sach/phim-thuyet-minh", label: "Thuyết minh" },
                                ].map(link => (
                                    <Link key={link.to} to={link.to} style={{ color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                                        onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                                        onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: 0 }}>
                        © {new Date().getFullYear()} HappyMovie. All rights reserved.
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: 0, display: 'flex', alignItems: 'center', gap: 5 }}>
                        Made with <FiHeart size={12} style={{ color: 'var(--accent)' }} /> for movie lovers
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
