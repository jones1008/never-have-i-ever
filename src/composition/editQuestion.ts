import Question from "../classes/question/Question";
import store from "../store";
import config from "../config";
import {computed, ref} from "vue";
import {goHome} from "../utils/router";

let newText = ref<string>("");

const currentQuestion = computed<Question>(() => {
    return store.getters.currentQuestion;
});

const text = computed<string>({
    get() {
        return currentQuestion.value?.text ?? "";
    },
    set(value: string) {
        newText.value = value;
    }
});

const edit = (): void => {
    editQuestion(currentQuestion.value, newText.value).then(() => {
        goHome();
    });
}

// from https://codepad.co/snippet/javascript-calculating-similarity-between-two-strings
const similarity = (s1: string, s2: string): number => {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    let longerLength = longer.length;
    if (longerLength === 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(String(longerLength));
}
const editDistance = (s1: string, s2: string): number => {
    let costs: number[] = [];
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else if (j > 0) {
                let newValue = costs[j - 1];
                if (s1.charAt(i - 1) != s2.charAt(j - 1)) {
                    newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                }
                costs[j - 1] = lastValue;
                lastValue = newValue;
            }
        }
        if (i > 0) {
            costs[s2.length] = lastValue;
        }
    }
    return costs[s2.length];
}
const editQuestion = (question: Question, newText: string): Promise<Question> => {
    return new Promise((resolve, reject) => {
        if (newText) {
            let sim = similarity(newText, question.text);
            if (sim < config.maxEditSimilarity) {
                store.commit("globalError", "Zu viele Änderungen")
                return reject("changes are too big")
            }
            question.text = newText;
            return question.save().then((newQuestion) => {
                store.commit("globalSuccess", "Änderungen gespeichert");
                return resolve(newQuestion);
            }).catch(err => {
                store.commit("globalError", "Fehler beim Speichern");
                return reject(err);
            });
        } else {
            store.commit("globalError", "keine Änderungen");
            return reject("no changes detected");
        }
    });
}

export default {
    text,
    edit
}