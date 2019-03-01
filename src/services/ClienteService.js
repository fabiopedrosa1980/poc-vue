import Api from '@/services/Api'

export default {
    getClients () {
        return Api().get(`/client?page=0&size=10`)
    },
    getClient (id) {
        return Api().get(`/client/${id}`)
    },
    addClient (client) {
        return Api().post(`/client`, client)
    },
    updateClient (client) {
        return Api().put(`/client/${client.id}`,client)
    },
    removeClient (id) {
        return Api().delete(`/client/${id}`)
    },
    changePage(number) {
        return Api().get(`/client?page=${number}&size=10`)
    },
}