import React from 'react';
import { Link } from 'react-router-dom';

// Fungsi bantuan untuk mengubah format waktu menjadi lebih rapi
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

function ThreadItem({ id, title, body, createdAt, totalComments, user }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '15px 0', borderRadius: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        {/* Tambahkan tanda tanya (?) setelah kata user */}
        <img src={user?.avatar} alt={user?.name} width="35" style={{ borderRadius: '50%' }} />
        <div>
          {/* Berikan nilai default jika user tidak ditemukan */}
          <p style={{ margin: 0, fontWeight: 'bold' }}>{user?.name || 'User Tidak Ditemukan'}</p>
          <p style={{ margin: 0, color: 'gray', fontSize: '12px' }}>{postedAt(createdAt)}</p>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 10px 0' }}>
          <Link to={`/threads/${id}`}>{title}</Link>
        </h3>
        {/* API Dicoding mengirimkan string HTML, jadi kita render menggunakan dangerouslySetInnerHTML */}
        <div
          dangerouslySetInnerHTML={{ __html: body.substring(0, 150) + '...' }}
          style={{ fontSize: '14px', color: '#333' }}
        />
      </div>

      <div style={{ marginTop: '15px', fontSize: '14px' }}>
        <span>💬 {totalComments} Komentar</span>
      </div>
    </div>
  );
}

export default ThreadItem;
