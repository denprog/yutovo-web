import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create();

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
    function translateString(str: string) {
        return app.config.globalProperties.$t(str);
    }

    app.config.globalProperties.$axios = axios
    app.config.globalProperties.$api = api
    app.config.globalProperties.$REMOTE_SOLVER = false
    globalThis.translateString = translateString;
})

export { axios, api }
