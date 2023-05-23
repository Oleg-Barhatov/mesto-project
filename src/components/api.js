const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
    headers: {
        authorization: '31d73e44-fcb9-4ff0-a8e8-65cffdcd1182',
        'Content-Type': 'application/json'
    }
}


class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl
        this._headers = headers
    }

    async _request(method, route, payload = null) {
        const headers = this._headers
        const init = {
            method,
            headers,
            body: payload ? JSON.stringify(payload) : payload
        }
        if (method.toLowerCase() === "get") {
            delete init.body
        }

        const response = await fetch(this._baseUrl + route, init);
        if (!response.ok) {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
        return await response.json()
    }

    getUserInfo() {
        return this._request("GET", "/users/me")
    }

    getCards() {
        return this._request("GET", "/cards ")
    }

    setUserInfo(name, about) {
        return this._request("PATCH", "/users/me", {name, about})
    }

    addNewCard(name, link) {

        return this._request("POST", "/cards", {name, link})
    }

    deleteCard = (cardId) => {
        return this._request("DELETE", `/cards/${cardId}`)
    }

    putCardLike = (cardId) => {
        return this._request("PUT", `/cards/likes/${cardId}`)
    }

    rmvCardLike = (cardId) => {
        return this._request("DELETE", `/cards/likes/${cardId}`)
    }

    updateAvatar(avatar) {
        return this._request("PATCH", "/users/me/avatar", {avatar})
    }
    toggleCardLike(cardId, method){
        if (method.toLowerCase()==="put"){
            return this.putCardLike(cardId)
        }
        return this.rmvCardLike(cardId)
    }
}
const api = new Api(config)
export default api