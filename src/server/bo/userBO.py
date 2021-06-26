
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
        self._surname = None
        self._email = None
        self._googleUserId = None

    def setEmail(self, email):
        self._email = email

    def getEmail(self):
        return self._email

    def setGoogleUserId(self, id):
        self._googleUserId = id

    def getGoogleUserId(self):
        return self._googleUserId

    def setSurname(self, sname):
        self._surname = sname

    def getSurname(self):
        return self._surname

    def __str__(self):
        return "User: {}, {}, {}, {}, {}".format(self.get_id(), self._surname, self._name, self._email, self._googleUserId)

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a user object
        '''

        obj = User()
        # part of the Business object mother class
        obj.set_id(dictionary["id"])
        obj.setSurname(dictionary["surname"])
        obj.set_name(dictionary["name"])
        obj.setEmail(dictionary["email"])
        obj.setGoogleUserId(dictionary["googleUserId"])
        return obj
