import  {Api} from './Api'

const endPoint = 'categorias'

export const CategoriaService = {
    get(id){
        return Api.getById(endPoint, id)
    },
    listAll(){
        return Api.get(endPoint)
    },
    create(payload){
        return Api.post(endPoint, payload)
    },
    update(payload, id){
        return Api.put(endPoint, payload, id)
    },
    remove(id){ 
        return Api.delete(endPoint, id)
    }
}