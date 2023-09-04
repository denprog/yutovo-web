import { createStore } from 'vuex'
import login from './login'
import service from './service'

export interface StateInterface {
    // Define your own store structure, using submodules if needed
    // example: ExampleStateInterface;
    // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
    example: unknown;
}

export default function ()
{
  	const Store = createStore({
    	modules: {
      		login,
			service
    	},

    	// enable strict mode (adds overhead!)
    	// for dev mode and --debug builds only
    	strict: !!process.env.DEBUGGING
  	})

  	return Store
}
