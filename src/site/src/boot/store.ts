import { boot } from 'quasar/wrappers'
import createStore from 'src/store/index'

// @quasar/app-vite v2 supports Pinia only and no longer registers src/store,
// so the Vuex store is installed manually through this boot file
export default boot(({ app }) => {
    app.use(createStore({}))
})
