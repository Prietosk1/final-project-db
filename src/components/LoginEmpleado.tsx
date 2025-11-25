'use client';
import { useState } from 'react';

export default function LoginEmpleado({ onSuccess }: { onSuccess: (username: string) => void }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (usuario === 'Vane' && password === '123') {
      onSuccess(usuario);
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-3xl font-bold mb-6 text-[#4B2E2E]">Ingreso Empleados</h2>

      <input
        className="border p-2 mb-4 w-64 rounded bg-white"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 mb-4 w-64 rounded bg-white"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-pink-300 hover:bg-pink-400 px-6 py-2 rounded font-semibold shadow"
      >
        Entrar
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
}
