from flask_login import login_required, login_user, logout_user, current_user
from flask import Blueprint, render_template, request, flash, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from .models import Login_admin,Employee, Attendance, Shift_time,Backup,LoginEmp,Emp_login
from . import db
import datetime
from flask import current_app as app
from sqlalchemy.exc import SQLAlchemyError
import time
from datetime import datetime, timedelta
from .funcations import *



auth = Blueprint('auth', __name__)

@auth.route('/admin-login', methods=['POST', 'GET'])
def login():
    admin = Login_admin.query.filter_by(id=1).first()
    if admin:
        if request.method == 'POST':
            email = request.form.get('email')
            password = request.form.get('password')

            dbemail = Login_admin.query.filter_by(email=email).first()
            if dbemail:
                if check_password_hash(dbemail.password, password):
                    login_user(dbemail, remember=True)
                    return redirect(url_for('views.admin'))
                else:
                    flash("Incorrect Password", category='error')
            else:
                flash("Incorrect Email", category='error')
    else:
        # Assuming you're using Flask's generate_password_hash to hash passwords during registration
        addAdmin = Login_admin(
            name="Admin",
            email="vsabarinathan1611@gmail.com",
            phoneNumber="123456789",
            password=generate_password_hash("your_password_here"),
            designation="HR"
        )
        db.session.add(addAdmin)
        db.session.commit()
        print('Created Admin!')

    return render_template('login.html')
@auth.route('/login', methods=['POST', 'GET'])
def admin_login():
    if request.method == 'POST':
        emp_id = request.form.get('emp_id')
        password = request.form.get('password')
        print("emp_id", emp_id)
        print("pwd:", password)

        dbemp = Login_admin.query.filter_by(emp_id=emp_id).first()
        if dbemp:
            if check_password_hash(dbemp.password, password):
                login_user(dbemp, remember=True)
                return redirect(url_for('views.dashboard'))
            else:
                flash("Incorrect Password", category='error')
        else:
            flash("Incorrect Employee ID", category='error')

    return render_template('emp_login.html')


@auth.route('/logout', methods=['GET', 'POST'])
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

@auth.route('/addemp', methods=['POST', 'GET'])
@login_required
def attendance():    
    try:

            file_path = os.path.join(app.config['EXCEL_FOLDER'], 'employee_data.xlsx')  # Use correct case 'EXCEL_FOLDER'
            addemployee(file_path)  # Call the data processing function
       

    except Exception as e:
        print("Error occurred:", e)
        db.session.rollback()  # Rollback in case of error
    return redirect(url_for('views.admin'))


@auth.route('/signup',methods=['POST','GET'])
def signup():
    if request.method == 'POST':
        # Get user input from the form
        email = request.form['email']
        password = request.form['password']
        emp_id = request.form['emp_id']  # Assuming you have a form field for emp_id
        name = request.form['name']
        # Check if a user with the same email already exists
        existing_user = Emp_login.query.filter_by(email=email).first()
        if existing_user:
            flash('Email already exists. Please choose a different email.')
        else:
            # Create a new Emp_login object and add it to the database
            new_login = Emp_login(email=email, password=password, emp_id=emp_id, name=name)
            db.session.add(new_login)
            db.session.commit()

            # Redirect to a success page or perform any other necessary actions
            return redirect(url_for('views.emp_login_page'))

    # Render the signup form for GET requests
    return render_template('signup.html')

