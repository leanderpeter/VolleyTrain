from server.db.mapper import Mapper
from server.bo.ExerciseBO import Exercise


class ExerciseMapper(Mapper):
    """mapper class to insert/replace/change exercise object in the realtional database"""

    def __init__(self):
        super().__init__()

    def find_all(self):
        """find all exercise obj

        :return all exercise objs
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT PK_Exercise, name, Training_PK_Training, duration, notes, description, goal, rating FROM exercise"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, training, duration, notes, description, goal, rating) in tuples:
            exercise = Exercise()
            exercise.set_id(id)
            exercise.set_name(name)
            exercise.setTraining(training)
            exercise.setDuration(duration)
            exercise.setNotes(notes)
            exercise.setDescription(description)
            exercise.setGoal(goal)
            exercise.set_rating(rating)

            result.append(exercise)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self):
        pass

    def find_by_id(self, id):
        """Suchen einer exercise nach der übergebenen ID.

        :param id Primärschlüsselattribut einer exercise aus der Datenbank
        :return exercise-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()
        command = "SELECT PK_Exercise, name, Training_PK_Training, duration, notes, description, goal, rating FROM exercise WHERE PK_Exercise={}".format(
            id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            (id, name, training, duration, notes,
             description, goal, rating) = tuples[0]
            exercise = Exercise()
            exercise.set_id(id)
            exercise.set_name(name)
            exercise.setTraining(training)
            exercise.setDuration(duration)
            exercise.setNotes(notes)
            exercise.setDescription(description)
            exercise.setGoal(goal)
            exercise.set_rating(rating)

            result = exercise

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
                        keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, exercise):
        """Einfügen eines exercise Objekts in die DB

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft

        :param exercise das zu speichernde exercise Objekt
        :return das bereits übergebene exercise Objekt mit aktualisierten Daten (id)
        """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(PK_exercise) AS maxid FROM exercise ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem exercise-Objekt zu."""
                exercise.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                exercise.set_id(1)

        command = "INSERT INTO exercise (PK_Exercise, name, Training_PK_Training, duration, notes, description, goal, rating) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
        data = (exercise.get_id(),  exercise.get_name(), exercise.getTraining(
        ), exercise.getDuration(), exercise.getNotes(), exercise.getDescription(), exercise.getGoal(), exercise.get_rating())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return exercise

    def update(self, exercise):
        """Überschreiben / Aktualisieren eines exercise-Objekts in der DB

        :param exercise -> exercise-Objekt
        :return aktualisiertes exercise-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE exercise set " + \
            "name=%s, duration=%s, notes=%s, description=%s, goal=%s , rating=%s WHERE PK_Exercise=%s"

        data = (exercise.get_name(), exercise.getDuration(), exercise.getNotes(
        ), exercise.getDescription(), exercise.getGoal(), exercise.get_rating(), exercise.get_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return exercise

    def delete(self, exerciseId):
        """Löschen der Daten einer exercise aus der Datenbank

        :param exercise -> exercise-Objekt
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM exercise WHERE PK_exercise={}".format(
            exerciseId)
        cursor.execute(command)

        self._connection.commit()
        cursor.close()
        return exerciseId

    def get_by_training_id(self, id):

        cursor = self._connection.cursor()
        command = f"SELECT PK_Exercise, name, Training_PK_Training, duration, notes, description, goal, rating FROM exercise WHERE Training_PK_Training={id}"

        cursor.execute(command)

        tuples = cursor.fetchall()
        try:
            (id, name, training, duration, notes,
             description, goal, rating) = tuples[0]
            exercise = Exercise()
            exercise.set_id(id)
            exercise.set_name(name)
            exercise.setTraining(training)
            exercise.setDuration(duration)
            exercise.setNotes(notes)
            exercise.setDescription(description)
            exercise.setGoal(goal)
            exercise.set_rating(rating)

            result = exercise

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
                        keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result


'''Only for testing purpose'''

if (__name__ == "__main__"):
    with ExerciseMapper() as mapper:
        result = mapper.find_all()
        for exercise in result:
            print(exercise)
