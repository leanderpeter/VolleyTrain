

export function PositionHandler(MatchfieldPlayers, Players, dimensions) {
    var posPlayer = []
    /**
    * In this for loop we fill the array @player_key_array with all
    * the Player IDs from the MatchfieldPlayers (Position Object)
    * to later determine if a player already has a position object
    */
    var player_key_array = []
    var s;
    for (s=0; s < MatchfieldPlayers.length; s++){
        player_key_array.push(MatchfieldPlayers[s]._player_pk)
    }

    /**
     * In this 2 for loops we first iterate over all @Players
     * In the nested loop we iterate over @MatchfieldPlayers and check 
     * if theres a Position in @MatchfieldPlayers for @Players.
     * if so we create a PlayerXPosition Object
     * if not we create a PlayerXPosition Object with random positions
     */

    var i;
    for (i=0; i < Players.length; i++){
        var j;
        for (j=0; j < MatchfieldPlayers.length; j++){
            if (Players[i].id == MatchfieldPlayers[j]._player_pk){
                //"Here we concat given players with given positions"
                // create a player object with matchfield positions and push it into the player array
                //console.log(MatchfieldPlayers[j].top)
                const obj = {
                    id:Players[i].id,
                    surname:Players[i].surname,
                    name:Players[i].name,
                    team:Players[i].team,
                    top:parseFloat(MatchfieldPlayers[j].top)*dimensions.height,
                    left:parseFloat(MatchfieldPlayers[j].left)*dimensions.width,
                    visible:false,
                }
                //console.log(obj)
                posPlayer.push(obj)
            } else if (!(player_key_array.includes(Players[i].id))){
                //"Here we check if theres a Player id without a position"
                // create a player object with random positions and push it into the player array
                const obj = {
                    id:Players[i].id,
                    surname:Players[i].surname,
                    name:Players[i].name,
                    team:Players[i].team,
                    top:null,
                    left:null,
                    visible:true,
                }
                
                // add the playerId to the player_key_array
                player_key_array.push(Players[i].id)
                posPlayer.push(obj)
            }
        }
    }

    return posPlayer
}