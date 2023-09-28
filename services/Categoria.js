import  {Api} from './Api'

const endPoint = 'categorias'

export const CategoriaService = {
    get(id){
        return Api.get(`${endPoint}?id=${id}`)
    },
    listAll(){
        return Api.get(endPoint)
    },
    create(novaCategoria){
        const payload = {
            nome: novaCategoria?.nome,
            foto_categoria: novaCategoria?.filePath
        }
        return Api.post(endPoint, payload)
    },
    remove(id){
        return Api.get(`${endPoint}?id=${id}`)
    }
}