import router from "../router";

const goHome = (): void => {
    router.push({name: 'home'})
};

export {goHome};