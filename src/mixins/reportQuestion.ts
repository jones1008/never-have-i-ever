import ls from "../utils/localStorage";
import Question from "../question/Question";
import store from "../store";

export default {
    methods: {
        reportQuestion(question: Question): Promise<Question> {
            return new Promise((resolve, reject) => {
                if (!ls.getArray("reportedQuestionIds").includes(question.id)) {
                    question.reports++;
                    return question.save().then(() => {
                        ls.addToArray("reportedQuestionIds", question.id);
                        this.removeQuestion(question);
                        store.commit("globalSuccess", "Frage wurde gemeldet.");
                        return resolve(question);
                    }).catch(err => {
                        console.log(err);
                        store.commit("globalError", "Fehler beim Melden");
                        return reject(err);
                    });
                } else {
                    store.commit("globalError", "Hast du bereits gemeldet");
                    return reject("question was reported already by this user");
                }
            });
        },

        removeQuestion(question: Question): void {
            store.commit("removeQuestion", question);
            if (!store.getters.isFirstQuestion) {
                store.commit("currentQuestionIndex", --store.state.currentQuestionIndex);
                store.dispatch("nextQuestion");
            }
        }
    }
}