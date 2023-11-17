import  {Api} from './Api'

const endPoint = 'ingred_receitas'

export const IngredienteReceitaService = {
    get(id){
        return Api.getById(endPoint, id)
    },
    listAll(){
        return Api.get(endPoint)
    },
    create(novoIngredienteReceita){
        return Api.post(endPoint, novoIngredienteReceita)
    },
    update(payload, id){
        return Api.put(endPoint, payload, id)
    },
    remove(id){
        return Api.delete(endPoint, id)
    }
}