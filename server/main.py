from flask import Flask,render_template, request, session, jsonify,redirect
from db import Login,Register,getService,bookService,getVehicles,getCategories,getServices
import json
from keys import Key
import subprocess
import random

app = Flask(__name__)

app.secret_key = "secret key"
SERVER_NAME = 'http://127.0.0.1'

@app.route("/")
def landing():
    return redirect("/shop")
@app.route("/shop")
def shop():
    return render_template("shop.html")

@app.route("/shop-single.html")
def detailPage():
    return render_template("shop-single.html")

@app.route("/shop_checkout.html")
def checkout():
    return render_template("shop_checkout.html")

@app.route("/shop_cart.html")
def cart():
    return render_template("shop_cart.html")

@app.route("/services.html")
def services():
    return render_template("services.html")

@app.route("/services_single.html")
def serviceSingle():
    return render_template("services_single.html")

@app.route("/reset.html")
def reset():
    return render_template("reset.html")

@app.route("/payment.html")
def payment():
    return render_template("payment.html")

@app.route("/inventory.html")
def inventory():
    return render_template("inventory.html")

@app.route("/price.html")
def price():
    return render_template("price.html")

@app.route("/login.html")
@app.route("/login")
def login():
    msg = False
    if request.method == "POST" and "email" in request.form:
        email = request.form["email"]
        password = request.form["password"]
        result = Login(email,password,server=SERVER_NAME)
        print("res",str(result))
        if result != False:
            if result.get('token') != None:
                session["user"] = result['token']
                return redirect("/shop")
            msg = result.get('message')
            
        msg = "Invalid Credentials"
        alert = "error"
    return render_template("login.html",**locals())

@app.route("/signup.html")
@app.route("/signup")
def signup():
    msg = False
    if request.method == "POST":
        email= request.form["email"]
        
        username = request.form['name']
        password= "123456"
        result = Register(username,password,email,None,server=SERVER_NAME)
        if result == False:
            msg = 'Error: An error occured, try again'
           
        else:
            session['user'] = result['token']
            return redirect("shop") 
    return render_template("signup.html",**locals())
    pass
if __name__ == '__main__':
    try:
        node_process = subprocess.Popen(node_command)
        result = node_process
        print(result)
    except Exception as e:
        print(str(e))
        pass
    app.run("0.0.0.0",debug=True)