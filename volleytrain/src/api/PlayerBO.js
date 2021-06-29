import NamedBusinessObject from './NamedBusinessObject';


export default class PlayerBO extends NamedBusinessObject{

	constructor(asurname, ateamId, arole, at_number){
        super();
        this.surname = asurname;
		this.teamId = ateamId;
		this.role = arole;
		this.t_number = at_number;
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
    /*
	erhalte 
	*/
    getRole(){
        return this.role;
    }
    /*
	setze 
	*/
    setRole(arole){
        this.role = arole;
    }
    /*
	erhalte 
	*/
    getT_number(){
        return this.t_number;
    }
    /*
	setze 
	*/
    setT_number(at_number){
        this.t_number = at_number;
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