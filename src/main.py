# Die WahlfachApp basiert auf Flask
from flask import Flask
# Die Flask Erweiterung Flask CORS wird für Cross-Origin Resource Sharing verwendet
from flask_cors import CORS
# Des Weiteren wird das auf Flask aufbauende Flask-RestX verwendet
from flask_restx import Api, Resource, fields
from flask import request

# application logic import and business objects
from server.volleytrainAdministration import volleytrainAdministration
from server.bo.userBO import User
from server.bo.TrainingBO import Training

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

training = api.inherit('training', nbo, {
    'goal': fields.String(attribute='_goal', description='Ziel des Trainings'),
    'teamId': fields.Integer(attribute='_team_id', description='ID des beteiligten Team'),
    'userId': fields.Integer(attribute='_user_id', description='ID des Users/Trainers')
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

@volleyTrain.route('/trainings')
@volleyTrain.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TrainingListOperations(Resource):
    @volleyTrain.marshal_list_with(training)
    @secured
    def get(self):
        adm = volleytrainAdministration()
        trainings = adm.getAllTrainings()
        return trainings

if __name__ == '__main__':
    app.run(debug=True)
