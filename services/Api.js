const url = 'http://localhost:8000/'
export const Api = {
    getById(endPoint, id) {
        return fetch(`${url}${endPoint}/${id}`).then(response => response.json())
    },
    get(endPoint){
        return fetch(`${url}${endPoint}`).then(response => response.json())
    },
    post(endPoint, data){
        return fetch(`${url}${endPoint}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
    },
    put(endPoint, data, id){
        return fetch(`${url}${endPoint}/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
    },
    delete(endPoint){
        return fetch(`${url}${endPoint}`, {
            method: 'DELETE',
        }).then(response => response.json())
    }
}