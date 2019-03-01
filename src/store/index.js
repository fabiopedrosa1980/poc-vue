import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store(
    {
        state: {
            clientes: []
        },
        mutations: {
            addClient (state, client) {
                state.clientes.push(client)
            },
            deleteClient (state, client) {
                state.words = state.words.filter(obj => obj.headword !== client)
            }
        }
    }
)