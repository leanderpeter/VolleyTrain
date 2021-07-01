# Die WahlfachApp basiert auf Flask
from flask import Flask
# Die Flask Erweiterung Flask CORS wird für Cross-Origin Resource Sharing verwendet
from flask_cors import CORS
# Des Weiteren wird das auf Flask aufbauende Flask-RestX verwendet
from flask_restx import Api, Resource, fields
from flask import request
from server.bo.matchfieldPlayerBO import MatchfieldPlayerBO

# application logic import and business objects
from server.volleytrainAdministration import volleytrainAdministration

from server.bo.teamBO import Team
from server.bo.trainingdayBO import Trainingday
from server.bo.userBO import User
from server.bo.TrainingBO import Training
from server.bo.ExerciseBO import Exercise
from server.bo.playerBO import Player

# SecurityDecorator
from SecurityDecorator import secured


class NullableInteger(fields.Integer):
    """Diese Klasse ermöglicht die Umsetzung eines Integers, welcher auch den Wert null bzw. None haben kann 
    """
    __schema_type__ = ['integer', 'null']
    __schema_example__ = 'nullable integer'


"""Instancing our flask app"""
app = Flask(__name__)

CORS(app, support_credentials=True, resources={
     r'/volleyTrain/*': {"origins": "*"}})

api = Api(app, version='1.0', title='volleytrain API',
          description='Web App for creating trainings for volleyball')

"""Namespaces"""
volleyTrain = api.namespace(
    'volleyTrain', description='Functions of volleyTrain')

"""Hier wird definiert, wie die Businessobjects beim Marshelling definiert 
werden sollen"""
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='ID des BOs'),
    'creation_date': fields.DateTime(attribute='_creation_date', description='Erstellungszeitpunkt')
})

nbo = api.inherit('NamedBusinessObject', bo, {
    'name': fields.String(attribute='_name', description='Name des BOs'),
})

user = api.inherit('user', nbo, {
    'surname': fields.String(attribute='_surname', description='Surname of user'),
    'email': fields.String(attribute='_email', description='Email der Person'),
    'googleUserId': fields.String(attribute='_googleUserId', description='Google user ID der Person'),
})

player = api.inherit('nbo', nbo, {
    'surname': fields.String(attribute='_surname', description='Surname of Player'),
    'teamid': fields.Integer(attribute='_teamid', description='Team ID of Player'),
    'role': fields.String(attribute='_role', description='Role of Player'),
    't_number': fields.Integer(attribute='_t_number', description='t_number of PLayer')
})
training = api.inherit('training', nbo, {
    'datetime': fields.String(attribute='_datetime', description='Datum und Zeitpunkt des Trainings'),
    'goal': fields.String(attribute='_goal', description='Ziel des Trainings'),
    'team_id': fields.Integer(attribute='teamId', description='ID des beteiligten Team'),
    'user_id': fields.Integer(attribute='userId', description='ID des User/Trainer'),
    'visibility': fields.Boolean(attribute='_visibility', description='Sichtbarkeit für archivierte und aktuelle Trainings')
})

team = api.inherit('team', nbo, {
    'trainer': fields.Integer(attribute='_trainer', deschription='id of user as trainer'),
})

trainingday = api.inherit('trainingday', bo, {
    'weekday': fields.String(attribute='_weekday', description='weekday of training'),
    'starttime': fields.String(attribute='_starttime', description='starttime of training'),
    'endtime': fields.String(attribute='_endtime', description='endtime of training'),
    'team': fields.Integer(attribute='_team', description='team of trainingday')
})
exercise = api.inherit('exercise', nbo, {
    'notes': fields.String(attribute='_notes', description='notes of exercise'),
    'duration': fields.Integer(attribute='_duration', description='Duration of exercise'),
    'training': fields.Integer(attribute='_training', description='training of exercise'),
    'goal': fields.String(attribute='_goal', description='goal of exercise'),
    'description': fields.String(attribute='_description', description='description of exercise'),
    'rating': fields.Integer(attribute='_rating', description='Rating of exercise'),
})


matchfieldPlayers = api.inherit('matchfieldPlayers', {
    '_matchfield_pk': fields.Integer(attribute='_matchfield_pk', description='_matchfield_pk'),
    '_player_pk': fields.Integer(attribute='_player_pk', description='_player_pk'),
    'top': fields.String(attribute='_y', description='X Postion'),
    'left': fields.String(attribute='_x', description='Y Postion'),
})


""" UserOperations """


