export default {
    cloneArray(array: Array<any>): Array<any> {
        return array.map(a => ({...a}));
    }
}