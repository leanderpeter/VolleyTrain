import NamedBusinessObject from './NamedBusinessObject';

export default class TeamBO extends NamedBusinessObject {

    constructor(aTrainer){
        super()
        this.trainer = aTrainer;
    }

    setTrainer(aTrainer) {
        this.trainer = aTrainer; 
    }

    getTrainer(){
        return this.trainer;
    }


     /** 
   * Returns an Array of TeamBOs from a given JSON structure
   */
    static fromJSON(teams) {
		let results = null;
		if (Array.isArray(teams)) {
			results = [];
			teams.forEach((c) => {
				Object.setPrototypeOf(c, TeamBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = teams;
			Object.setPrototypeOf(c, TeamBO.prototype);
			results = c;
		}
		return results;
	}
}