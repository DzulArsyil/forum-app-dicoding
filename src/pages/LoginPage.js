import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUserSlice';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/'); // Kembali ke halaman utama setelah login
  };

  return (
    <section className="login-page">
      <h2>Yuk, Login!</h2>
      <LoginInput login={onLogin} />
      <p>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </section>
  );
}

export default LoginPage;
