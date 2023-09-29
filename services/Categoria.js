import  {Api} from './Api'

const endPoint = 'categorias'

export const CategoriaService = {
    get(id){
        return Api.getById(endPoint, id)
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
    update(updateCategoria, id){
        const payload = {
            nome: updateCategoria?.nome,
            foto_categoria: novaCategoria?.filePath
        }
        return Api.post(endPoint, payload, id)
    },
    remove(id){
        return Api.get(`${endPoint}?id=${id}`)
    }
}