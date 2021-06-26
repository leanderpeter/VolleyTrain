from server.bo.NamedBusinessObject import NamedBusinessObject


class Player(NamedBusinessObject):
    '''person Business Object 
    person has following properties:
    email
    google user id
    ----
    '''

    def __init__(self):
        super().__init__()
        self._surname = None
        self._teamId = None

    def setTeamId(self, teamId):
        self._teamId = teamId

    def getTeamId(self):
        return self._teamId

    def set_surname(self, sname):
        self._surname = sname

    def getSurname(self):
        return self._surname

    def __str__(self):
        return "User: {}, {}, {}, {}".format(self.get_id(), self._surname, self._name, self._teamId)

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a user object
        '''

        obj = Player()
        # part of the Business object mother class
        obj.set_id(dictionary["id"])
        obj.set_surname(dictionary["surname"])
        obj.set_name(dictionary["name"])
        obj.setTeamId(dictionary["teamId"])
        return obj
