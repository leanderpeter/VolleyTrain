export function PositionHandler(MatchfieldPlayers, Players, dimensions) {
  var posPlayer = [];
  /**
   * In this for loop we fill the array @player_key_array with all
   * the Player IDs from the MatchfieldPlayers (Position Object)
   * to later determine if a player already has a position object
   */
  var player_key_array = [];
  var s;
  for (s = 0; s < MatchfieldPlayers.length; s++) {
    player_key_array.push(MatchfieldPlayers[s]._player_pk);
  }

  /**
   * In this 2 for loops we first iterate over all @Players
   * In the nested loop we iterate over @MatchfieldPlayers and check
   * if theres a Position in @MatchfieldPlayers for @Players.
   * if so we create a PlayerXPosition Object
   * if not we create a PlayerXPosition Object with random positions
   */

  if (MatchfieldPlayers.length > 0) {
    var i;
    for (i = 0; i < Players.length; i++) {
      var j;
      for (j = 0; j < MatchfieldPlayers.length; j++) {
        if (Players[i].id == MatchfieldPlayers[j]._player_pk) {
          //"Here we concat given players with given positions"
          // create a player object with matchfield positions and push it into the player array
          //console.log(MatchfieldPlayers[j].top)
          const obj = {
            id: Players[i].id,
            surname: Players[i].surname,
            name: Players[i].name,
            team: Players[i].team,
            top: parseFloat(MatchfieldPlayers[j].top) * dimensions.height,
            left: parseFloat(MatchfieldPlayers[j].left) * dimensions.width,
            visibleOnSelection: false,
          };
          //console.log(obj)
          posPlayer.push(obj);
        } else if (!player_key_array.includes(Players[i].id)) {
          //"Here we check if theres a Player id without a position"
          // create a player object with random positions and push it into the player array
          const obj = {
            id: Players[i].id,
            surname: Players[i].surname,
            name: Players[i].name,
            team: Players[i].team,
            top: Math.floor(Math.random() * dimensions.height),
            left: Math.floor(Math.random() * dimensions.width),
            visibleOnSelection: true,
          };

          // add the playerId to the player_key_array
          player_key_array.push(Players[i].id);
          posPlayer.push(obj);
        }
      }
    }
  } else if (MatchfieldPlayers.length == 0) {
    // here we end up if the Exercise is new and there are no positions from the backend
    Players.forEach((player) => {
      const obj = {
        id: player.id,
        surname: player.surname,
        name: player.name,
        team: player.team,
        top: Math.floor(Math.random() * dimensions.height),
        left: Math.floor(Math.random() * dimensions.width),
        visibleOnSelection: true,
      };
      // add the playerId to the player_key_array
      player_key_array.push(player.id);
      posPlayer.push(obj);
    });
  }
  return posPlayer;
}

export function PostPutHandler(
  MatchfieldPlayerBOs,
  posPlayers,
  dimensions,
  matchfield_pk
) {
  var posTmpDelete = [];
  var posTmpPut = [];

  // push all object in array that need to be deleted
  posPlayers.forEach((player) => {
    if (player.visibleOnSelection == true) {
      MatchfieldPlayerBOs.forEach((BO) => {
        if (BO._player_pk == player.id) {
          posTmpDelete.push(BO);
        }
      });
    }
    // push all objects in array that needs to be put
    if (player.visibleOnSelection == false) {
      var TmpLeft = (player.left / dimensions.width).toFixed(2);
      var TmpTop = (player.top / dimensions.height).toFixed(2);
      var obj = {
        left: TmpLeft,
        top: TmpTop,
        _matchfield_pk: matchfield_pk,
        _player_pk: player.id,
      };
      posTmpPut.push(obj);
    }
  });
  return [posTmpDelete, posTmpPut];
}
