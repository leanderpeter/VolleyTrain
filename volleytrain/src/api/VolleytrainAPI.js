
import UserBO from './UserBO';
import PlayerBO from './PlayerBO';

/*
Singleton Abstarktion des backend REST interfaces. Es handelt sich um eine access methode
*/

export default class VolleytrainAPI {

	//singletone instance
	static #api = null;

	// Lokales Python backend
	#VolleytrainServerBaseURL = '/volleyTrain';

	// Lokales Python backend
	//#ElectivServerBaseURL = 'https://wahlfachapp.oa.r.appspot.com/electivApp';



	//getPerson: google_user_id
	#getUserByGoogleIDURL = (google_user_id) => `${this.#VolleytrainServerBaseURL}/userbygoogle/${google_user_id}`;

	//getPlayers: all
	#getPlayersURL = () => `${this.#VolleytrainServerBaseURL}/players`;


	/*
	Singleton/Einzelstuck instanz erhalten
	*/
	static getAPI() {
		if (this.#api == null) {
			this.#api = new VolleytrainAPI();
		} 
		return this.#api;
	}

	/*
	Gibt einen Error zuruck auf JSON Basis. fetch() gibt keine Errors wie 404 oder 500 zuruck. Deshaltb die func fetchAdvanced 
	*/
	#fetchAdvanced = (url, init) => fetch(url, init, {credentials: 'include'})
		.then(res => {
			//fetch() gibt keine Errors wie 404 oder 500 zuruck
			if (!res.ok) {
				throw Error(`${res.status} ${res.statusText}`);
				//throw Error(`Fail`);
			}
			return res.json();
		})
	/*
	Gebe alle BO's zuruck
	*/
	


	//gibt die Person mit der bestimmten GoogleUserID als BO zurück
	getUserByGoogleID(google_user_id){
		return this.#fetchAdvanced(this.#getUserByGoogleIDURL(google_user_id)).then((responseJSON) => {
			let userBO = UserBO.fromJSON(responseJSON);
			console.info(userBO)
			return new Promise(function (resolve){
				resolve(userBO)
			})
		})
	}

	//Get all Players
	getPlayers() {
		return this.#fetchAdvanced(this.#getPlayersURL(),{method: 'GET'}).then((responseJSON) => {
			let playerBOs = PlayerBO.fromJSON(responseJSON);
			console.info(playerBOs)
			return new Promise(function (resolve){
				resolve(playerBOs);
			})
		})
	}

}
