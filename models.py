import bcrypt
import re

class Student():
	def __init__(self):
		self.first_name = ''
		self.last_name = ''
		self.email = ''
		self.hashed_pass = ''
		self.linkedin_token = ''
		self.github_token = ''
		self.need_visa = False

	def is_authenticated(self):
		return True

	def validate_login(self, password):
		h = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
		if h == self.hashed_pass:
			return True
		return False

	def is_student_email(self, email):
		if self.linkedin_token:
			return True  # allows for non edu linkedin emails
		if '.edu' in email:
			return True
		return False


class Employer():
	def __init__(self):
		self.name = ''
		self.email = ''
		self.hashed_pass = ''
		self.description = ''
		self.num_employees = 0
		self.url = ''

	def is_authenticated(self):
		return True

	def validate_login(self, password):
		h = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
		if h == self.hashed_pass:
			return True
		return False

	def is_employer_email(self, email):
		return True




