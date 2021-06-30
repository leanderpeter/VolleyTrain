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
  #VolleytrainServerBaseURL = "/volleyTrain";

  // Lokales Python backend
  //#ElectivServerBaseURL = 'https://wahlfachapp.oa.r.appspot.com/electivApp';

  //getPerson: google_user_id
  //#getUserByGoogleIDURL = (google_user_id) => `${this.#VolleytrainServerBaseURL}/userbygoogle/${google_user_id}`;

  #VolleyTrainServerBaseURL = "/volleyTrain";

  //getPerson: google_user_id
  #getUserByGoogleIDURL = (google_user_id) =>
    `${this.#VolleyTrainServerBaseURL}/userbygoogle/${google_user_id}`;

  //Team
  #getAllTeamsURL = () => `${this.#VolleyTrainServerBaseURL}/team`;
  #addTeamURL = () => `${this.#VolleyTrainServerBaseURL}/team`;
  #getTeamByIdURL = (id) => `${this.#VolleyTrainServerBaseURL}/team/${id}`;
  #getTeamByNameURL = (name) =>
    `${this.#VolleyTrainServerBaseURL}/team/${name}`;
  #deleteTeamURL = (id) => `${this.#VolleyTrainServerBaseURL}/team/${id}`;
  #updateTeamURL = () => `${this.#VolleyTrainServerBaseURL}/team`;

  //Trainingday
  #getAllTrainingdaysURL = () =>
    `${this.#VolleyTrainServerBaseURL}/trainingday`;
  #getTrainingdayByIdURL = (id) =>
    `${this.#VolleyTrainServerBaseURL}/trainingday/${id}`;
  #getTrainingdaysByTeamIdURL = (id) =>
    `${this.#VolleyTrainServerBaseURL}/trainingday/${id}`;
  #addTrainingdayURL = () => `${this.#VolleyTrainServerBaseURL}/trainingday`;

  //getExercise: id
  #getExerciseByIDURL = (id) =>
    `${this.#VolleyTrainServerBaseURL}/exercise/${id}`;
  #deleteExerciseURL = (id) =>
    `${this.#VolleyTrainServerBaseURL}/exercise/${id}`;
  //POSTE eine neue Übung
  #addExerciseURL = () => `${this.#VolleyTrainServerBaseURL}/exercise`;
  #getExercisesURL = () => `${this.#VolleyTrainServerBaseURL}/exercise`;
  #updateExerciseURL = () => `${this.#VolleyTrainServerBaseURL}/exercise`;

  //Training
  #getAllTrainings = () => `${this.#VolleyTrainServerBaseURL}/trainings`;
  #getVisibleTrainings = () => `${this.#VolleyTrainServerBaseURL}/visible_trainings`;
  #getArchivedTrainings = () => `${this.#VolleyTrainServerBaseURL}/archived_trainings`;

  //getPlayers: all
  #getPlayersURL = () => `${this.#VolleytrainServerBaseURL}/players`;
  #addPlayerURL = () => `${this.#VolleytrainServerBaseURL}/playerss`;
  #deletePlayerURL = (id) => `${this.#VolleytrainServerBaseURL}/player/${id}`;
  #updatePlayerURL = () => `${this.#VolleytrainServerBaseURL}/player`;

  //MatchfieldPlayerBO
  #getAllMatchfieldPlayerURL = () =>
    `${this.#VolleyTrainServerBaseURL}/matchfieldPlayers`;
  #getMatchfieldPlayerByIdURL = (id) =>
    `${this.#VolleyTrainServerBaseURL}/matchfieldPlayersById/${id}`;

  //positions
  #getAllPositionsURL = () => `${this.#VolleyTrainServerBaseURL}/position`;

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
        //throw Error(`Fail`);
      }
      return res.json();
    });
  /*
	Gebe alle BO's zuruck
	*/

  //gibt die Person mit der bestimmten GoogleUserID als BO zurück
  getUserByGoogleID(google_user_id) {
    console.log(this.#getUserByGoogleIDURL(google_user_id));
    return this.#fetchAdvanced(this.#getUserByGoogleIDURL(google_user_id)).then(
      (responseJSON) => {
        let userBO = UserBO.fromJSON(responseJSON);
        console.info(userBO);
        return new Promise(function (resolve) {
          resolve(userBO);
        });
      }
    );
  }

  getPlayers() {
    return this.#fetchAdvanced(this.#getPlayersURL(), { method: "GET" }).then(
      (responseJSON) => {
        let playerBOs = PlayerBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(playerBOs);
        });
      }
    );
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

  getVisibleTrainings() {
    return this.#fetchAdvanced(this.#getVisibleTrainings()).then((responseJSON) => {
      let trainingBO = TrainingBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(trainingBO);
      });
    });
  }

  getArchivedTrainings() {
    return this.#fetchAdvanced(this.#getArchivedTrainings()).then((responseJSON) => {
      let trainingBO = TrainingBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(trainingBO);
      });
    });
  }

  //gibt die Person mit der bestimmten GoogleUserID als BO zurück
  getAllTeams() {
    return this.#fetchAdvanced(this.#getAllTeamsURL()).then((responseJSON) => {
      let teamBO = TeamBO.fromJSON(responseJSON);
      console.info(teamBO);
      return new Promise(function (resolve) {
        resolve(teamBO);
      });
    });
  }

  //gibt die Exercise mit der bestimmten ID als BO zurück
  getExerciseByID(id) {
    return this.#fetchAdvanced(this.#getExerciseByIDURL(id)).then(
      (responseJSON) => {
        let exerciseBO = ExerciseBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(exerciseBO);
        });
      }
    );
  }

  getTeamByID(id) {
    return this.#fetchAdvanced(this.#getTeamByIdURL(id)).then(
      (responseJSON) => {
        let teamBO = TeamBO.fromJSON(responseJSON);
        console.info(teamBO);
        return new Promise(function (resolve) {
          resolve(teamBO);
        });
      }
    );
  }

  addTeam(teamBO) {
    return this.#fetchAdvanced(this.#addTeamURL(), {
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
    return this.#fetchAdvanced(this.#addExerciseURL(), {
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
    return this.#fetchAdvanced(this.#updateTeamURL(), {
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
    return this.#fetchAdvanced(this.#updateExerciseURL(), {
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
  deleteTeam(id) {
    return this.#fetchAdvanced(this.#deleteTeamURL(id), { method: "DELETE" });
  }

  //gibt die Person mit der bestimmten GoogleUserID als BO zurück
  getAllTrainingdays() {
    return this.#fetchAdvanced(this.#getAllTrainingdaysURL()).then(
      (responseJSON) => {
        let trainingdayBO = TrainingdayBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(trainingdayBO);
        });
      }
    );
  }

  getExercises() {
    return this.#fetchAdvanced(this.#getExercisesURL()).then((responseJSON) => {
      let exerciseBOs = ExerciseBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(exerciseBOs);
      });
    });
  }

  getTrainingdayByID(id) {
    return this.#fetchAdvanced(this.#getTrainingdayByIdURL(id)).then(
      (responseJSON) => {
        let trainingdayBO = TrainingdayBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(trainingdayBO);
        });
      }
    );
  }

  addTrainingday(trainingdayBO) {
    return this.#fetchAdvanced(this.#addTrainingdayURL(), {
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
    return this.#fetchAdvanced(this.#deleteExerciseURL(id), {
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

  //gibt die Person mit der bestimmten GoogleUserID als BO zurück
  getUserByGoogleID(google_user_id) {
    console.log(this.#getUserByGoogleIDURL(google_user_id));
    return this.#fetchAdvanced(this.#getUserByGoogleIDURL(google_user_id)).then(
      (responseJSON) => {
        let userBO = UserBO.fromJSON(responseJSON);
        console.info(userBO);
        return new Promise(function (resolve) {
          resolve(userBO);
        });
      }
    );
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
    return this.#fetchAdvanced(this.#getAllTeamsURL()).then((responseJSON) => {
      let teamBO = TeamBO.fromJSON(responseJSON);
      console.info(teamBO);
      return new Promise(function (resolve) {
        resolve(teamBO);
      });
    });
  }

  //gibt die Exercise mit der bestimmten ID als BO zurück
  getExerciseByID(id) {
    return this.#fetchAdvanced(this.#getExerciseByIDURL(id)).then(
      (responseJSON) => {
        let exerciseBO = ExerciseBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(exerciseBO);
        });
      }
    );
  }

  getTeamByID(id) {
    return this.#fetchAdvanced(this.#getTeamByIdURL(id)).then(
      (responseJSON) => {
        let teamBO = TeamBO.fromJSON(responseJSON);
        console.info(teamBO);
        return new Promise(function (resolve) {
          resolve(teamBO);
        });
      }
    );
  }

  getTeamByName(name) {
    return this.#fetchAdvanced(this.#getTeamByNameURL(name)).then(
      (responseJSON) => {
        let teamBO = TeamBO.fromJSON(responseJSON);
        console.info(teamBO);
        return new Promise(function (resolve) {
          resolve(teamBO);
        });
      }
    );
  }

  addTeam(teamBO) {
    return this.#fetchAdvanced(this.#addTeamURL(), {
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
    return this.#fetchAdvanced(this.#addExerciseURL(), {
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
    return this.#fetchAdvanced(this.#updateTeamURL(), {
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
    return this.#fetchAdvanced(this.#updateExerciseURL(), {
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

  //Team löschen
  deleteTeam(team_id) {
    return this.#fetchAdvanced(this.#deleteTeamURL(team_id), {
      method: "DELETE",
    });
  }

  //gibt die Person mit der bestimmten GoogleUserID als BO zurück
  getAllTrainingdays() {
    return this.#fetchAdvanced(this.#getAllTrainingdaysURL()).then(
      (responseJSON) => {
        let trainingdayBO = TrainingdayBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(trainingdayBO);
        });
      }
    );
  }

  getExercises() {
    return this.#fetchAdvanced(this.#getExercisesURL()).then((responseJSON) => {
      let exerciseBOs = ExerciseBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(exerciseBOs);
      });
    });
  }

  getTrainingdaysByTeamID(id) {
    return this.#fetchAdvanced(this.#getTrainingdaysByTeamIdURL(id)).then(
      (responseJSON) => {
        let trainingdayBOs = TrainingdayBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(trainingdayBOs);
        });
      }
    );
  }

  addTrainingday(trainingdayBO) {
    return this.#fetchAdvanced(this.#addTrainingdayURL(), {
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
    return this.#fetchAdvanced(this.#deleteExerciseURL(id), {
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

  //Training
  getAllPositions() {
    return this.#fetchAdvanced(this.#getAllPositionsURL()).then(
      (responseJSON) => {
        let positionBO = PositionBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(positionBO);
        });
      }
    );
  }
  //Spieler hinzufuegen
  addPlayer(playerBO) {
    return this.#fetchAdvanced(this.#addPlayerURL(), {
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
    return this.#fetchAdvanced(this.#updatePlayerURL(), {
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
    return this.#fetchAdvanced(this.#deletePlayerURL(id), { method: "DELETE" });
  }

  getPlayers() {
    return this.#fetchAdvanced(this.#getPlayersURL(), { method: "GET" }).then(
      (responseJSON) => {
        let playerBOs = PlayerBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(playerBOs);
        });
      }
    );
  }
}
