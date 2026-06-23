import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from 'react-icons/io5';

const SearchBar = () => {
    const [keyword, setKeyword] = useState('');
    const [focused, setFocused] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/tim-kiem?keyword=${encodeURIComponent(keyword)}`);
            setKeyword('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ position: 'relative', width: '100%' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                background: focused ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                border: `1px solid ${focused ? 'rgba(255,255,255,0.2)' : 'var(--border)'}`,
                borderRadius: 10,
                overflow: 'hidden',
                transition: 'all 0.2s',
                minWidth: 260,
            }}>
                <IoSearch
                    size={16}
                    style={{ color: 'var(--text-muted)', marginLeft: 14, flexShrink: 0 }}
                />
                <input
                    type="search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Tìm phim, diễn viên..."
                    style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'var(--text-primary)',
                        fontSize: 14,
                        padding: '9px 12px',
                        flex: 1,
                        minWidth: 0,
                    }}
                />
                <button
                    type="submit"
                    style={{
                        background: 'var(--accent)',
                        border: 'none',
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 600,
                        padding: '8px 16px',
                        cursor: 'pointer',
                        flexShrink: 0,
                        transition: 'background 0.2s',
                        letterSpacing: '0.02em',
                    }}
                    onMouseEnter={e => e.target.style.background = 'var(--accent-hover)'}
                    onMouseLeave={e => e.target.style.background = 'var(--accent)'}
                >
                    Tìm
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
