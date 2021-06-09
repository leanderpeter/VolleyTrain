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
        self._role = None
        self._t_number = 0
    
    def setTeamId(self, teamId):
        self._teamId = teamId

    def getTeamId(self):
        return self._teamId

    def setSurname(self, sname):
        self._surname = sname
    
    def getSurname(self):
        return self._surname

    def setRole(self, role):
        self._role = role

    def getRole(self):
        return self._role

    def setT_number(self, t_number):
        self._t_number = t_number

    def getT_number(self):
        return self._t_number


    def __str__(self):
        return "User: {}, {}, {}, {}, {}, {}".format(self.getId(),self._surname, self._name, self._teamId,
                                                     self._role, self._t_number)

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a user object
        '''

        obj = Player()
        obj.setId(dictionary["id"])  # part of the Business object mother class
        obj.setSurname(dictionary["surname"])
        obj.setName(dictionary["name"])
        obj.setTeamId(dictionary["teamId"])
        obj.setRole(dictionary["role"])
        obj.setT_number(dictionary["t_number"])
        return obj