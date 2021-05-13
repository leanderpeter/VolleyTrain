import BusinessObject from "./BusinessObject";

/*
Basisklasse fuer alle BO's welche einen Namen besitzen
*/

export default class NamedBusinessObject extends BusinessObject{

	constructor(aname){
        super();
        this.name = aname;
    }
    
	/*
	Erhalte Namen
	*/
	getname(){
		return this.name;
	}
	/*
	Setze Namen
	*/
	setname(aname){
		this.name = aname;  
	}
}
