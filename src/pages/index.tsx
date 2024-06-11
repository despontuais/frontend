import React from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  // Redirecionar para a página de registro por padrão, ou ajuste conforme necessário
  React.useEffect(() => {
    router.push('/register');
  }, [router]);

  return (
    <div>
      {/* Conteúdo opcional para a página inicial */}
      <p>Redirecionando...</p>
    </div>
  );
};

export default Home;
