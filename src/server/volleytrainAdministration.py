from server.bo.userBO import User
from server.db.userMapper import UserMapper
from server.bo.ExerciseBO import Exercise
from server.db.exerciseMapper import ExerciseMapper
from server.bo.PlayerBO import Player
from server.db.PlayerMapper import PlayerMapper


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
            return mapper.find_byp_id(id)

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
            mapper.update(exercise)

    def createPlayer(self, name, role, t_number):
        """ Create a Player object and inject it into the database
        """
        player = Player()
        player.setName(name)
        player.setRole(role)
        player.setT_number(t_number)

        with PlayerMapper() as mapper:
            return mapper.insert(player)

    def getPlayerById(self, id):
        with PlayerMapper() as mapper:
            return mapper.find_by_id(id)

    def savePlayer(self, player):
        with PlayerMapper() as mapper:
            mapper.update(player)
