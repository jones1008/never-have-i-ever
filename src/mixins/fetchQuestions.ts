import Question from "../question/Question";
import config from "../config";
import ls from "../utils/localStorage";
import store from "../store";
import {Query} from "@arbel/firebase-orm";
import {CategoryType} from "../category/CategoryType";

export default {
    methods: {
        async getAllQuestions(): Promise<Question[]> {
            return this.reportLimitQuery().get();
        },

        async getQuestions(category: CategoryType): Promise<Question[]> {
            if (category == "all") {
                return this.getAllQuestions();
            }
            return this.reportLimitQuery().where("categories", "array-contains", category).get();
        },

        reportLimitQuery(): Query<any> {
            return Question.query().where("reports", "<", config.reportLimit);
        },

        fetchQuestions(category: CategoryType): Promise<Question[]> {
            return new Promise((resolve) => {
                return this.getQuestions(category).then(questions => {
                    questions = this.filterReported(questions);

                    if (questions.length === 0) {
                        return [];
                    }

                    return resolve(questions.sort((a, b) => 0.5 - Math.random()));
                }).catch(err => {
                    console.log(err);
                    store.commit("globalError", "Fehler beim Laden der Fragen");
                });
            });
        },

        filterReported(questions: Question[]): Question[] {
            let reportedQuestions: Array<string> = ls.getArray("reportedQuestionIds");
            return questions.filter(q => !reportedQuestions.includes(q.id));
        },
    }
}