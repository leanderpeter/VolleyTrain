import BusinessObject from "./BusinessObject";

/*
Basisklasse fuer alle BO's welche einen Namen besitzen
*/

export default class NamedBusinessObject extends BusinessObject{

	constructor(aName){
        super();
        this.name = aName;
    }
    
	/*
	Erhalte Namen
	*/
	getName(){
		return this.name;
	}
	/*
	Setze Namen
	*/
	setName(aName){
		this.name = aName;  
	}
}
