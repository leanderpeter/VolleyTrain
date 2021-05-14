import sys
sys.path.append("..")


from src.server.db.userMapper import UserMapper
from src.server.bo.userBO import User

user = User()
user.setId(1)
user.setSurname("Leander")
user.setName("Peter")
user.setEmail("leander.peter@icloud.com")
user.setGoogleUserId("abcdefghijk")

''' We need a temporary id because we cant ensure 
that the user is always id == 1 !
'''
tmp_id = 1

def test_insert_mapper():
    """ insert user in database """
    with UserMapper() as mapper:
        assert mapper.insert(user) == user

user.setName("Heinrich")

def test_update_user():
    """ update the given user in database """
    with UserMapper() as mapper:
        assert mapper.update(user) == user

def test_find_by_google_id():
    """ find user by google id in database """
    with UserMapper() as mapper:
        res = mapper.find_by_google_user_id(user.getGoogleUserId())
        user.setId(res.getId())
        tmp_id = res.getId()
        assert user.getGoogleUserId() == res.getGoogleUserId()

def test_delete_mapper():
    """ delete the user from database """
    with UserMapper() as mapper:
        assert mapper.delete(user) == user