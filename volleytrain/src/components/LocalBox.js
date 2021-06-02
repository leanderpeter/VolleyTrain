import React, { useRef } from "react";
import { useDrop } from "react-dnd";


function useLocalDrop(onDrop) {
    const ref = useRef();
  
    const [, dropTarget] = useDrop({
      accept: "thing",
      drop(item, monitor) {
        const offset = monitor.getSourceClientOffset();
        if (offset && ref.current) {
          const dropTargetXy = ref.current.getBoundingClientRect();
          onDrop("local", {
            x: offset.x - dropTargetXy.left,
            y: offset.y - dropTargetXy.top
          });
        }
      }
    });
  
    return elem => {
      ref.current = elem;
      dropTarget(ref);
    };
  }


function LocalBox() {
    const ref = useLocalDrop(console.log);
    return <div ref={ref} className="LocalBox" />;
  }

export default LocalBox;