const url = 'http://localhost:8000/'
export const Api = {
    getById(endPoint, id) {
        return fetch(`${url}${endPoint}/${id}`).then(response => response.json())
    },
    get(endPoint){
        return fetch(`${url}${endPoint}`).then(response => { 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },
    post(endPoint, data){
        return fetch(`${url}${endPoint}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => { 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },
    put(endPoint, data, id){
        return fetch(`${url}${endPoint}/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => { 
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },
    delete(endPoint){
        return fetch(`${url}${endPoint}`, {
            method: 'DELETE',
        }).then(response => { 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}