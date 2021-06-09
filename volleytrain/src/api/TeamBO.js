import NamedBusinessObject from './NamedBusinessObject';

export default class TeamBO extends NamedBusinessObject {

    constructor(aTrainingsday, aAddDayOne, aAddDayTwo, aAddDayThree){
        super()
        this.trainingsday = aTrainingsday;
        this.addDayOne = aAddDayOne;
        this.addDayTwo = aAddDayTwo;
        this.addDayThree = aAddDayThree;
    }

    setTrainingsday(aDay) {
        this.trainingsday = aDay; 
    }

    getTrainingsday(){
        return this.trainingsday;
    }

    setAddDayOne(aDay){
        this.addDayOne = aDay;
    }

    getAddDayOne(){
        return this.addDayOne;
    }

    setAddDayTwo(aDay){
        this.addDayTwo = aDay;
    }

    getAddDayTwo(){
        return this.addDayTwo;
    }

    setAddDayThree(aDay){
        this.addDayThree = aDay;
    }

    getAddDayThree(){
        return this.addDayThree;
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