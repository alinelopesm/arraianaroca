import  {Api} from './Api'

const endPoint = 'recipe'

export const ReceitasService = {
    get(id){
        return Api.get(`${endPoint}?id=${id}`)
    },
    listAll(){
        return Api.get(endPoint)
    },
    create(novaReceita){
        return Api.get(endPoint, novaReceita)
    },
    remove(id){
        return Api.get(`${endPoint}?id=${id}`)
    }

}