import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import {Grid, makeStyles} from '@material-ui/core';


const style = {
    position: 'absolute',
    cursor: 'move',
};

export const Box = ({ id, left, top,  children, }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { id, left, top },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [id, left, top]);
    if (isDragging) {
        return <div ref={drag}/>;
    }
    /** 
    return (<div ref={drag} style={{ ...style, left, top }} role="Box">
			{children}
		</div>);
    */
    return (
        <div ref={drag} style={{ ...style, left, top }} role="Box">
            <Avatar>{children}</Avatar>
        </div>
    )
};
