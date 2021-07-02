import UserBO from "./UserBO";
import PlayerBO from "./PlayerBO";
import TrainingBO from "./TrainingBO";
import TeamBO from "./TeamBO";
import TrainingdayBO from "./TrainingdayBO";
import ExerciseBO from "./ExerciseBO";
import MatchfieldPlayerBO from "./MatchfieldPlayerBO";
import PositionBO from "./PositionBO";

/*
Singleton Abstarktion des backend REST interfaces. Es handelt sich um eine access methode
*/

export default class VolleytrainAPI {
  //singletone instance
  static #api = null;

  // Lokales Python backend
  #VolleyTrainServerBaseURL = "/volleyTrain";

  //getPerson: google_user_id
  #getUserByGoogleIDURL = (google_user_id) =>
    `${this.#VolleyTrainServerBaseURL}/userbygoogle/${google_user_id}`;

  //Team
  #TeamURL = () => `${this.#VolleyTrainServerBaseURL}/team`;
  #TeamByIdURL = (id) => `${this.#VolleyTrainServerBaseURL}/team/${id}`;
  #TeamByNameURL = (name) => `${this.#VolleyTrainServerBaseURL}/team/${name}`;

  //Trainingday
  #TrainingdayURL = () => `${this.#VolleyTrainServerBaseURL}/trainingday`;
  #TrainingdayByIdURL = (id) =>
    `${this.#VolleyTrainServerBaseURL}/trainingday/${id}`;

  //getExercise: id
  #ExerciseByIdURL = (id) => `${this.#VolleyTrainServerBaseURL}/exercise/${id}`;

  //POSTE eine neue Übung
  #ExerciseURL = () => `${this.#VolleyTrainServerBaseURL}/exercise`;
  #getExercisesByTrainingURL = (id) =>
    `${this.#VolleyTrainServerBaseURL}/exercise/${id}/training`;

  //Training
  #getAllTrainings = () => `${this.#VolleyTrainServerBaseURL}/trainings`;
  #getVisibleTrainings = () =>
    `${this.#VolleyTrainServerBaseURL}/visible_trainings`;
  #getArchivedTrainings = () =>
    `${this.#VolleyTrainServerBaseURL}/archived_trainings`;
  #addTrainingURL = () => `${this.#VolleyTrainServerBaseURL}/trainings`;

  //getPlayers: all
  #PlayerURL = () => `${this.#VolleyTrainServerBaseURL}/player`;
  #getPlayersByTeamURL = (id) =>
    `${this.#VolleyTrainServerBaseURL}/players/${id}`;
  #PlayerByIdURL = (id) => `${this.#VolleyTrainServerBaseURL}/player/${id}`;

  //MatchfieldPlayerBO
  #getAllMatchfieldPlayerURL = () =>
    `${this.#VolleyTrainServerBaseURL}/matchfieldPlayers`;
  #getMatchfieldPlayerByIdURL = (id) =>
    `${this.#VolleyTrainServerBaseURL}/matchfieldPlayersById/${id}`;
  #updateMatchfieldPlayerByIdURL = () =>
    `${this.#VolleyTrainServerBaseURL}/matchfieldPlayersById`;
  //Delete PlayerPosition
  #deletePlayerPositionsURL = () =>
    `${this.#VolleyTrainServerBaseURL}/matchfieldPlayersById`;

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
  #fetchAdvanced = (url, init) =>
    fetch(url, init, { credentials: "include" }).then((res) => {
      //fetch() gibt keine Errors wie 404 oder 500 zuruck
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    });
  /*
	Gebe alle BO's zuruck
	*/

