import { useEffect, useState, useRef } from "react";
import { getCategory } from "../services/movieServies";
import { Link } from 'react-router-dom';
import { FiChevronDown } from "react-icons/fi";

const Category = ({ mobile = false }) => {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        getCategory().then(data => data && setCategories(data)).catch(console.error);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (mobile) {
        return (
            <div>
                <p style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                    Thể loại
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                    {categories.map(item => (
                        <Link key={item.slug} to={`/the-loai/${item.slug}`} style={{
                            padding: '7px 10px', borderRadius: 6, fontSize: 13,
                            color: 'var(--text-secondary)', textDecoration: 'none',
                        }}
                            onMouseEnter={e => e.currentTarget.style.color = 'white'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div ref={ref} style={{ position: 'relative' }}>
            <button
                onClick={() => setOpen(!open)}
                style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: open ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: 14, fontWeight: open ? 600 : 400,
                    padding: 0, transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => { if (!open) e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
                Thể loại
                <FiChevronDown size={14} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }} />
            </button>

            {open && (
                <div style={{
                    position: 'absolute', top: 'calc(100% + 12px)', left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-hover)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 16, width: 420,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(20px)',
                    zIndex: 100,
                }}>
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 2, maxHeight: 320, overflowY: 'auto',
                    }}>
                        {categories.map(item => (
                            <Link
                                key={item.slug}
                                to={`/the-loai/${item.slug}`}
                                onClick={() => setOpen(false)}
                                style={{
                                    padding: '8px 12px', borderRadius: 8,
                                    fontSize: 13, color: 'var(--text-secondary)',
                                    textDecoration: 'none', transition: 'all 0.15s',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'var(--accent-dim)';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;
