import  {Api} from './Api'

const endPoint = 'login'

export const AuthUser = {
    create(user) {
        return Api.post(endPoint, user)
    }
}