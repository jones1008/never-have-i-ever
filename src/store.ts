import { createStore } from 'vuex'
import Question from "./entities/Question";
import {Category} from "./entities/Category";
import {SparklesIcon} from '@heroicons/vue/outline';
import config from "./config";
import clone from "./utils/clone";

// Create a new store instance.
export default createStore({
    state () {
        // deep clone config.categories
        const categories = clone.cloneArray(config.categories);
        let allCategories = [
            {
                text: "Alle",
                value: "all",
                iconColor: "text-yellow-600",
                isChosen: false,
                icon: SparklesIcon
            },
            ...categories
        ];
        let defaultCategory = allCategories.find(c => c.value === config.defaultCategory);
        if (defaultCategory) {
            defaultCategory.isChosen = true;
        }
        return {
            globalSuccess: null,
            globalError: null,
            questions: [] as Question[],
            currentQuestionIndex: 0 as number,
            allCategories
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
        questions(state: any, value) {
            state.questions = value;
        },
        setQuestion(state: any, question: Question) {
            let foundQuestion = state.questions.find(q => q.id === question.id);
            if (foundQuestion) {
                foundQuestion = question;
            }
        },
        addToQuestions(state: any, question: Question) {
            state.questions.push(question);
        },
        currentQuestionIndex(state: any, value) {
            state.currentQuestionIndex = value;
        },
        allCategories(state: any, value) {
            state.allCategores = value;
        }
    },
    getters: {
        currentQuestion(state, getters): Question | null {
            if (state.questions.length > 0) {
                return state.questions[state.currentQuestionIndex];
            }
            return null;
        },
        currentCategory(state, getters): Category | null {
            let chosenCategoryObj = state.allCategories.find(i => i.isChosen);
            if (chosenCategoryObj) {
                return chosenCategoryObj.value;
            }
            return null;
        }
    }
})