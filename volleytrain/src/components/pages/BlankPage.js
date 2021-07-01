import React, { Component } from "react";
import CreateExercise from "../dialogs/CreateExercise";

const BlankPage = () => {
  const PlayerMock = [
    {
      surname: "Max",
      teamId: "1",
      name: "BB",
      id: 1,
      creation_date: "2021-06-16T12:25:23.901053",
    },
    {
      surname: "Clara",
      teamId: "1",
      name: "CCC",
      id: 2,
      creation_date: "2021-06-16T12:25:23.901053",
    },
    {
      surname: "mara",
      teamId: "1",
      name: "DD",
      id: 3,
      creation_date: "2021-06-16T12:25:23.901053",
    },
    {
      surname: "sophia",
      teamId: "1",
      name: "EE",
      id: 4,
      creation_date: "2021-06-16T12:25:23.901053",
    },
    {
      surname: "mille",
      teamId: "1",
      name: "FF",
      id: 5,
      creation_date: "2021-06-16T12:25:23.901053",
    },
    {
      surname: "vaness",
      teamId: "1",
      name: "SS",
      id: 6,
      creation_date: "2021-06-16T12:25:23.901053",
    },
    {
      surname: "andreas",
      teamId: "1",
      name: "RR",
      id: 7,
      creation_date: "2021-06-16T12:25:23.901053",
    },
    {
      surname: "becca",
      teamId: "1",
      name: "WW",
      id: 8,
      creation_date: "2021-06-16T12:25:23.901053",
    },
    {
      surname: "sebastian",
      teamId: "1",
      name: "MM",
      id: 9,
      creation_date: "2021-06-16T12:25:23.901053",
    },
  ];

  return (
    <div>
      <CreateExercise Players={PlayerMock} />
    </div>
  );
};

export default BlankPage;
