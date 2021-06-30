# Die WahlfachApp basiert auf Flask
from flask import Flask
# Die Flask Erweiterung Flask CORS wird für Cross-Origin Resource Sharing verwendet
from flask_cors import CORS
# Des Weiteren wird das auf Flask aufbauende Flask-RestX verwendet
from flask_restx import Api, Resource, fields
from flask import request

# application logic import and business objects
from server.volleytrainAdministration import volleytrainAdministration

from server.bo.teamBO import Team
from server.bo.trainingdayBO import Trainingday
from server.bo.userBO import User
from server.bo.playerBO import Player
from server.bo.TrainingBO import Training
from server.bo.ExerciseBO import Exercise

#SecurityDecorator
from SecurityDecorator import secured

class NullableInteger(fields.Integer):
    """Diese Klasse ermöglicht die Umsetzung eines Integers, welcher auch den Wert null bzw. None haben kann 
    """
    __schema_type__ = ['integer', 'null']
    __schema_example__ = 'nullable integer'

"""Instancing our flask app"""
app = Flask(__name__)

CORS(app, support_credentials=True, resources={r'/volleyTrain/*': {"origins": "*"}})

api = Api(app, version='1.0', title='volleytrain API',
          description='Web App for creating trainings for volleyball')

"""Namespaces"""
volleyTrain = api.namespace('volleyTrain', description='Functions of volleyTrain') 

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
    'teamId': fields.String(attribute='_teamId', description='Team ID of Player'),
    'role': fields.String(attribute='_role', description='Role of Player'),
    't_number': fields.Integer(attribute='_t_number', description='t_number of PLayer')
})
training = api.inherit('training', nbo, {
    'goal': fields.String(attribute='_goal', description='Ziel des Trainings'),
    'team_id': fields.Integer(attribute='_team_id', description='ID des beteiligten Team'),
    'user_id': fields.Integer(attribute='_user_id', description='ID des User/Trainer')
})
 
team = api.inherit('team', nbo, {
    'trainingsday': fields.Integer(attribute='_trainingsday', deschription='fk of trainingdays with timestamps for team'),
    'addDayOne': fields.Integer(attribute='_addDayOne', deschription='fk of trainingdays with timestamps for team'),
    'addDayTwo': fields.Integer(attribute='_addDayTwo', deschription='fk of trainingdays with timestamps for team'),
    'addDayThree': fields.Integer(attribute='_addDayThree', deschription='fk of trainingdays with timestamps for team'),
})

trainingday = api.inherit('trainingday', bo, {
    'weekday': fields.String(attribute='_weekday', description='weekday of training'),
    'starttime': fields.String(attribute='_starttime', description='starttime of training'),
    'endtime': fields.String(attribute='_endtime', description='endtime of training'),
})
exercise = api.inherit('exercise', nbo, {
    'notes': fields.String(attribute='_notes', description='notes of exercise'),
    'duration': fields.Integer(attribute='_duration', description='Duration of exercise'),
    'training': fields.Integer(attribute='_training', description='training of exercise'),
    'goal': fields.String(attribute='_goal', description='goal of exercise'),
    'description': fields.String(attribute='_description', description='description of exercise'),
})

position = api.inherit('position', bo, {
    'top': fields.String(attribute='_x', description='X Postion'),
    'left': fields.String(attribute='_y', description='Y Postion'),
})

matchfieldPlayers = api.inherit('matchfieldPlayers', {
    '_matchfield_pk': fields.Integer(attribute='_matchfield_pk', description='_matchfield_pk'),
    '_player_pk': fields.Integer(attribute='_player_pk', description='_player_pk'),
    'top': fields.String(attribute='_x', description='X Postion'),
    'left': fields.String(attribute='_y', description='Y Postion'),
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
    #@secured
    def post(self):
        """Create Player"""
        adm = volleytrainAdministration()
        player = Player.from_dict(api.payload)
        if player is not None:
            c = adm.createPlayer(player.getSurname(), player.getName(), player.getTeamId(),
                                 player.getRole(), player.getT_number())
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
        TeamId = request.args.get("teamId")
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

#User API by GoogleID

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
        trainings = adm.getAllTrainings()
        return trainings

    @volleyTrain.marshal_with(training, code=200)
    @volleyTrain.expect(training) 
    @secured
    def post(self):
        adm = volleytrainAdministration()
        proposal = Training.from_dict(api.payload)
        print(api.payload)

        print(proposal)
        if proposal is not None:
            training = adm.createTraining(proposal)
            return training, 200       
        else:
            return '', 500 

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
            adm.saveTraining(training)
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
        training = adm.getTrainingById(training_id)
        return training
    
    @volleyTrain.marshal_with(training)
    @secured
    def delete(self, training_id):
        adm = volleytrainAdministration()
        training = adm.getTrainingById(training_id)

        if training is not None:
            adm.deleteTraining(training)
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
        teams = adm.getAllTeams()
        return teams

    @secured
    @volleyTrain.marshal_with(team, code=200)
    @volleyTrain.expect(team)
    def post(self):
        adm = volleytrainAdministration()
        proposal = Team.from_dict(api.payload)

        if proposal is not None:
            p = adm.createTeam(proposal.getName(), proposal.getTrainingsday(), proposal.getAddDayOne(), proposal.getAddDayTwo(), proposal.getAddDayThree())
            return p, 200
        else:
            return '', 500

    @secured
    def delete(self):
        adm = volleytrainAdministration()
        adm.deleteTeam(team)

    
@volleyTrain.route('/team/<int:id>')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeamByIDOperation(Resource):
    @secured
    @volleyTrain.marshal_list_with(team)
    def get(self, id):
        adm = volleytrainAdministration()
        team = adm.getTeamById(id)
        return team


@volleyTrain.route('/trainingday')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TrainingdayOperations(Resource):
    @secured
    @volleyTrain.marshal_list_with(trainingday)
    def get(self):
        adm = volleytrainAdministration()
        trainingday = adm.getAllTraingdays()
        return trainingday

    @secured
    @volleyTrain.marshal_with(trainingday, code=200)
    @volleyTrain.expect(trainingday)
    def post(self):
        adm = volleytrainAdministration()
        proposal = Trainingday.from_dict(api.payload)

        if proposal is not None:
            p = adm.createTrainingday(proposal.getWeekday(), proposal.getStarttime(), proposal.getEndtime())
            return p, 200
        else:
            return '', 500

    @volleyTrain.route('/trainingday/<int:id>')
    @volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
    class TrainingdayByIDOperation(Resource):
        @secured
        @volleyTrain.marshal_list_with(trainingday)
        def get(self, id):
            adm = volleytrainAdministration()
            trainingday = adm.getTrainingdayById(id)
            return trainingday

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
        print(exercise)
        
        if exercise is not None:
            created_exercise = adm.createExercise(exercise)
            return created_exercise , 200
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
    # @secured
    @volleyTrain.marshal_list_with(matchfieldPlayers)
    def get(self):
        adm = volleytrainAdministration()
        matchfieldPlayers = adm.getAllMatchfieldPlayers()
        return matchfieldPlayers

@volleyTrain.route('/matchfieldPlayersById/<int:id>')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class MatchfieldPlayerOperation(Resource):
    # @secured
    @volleyTrain.marshal_list_with(matchfieldPlayers)
    def get(self, id):
        adm = volleytrainAdministration()
        matchfieldPlayers = adm.getByPlayerPosByMatchfieldId(id)
        return matchfieldPlayers

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