
from server.bo.TrainingBO import Training
from server.db.TrainingMapper import TrainingMapper
from server.bo.teamBO import Team
from server.bo.trainingdayBO import Trainingday
from server.db.teamMapper import TeamMapper
from server.db.trainingdayMapper import TrainingdayMapper
from server.bo.userBO import User
from server.db.userMapper import UserMapper
from server.db.exerciseMapper import ExerciseMapper
from server.bo.playerBO import Player
from server.db.playerMapper import PlayerMapper
from server.db.matchfieldPlayerMapper import MatchfieldPlayerMapper


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
            return mapper.find_byp_id(id)

    def getPersonByGoogleUserId(self, gId):
        with UserMapper() as mapper:
            return mapper.find_by_google_user_id(gId)

    def saveUser(self, user):
        with UserMapper() as mapper:
            return mapper.update(user)

    def getAllPlayer(self):
        with PlayerMapper() as mapper:
            return mapper.find_all()

    """ Training """

    def createTraining(self, training):
        with TrainingMapper() as mapper:
            return mapper.insert(training)

    def getAllTrainings(self):
        with TrainingMapper() as mapper:
            return mapper.find_all()

    def getTrainingById(self, id):
        with TrainingMapper() as mapper:
            return mapper.find_by_id(id)

    def saveTraining(self, training):
        with TrainingMapper() as mapper:
            return mapper.update(training)

    def deleteTraining(self, training):
        with TrainingMapper() as mapper:
            return mapper.delete(training)

    def createTeam(self, name, trainingsday, addDayOne, addDayTwo, addDayThree):

        team = Team()
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

    def createTrainingday(self, weekday, starttime, endtime):

        trainingday = Trainingday()
        trainingday.setWeekday(weekday)
        trainingday.setStarttime(starttime)
        trainingday.setEndtime(endtime)

        with TrainingdayMapper() as mapper:
            return mapper.insert(trainingday)

    def getAllTraingdays(self):
        with TrainingdayMapper() as mapper:
            return mapper.find_all()

    def getTrainingdayById(self, id):
        with TrainingdayMapper() as mapper:
            return mapper.find_by_id(id)

    def createExercise(self, exercise):
        """ Create a Exercise object and inject it into the database """

        with ExerciseMapper() as mapper:
            return mapper.insert(exercise)

    def getExerciseById(self, id):
        with ExerciseMapper() as mapper:
            return mapper.find_by_id(id)

    def saveExercise(self, exercise):
        with ExerciseMapper() as mapper:
            return mapper.update(exercise)

    def getAllExercises(self):
        with ExerciseMapper() as mapper:
            return mapper.find_all()

    def deleteExercise(self, exerciseId):
        with ExerciseMapper() as mapper:
            return mapper.delete(exerciseId)

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

    def getAllMatchfieldPlayers(self):
        with MatchfieldPlayerMapper() as mapper:
            return mapper.find_all()

    def getByPlayerPosByMatchfieldId(self, id):
        with MatchfieldPlayerMapper() as mapper:
            return mapper.find_by_Matchfield(id)

    def putPlayerPosByMatchfieldId(self, MatchfieldBO):
        with MatchfieldPlayerMapper() as mapper:
            return mapper.update(MatchfieldBO)

    def deletePlayerPosByMatchfieldId(self, MatchfieldPlayerBO):
        with MatchfieldPlayerMapper() as mapper:
            return mapper.delete(MatchfieldPlayerBO)
