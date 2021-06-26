import NamedBusinessObject from './NamedBusinessObject';


export default class PlayerBO extends NamedBusinessObject{

	constructor(asurname, ateamId){
        super();
        this.surname = asurname;
        this.teamId = ateamId;
    }
    /*
	erhalte 
	*/
	getSurname(){
        return this.surname;
    }
    /*
	setze 
	*/
    setSurname(asurname){
        this.surname = asurname;
    }
    /*
	erhalte 
	*/
    getTeamId(){
        return this.teamId;
    }
    /*
	setze 
	*/
    setTeamId(ateamId){
        this.teamId = ateamId;
    }
    /** 
   * Returns an Array of PlayerBOs from a given JSON structure
   */
    static fromJSON(players) {
		let results = null;
		if (Array.isArray(players)) {
			results = [];
			players.forEach((c) => {
				Object.setPrototypeOf(c, PlayerBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = players;
			Object.setPrototypeOf(c, PlayerBO.prototype);
			results = c;
		}
		return results;
	}

}