import { signOut } from 'next-auth/react';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    await signOut({ callbackUrl: '/' }); // Redirecione para a página inicial após o logout
    res.status(200).end();
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
