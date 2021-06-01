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
from server.bo.userBO import User

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
})

nbo = api.inherit('NamedBusinessObject', bo, {
    'name': fields.String(attribute='_name', description='Name des BOs'),
})

user = api.inherit('user', nbo, {
    'surname': fields.String(attribute='_surname', description='Surname of user'),
    'email': fields.String(attribute='_email', description='Email der Person'),
    'googleUserId': fields.String(attribute='_googleUserId', description='Google user ID der Person'),
})
team = api.inherit('team', nbo, {
    'trainingsday': fields.Integer(attribute='_trainingsday', deschription='fk of trainingdays with timestamps for team'),
    'add_day_one': fields.Integer(attribute='_add_day_one', deschription='fk of trainingdays with timestamps for team'),
    'add_day_two': fields.Integer(attribute='_add_day_two', deschription='fk of trainingdays with timestamps for team'),
    'add_day_three': fields.Integer(attribute='_add_day_three', deschription='fk of trainingdays with timestamps for team'),
})

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

@volleyTrain.route('/userbygoogle/<string:id>')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class UserByIDOperation(Resource):
    @secured
    @volleyTrain.marshal_list_with(user)
    def get(self, id):
        adm = volleytrainAdministration()
        user = adm.getPersonByGoogleUserId(id)
        return user


@volleyTrain.route('/team')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeamOperations(Resource):
    #@secured
    @volleyTrain.marshal_list_with(team)
    def get(self):
        adm = volleytrainAdministration()
        teams = adm.getAllTeams()
        return teams

    #@secured
    @volleyTrain.expect(team)
    def post(self):
        adm = volleytrainAdministration()
        proposal = Team.from_dict(api.payload)

        if proposal is not None:
            p = adm.createTeam(proposal.getId(), proposal.getName(), proposal.getTrainingsday(), proposal.getAddDayOne(), proposal.getAddDayTwo(), proposal.getAddDayThree())
            return p, 200
        else:
            return '', 500

    #@secured
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


if __name__ == '__main__':
    app.run(debug=True)
