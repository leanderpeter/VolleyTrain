import NamedBusinessObject from './NamedBusinessObject';


export default class UserBO extends NamedBusinessObject{

	constructor(aemail, agoogle_user_id, arolle){
        super();
        this.email = aemail;
        this.google_user_id = agoogle_user_id;
        this.rolle = arolle;
    }
    /*
	erhalte 
	*/
	getemail(){
        return this.email;
    }
    /*
	setze 
	*/
    setemail(aemail){
        this.email = aemail;
    }
    /*
	erhalte 
	*/
    getgoogle_user_id(){
        return this.google_user_id;
    }
    /*
	setze 
	*/
    setgoogle_user_id(agoogle_user_id){
        this.google_user_id = agoogle_user_id;
    }
    /*
	erhalte 
	*/
    getrolle(){
        return this.rolle;
    }
    /*
	setze 
	*/
    setrolle(arolle){
        this.rolle = arolle;
    }
    
    /** 
   * Returns an Array of UserBOs from a given JSON structure
   */
    static fromJSON(personen) {
		let results = null;
		if (Array.isArray(personen)) {
			results = [];
			personen.forEach((c) => {
				Object.setPrototypeOf(c, UserBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = personen;
			Object.setPrototypeOf(c, UserBO.prototype);
			results = c;
		}
		return results;
	}

}