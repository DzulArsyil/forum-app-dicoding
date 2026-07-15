import React from 'react';

// Fungsi format waktu (sama seperti di ThreadItem)
const postedAt = (date) => {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) return `${diffDays} hari lalu`;
  if (diffHours > 0) return `${diffHours} jam lalu`;
  if (diffMinutes > 0) return `${diffMinutes} menit lalu`;
  if (diffSeconds > 0) return `${diffSeconds} detik lalu`;
  return 'baru saja';
};

function CommentItem({ content, createdAt, owner }) {
  return (
    <div style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <img src={owner.avatar} alt={owner.name} width="30" style={{ borderRadius: '50%' }} />
        <div>
          <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>{owner.name}</p>
          <p style={{ margin: 0, color: 'gray', fontSize: '12px' }}>{postedAt(createdAt)}</p>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ fontSize: '14px', color: '#444' }}
      />
    </div>
  );
}

export default CommentItem;
