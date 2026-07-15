import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ThreadList from '../components/ThreadList';
import { asyncReceiveThreads } from '../states/threadsSlice';
import { asyncReceiveUsers } from '../states/usersSlice';

function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    // Memanggil API untuk mengisi state threads dan users saat komponen dirender
    dispatch(asyncReceiveUsers());
    dispatch(asyncReceiveThreads());
  }, [dispatch]);

  // Menggabungkan data thread dengan data user (pembuat thread)
  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId) || {},
  }));

  return (
    <section className="home-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Forum Diskusi</h2>
        {/* Tombol ini hanya muncul JIKA authUser ada (sudah login) */}
        {authUser && (
          <Link
            to="/new"
            style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}
          >
            + Buat Thread
          </Link>
        )}
      </div>
      <ThreadList threads={threadList} />
    </section>
  );
}

export default HomePage;
