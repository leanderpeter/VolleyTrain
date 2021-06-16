
export default class PositionBO {

	constructor(){
        this.top = null;
        this.left = null;
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

}