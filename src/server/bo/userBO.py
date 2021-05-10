from server.bo.NamedBusinessObject import NamedBusinessObject

class User(NamedBusinessObject):
    '''person Business Object 
    person has following properties:
    email
    google user id
    ----
    '''

    def __init__(self):
        super().__init__()
        self._email = None
        self._googleUserId = None
    
    def setEmail(self, email):
        self._email = email

    def getEmail(self):
        return self._email
    
    def setGoogleUserId(self, id):
        self._googleUserId = id

    def __str__(self):
        return "User: {}, {}, {}, {}".format(self.getId(), self._name, self._email, self._googleUserId"

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a user object
        '''

        obj = User()
        obj.setId(dictionary["id"])  # part of the Business object mother class
        obj.setName(dictionary["name"])
        obj.setEmail(dictionary["email"])
        obj.setGoogleUserId(dictionary["googleUserId"])
        return obj