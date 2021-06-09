/*
Basisklasse fuer alle BO's welche eine ID besitzen
*/

export default class BusinessObject {
	/*
	Null constructor
	*/
	constructor(anID, aCreationDate){
		this.id = anID;
		this.creation_date = aCreationDate;
	}

	/*
	Jedes Business Object erhaelt eine neue ID, die aId.
	*/
	setID(anID){
		this.id = anID;
	}

	/*
	Gebe die ID vom BO zurueck
	*/
	getID(){
		return this.id;
	}

	setCreationDate(aCreationDate) {
		this.creation_date = aCreationDate;
	}

	getCreationDate() {
		return this.creation_date;
	}

	/*
	Gibt eine darstellung des BO's in Form eines String zuruck
	*/
	toString() {
		let result = '';
		for (var prop in this) {
			result += prop + ': ' +this[prop] + ' ';
		}
		return result;
	}
}