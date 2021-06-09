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
})

nbo = api.inherit('NamedBusinessObject', bo, {
    'name': fields.String(attribute='_name', description='Name des BOs'),
})

user = api.inherit('user', nbo, {
    'surname': fields.String(attribute='_surname', description='Surname of user'),
    'email': fields.String(attribute='_email', description='Email der Person'),
    'googleUserId': fields.String(attribute='_googleUserId', description='Google user ID der Person'),
})

exercise = api.inherit('exercise', nbo, {
    'notes': fields.String(attribute='_notes', description='notes of exercise'),
    'duration': fields.Integer(attribute='_duration', description='Duration of exercise'),
    'training': fields.Integer(attribute='_training', description='training of exercise'),
    'goal': fields.String(attribute='_goal', description='goal of exercise'),
    'description': fields.String(attribute='_description', description='description of exercise'),
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


if __name__ == '__main__':
    app.run(debug=True)
