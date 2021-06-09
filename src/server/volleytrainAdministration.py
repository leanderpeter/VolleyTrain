
from .bo.userBO import User
from .db.userMapper import UserMapper
from .bo.playerBO import Player
from .db.playerMapper import PlayerMapper



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

# Player Methods

    def getAllPlayer(self):
        with PlayerMapper() as mapper:
            return mapper.find_all()

    def createPlayer(self, surname, name, teamId, role, t_number):
        """ Create a Player object and inject it into the database
        """
        player = Player()
        player.setSurname(surname)
        player.setName(name)
        player.setTeamId(teamId)
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