import React, {Component} from 'react';
import CreateExercise from '../dialogs/CreateExercise';

const BlankPage = () => {


    const PlayerMock = [
        {surname: "Max",teamId: "1",name: "BB",id: 1, creation_date: "2021-06-16T12:25:23.901053"},
        {surname: "Clara",teamId: "1",name: "AA",id: 2, creation_date: "2021-06-16T12:25:23.901053"},
        
    ]

    return (
        <div>
            <CreateExercise Players={PlayerMock}/>
        </div>
    )
}

export default BlankPage;