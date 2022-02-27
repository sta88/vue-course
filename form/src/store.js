import { createStore } from 'vuex';

const store = createStore({
    state: {
        username: '',
        phone: '',
        loggedIn: false
    },
    mutations: {
        change(state, theChange) {
            state[theChange.name] = theChange.value
        },
        arrayItemChange(state, theChange) {
            state[theChange.name][theChange.index] = theChange.value
        }
    },
    getters: {
        username: state => state.username,
        phone: state => state.phone,
        loggedIn: state => state.loggedIn
    }
})

export default store;