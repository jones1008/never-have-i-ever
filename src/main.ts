import { createApp } from 'vue'
import App from './App.vue'
// import VueClickAway from "vue3-click-away";
import './index.scss'
import router from './router';

import firebase from "firebase/app";
import 'firebase/firestore';
import {firebaseConfig} from "../local.config";
import {FirestoreOrmRepository} from "@arbel/firebase-orm";
let firebaseApp = firebase.initializeApp(firebaseConfig);
let connection = firebaseApp.firestore();
FirestoreOrmRepository.initGlobalConnection(connection);

import store from './store';

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');