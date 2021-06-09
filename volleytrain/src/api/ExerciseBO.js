import NamedBusinessObject from './NamedBusinessObject';

export default class ExerciseBO extends NamedBusinessObject{

    constructor(){
    super();
    this.duration = null;
	this.training = null;
	this.description= null;
	this.notes = null;
	this.goal = null;
    }
  
    /*
	erhalte
	*/
	getDuration(){
        return this.duration;
    }
    /*
	setze
	*/
    setDuration(aduration){
        this.duration = aduration;
    }
	  /*
	erhalte
	*/
	getTraining(){
        return this.training;
    }
    /*
	setze
	*/
    setTraining(training){
        this.training = training;
    }

	  /*
	erhalte
	*/
	getDescription(){
        return this.description;
    }
    /*
	setze
	*/
    setDescription(description){
        this.description = description;
    }
	  /*
	erhalte
	*/
	getNotes(){
        return this.notes;
    }
    /*
	setze
	*/
    setNotes(notes){
        this.notes = notes;
    }
	  /*
	erhalte
	*/
	getGoal(){
        return this.goal;
    }
    /*
	setze
	*/
    setGoal(goal){
        this.goal = goal;
    }

   /**
   * Returns an Array of ExerciseBOs from a given JSON structure
   */
    static fromJSON(exercise) {
		let results = null;
		if (Array.isArray(exercise)) {
			results = [];
			exercise.forEach((c) => {
				Object.setPrototypeOf(c, ExerciseBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = exercise;
			Object.setPrototypeOf(c, ExerciseBO.prototype);
			results = c;
		}
		return results;
	}
}