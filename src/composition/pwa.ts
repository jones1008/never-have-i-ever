import {computed} from "vue";

const mobileBrowser = computed<"Samsung" | "Chrome" | "Safari" | null>(() => {
    // @ts-ignore
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/SamsungBrowser/i.test(userAgent)) {
        return "Samsung";
    }
    if (/Android/i.test(userAgent)) {
        return "Chrome";
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "Safari";
    }
    return null;
});
const isPWA = computed<boolean>(() => {
    return window.matchMedia('(display-mode: standalone)').matches;
});

export default {
    mobileBrowser,
    isPWA
}