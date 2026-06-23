import { Link, NavLink } from 'react-router-dom';
import Category from '../pages/Category';
import SearchBar from './SearchBar';
import { FiMenu, FiX, FiFilm } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
    { to: "/danh-sach/phim-le", label: "Phim Lẻ" },
    { to: "/danh-sach/phim-bo", label: "Phim Bộ" },
    { to: "/danh-sach/tv-shows", label: "TV Shows" },
    { to: "/danh-sach/hoat-hinh", label: "Hoạt Hình" },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                background: scrolled ? 'rgba(10,10,15,0.96)' : 'rgba(10,10,15,0.75)',
                backdropFilter: 'blur(20px)',
                borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
                transition: 'all 0.3s ease',
            }}
        >
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, gap: 16 }}>

                    {/* Logo */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
                        <div style={{
                            width: 34, height: 34, borderRadius: 8,
                            background: 'var(--accent)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <FiFilm color="white" size={16} />
                        </div>
                        <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                            Happy<span style={{ color: 'var(--accent)' }}>Movie</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hidden-mobile">
                        {NAV_LINKS.map(link => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                style={({ isActive }) => ({
                                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                                    fontWeight: isActive ? 600 : 400,
                                    fontSize: 14,
                                    textDecoration: 'none',
                                    transition: 'color 0.2s',
                                    position: 'relative',
                                })}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <Category />
                    </nav>

                    {/* Right: Search + Hamburger */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className="search-desktop">
                            <SearchBar />
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border)',
                                borderRadius: 8,
                                padding: '7px 9px',
                                color: 'var(--text-secondary)',
                                cursor: 'pointer',
                                display: 'none',
                            }}
                            className="hamburger-btn"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div style={{
                        padding: '12px 0 20px',
                        borderTop: '1px solid var(--border)',
                    }} className="mobile-menu">
                        <div style={{ marginBottom: 16 }}>
                            <SearchBar />
                        </div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {NAV_LINKS.map(link => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    style={({ isActive }) => ({
                                        padding: '10px 12px',
                                        borderRadius: 8,
                                        fontSize: 14,
                                        fontWeight: isActive ? 600 : 400,
                                        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                                        background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                                        textDecoration: 'none',
                                    })}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                            <div style={{ padding: '10px 12px' }}>
                                <Category mobile />
                            </div>
                        </nav>
                    </div>
                )}
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .hidden-mobile { display: none !important; }
                    .hamburger-btn { display: flex !important; }
                    .search-desktop { display: none; }
                }
                @media (max-width: 768px) {
                    .mobile-menu { display: block; }
                }
            `}</style>
        </header>
    );
};

export default Header;
