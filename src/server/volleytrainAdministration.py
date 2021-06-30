
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
        user.set_name(name)
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

# Player Methods

    def createPlayer(self, surname, name, teamid, role, t_number):
        """ Create a Player object and inject it into the database
        """
        player = Player()
        player.set_surname(surname)
        player.set_name(name)
        player.set_teamid(teamid)
        player.set_role(role)
        player.set_t_number(t_number)

        with PlayerMapper() as mapper:
            return mapper.insert(player)

    def getAllPlayer(self):
        with PlayerMapper() as mapper:
            return mapper.find_all()

    def getPlayerById(self, id):
        with PlayerMapper() as mapper:
            return mapper.find_by_id(id)

    def getPlayerByTeamId(self, teamid):
        with PlayerMapper() as mapper:
            return mapper.find_by_teamid(teamid)

    def savePlayer(self, player):
        with PlayerMapper() as mapper:
            mapper.update(player)

    def deletePlayer(self, player):
        with PlayerMapper() as mapper:
            mapper.delete(player)

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

    def create_team(self, name, trainer):

        team = Team()
        team.set_name(name)
        team.set_trainer(trainer)

        with TeamMapper() as mapper:
            return mapper.insert(team)

    def get_all_teams(self):
        with TeamMapper() as mapper:
            return mapper.find_all()

    def get_team_by_id(self, id):
        with TeamMapper() as mapper:
            return mapper.find_by_id(id)

    def get_team_by_name(self, name):
        with TeamMapper() as mapper:
            return mapper.find_by_name(name)

    def delete_team(self, team):
        with TeamMapper() as mapper:
            return mapper.delete(team)

    def save_team(self, team):
        with TeamMapper() as mapper:
            return mapper.update(team)

    def create_trainingday(self, weekday, starttime, endtime, team):

        trainingday = Trainingday()
        trainingday.set_weekday(weekday)
        trainingday.set_starttime(starttime)
        trainingday.set_endtime(endtime)
        trainingday.set_team(team)

        with TrainingdayMapper() as mapper:
            return mapper.insert(trainingday)

    def get_all_trainingdays(self):
        with TrainingdayMapper() as mapper:
            return mapper.find_all()

    def get_trainingdays_by_team_id(self, id):
        with TrainingdayMapper() as mapper:
            return mapper.find_by_team_id(id)

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
