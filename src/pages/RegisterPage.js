import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/usersSlice';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/login'); // Kembali ke login setelah daftar
  };

  return (
    <section className="register-page">
      <h2>Buat Akun Baru</h2>
      <RegisterInput register={onRegister} />
      <p>
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
