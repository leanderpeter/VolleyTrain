
from .bo.userBO import User
from .db.userMapper import UserMapper



class volleytrainAdministration(object):
    def __init__(self):
        pass
    
    def createUser(self, api_payload):
        """ Create a person object and inject it into the database
        """
        user = User.from_dict(api_payload)

        with UserMapper() as mapper:
            return mapper.insert(user)

    def getUserById(self, id):
        with UserMapper() as mapper:
            return mapper.find_by_id(id)

    def getPersonByGoogleUserId(self, gId):
        with UserMapper() as mapper:
            return mapper.find_by_google_user_id(gId)