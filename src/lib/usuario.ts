import { prisma } from './prismaLib';
import bcrypt from 'bcryptjs';

export async function login(username: string, password: string) {
  const user = await prisma.usuario.findUnique({
    where: { username },
  });

  if (!user) {
    return { ok: false, error: 'Usuario no encontrado' };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { ok: false, error: 'Contraseña incorrecta' };
  }

  return {
    ok: true,
    user: {
      id: user.IDusuario,
      username: user.username,
      rol: user.rol,
    },
  };
}

await prisma.usuario.create({
  data: {
    username: 'cvelias',
    password: '9876', // luego te muestro como encriptar
    rol: 'ADMIN',
  },
});

await prisma.usuario.create({
  data: {
    username: 'smindiola',
    password: '1234', // luego te muestro como encriptar
    rol: 'VENDEDOR',
  },
});

const resultado = await login('smindiola', '1234');
const resuls = await login('cvelias', '9876');
if (!resuls.ok) {
  console.log(resultado);
}
