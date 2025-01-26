import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout'; // Импортируем Layout
import '../styles/Home.css';

function Home() {
  return (
    <Layout>
      {/* Убираем <div className="content">, так как он уже есть в Layout */}
      <h1>StarnetAI</h1>
      <h2>Ваш ключ к новым возможностям</h2>
      <div className="buttons">
        <Link to="/login" className="btn">
          <span>Log in</span>
        </Link>
        <Link to="/register" className="btn btn-gold-glow">
          <span>Register</span>
        </Link>
      </div>
    </Layout>
  );
}

export default Home;