import PositionBO from "./PositionBO";

export default class MatchfieldPlayerBO extends PositionBO{

	constructor(amatchfield_pk, aplayer_pk, aposition_pk){
        this.matchfield_pk = amatchfield_pk;
        this.player_pk = aplayer_pk;
        this.position_pk = aposition_pk;
    }
    /*
	erhalte 
	*/
	getMatchfield_pk(){
        return this.matchfield_pk
    }
     /*
	erhalte 
	*/
	getPlayer_pk(){
        return this.player_pk
    }
     /*
	erhalte 
	*/
	getPosition_pk(){
        return this.position_pk
    }
    /*
	setze 
	*/
    setMatchfield_pk(amatchfield_pk){
        this.matchfield_pk = amatchfield_pk;
    }
    /*
	setze 
	*/
    setPlayer_pk(aplayer_pk){
        this.player_pk = aplayer_pk;
    }
    /*
	setze 
	*/
    setPosition_pk(aposition_pk){
        this.position_pk = aposition_pk;
    }

    static fromJSON(matchfieldPlayers) {
		let results = null;
		if (Array.isArray(matchfieldPlayers)) {
			results = [];
			matchfieldPlayers.forEach((c) => {
				Object.setPrototypeOf(c, MatchfieldPlayerBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = matchfieldPlayers;
			Object.setPrototypeOf(c, MatchfieldPlayerBO.prototype);
			results = c;
		}
		return results;
	}

}