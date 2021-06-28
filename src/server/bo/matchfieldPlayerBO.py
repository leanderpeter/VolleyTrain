from server.bo.positionBO import Position


class MatchfieldPlayerBO(Position):
    '''
    ----
    ----
    '''

    def __init__(self):
        super().__init__()
        self._matchfield_pk = None
        self._player_pk = None
    
    def getMatchfieldPK(self):
        return self._matchfield_pk

    def getPlayerPK(self):
        return self._player_pk

    def setMatchfieldPK(self, pk):
        self._matchfield_pk = pk

    def setPlayerPK(self, pk):
        self._player_pk = pk


    def __str__(self):
        pass

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a MatchfieldPlayerBO object
        '''

        obj = MatchfieldPlayerBO()
        obj.setMatchfieldPK(dictionary["matchfieldPK"])
        obj.setPlayerPK(dictionary["playerPK"])
        obj.setXPosition(dictionary["x"])
        obj.setYPosition(dictionary["y"])
        return obj