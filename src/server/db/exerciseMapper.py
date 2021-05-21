from server.db.mapper import Mapper
from server.bo.exceriseBO import Exercise


class ExerciseMapper(Mapper):
    """mapper class to insert/replace/change person object in the realtional database"""

    def __init__(self):
        super.__init__()

    def find_all(self):
        """find all exercise obj

        :return all exercise objs
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT PK_Exercise, name, tag, duration FROM users"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, tag, duration) in tuples:
            exercise = Exercise()
            exercise.setId(id)
            exercise.setName(name)
            exercise.setTag(tag)
            exercise.setDuration(duration)

            result.append(exercise)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self):
        pass