@volleyTrain.route('/user/<int:id>')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class UserByIDOperation(Resource):
    @secured
    @volleyTrain.marshal_list_with(user)
    def get(self, id):
        adm = volleytrainAdministration()
        user = adm.getUserById(id)
        return user


@volleyTrain.route('/user')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class UserOperation(Resource):
    @secured
    @volleyTrain.marshal_with(user)
    @volleyTrain.expect(user)
    def put(self):
        """Please provide a user object to transfer it into 
        the database
        """

        adm = volleytrainAdministration()
        # print(api.payload)
        userId = request.args.get("id")
        name = request.args.get("name")
        name = request.args.get("surname")
        email = request.args.get("email")
        adm.createUser(api.payload)
        return user

# Player API


@volleyTrain.route("/playerss")
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PlayerOperations(Resource):
    @volleyTrain.marshal_list_with(player, code=200)
    @volleyTrain.expect(player)
    # @secured
    def post(self):
        """Create Player"""
        adm = volleytrainAdministration()
        player = Player.from_dict(api.payload)
        if player is not None:
            c = adm.createPlayer(player.get_surname(), player.get_name(), player.get_teamid(),
                                 player.get_role(), player.get_t_number())
            return c, 200
        else:
            return '', 500

@volleyTrain.route("/player/<int:id>")
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@volleyTrain.param('id', 'Die ID des Player-Objekts')
class PlayerOperations(Resource):
    @volleyTrain.marshal_list_with(player)
    #@secured
    def get(self, id):
        """Player by ID"""
        adm = volleytrainAdministration()
        player = adm.getPlayerById(id)
        return player

    @volleyTrain.marshal_with(player)
    @volleyTrain.expect(player)
    def put(self):
        """Please provide a user object to transfer it into
        the database
        """

        adm = volleytrainAdministration()
        # print(api.payload)
        playerId = request.args.get("id")
        name = request.args.get("name")
        name = request.args.get("surname")
        ieamid = request.args.get("teamid")
        role = request.args.get("role")
        t_number = request.args.get("t_number")
        adm.createPlayer(api.payload)
        return player

    @volleyTrain.marshal_with(player)
    #@secured
    def delete(self):
        """Delte Player"""
        adm = volleytrainAdministration()
        adm.deletePlayer(player)
#        player = adm.getPlayerById(id)

#        if player is not None:
#            adm.deletePlayer(player)
#            return 'Successfully deleted', 200
#        else:
#            return 'Deleting failed', 500

"""All PLayer API"""

@volleyTrain.route('/players')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PlayerOperation(Resource):
    # @secured
    @volleyTrain.marshal_list_with(player)
    def get(self):
        """Get all Player"""
        adm = volleytrainAdministration()
        players = adm.getAllPlayer()
        return players

    # @secured
    def delete(self, id):
        """Delete Player"""
        adm = volleytrainAdministration()
        player = adm.getPlayerById(id)
        if player is None:
            return 'Player konnte nicht gelöscht werden', 500
        else:
            adm.deletePlayer(player)
            return 'Player wurde erfolgreich aus der DB gelöscht', 200

    @volleyTrain.expect(player)
    # @secured
    def put(self):
        """Change Player Data"""
        adm = volleytrainAdministration()
        player = Player.from_dict(api.payload)

        if player is None:
            return "Player konnte nicht geändert werden", 500

        else:
            adm.savePlayer(player)
            return "Player wurde erfolgreich geändert", 200


@volleyTrain.route('/players/<int:team_id>')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PlayerOperation(Resource):
    # @secured
    @volleyTrain.marshal_list_with(player)
    def get(self, team_id):
        """Get all Player"""
        adm = volleytrainAdministration()
        players = adm.getPlayerByTeamId(team_id)
        return players


@volleyTrain.route('/userbygoogle/<string:id>')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class UserByIDOperation(Resource):
    @secured
    @volleyTrain.marshal_list_with(user)
    def get(self, id):
        adm = volleytrainAdministration()
        user = adm.getPersonByGoogleUserId(id)
        return user


""" TrainingOperations """


@volleyTrain.route('/trainings')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TrainingListOperations(Resource):
    @volleyTrain.marshal_list_with(training)
    @secured
    def get(self):
        adm = volleytrainAdministration()
        trainings = adm.get_all_trainings()
        return trainings

    @volleyTrain.marshal_with(training, code=200)
    @volleyTrain.expect(training)
    @secured
    def post(self):
        adm = volleytrainAdministration()
        proposal = Training.from_dict(api.payload)
        print(api.payload)

        if proposal is not None:
            training = adm.create_training(proposal)
            return training, 200
        else:
            return '', 500


