import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threadsSlice';

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
    navigate('/'); // Kembali ke halaman utama setelah berhasil
  };

  return (
    <section style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Buat Diskusi Baru</h2>
      <ThreadInput addThread={onAddThread} />
    </section>
  );
}

export default AddThreadPage;
