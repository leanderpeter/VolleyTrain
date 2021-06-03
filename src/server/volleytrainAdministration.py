
from .bo.userBO import User
from .bo.teamBO import Team

from .db.userMapper import UserMapper
from .db.teamMapper import TeamMapper


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


    def createTeam(self, id, name, trainingsday, addDayOne, addDayTwo, addDayThree):
        
        team = Team()
        team.setId(id)
        team.setName(name)
        team.setTrainingsday(trainingsday)
        team.setAddDayOne(addDayOne)
        team.setAddDayTwo(addDayTwo)
        team.setAddDayThree(addDayThree)
        
        with TeamMapper() as mapper:
            return mapper.insert(team)

    def getAllTeams(self):
        with TeamMapper() as mapper:
            return mapper.find_all()

    def getTeamById(self, id):
        with TeamMapper() as mapper:
            return mapper.find_by_id(id)

    def deleteTeam(self, team):
        with TeamMapper() as mapper:
            return mapper.delete(team)

    def saveTeam(self, team):
        with TeamMapper() as mapper:
            return mapper.update(team)

