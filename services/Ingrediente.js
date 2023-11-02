import  {Api} from './Api'

const endPoint = 'ingredientes'

export const IngredienteService = {
    get(id){
        return Api.getById(endPoint, id)
    },
    listAll(){
        return Api.get(endPoint)
    },
    create(novoIngrediente){
        return Api.post(endPoint, novoIngrediente)
    },
    update(payload, id){
        return Api.put(endPoint, payload, id)
    },
    remove(id){
        return Api.get(`${endPoint}?id=${id}`)
    }
}