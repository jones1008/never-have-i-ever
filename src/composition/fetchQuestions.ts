import Question from "../classes/question/Question";
import config from "../config";
import ls from "../utils/localStorage";
import store from "../store";
import {Query} from "@arbel/firebase-orm";
import {CategoryType} from "../classes/category/CategoryType";
import {computed, ref, watch, watchEffect} from "vue";
import CategoryObject from "../classes/category/CategoryObject";
import {mapActions} from "vuex";

const errorMessage = ref<string>("");

const currentQuestion = computed<Question>(() => {
    return store.getters.currentQuestion;
});

const currentQuestionPrefix = computed<string>(() => {
    return store.getters.currentQuestionPrefix;
});

const currentQuestionSuffix = computed<string>(() => {
    return store.getters.currentQuestionSuffix;
});

const currentQuestions = computed<Question[]>(() => {
    return store.getters.currentQuestions;
});

const allQuestions = computed<Question[]>( {
    get() {
        return store.state.allQuestions;
    },
    set(value) {
        store.commit("allQuestions", value);
    }
});

const currentCategoryIndex = computed<number>(() => {
    return store.getters.currentCategoryIndex;
})

const allCategories = computed<CategoryObject[]>({
    get() {
        return store.state.allCategories;
    },
    set(value: CategoryObject[]) {
        store.commit("allCategories", value)
    }
});

const currentCategory = computed<CategoryType>(() => {
    return store.getters.currentCategory;
});

const getAllQuestions = async (): Promise<Question[]> => {
    return reportLimitQuery().get();
}

const reportLimitQuery = (): Query<any> => {
    return Question.query().where("reports", "<", config.reportLimit);
}

const fetch = async (): Promise<void> => {
    allQuestions.value = await fetchQuestions();
    if (!allQuestions || allQuestions.value.length === 0) {
        errorMessage.value = "Keine Fragen gefunden..."
    }
};

const nextQuestion = () => {
    return store.dispatch("nextQuestion");
};
const prevQuestion = () => {
    return store.dispatch("prevQuestion");
}

const fetchQuestions = (): Promise<Question[]> => {
    return new Promise((resolve, reject) => {
        return getAllQuestions().then(questions => {
            questions = filterReported(questions);

            if (questions.length === 0) {
                return [];
            }

            return resolve(questions.sort((a, b) => 0.5 - Math.random()));
        }).catch(err => {
            console.log(err);
            store.commit("globalError", "Fehler beim Laden der Fragen");
            return reject(err);
        });
    });
}

const filterReported = (questions: Question[]): Question[] => {
    let reportedQuestions: Array<string> = ls.getArray("reportedQuestionIds");
    return questions.filter(q => !reportedQuestions.includes(q.id));
}

export default {
    allCategories,
    errorMessage,
    currentQuestion,
    currentQuestionSuffix,
    currentQuestionPrefix,
    currentQuestions,
    currentCategoryIndex,
    prevQuestion,
    nextQuestion,
    fetch
}