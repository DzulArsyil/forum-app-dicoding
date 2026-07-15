import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { ToastContainer } from 'react-toastify';
import { asyncPreloadProcess, asyncUnsetAuthUser } from './states/authUserSlice';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddThreadPage from './pages/AddThreadPage';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  return (
    <>
      <LoadingBar style={{ backgroundColor: 'red', height: '5px', position: 'fixed', top: 0, zIndex: 9999 }} />
      <ToastContainer />
      <div className="app-container">
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
          <h1><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Aplikasi Forum Diskusi</Link></h1>

          {authUser ? (
            <button type="button" onClick={onLogOut}>
              Logout ({authUser.name})
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </header>

        <main>
          <Routes>
            {/* Sementara rute Home (/) kita arahkan ke halaman dummy dulu sebelum kita buat HomePage asli */}
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/new" element={<AddThreadPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
