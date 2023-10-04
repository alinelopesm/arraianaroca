import  {Api} from './Api'

const endPoint = 'un_medida'

export const MedidaService = {
    get(id){
        return Api.get(`${endPoint}?id=${id}`)
    },
    listAll(){
        return Api.get(endPoint)
    },
    create(novaMedida){
        return Api.post(endPoint, novaMedida)
    },
    update(payload, id){
        return Api.put(endPoint, payload, id)
    },
    remove(id){
        return Api.get(`${endPoint}?id=${id}`)
    }
}