export default class PositionBO {
  constructor() {
    this.top = null;
    this.left = null;
  }
  /*
	erhalte 
	*/
  getPos() {
    return this.top, this.left;
  }
  /*
	setze 
	*/
  setPos(ax, ay) {
    this.top = ay;
    this.left = ax;
  }

  static fromJSON(position) {
    let result = null;
    if (Array.isArray(position)) {
      result = [];
      position.forEach((t) => {
        Object.setPrototypeOf(t, PositionBO.prototype);
        result.push(t);
      });
    } else {
      let t = position;
      Object.setPrototypeOf(t, PositionBO.prototype);
      result = t;
    }
    return result;
  }
}
