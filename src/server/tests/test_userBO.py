from src.server.bo.userBO import User
import sys
sys.path.append("..")


user = User()
user.set_id(123)
user.setSurname("Leander")
user.set_name("Peter")
user.setEmail("leander.peter@icloud.com")
user.setGoogleUserId("abcdefghijk")


def user_check(user_obj):
    if user_obj.getId() == 123 and user_obj.getSurname() == "Leander" and user_obj.getName() == "Peter" and user_obj.getEmail() == "leander.peter@icloud.com" and user_obj.getGoogleUserId() == "abcdefghijk":
        return True
    else:
        return False


def test_user_obj():
    """ create user and check """
    assert user_check(user) == True
