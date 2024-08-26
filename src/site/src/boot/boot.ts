import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: 'https://yutovo.ru:443' })

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
    app.config.globalProperties.$axios = axios
    app.config.globalProperties.$api = api
    app.config.globalProperties.$REMOTE_SOLVER = false
})

export { axios, api }