  //gibt die Person mit der bestimmten GoogleUserID als BO zurück
  getUserByGoogleID(google_user_id) {
    return this.#fetchAdvanced(this.#getUserByGoogleIDURL(google_user_id)).then(
      (responseJSON) => {
        let userBO = UserBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(userBO);
        });
      }
    );
  }

  getPlayers() {
    return this.#fetchAdvanced(this.#PlayerURL(), { method: "GET" }).then(
      (responseJSON) => {
        let playerBOs = PlayerBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(playerBOs);
        });
      }
    );
  }

  //Player
  getAllPlayers() {
    return this.#fetchAdvanced(this.#PlayerURL()).then((responseJSON) => {
      let playerBO = PlayerBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(playerBO);
      });
    });
  }

  //Training
  getAllTrainings() {
    return this.#fetchAdvanced(this.#getAllTrainings()).then((responseJSON) => {
      let trainingBO = TrainingBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(trainingBO);
      });
    });
  }

  //gibt die Person mit der bestimmten GoogleUserID als BO zurück
  getAllTeams() {
    return this.#fetchAdvanced(this.#TeamURL()).then((responseJSON) => {
      let teamBO = TeamBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(teamBO);
      });
    });
  }

  //gibt die Exercise mit der bestimmten ID als BO zurück
  getExerciseByID(id) {
    return this.#fetchAdvanced(this.#ExerciseByIdURL(id)).then(
      (responseJSON) => {
        let exerciseBO = ExerciseBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(exerciseBO);
        });
      }
    );
  }

  getTeamByID(id) {
    return this.#fetchAdvanced(this.#TeamByIdURL(id)).then((responseJSON) => {
      let teamBO = TeamBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(teamBO);
      });
    });
  }

  addTeam(teamBO) {
    return this.#fetchAdvanced(this.#TeamURL(), {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(teamBO),
    }).then((responseJSON) => {
      // zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
      let responseTeamBO = TeamBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseTeamBO);
      });
    });
  }

  //Eine Übung hinzufügen
  addExercise(exerciseBO) {
    return this.#fetchAdvanced(this.#ExerciseURL(), {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(exerciseBO),
    }).then((responseJSON) => {
      // zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
      let responseExerciseBO = ExerciseBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseExerciseBO);
      });
    });
  }

  updateTeam(teamBO) {
    return this.#fetchAdvanced(this.#TeamURL(), {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(teamBO),
    }).then((responseJSON) => {
      // zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
      let responseTeamBO = TeamBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseTeamBO);
      });
    });
  }

  //eine Übung bearbeiten/updaten
  updateExercise(exerciseBO) {
    return this.#fetchAdvanced(this.#ExerciseURL(), {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(exerciseBO),
    }).then((responseJSON) => {
      // zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
      let responseExerciseBO = ExerciseBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseExerciseBO);
      });
    });
  }

  //Projekt löschen
  deleteTeam(team_id) {
    return this.#fetchAdvanced(this.#TeamByIdURL(team_id), {
      method: "DELETE",
    });
  }

  //gibt die Person mit der bestimmten GoogleUserID als BO zurück
  getAllTrainingdays() {
    return this.#fetchAdvanced(this.#TrainingdayURL()).then((responseJSON) => {
      let trainingdayBO = TrainingdayBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(trainingdayBO);
      });
    });
  }

  getExercises() {
    return this.#fetchAdvanced(this.#ExerciseURL()).then((responseJSON) => {
      let exerciseBOs = ExerciseBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(exerciseBOs);
      });
    });
  }

  getTrainingdayByID(id) {
    return this.#fetchAdvanced(this.#TrainingdayByIdURL(id)).then(
      (responseJSON) => {
        let trainingdayBO = TrainingdayBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(trainingdayBO);
        });
      }
    );
  }

  addTrainingday(trainingdayBO) {
    return this.#fetchAdvanced(this.#TrainingdayURL(), {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(trainingdayBO),
    }).then((responseJSON) => {
      // zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
      let responseTrainingdayBO = TrainingdayBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseTrainingdayBO);
      });
    });
  }
  //Übung löschen
  deleteExercise(id) {
    return this.#fetchAdvanced(this.#ExerciseByIdURL(id), {
      method: "DELETE",
    });
  }

  //Training
  getAllMatchfieldPlayerBO() {
    return this.#fetchAdvanced(this.#getAllMatchfieldPlayerURL()).then(
      (responseJSON) => {
        let matchfieldPlayerBO = MatchfieldPlayerBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(matchfieldPlayerBO);
        });
      }
    );
  }

  getPlayerByMatchfieldID(id) {
    return this.#fetchAdvanced(this.#getMatchfieldPlayerByIdURL(id)).then(
      (responseJSON) => {
        let matchfieldPlayerBO = MatchfieldPlayerBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(matchfieldPlayerBO);
        });
      }
    );
  }

  //Spieler hinzufuegen
  addPlayer(playerBO) {
    return this.#fetchAdvanced(this.#PlayerURL(), {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(playerBO),
    }).then((responseJSON) => {
      // zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
      let responsePlayerBO = PlayerBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responsePlayerBO);
      });
    });
  }

  //Spieler bearbeiten
  updatePlayer(playerBO) {
    return this.#fetchAdvanced(this.#PlayerURL(), {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(playerBO),
    }).then((responseJSON) => {
      // zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
      let responsePlayerBO = PlayerBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responsePlayerBO);
      });
    });
  }

  //Spieler löschen
  deletePlayer(id) {
    return this.#fetchAdvanced(this.#PlayerByIdURL(id), { method: "DELETE" });
  }

  getVisibleTrainings() {
    return this.#fetchAdvanced(this.#getVisibleTrainings()).then(
      (responseJSON) => {
        let trainingBO = TrainingBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(trainingBO);
        });
      }
    );
  }

  getArchivedTrainings() {
    return this.#fetchAdvanced(this.#getArchivedTrainings()).then(
      (responseJSON) => {
        let trainingBO = TrainingBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(trainingBO);
        });
      }
    );
  }

  deleteTrainingday(id) {
    return this.#fetchAdvanced(this.#TrainingdayByIdURL(id), {
      method: "DELETE",
    });
  }

  updateTrainingday(trainingdayBO) {
    return this.#fetchAdvanced(this.#TrainingdayURL(), {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(trainingdayBO),
    }).then((responseJSON) => {
      // zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
      let responseTrainingdayBO = TrainingdayBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseTrainingdayBO);
      });
    });
  }

  getTeamByName(name) {
    return this.#fetchAdvanced(this.#TeamByNameURL(name)).then(
      (responseJSON) => {
        let teamBO = TeamBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(teamBO);
        });
      }
    );
  }

  getTrainingdaysByTeamID(id) {
    return this.#fetchAdvanced(this.#TrainingdayByIdURL(id)).then(
      (responseJSON) => {
        let trainingdayBOs = TrainingdayBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(trainingdayBOs);
        });
      }
    );
  }

  getPlayersByTeam(teamId) {
    return this.#fetchAdvanced(this.#getPlayersByTeamURL(teamId), {
      method: "GET",
    }).then((responseJSON) => {
      let playerBOs = PlayerBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(playerBOs);
      });
    });
  }

  //update PlayerPosition
  updatePlayerPositions(positionBO) {
    return this.#fetchAdvanced(this.#updateMatchfieldPlayerByIdURL(), {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(positionBO),
    }).then((responseJSON) => {
      // zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
      let responsePositionBO = PositionBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responsePositionBO);
      });
    });
  }
  //Delete PlayerPosition
  deletePlayerPositions(positionBO) {
    return this.#fetchAdvanced(this.#deletePlayerPositionsURL(), {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(positionBO),
    }).then((responseJSON) => {
      // zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
      let responsePositionBO = PositionBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responsePositionBO);
      });
    });
  }

  // get all players for a Team
  getPlayerByTeam(tID) {
    return this.#fetchAdvanced(this.#getPlayersByTeamURL(tID), {
      method: "GET",
    }).then((responseJSON) => {
      let playerBOs = PlayerBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(playerBOs);
      });
    });
  }

  getExercisesByTraining(id) {
    return this.#fetchAdvanced(this.#getExercisesByTrainingURL(id)).then(
      (responseJSON) => {
        let exerciseBOs = ExerciseBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(exerciseBOs);
        });
      }
    );
  }

  addTraining(trainingBO) {
    return this.#fetchAdvanced(this.#addTrainingURL(), {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(trainingBO),
    }).then((responseJSON) => {
      // zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
      let responseTrainingBO = TeamBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseTrainingBO);
      });
    });
  }
}