@volleyTrain.route('/visible_trainings')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class VisibleTrainingListOperations(Resource):
    @volleyTrain.marshal_list_with(training)
    @secured
    def get(self):
        adm = volleytrainAdministration()
        trainings = adm.get_visible_trainings()
        return trainings


@volleyTrain.route('/archived_trainings')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ArchivedTrainingListOperations(Resource):
    @volleyTrain.marshal_list_with(training)
    @secured
    def get(self):
        adm = volleytrainAdministration()
        trainings = adm.get_archived_trainings()
        return trainings


@volleyTrain.route('/training')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TrainingOperations(Resource):
    @volleyTrain.marshal_with(training)
    @volleyTrain.expect(training, validate=True)
    @secured
    def put(self):
        adm = volleytrainAdministration()
        training = Training.from_dict(api.payload)
        print(training)

        if training is not None:
            adm.save_training(training)
            return training, 200
        else:
            return '', 500


@volleyTrain.route('/training/<int:training_id>')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@volleyTrain.param('training_id', 'Dies ist die ID von Training')
class TrainingOperations(Resource):
    @volleyTrain.marshal_with(training)
    @secured
    def get(self, training_id):
        adm = volleytrainAdministration()
        training = adm.get_training_by_id(training_id)
        return training

    @volleyTrain.marshal_with(training)
    @secured
    def delete(self, training_id):
        adm = volleytrainAdministration()
        training = adm.get_training_by_id(training_id)

        if training is not None:
            adm.delete_training(training)
            return 'Successfully deleted', 200
        else:
            return 'Deleting failed', 500


@volleyTrain.route('/team')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeamOperations(Resource):
    @secured
    @volleyTrain.marshal_list_with(team)
    def get(self):
        adm = volleytrainAdministration()
        teams = adm.get_all_teams()
        return teams

    @secured
    @volleyTrain.marshal_with(team, code=200)
    @volleyTrain.expect(team)
    def post(self):
        adm = volleytrainAdministration()
        proposal = Team.from_dict(api.payload)

        if proposal is not None:
            p = adm.create_team(proposal.get_name(), proposal.get_trainer())
            return p, 200
        else:
            return '', 500

    @volleyTrain.marshal_with(team)
    @volleyTrain.expect(team, validate=True)
    @secured
    def put(self):
        adm = volleytrainAdministration()
        team = Team.from_dict(api.payload)

        if team is not None:
            adm.save_team(team)
            return team, 200
        else:
            return '', 500


@volleyTrain.route('/team/<int:team_id>')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeamByIDOperation(Resource):
    @secured
    @volleyTrain.marshal_list_with(team)
    def get(self, team_id):
        adm = volleytrainAdministration()
        team = adm.get_team_by_id(team_id)
        return team

    @secured
    @volleyTrain.marshal_with(team)
    def delete(self, team_id):
        adm = volleytrainAdministration()
        team = adm.get_team_by_id(team_id)

        if team is not None:
            adm.delete_team(team)
            return 'Successfully deleted', 200
        else:
            return 'Deleting failed', 500


@volleyTrain.route('/team/<string:name>')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeamByIDOperation(Resource):
    @secured
    @volleyTrain.marshal_list_with(team)
    def get(self, name):
        adm = volleytrainAdministration()
        team = adm.get_team_by_name(name)
        return team


@volleyTrain.route('/trainingday')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TrainingdayOperations(Resource):
    @secured
    @volleyTrain.marshal_list_with(trainingday)
    def get(self):
        adm = volleytrainAdministration()
        trainingday = adm.get_all_trainingdays()
        return trainingday

    @secured
    @volleyTrain.marshal_with(trainingday, code=200)
    @volleyTrain.expect(trainingday)
    def post(self):
        adm = volleytrainAdministration()
        proposal = Trainingday.from_dict(api.payload)

        if proposal is not None:
            p = adm.create_trainingday(proposal.get_weekday(
            ), proposal.get_starttime(), proposal.get_endtime(), proposal.get_team())
            return p, 200
        else:
            return '', 500

    @volleyTrain.marshal_with(trainingday)
    @volleyTrain.expect(trainingday, validate=True)
    @secured
    def put(self):
        adm = volleytrainAdministration()
        trainingday = Trainingday.from_dict(api.payload)

        if trainingday is not None:
            adm.save_trainingday(trainingday)
            return trainingday, 200
        else:
            return '', 500


