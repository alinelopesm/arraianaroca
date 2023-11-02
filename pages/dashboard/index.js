import PageContent from "../../componentes/PageContent/PageContent";
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router";

const PAGE_NAME = 'Dashboard'
const HEAD_NAME = 'Receitas Gourmet'
/* Pegar o tipo do usuario na variavel de ambiente */
const TYPE_USER = process.env.NEXT_PUBLIC_TYPE_USER ;

function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
    });

    if (response.ok) {
      router.push('/'); // Redirecionar para a página inicial após o logout
    }
  };

  return (
    <PageContent pageName={PAGE_NAME} headName={HEAD_NAME}>
      <div>
        <h1>Painel</h1>
        {session ?(
          <>
          <p>Bem-vindo, {session.user.nome}!</p>
          </>
        ) : (
          <p>Carregando...</p>
        )}
        {/* Conteúdo do painel */}
        <button onClick={handleLogout} disabled={!session}>
          Logout
        </button>
      </div>
    </PageContent>
  );
}

export default Dashboard;
