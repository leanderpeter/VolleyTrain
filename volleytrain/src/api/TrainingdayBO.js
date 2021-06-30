import BusinessObject from "./BusinessObject";

export default class TrainingdayBO extends BusinessObject{

    constructor(aWeekday, aStarttime, aEndtime, aTeam){
        super()
        this.weekday = aWeekday;
        this.starttime = aStarttime;
        this.endtime = aEndtime;
        this.team = aTeam;
    }

    setWeekday(aDay) {
        this.weekday = aDay;
    }

    getWeekday() {
        return this.weekday;
    }

    setStarttime(aTime) {
        this.starttime = aTime;
    }

    getStarttime() {
        return this.starttime;
    }

    setEndtime(aTime) {
        this.endtime = aTime;
    }

    getEndtime() {
        return this.endtime;
    }

    setTeam(aTeam) {
        this.team = aTeam
    }

    getTeam() {
        return this.team
    }

     /** 
   * Returns an Array of TrainingdayBOs from a given JSON structure
   */
    static fromJSON(trainingdays) {
		let results = null;
		if (Array.isArray(trainingdays)) {
			results = [];
			trainingdays.forEach((c) => {
				Object.setPrototypeOf(c, TrainingdayBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = trainingdays;
			Object.setPrototypeOf(c, TrainingdayBO.prototype);
			results = c;
		}
		return results;
	}
}