export interface LoginStateInterface {
  	login: string;
	access_token: string;
	last_error: string;
}

function state() : LoginStateInterface {
  	return {
    	login: "",
		access_token: "",
		last_error: ""
  	};
}

export default state;
