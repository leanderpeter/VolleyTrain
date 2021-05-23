
from .bo.userBO import User
from .db.userMapper import UserMapper
from .bo.ExerciseBO import Exercise
from .db.exerciseMapper import ExerciseMapper


class volleytrainAdministration(object):
    def __init__(self):
        pass
    
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

    def createExercise(self,  name, tag, duration):
        """ Create a Exercise object and inject it into the database
        """
        exercise = Exercise()
        exercise.setName(name)
        exercise.setTag(tag)
        exercise.setDuration(duration)

        with ExerciseMapper() as mapper:
            return mapper.insert(exercise)

    def getExerciseById(self, id):
        with ExerciseMapper() as mapper:
            return mapper.find_by_id(id)

    def saveExercise(self, exercise):
        with ExerciseMapper() as mapper:
            return mapper.update(exercise)