const mobileBrowser = (): "Samsung" | "Chrome" | "Safari" | null => {
    // @ts-ignore
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/SamsungBrowser/i.test(userAgent)){
        return "Samsung";
    }
    if (/Android/i.test(userAgent)) {
        return "Chrome";
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream){
        return "Safari";
    }
    return null;
}
const isPWA = (): boolean => {
    return window.matchMedia('(display-mode: standalone)').matches;
}

export default {
    mobileBrowser,
    isPWA
}