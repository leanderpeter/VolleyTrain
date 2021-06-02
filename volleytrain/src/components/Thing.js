import { useDrag } from "react-dnd";

function Thing() {
    const [, drag] = useDrag({
      item: { type: "THING" }
    });
    return (
      <div className="Thing" ref={drag}>
        wao
      </div>
    );
  }


export default Thing;
