export interface LoginStateInterface {
  	login: string;
	access_token: string;
}

function state() : LoginStateInterface {
  	return {
    	login: "",
		access_token: ""
  	};
}

export default state;
