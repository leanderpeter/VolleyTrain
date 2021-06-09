
import UserBO from './UserBO';
import TeamBO from './TeamBO';
import TrainingdayBO from './TrainingdayBO';


/*
Singleton Abstarktion des backend REST interfaces. Es handelt sich um eine access methode
*/

export default class VolleytrainAPI {

	//singletone instance
	static #api = null;

	// Lokales Python backend
	#ElectivServerBaseURL = '/volleyTrain';

	// Lokales Python backend
	//#ElectivServerBaseURL = 'https://wahlfachapp.oa.r.appspot.com/electivApp';



	//getPerson: google_user_id
	#getUserByGoogleIDURL = (google_user_id) => `${this.#ElectivServerBaseURL}/userbygoogle/${google_user_id}`;
	#getAllTeamsURL = () => `${this.#ElectivServerBaseURL}/team`;
	#addTeamURL = () => `${this.#ElectivServerBaseURL}/team`;
	#getTeamByIdURL = (id) => `${this.#ElectivServerBaseURL}/team/${id}`;
	#deleteTeamURL = (id) => `${this.#ElectivServerBaseURL}/team/${id}`;
	#updateTeamURL= () => `${this.#ElectivServerBaseURL}/team`;
	#getAllTrainingdaysURL = () => `${this.#ElectivServerBaseURL}/traingday`;
	#getTrainingdayByIdURL = (id) => `${this.#ElectivServerBaseURL}/trainingday/${id}`;
	#addTrainingdayURL = () => `${this.#ElectivServerBaseURL}/trainingday`;


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

	//gibt die Person mit der bestimmten GoogleUserID als BO zurück
	getAllTeams(){
		return this.#fetchAdvanced(this.#getAllTeamsURL()).then((responseJSON) => {
			let teamBO = TeamBO.fromJSON(responseJSON);
			console.info(teamBO)
			return new Promise(function (resolve){
				resolve(teamBO)
			})
		})
	}

	getTeamByID(id){
		return this.#fetchAdvanced(this.#getTeamByIdURL(id)).then((responseJSON) => {
			let teamBO = TeamBO.fromJSON(responseJSON);
			console.info(teamBO)
			return new Promise(function (resolve){
				resolve(teamBO)
			})
		})
	}

	addTeam(teamBO) {
		return this.#fetchAdvanced(this.#addTeamURL(), {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(teamBO)
		}).then((responseJSON) => {
			// zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
			let responseTeamBO = TeamBO.fromJSON(responseJSON);
			return new Promise(function (resolve) {
				resolve(responseTeamBO);
			})
		})
	}

	updateTeam(teamBO){
		return this.#fetchAdvanced(this.#updateTeamURL(), {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, text/plain',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(teamBO)
		}).then((responseJSON) => {
			// zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
			let responseTeamBO = TeamBO.fromJSON(responseJSON);
			return new Promise(function (resolve) {
				resolve(responseTeamBO);
			})
		})
	}

	//Projekt löschen
	deleteTeam(id){
		return this.#fetchAdvanced(this.#deleteTeamURL(id),{method: 'DELETE'})
	}


	//gibt die Person mit der bestimmten GoogleUserID als BO zurück
	getAllTrainingdays(){
		return this.#fetchAdvanced(this.#getAllTrainingdaysURL()).then((responseJSON) => {
			let trainingdayBO = TrainingdayBO.fromJSON(responseJSON);
			return new Promise(function (resolve){
				resolve(trainingdayBO)
			})
		})
	}

	getTrainingdayByID(id){
		return this.#fetchAdvanced(this.#getTrainingdayByIdURL(id)).then((responseJSON) => {
			let trainingdayBO = TrainingdayBO.fromJSON(responseJSON);
			return new Promise(function (resolve){
				resolve(trainingdayBO)
			})
		})
	}

	addTrainingday(trainingdayBO) {
		return this.#fetchAdvanced(this.#addTrainingdayURL(), {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(trainingdayBO)
		}).then((responseJSON) => {
			// zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
			let responseTrainingdayBO = TrainingdayBO.fromJSON(responseJSON);
			return new Promise(function (resolve) {
				resolve(responseTrainingdayBO);
			})
		})
	}

}
