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
        return f'{self._matchfield_pk}, {self._player_pk}'

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a MatchfieldPlayerBO object
        '''

        obj = MatchfieldPlayerBO()
        obj.setMatchfieldPK(dictionary["_matchfield_pk"])
        obj.setPlayerPK(dictionary["_player_pk"])
        obj.setXPosition(dictionary["left"])
        obj.setYPosition(dictionary["top"])
        return obj
