
from .bo.userBO import User
from .bo.TrainingBO import Training

from .db.userMapper import UserMapper
from .db.TrainingMapper import TrainingMapper



class volleytrainAdministration(object):

    def __init__(self):
        pass
    
    """ User / Trainer """

    def createUser(self, surname, name, email, googleId):
        """ Create a person object and inject it into the database
        """
        user = User()
        user.setSurname(surname)
        user.setName(name)
        user.setEmail(email)
        user.setGoogleUserId(googleId)

        with UserMapper() as mapper:
            return mapper.insert(user)

    def getUserById(self, id):
        with UserMapper() as mapper:
            return mapper.find_by_id(id)

    def getPersonByGoogleUserId(self, gId):
        with UserMapper() as mapper:
            return mapper.find_by_google_user_id(gId)

    def saveUser(self, user):
        with UserMapper() as mapper:
            return mapper.update(user)
    
    """ Training """

    def createTraining(self, name, team_id, user_id):
        training = Training()
        training.setName(name)
        training.setTeamId(team_id)
        training.setUserId(user_id)

    def getAllTrainings(self):
        with TrainingMapper() as mapper:
            return mapper.find_all()

    def getTrainingById(self, id):
        with TrainingMapper() as mapper:
            return mapper.find_by_id(id)