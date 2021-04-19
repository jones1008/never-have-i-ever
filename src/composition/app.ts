import {computed} from "vue";
import store from "../store";

const globalError = computed<string>({
    get() {
        return store.state.globalError;
    },
    set(value: string) {
        store.commit("globalError", value);
    }
})

const globalSuccess = computed<string>({
    get() {
        return store.state.globalSuccess;
    },
    set(value: string) {
        store.commit("globalSuccess", value);
    }
})

export default {
    globalError,
    globalSuccess
}