from app import app, db, login_manager
from flask import request, render_template, flash, redirect,url_for
from models import User
from flask_login import current_user, login_user, logout_user, login_required
from forms import RegistrationForm,LoginForm
#from werkzeug.urls import url_parse

@app.route('/', methods=['GET', 'POST'])
def register():
  form = RegistrationForm(csrf_enabled=False)
  if form.validate_on_submit():
    user = User(username=form.username.data, email=form.email.data)
    user.set_password(form.password.data)
    db.session.add(user)
    db.session.commit()
  return render_template('login.html', title='Register', form=form)

@login_manager.user_loader
def load_user(user_id):
  return User.query.get(int(user_id))

# login route
@app.route('/login', methods=['GET','POST'])
def login():
    form = LoginForm(csrf_enabled=False)
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and user.check_password(form.password.data):
            login_user(user)
            next_page = request.args.get('next')
            if next_page:
                return redirect(next_page)
            else:
                # Redirect to the user's home page using their username
                return redirect(url_for('user', username=user.username))
        else:
            return redirect(url_for('login', _external=True, _scheme='https'))
    return render_template('login.html', form=form)

# user route
@app.route('/<username>/home', methods=['GET'])
@login_required
def user(username):
  return render_template('home.html')
