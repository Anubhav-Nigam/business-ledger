import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../middleware/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token); // Save JWT
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl mb-4 font-bold">Login</h2>
        <input className="input" type="email" placeholder="Email" value={email}
               onChange={(e) => setEmail(e.target.value)} required />
        <input className="input mt-2" type="password" placeholder="Password" value={password}
               onChange={(e) => setPassword(e.target.value)} required />
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
