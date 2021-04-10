const prefix = "NeverHaveIEver-";

export default {
    getArray(name: String): Array<any> {
        let item = localStorage.getItem(prefix + name);
        if (item) {
            return JSON.parse(item);
        }
        return [];
    },
    setArray(name: String, array: Array<any>) {
        localStorage.setItem(prefix + name, JSON.stringify(array));
    },
    addToArray(name: String, value: any) {
        let array = this.getArray(name);
        array.push(value);
        this.setArray(name, array);
    }
}