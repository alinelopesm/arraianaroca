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
        return Api.get(endPoint, novaCategoria)
    },
    remove(id){
        return Api.get(`${endPoint}?id=${id}`)
    }
}