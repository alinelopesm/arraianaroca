import  {Api} from './Api'

const endPoint = 'usuarios'

export const UsuarioService = {
    get(id){
        return Api.getById(endPoint, id)
    },
    listAll(){
        return Api.get(endPoint)
    },
    create(novoUsuario) {
        return Api.post(endPoint, novoUsuario)
    },
    update(payload, id){
        return Api.put(endPoint, payload, id)
    },
    remove(id){
        return Api.delete(endPoint, id)
    }
}