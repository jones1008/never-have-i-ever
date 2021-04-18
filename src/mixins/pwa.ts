export default {
    computed: {
        mobileBrowser(): "Samsung" | "Chrome" | "Safari" | null {
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
        },
        isPWA(): boolean {
            return window.matchMedia('(display-mode: standalone)').matches;
        }
    }
}