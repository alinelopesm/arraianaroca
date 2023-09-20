import  {Api} from './Api'

const endPoint = 'ingredientes'

export const IngredienteService = {
    get(id){
        return Api.get(`${endPoint}?id=${id}`)
    },
    listAll(){
        return Api.get(endPoint)
    },
    create(novoIngrediente){
        return Api.get(endPoint, novoIngrediente)
    },
    remove(id){
        return Api.get(`${endPoint}?id=${id}`)
    }
}