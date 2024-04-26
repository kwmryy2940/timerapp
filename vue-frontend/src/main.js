import { createApp } from 'vue'
// import './style.css'
import router from "./router";
import App from './App.vue'

// Vuetify のインポートを追加 **********/
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const myVuetifyLightTheme = {
  dark: false,
  colors: {
    primary: "#4DB6AC", // プライマリカラー
    secondary: "#b0bec5", // セカンダリカラー
    accent: "#6D4C41", // アクセントカラー
    error: "#b71c1c",
  },
};

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myVuetifyLightTheme',
    themes: {
      myVuetifyLightTheme,
    },
  },
});

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.mount("#app");

