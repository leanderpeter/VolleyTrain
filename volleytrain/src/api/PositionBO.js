import BusinessObject from './BusinessObject';


export default class PositionBO extends BusinessObject{

	constructor(ax, ay){
        super();
        this.x = ax;
        this.y = ay;
    }
    /*
	erhalte 
	*/
	getPos(){
        return (this.x, this.y)
    }
    /*
	setze 
	*/
    setPos(ax, ay){
        this.y = ay;
        this.x = ax;
    }

    static fromJSON(positions) {
		let results = null;
		if (Array.isArray(positions)) {
			results = [];
			positions.forEach((c) => {
				Object.setPrototypeOf(c, PositionBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = positions;
			Object.setPrototypeOf(c, PositionBO.prototype);
			results = c;
		}
		return results;
	}

}