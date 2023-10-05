import PageContent from "../../componentes/PageContent/PageContent";

const PAGE_NAME = 'Dashboard'
const HEAD_NAME = 'Receitas Gourmet'

export default function Dashboard() {
  
    return (
      <PageContent pageName={PAGE_NAME} headName={HEAD_NAME}>
        <>Sou Dashboard {authToken}</>
      </PageContent>
    )
  }