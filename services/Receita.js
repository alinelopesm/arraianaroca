import  {Api} from './Api'

const endPoint = 'receitas'

export const ReceitaService = {
    get(id){
        return Api.getById(endPoint, id)
    },
    listAll(){
        return Api.get(endPoint)
    },
    create(novaReceita){
        return Api.post(endPoint, novaReceita)
    },
    update(payload, id){
        return Api.put(endPoint, payload, id)
    },
    remove(id){
        return Api.delete(endPoint, id)
    }
}