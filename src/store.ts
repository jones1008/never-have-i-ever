import { createStore } from 'vuex'

// Create a new store instance.
export default createStore({
    state () {
        return {
            globalSuccess: null,
            globalError: null
        }
    },
    mutations: {
        globalSuccess(state: any, value) {
            state.globalError = null;
            state.globalSuccess = value;
        },
        globalError(state: any, value) {
            state.globalSuccess = null;
            state.globalError = value;
        }
    }
})