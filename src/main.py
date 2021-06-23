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
from server.bo.playerBO import Player

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

player = api.inherit('nbo', nbo, {
    'surname': fields.String(attribute='_surname', description='Surname of Player'),
    'teamId': fields.String(attribute='_teamId', description='Team ID of Player'),
    'role': fields.String(attribute='_role', description='Role of Player'),
    't_number': fields.Integer(attribute='_t_number', description='t_number of PLayer')
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

# Player API

@volleyTrain.route("/playerss")
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

    #@secured
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
    #@secured
    def put(self, id):
        """Change Player Data"""
        adm = volleytrainAdministration()
        player = Player.from_dict(api.payload)

        if player is None:
            return "Player konnte nicht geändert werden", 500

        else:
            player.set_id(id)
            adm.savePlayer(player)
            return "Player wurde erfolgreich geändert", 200

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

if __name__ == '__main__':
    app.run(debug=True)
