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

    def setSurname(self, sname):
        self._surname = sname
    
    def getSurname(self):
        return self._surname


    def __str__(self):
        return "User: {}, {}, {}, {}".format(self.getId(),self._surname, self._name, self._teamId)

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a user object
        '''

        obj = Player()
        obj.setId(dictionary["id"])  # part of the Business object mother class
        obj.setSurname(dictionary["surname"])
        obj.setName(dictionary["name"])
        obj.setTeamId(dictionary["teamId"])
        return obj