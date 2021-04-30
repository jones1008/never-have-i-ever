import {computed, ref} from "vue";
import store from "../store";
import config from "../config";

const defaultPrefix = ref<string>(config.defaultPrefix);

const currentQuestionPrefix = computed<string>(() => {
    return store.getters.currentQuestionPrefix;
});

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
    defaultPrefix,
    currentQuestionPrefix,
    globalError,
    globalSuccess
}