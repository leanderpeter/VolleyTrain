from server.db.mapper import Mapper
from server.bo.TrainingBO import Training


class TrainingMapper(Mapper):
    """mapper class to insert/replace/change person object in the realtional database
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """find all training obj

        :return all training objs
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT * FROM training"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, datetime, goal, team_id, user_id, visibility) in tuples:
            training = Training()
            training.set_id(id)
            training.set_name(name)
            training.set_datetime(datetime)
            training.set_goal(goal)
            training.set_team_id(team_id)
            training.set_user_id(user_id)
            training.set_visibility(visibility)

            result.append(training)

        self._connection.commit()
        cursor.close()

        return result

    def find_visible_trainings(self):

        result = []

        cursor = self._connection.cursor()

        command = "SELECT * FROM training WHERE visibility=1"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, datetime, goal, team_id, user_id, visibility) in tuples:
            training = Training()
            training.set_id(id)
            training.set_name(name)
            training.set_datetime(datetime)
            training.set_goal(goal)
            training.set_team_id(team_id)
            training.set_user_id(user_id)
            training.set_visibility(visibility)

            result.append(training)

        self._connection.commit()
        cursor.close()

        return result

    def find_archived_trainings(self):

        result = []

        cursor = self._connection.cursor()

        command = "SELECT * FROM training WHERE visibility=0"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, datetime, goal, team_id, user_id, visibility) in tuples:
            training = Training()
            training.set_id(id)
            training.set_name(name)
            training.set_datetime(datetime)
            training.set_goal(goal)
            training.set_team_id(team_id)
            training.set_user_id(user_id)
            training.set_visibility(visibility)

            result.append(training)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self):
        pass

    def find_by_id(self, id):
        """Suchen eines Trainings nach der ??bergebenen ID. 

        :param id Prim??rschl??sselattribut eines Trainings aus der Datenbank
        :return Training-Objekt, welche mit der ID ??bereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()
        command = "SELECT * FROM training WHERE PK_Training={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            (id, name, datetime, goal, team_id,
             user_id, visibility) = tuples[0]
            training = Training()
            training.set_id(id)
            training.set_name(name)
            training.set_datetime(datetime)
            training.set_goal(goal)
            training.set_team_id(team_id)
            training.set_user_id(user_id)
            training.set_visibility(visibility)
            result = training

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
                        keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zur??ck gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, training):
        """Einf??gen eines Trainings-Objekts in die DB

        Dabei wird auch der Prim??rschl??ssel des ??bergebenen Objekts gepr??ft 

        :param training das zu speichernde training Objekt
        :return das bereits ??bergebene training Objekt mit aktualisierten Daten (id)
        """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(PK_Training) AS maxid FROM training")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, z??hlen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Trainings-Objekt zu."""
                training.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen k??nnen."""
                training.set_id(1)

        command = "INSERT INTO training (PK_Training, name, datetime, goal, Team_PK_Team, User_PK_User, visibility) VALUES (%s,%s,%s,%s,%s,%s,%s)"
        data = (training.get_id(), training.get_name(), training.get_datetime(
        ), training.get_goal(), training.get_team_id(), training.get_user_id(), training.get_visibility())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return training

    def update(self, training):
        """??berschreiben / Aktualisieren eines training-Objekts in der DB

        :param training -> training-Objekt
        :return aktualisiertes training-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE training " + \
            "SET name=%s, datetime=%s, goal=%s, Team_PK_Team=%s, User_PK_User=%s, visibility=%s WHERE PK_Training=%s"
        data = (training.get_name(), training.get_datetime(), training.get_goal(
        ), training.get_team_id(), training.get_user_id(), training.get_visibility(), training.get_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()
        return training

    def delete(self, training):
        """L??schen der Daten eines Trainings aus der Datenbank

        :param training -> training-Objekt
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM training WHERE PK_Training={}".format(
            training.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()
        return training
