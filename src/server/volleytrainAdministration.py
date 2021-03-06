
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

    def create_user(self, surname, name, email, googleId):
        """ Create a person object and inject it into the database
        """
        user = User()
        user.setSurname(surname)
        user.set_name(name)
        user.setEmail(email)
        user.setGoogleUserId(googleId)

        with UserMapper() as mapper:
            return mapper.insert(user)

    def get_user_by_id(self, id):
        with UserMapper() as mapper:
            return mapper.find_by_id(id)

    def get_person_by_google_user_id(self, google_id):
        with UserMapper() as mapper:
            return mapper.find_by_google_user_id(google_id)

    def save_user(self, user):
        with UserMapper() as mapper:
            return mapper.update(user)

# Player Methods

    def create_player(self, surname, name, teamid, role, t_number):
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

    def get_all_player(self):
        with PlayerMapper() as mapper:
            return mapper.find_all()

    def get_player_by_id(self, id):
        with PlayerMapper() as mapper:
            return mapper.find_by_id(id)

    def get_player_by_team_id(self, teamid):
        with PlayerMapper() as mapper:
            return mapper.find_by_teamid(teamid)

    def save_player(self, player):
        with PlayerMapper() as mapper:
            mapper.update(player)

    def delete_player(self, player):
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

    def create_training(self, training):
        with TrainingMapper() as mapper:
            return mapper.insert(training)

    def get_all_trainings(self):
        with TrainingMapper() as mapper:
            return mapper.find_all()

    def get_visible_trainings(self):
        with TrainingMapper() as mapper:
            return mapper.find_visible_trainings()

    def get_archived_trainings(self):
        with TrainingMapper() as mapper:
            return mapper.find_archived_trainings()

    def get_training_by_id(self, id):
        with TrainingMapper() as mapper:
            return mapper.find_by_id(id)

    def save_training(self, training):
        with TrainingMapper() as mapper:
            return mapper.update(training)

    def delete_training(self, training):
        with TrainingMapper() as mapper:
            return mapper.delete(training)

    """ Team """

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

    def get_trainingday_by_id(self, id):
        with TrainingdayMapper() as mapper:
            return mapper.find_by_id(id)

    def save_trainingday(self, trainingday):
        with TrainingdayMapper() as mapper:
            mapper.update(trainingday)

    def delete_trainingday(self, trainingday):
        with TrainingdayMapper() as mapper:
            mapper.delete(trainingday)

    def create_exercise(self, exercise):
        """ Create a Exercise object and inject it into the database """

        with ExerciseMapper() as mapper:
            return mapper.insert(exercise)

    def get_exercise_by_id(self, id):
        with ExerciseMapper() as mapper:
            return mapper.find_by_id(id)

    def save_exercise(self, exercise):
        with ExerciseMapper() as mapper:
            return mapper.update(exercise)

    def get_all_exercises(self):
        with ExerciseMapper() as mapper:
            return mapper.find_all()

    def delete_exercise(self, exercise_id):
        with ExerciseMapper() as mapper:
            return mapper.delete(exercise_id)
            
    def getExercisesByTrainingId(self, id):
        with ExerciseMapper() as mapper:
            return mapper.get_by_training_id(id)
