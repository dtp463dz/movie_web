import { useEffect, useState } from "react";
import { getMovieDetail } from "../services/movieServies";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { FiPlay, FiStar, FiCalendar, FiClock, FiGlobe, FiTag, FiExternalLink, FiChevronLeft } from "react-icons/fi";

const InfoRow = ({ icon: Icon, label, value }) => {
    if (!value) return null;
    return (
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <Icon size={14} style={{ color: 'var(--text-muted)', marginTop: 3, flexShrink: 0 }} />
            <div>
                <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{label}</span>
                <p style={{ color: 'var(--text-primary)', fontSize: 14, margin: '2px 0 0' }}>{value}</p>
            </div>
        </div>
    );
};

const WatchMovie = () => {
    const { slug } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedEpisode, setSelectedEpisode] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const data = await getMovieDetail(slug);
                setMovie(data);
                if (data?.episodes?.[0]?.server_data?.[0]) {
                    setSelectedEpisode(data.episodes[0].server_data[0]);
                }
            } catch (e) {
                console.error(e);
                setMovie(null);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [slug]);

    if (loading) {
        return (
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 24px' }}>
                <div style={{ animation: 'pulse 1.5s infinite' }}>
                    <div style={{ height: 32, background: 'var(--bg-card)', borderRadius: 8, width: '40%', marginBottom: 24 }} />
                    <div style={{ display: 'flex', gap: 24 }}>
                        <div style={{ width: '25%', paddingBottom: '37%', background: 'var(--bg-card)', borderRadius: 12 }} />
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {[80, 60, 70, 50, 65].map((w, i) => (
                                <div key={i} style={{ height: 16, background: 'var(--bg-card)', borderRadius: 6, width: `${w}%` }} />
                            ))}
                        </div>
                    </div>
                    <div style={{ marginTop: 24, height: 480, background: 'var(--bg-card)', borderRadius: 12 }} />
                </div>
                <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.8} }`}</style>
            </div>
        );
    }

    if (!movie?.movie) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
                <p style={{ color: 'var(--text-muted)' }}>Không tìm thấy phim</p>
            </div>
        );
    }

    const { movie: m, episodes } = movie;

    return (
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 24px 60px' }}>

            {/* Back link */}
            <Link to="/" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none',
                marginBottom: 24, transition: 'color 0.2s',
            }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
                <FiChevronLeft size={16} />
                Trang chủ
            </Link>

            {/* Title */}
            <h1 style={{
                fontSize: 28, fontWeight: 800, color: 'var(--text-primary)',
                letterSpacing: '-0.5px', marginBottom: 24, lineHeight: 1.2,
            }}>
                {m.name}
                {m.type === "series" && m.tmdb?.season && (
                    <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: 20 }}> (Phần {m.tmdb.season})</span>
                )}
            </h1>

            {/* Info + Poster */}
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginBottom: 32 }}>
                <div style={{ width: 220, flexShrink: 0 }}>
                    <img
                        src={m.poster_url}
                        alt={m.name}
                        style={{ width: '100%', borderRadius: 12, display: 'block', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
                        onError={e => { e.target.style.display = 'none'; }}
                    />
                </div>

                <div style={{ flex: 1, minWidth: 240 }}>
                    {/* Rating + Quality badges */}
                    <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                        {m.tmdb?.vote_average > 0 && (
                            <span style={{
                                display: 'flex', alignItems: 'center', gap: 5,
                                background: 'rgba(245,197,24,0.12)', border: '1px solid rgba(245,197,24,0.3)',
                                color: '#f5c518', padding: '5px 12px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                            }}>
                                <FiStar size={13} />
                                {m.tmdb.vote_average?.toFixed(1)}
                            </span>
                        )}
                        {m.quality && (
                            <span style={{
                                background: 'var(--accent)', color: 'white',
                                padding: '5px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                            }}>{m.quality}</span>
                        )}
                        {m.episode_current && (
                            <span style={{
                                background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)',
                                color: '#10b981', padding: '5px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                            }}>{m.episode_current}</span>
                        )}
                    </div>

                    {/* Description */}
                    {m.content && (
                        <p style={{
                            color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75,
                            marginBottom: 24, maxWidth: 640,
                        }}>
                            {m.content}
                        </p>
                    )}

                    {/* Meta info */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                        <InfoRow icon={FiTag} label="Thể loại" value={m.category?.map(c => c.name).join(', ')} />
                        <InfoRow icon={FiGlobe} label="Quốc gia" value={m.country?.map(c => c.name).join(', ')} />
                        <InfoRow icon={FiCalendar} label="Năm phát hành" value={m.year} />
                        <InfoRow icon={FiClock} label="Thời lượng" value={m.time} />
                        {m.actor?.length > 0 && (
                            <InfoRow icon={FiPlay} label="Diễn viên" value={m.actor.slice(0, 4).join(', ') + (m.actor.length > 4 ? '...' : '')} />
                        )}
                        {m.director?.filter(Boolean).length > 0 && (
                            <InfoRow icon={FiPlay} label="Đạo diễn" value={m.director.join(', ')} />
                        )}
                    </div>

                    {m.trailer_url && (
                        <a
                            href={m.trailer_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                marginTop: 20, color: '#60a5fa', fontSize: 13,
                                textDecoration: 'none',
                            }}
                        >
                            <FiExternalLink size={14} />
                            Xem trailer
                        </a>
                    )}
                </div>
            </div>

            {/* Video Player */}
            <div style={{
                background: '#000',
                borderRadius: 12,
                overflow: 'hidden',
                marginBottom: 28,
                border: '1px solid var(--border)',
            }}>
                <div style={{
                    padding: '14px 20px',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', gap: 8,
                }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                        Đang xem: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                            {selectedEpisode?.name || 'Chưa chọn tập'}
                        </span>
                    </span>
                </div>

                {selectedEpisode ? (
                    <div style={{ aspectRatio: '16/9', width: '100%' }}>
                        <ReactPlayer
                            url={selectedEpisode.link_m3u8 || selectedEpisode.link_embed}
                            playing
                            controls
                            width="100%"
                            height="100%"
                            config={{ file: { forceHLS: true } }}
                        />
                    </div>
                ) : (
                    <div style={{ aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f' }}>
                        <p style={{ color: 'var(--text-muted)' }}>Chưa có tập phim để phát</p>
                    </div>
                )}
            </div>

            {/* Episode List */}
            {episodes?.length > 0 && episodes[0].server_data?.length > 0 && (
                <div>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
                        Danh sách tập
                    </h2>
                    <div style={{
                        display: 'flex', flexWrap: 'wrap', gap: 8,
                    }}>
                        {episodes[0].server_data.map((episode) => {
                            const isActive = selectedEpisode?.slug === episode.slug;
                            return (
                                <button
                                    key={episode.slug}
                                    onClick={() => setSelectedEpisode(episode)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: 8,
                                        fontSize: 13, fontWeight: isActive ? 700 : 400,
                                        border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                                        background: isActive ? 'var(--accent)' : 'var(--bg-card)',
                                        color: isActive ? 'white' : 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s',
                                    }}
                                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.borderColor = 'var(--border)'; }}
                                >
                                    {episode.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WatchMovie;
