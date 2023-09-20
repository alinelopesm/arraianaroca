import  {Api} from './Api'

const endPoint = 'usuarios'

export const UsuarioService = {
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