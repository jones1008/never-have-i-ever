import { createStore } from 'vuex'
import Question from "./entities/Question";

// Create a new store instance.
export default createStore({
    state () {
        return {
            globalSuccess: null,
            globalError: null,
            currentQuestion: null
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
        },
        currentQuestion(state: any, value: Question) {
            state.currentQuestion = value;
        }
    }
})