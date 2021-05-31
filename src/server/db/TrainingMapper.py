from server.db.mapper import Mapper;
from server.bo.TrainingBO import Training;


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

        for (id, creation_date, name, goal, team_id, user_id) in tuples:
            training = Training()
            training.setId(id)
            training.setCreationDate(creation_date)
            training.setName(name)
            training.setGoal(goal)
            training.setTeamId(team_id)
            training.setUserId(user_id)

            result.append(training)

        self._connection.commit()
        cursor.close()

        return result


    def find_by_name(self):
        pass


    def find_by_id(self, id):
        """Suchen eines Trainings nach der übergebenen ID. 

        :param id Primärschlüsselattribut eines Trainings aus der Datenbank
        :return Training-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()
        command = "SELECT * FROM training WHERE PK_Training={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            (id, creation_date, name, goal, team_id, user_id) = tuples[0]
            training = Training()
            training.setId(id)
            training.setCreationDate(creation_date)
            training.setName(name)
            training.setGoal(goal)
            training.setTeamId(team_id)
            training.setUserId(user_id)
            result = training

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    
    def insert(self, training):
        """Einfügen eines Trainings-Objekts in die DB

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft 

        :param training das zu speichernde training Objekt
        :return das bereits übergebene training Objekt mit aktualisierten Daten (id)
        """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(PK_Training) AS maxid FROM training")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Trainings-Objekt zu."""
                training.setId(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                training.setId(1)

        command = "INSERT INTO training (PK_Training, name, datetime, goal, Team_PK_Team, User_PK_User) VALUES (%s,%s,%s,%s,%s,%s)"
        data = (training.getId(), training.getName(), training.getCreationDate(), training.getGoal(), training.getTeamId(), training.getUserId())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return training


    def update(self, training):
        """Überschreiben / Aktualisieren eines training-Objekts in der DB

        :param training -> training-Objekt
        :return aktualisiertes training-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE training " + "SET name=%s, datetime=%s, goal=%s, Team_PK_Team=%s, User_PK_User=%s WHERE PK_Training=%s"
        data = (training.getName(), training.getCreationDate(), training.getGoal(), training.getTeamId(), training.getUserId(), training.getId())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()
        return training


    def delete(self, training):
        """Löschen der Daten eines Trainings aus der Datenbank

        :param training -> training-Objekt
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM training WHERE PK_Training={}".format(training.getId())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()
        return training
