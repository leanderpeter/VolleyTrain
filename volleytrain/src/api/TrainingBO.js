import NamedBusinessObject from './NamedBusinessObject';


export default class TrainingBO extends NamedBusinessObject{

	constructor(aGoal, aTeamId, aUserId){
        super();
        this.goal = aGoal;
        this.teamId = aTeamId;
        this.userId = aUserId;
    }
    
	getGoal(){
        return this.goal;
    }
    
    setGoal(aGoal){
        this.goal = aGoal;
    }
    
    getTeamId(){
        return this.teamId;
    }
    
    setTeamId(aTeamId){
        this.teamId = aTeamId;
    }
    
    getUserId(){
        return this.userId;
    }
    
    setUserId(aUserId){
        this.userId = aUserId;
    }
    
    static fromJSON(training) {
		let result = null;
		if (Array.isArray(training)) {
			result = [];
			training.forEach((t) => {
				Object.setPrototypeOf(t, TrainingBO.prototype);
				result.push(t);
			})
		} else {
			let t = training;
			Object.setPrototypeOf(t, TrainingBO.prototype);
			result = t;
		}
		return result;
	}
}