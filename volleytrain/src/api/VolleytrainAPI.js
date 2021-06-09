
import UserBO from './UserBO';
import ExerciseBO from './ExerciseBO';


/*
Singleton Abstarktion des backend REST interfaces. Es handelt sich um eine access methode
*/

export default class VolleytrainAPI {

	//singletone instance
	static #api = null;

	// Lokales Python backend
	#VolleyTrainServerBaseURL = '/volleyTrain';

	//getPerson: google_user_id
	#getUserByGoogleIDURL = (google_user_id) => `${this.#VolleyTrainServerBaseURL}/userbygoogle/${google_user_id}`;
	//getExercise: id
	#getExerciseByIDURL = (id) => `${this.#VolleyTrainServerBaseURL}/exercise/${id}`;
	#deleteExerciseURL = (id) => `${this.#VolleyTrainServerBaseURL}/exercise/${id}`;
	//POSTE eine neue Übung
	#addExerciseURL = () => `${this.#VolleyTrainServerBaseURL}/exercise`;
	#getExercisesURL = () => `${this.#VolleyTrainServerBaseURL}/exercise`;
	#updateExerciseURL = () => `${this.#VolleyTrainServerBaseURL}/exercise`;

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
		console.log(this.#getUserByGoogleIDURL(google_user_id))
		return this.#fetchAdvanced(this.#getUserByGoogleIDURL(google_user_id)).then((responseJSON) => {
			let userBO = UserBO.fromJSON(responseJSON);
			console.info(userBO)
			return new Promise(function (resolve){
				resolve(userBO)
			})
		})
	}

	//gibt die Exercise mit der bestimmten ID als BO zurück
	getExerciseByID(id){
		return this.#fetchAdvanced(this.#getExerciseByIDURL(id)).then((responseJSON) => {
			let exerciseBO = ExerciseBO.fromJSON(responseJSON);
			return new Promise(function (resolve){
				resolve(exerciseBO)
			})
		})
	}

	//Eine Übung hinzufügen
	addExercise(exerciseBO) {
		return this.#fetchAdvanced(this.#addExerciseURL(), {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(exerciseBO)
		}).then((responseJSON) => {
			// zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
			let responseExerciseBO = ExerciseBO.fromJSON(responseJSON);
			return new Promise(function (resolve) {
				resolve(responseExerciseBO);
			})
		})
	}

	//eine Übung bearbeiten/updaten
	updateExercise(exerciseBO){
		return this.#fetchAdvanced(this.#updateExerciseURL(), {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, text/plain',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(exerciseBO)
		}).then((responseJSON) => {
			// zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
			let responseExerciseBO = ExerciseBO.fromJSON(responseJSON);
			return new Promise(function (resolve) {
				resolve(responseExerciseBO);
			})
		})
	}

	getExercises() {
		return this.#fetchAdvanced(this.#getExercisesURL()).then((responseJSON) => {
			let exerciseBOs = ExerciseBO.fromJSON(responseJSON);
			return new Promise(function (resolve){
				resolve(exerciseBOs);
			})
		})
	}

	//Übung löschen
	deleteExercise(id){
		return this.#fetchAdvanced(this.#deleteExerciseURL(id),{method: 'DELETE'})
	}

}
