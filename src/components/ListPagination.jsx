import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ListPagination = (props) => {
    const {
        currentPage, totalPages, totalItems, totalItemsPerPage,
        page, setPage, loading = false, maxPagesToShow = 7
    } = props;

    if (!totalPages || totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        for (let i = startPage; i <= endPage; i++) pages.push(i);
        return pages;
    };

    const startItem = (currentPage - 1) * totalItemsPerPage + 1;
    const endItem = Math.min(currentPage * totalItemsPerPage, totalItems);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && !loading) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const btnBase = {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 36, height: 36,
        borderRadius: 8,
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
        color: 'var(--text-secondary)',
        fontSize: 13, fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.15s',
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: 48, flexWrap: 'wrap', gap: 16,
        }}>
            {/* Count */}
            <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: 0 }}>
                Hiển thị <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{startItem}</span>–<span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{endItem}</span> trong tổng số{' '}
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{totalItems?.toLocaleString()}</span> kết quả
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={currentPage === 1 || loading}
                    style={{ ...btnBase, opacity: currentPage === 1 ? 0.3 : 1 }}
                    onMouseEnter={e => { if (currentPage !== 1) e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
                >
                    <FiChevronLeft size={16} />
                </button>

                {getPageNumbers().map((p) => (
                    <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        style={{
                            ...btnBase,
                            background: currentPage === p ? 'var(--accent)' : 'var(--bg-card)',
                            borderColor: currentPage === p ? 'var(--accent)' : 'var(--border)',
                            color: currentPage === p ? 'white' : 'var(--text-secondary)',
                            fontWeight: currentPage === p ? 700 : 400,
                        }}
                        onMouseEnter={e => { if (currentPage !== p) e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
                        onMouseLeave={e => { if (currentPage !== p) e.currentTarget.style.background = 'var(--bg-card)'; }}
                    >
                        {p}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={currentPage === totalPages || loading}
                    style={{ ...btnBase, opacity: currentPage === totalPages ? 0.3 : 1 }}
                    onMouseEnter={e => { if (currentPage !== totalPages) e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
                >
                    <FiChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default ListPagination;
