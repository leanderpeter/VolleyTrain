import { useDrop } from "react-dnd";


function useGlobalDrop(onDrop) {
    const [, dropTarget] = useDrop({
      accept: "thing",
      drop(item, monitor) {
        const offset = monitor.getClientOffset();
        if (offset) {
          onDrop("global", offset);
        }
      }
    });
  
    return dropTarget;
  }

function GlobalBox() {
    const ref = useGlobalDrop(console.log);
    return <div ref={ref} className="GlobalBox" />;
  }

export default GlobalBox;