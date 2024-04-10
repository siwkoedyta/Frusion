import { API_URL } from './../config.js'

export async function fetchGet(path) {
    return fetchUtil('GET', path)
}

export async function fetchPost(path, body = null) {
    return fetchUtil('POST', path, body)
}

export async function fetchPut(path, body = null) {
    return fetchUtil('PUT', path, body)
}

export async function fetchDelete(path, body = null) {
    return fetchUtil('DELETE', path, body)
}


export async function fetchUtil(method, path, body = null) {
    return fetch(`${API_URL}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: body == null ? body : JSON.stringify(body)
    })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .then(body => { throw body.errors })
            }
            if(res.headers.get("content-length") === "0") return {};
            return res.json();
        })
        .catch(error => {
            console.log("fetch error", error) 
            throw ['INTERNAL'] 
        });
}