import config from "../config";
import Question from "../classes/question/Question";

export default {
    getSuffix(question: Question): string {
        return question.text.replace(config.questionRegex, "")
    },
    getPrefix(question: Question): string | null {
        let matches = question.text.match(config.questionRegex) ?? [];
        if (matches.length > 0) {
            return matches[0];
        }
        return null;
    }
}