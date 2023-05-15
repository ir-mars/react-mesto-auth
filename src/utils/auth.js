const BASE_URL = "https://auth.nomoreparties.co";

export function register (email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res => res.ok || res.status === 400 ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))

};

export function authorize (email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res => res.ok || res.status === 401 ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))

};

export function checkToken (token) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
        .then((res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
        .then((data) => data)
        .catch(err => console.log(err))
};