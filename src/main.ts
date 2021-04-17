import { createApp } from 'vue'
import App from './App.vue'
import './index.scss'
import router from './router';
import store from './store';

import firebase from "firebase/app";
import 'firebase/firestore';
import {firebaseConfig} from "../firebaseConfig";
import {FirestoreOrmRepository} from "@arbel/firebase-orm";

let firebaseApp = firebase.initializeApp(firebaseConfig);
let connection = firebaseApp.firestore();
FirestoreOrmRepository.initGlobalConnection(connection);

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');


import {registerSW} from 'virtual:pwa-register';
registerSW();