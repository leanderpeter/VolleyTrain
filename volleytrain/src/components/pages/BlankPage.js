import React, {Component} from 'react';
import CreateExercise from '../dialogs/CreateExercise';

const BlankPage = () => {

    const PlayerMock = [
        {surname: "Max",teamId: "1",name: "BB",id: 1, creation_date: "2021-06-16T12:25:23.901053"},
        {surname: "Clara",teamId: "1",name: "AA",id: 2, creation_date: "2021-06-16T12:25:23.901053"},
        {surname: "Jurgen",teamId: "1",name: "CC",id: 3, creation_date: "2021-06-16T12:25:23.901053"},
        {surname: "Gundrud",teamId: "1",name: "DD",id: 4, creation_date: "2021-06-16T12:25:23.901053"},
    ]

    return (
        <div>
            <CreateExercise Players={PlayerMock}/>
        </div>
    )
}

export default BlankPage;