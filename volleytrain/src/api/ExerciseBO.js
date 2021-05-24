import NamedBusinessObject from './NamedBusinessObject';

export default class ExerciseBO extends NamedBusinessObject{

    constructor(atag, aduration){
    super();
    this.tag = atag;
    this.duration = aduration;
    }
    /*
	erhalte
	*/
	gettag(){
        return this.tag;
    }
    /*
	setze
	*/
    settag(atag){
        this.tag = atag;
    }
    /*
	erhalte
	*/
	getduration(){
        return this.duration;
    }
    /*
	setze
	*/
    setduration(aduration){
        this.duration = aduration;
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