@volleyTrain.route('/trainingday/<int:trainingday_id>')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TrainingdayByTeamIDOperation(Resource):
    @secured
    @volleyTrain.marshal_list_with(trainingday)
    def get(self, trainingday_id):
        adm = volleytrainAdministration()
        trainingday = adm.get_trainingdays_by_team_id(trainingday_id)
        return trainingday

    @secured
    @volleyTrain.marshal_with(trainingday)
    def delete(self, trainingday_id):
        adm = volleytrainAdministration()
        trainingday = adm.get_trainingday_by_id(trainingday_id)

        if trainingday is not None:
            adm.delete_trainingday(trainingday)
            return 'Successfully deleted', 200
        else:
            return 'Deleting failed', 500


@volleyTrain.route('/exercise/<int:id>')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ExerciseByIDOperation(Resource):
    @secured
    @volleyTrain.marshal_list_with(exercise)
    def get(self, id):
        adm = volleytrainAdministration()
        exercise = adm.getExerciseById(id)
        return exercise

    @secured
    def delete(self, id):
        adm = volleytrainAdministration()
        adm.deleteExercise(id)


@volleyTrain.route('/exercise')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ExerciseOperation(Resource):
    @secured
    @volleyTrain.marshal_with(exercise)
    @volleyTrain.expect(exercise)
    def post(self):
        """Please provide a exercise object to transfer it into
        the database
        """

        adm = volleytrainAdministration()
        exercise = Exercise.from_dict(api.payload)

        if exercise is not None:
            created_exercise = adm.createExercise(exercise)
            return created_exercise, 200
        else:
            return '', 500

    @volleyTrain.marshal_list_with(exercise)
    @secured
    def get(self):
        """Auslesen aller Projektart-Objekten.
        """
        adm = volleytrainAdministration()
        exercises = adm.getAllExercises()
        return exercises

    @volleyTrain.marshal_with(exercise)
    @volleyTrain.expect(exercise)
    @secured
    def put(self):
        '''
        Update exercise
        '''
        adm = volleytrainAdministration()
        exercise = Exercise.from_dict(api.payload)

        if exercise is not None:
            response = adm.saveExercise(exercise)
            return response, 200
        else:
            return '', 500


@volleyTrain.route('/matchfieldPlayers')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class MatchfieldPlayerOperation(Resource):
    @secured
    @volleyTrain.marshal_list_with(matchfieldPlayers)
    def get(self):
        adm = volleytrainAdministration()
        matchfieldPlayers = adm.getAllMatchfieldPlayers()
        return matchfieldPlayers


@volleyTrain.route('/matchfieldPlayersById/<int:id>')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class MatchfieldPlayerOperation(Resource):
    @secured
    @volleyTrain.marshal_list_with(matchfieldPlayers)
    def get(self, id):
        adm = volleytrainAdministration()
        matchfieldPlayers = adm.getByPlayerPosByMatchfieldId(id)
        return matchfieldPlayers


@volleyTrain.route('/matchfieldPlayersById')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class MatchfieldPlayerTransformOperation(Resource):

    @volleyTrain.marshal_list_with(matchfieldPlayers)
    @volleyTrain.expect(matchfieldPlayers)
    def put(self):

        tmp = MatchfieldPlayerBO.from_dict(api.payload)
        adm = volleytrainAdministration()
        matchfieldPlayers = adm.putPlayerPosByMatchfieldId(tmp)
        return matchfieldPlayers

    @volleyTrain.marshal_list_with(matchfieldPlayers)
    def delete(self):

        tmp = MatchfieldPlayerBO.from_dict(api.payload)
        adm = volleytrainAdministration()
        matchfieldPlayers = adm.deletePlayerPosByMatchfieldId(tmp)
        return matchfieldPlayers


@volleyTrain.route('/exercise/<int:id>/training')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ExerciseTrainingOperation(Resource):

    @volleyTrain.marshal_list_with(exercise)
    def get(self, id):
        adm = volleytrainAdministration()
        exercises = adm.getExercisesByTrainingId(id)
        return exercises


""" @volleyTrain.route("/team/<int:id>/players")
class PlayerTeamOperations(Resource):

    @volleyTrain.marshal_list_with(player, code=200)
    # @secured
    def get(self, id):
        #get all Player for specific team ID
        adm = volleytrainAdministration()
        players = adm.getPlayerByTeamId(id)
        return players, 200 """


if __name__ == '__main__':
    app.run(debug=True)

"""
    @volleyTrain.marshal_with(player)
    @volleyTrain.expect(player, validate=True)
    #@secured
    def put(self, id):
#        Player Update
        adm = volleytrainAdministration()
        player = adm.getPlayerById(api.payload)
        print(player)

        if player is not None:
            adm.savePlayer(player)
            return player, 200
        else:
            return '', 500
"""