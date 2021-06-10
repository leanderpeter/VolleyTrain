import BusinessObject from './BusinessObject';


export default class PositionBO extends BusinessObject{

	constructor(ax, ay){
        super();
        this.top = ax;
        this.left = ay;
    }
    /*
	erhalte 
	*/
	getPos(){
        return (this.top, this.left)
    }
    /*
	setze 
	*/
    setPos(ax, ay){
        this.top = ay;
        this.left = ax;
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