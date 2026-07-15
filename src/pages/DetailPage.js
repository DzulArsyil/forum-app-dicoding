import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveDetailThread, asyncAddComment } from '../states/detailThreadSlice';
import CommentInput from '../components/CommentInput';
import CommentItem from '../components/CommentItem';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailThread = useSelector((state) => state.detailThread);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id));
  }, [id, dispatch]);

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  if (!detailThread) {
    return null; // Menunggu data dari API
  }

  return (
    <section style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Bagian Detail Thread */}
      <div style={{ borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <img src={detailThread.owner.avatar} alt={detailThread.owner.name} width="40" style={{ borderRadius: '50%' }} />
          <div>
            <p style={{ margin: 0, fontWeight: 'bold' }}>{detailThread.owner.name}</p>
            <p style={{ margin: 0, color: 'gray', fontSize: '12px' }}>{new Date(detailThread.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <h2>{detailThread.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: detailThread.body }} />
      </div>

      {/* Bagian Komentar */}
      <h3>Komentar ({detailThread.comments.length})</h3>

      {/* Form komentar hanya muncul jika user sudah login */}
      {authUser ? (
        <CommentInput addComment={onAddComment} />
      ) : (
        <p style={{ color: 'red' }}>Anda harus login untuk memberikan komentar.</p>
      )}

      {/* Daftar Komentar */}
      <div style={{ marginTop: '20px' }}>
        {detailThread.comments.map((comment) => (
          <CommentItem key={comment.id} {...comment} />
        ))}
      </div>
    </section>
  );
}

export default DetailPage;
