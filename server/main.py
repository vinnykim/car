from flask import Flask,render_template, request, session, jsonify,redirect,send_file
from db import Login,Register,getOrder,getVehicles,getVehicle,getCategories,getServices,getUser,addCart,getCart,addWish,getWish
import json
from keys import Key
import subprocess
import random
from stripe_pay import createCheckout

app = Flask(__name__)

app.secret_key = "secret key"
SERVER_NAME = 'http://127.0.0.1'

@app.route("/")
def landing():
    return redirect("/shop")

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/login")

@app.route("/compare")
def compare():
    vehicles = getVehicles(server=SERVER_NAME)
    wishlist = getWish(user=session.get("user"),server=SERVER_NAME)
    print(wishlist)
    return render_template("compare.html",**locals()) 

@app.route("/shop")
def shop():
    vehicles = getVehicles(server=SERVER_NAME)
    #print(vehicles)
    return render_template("shop.html",**locals())

@app.route("/book")
def book():
    pass

@app.route("/reviews")
def reviews():
    if session.get("user") == None:
        return redirect("logout")
    reviews = getReviews(server=SERVER_NAME,user=session.get("user"))
    reviews = reviews.get("reviews") if reviews.get("reviews") else []
    user = getUser(server=SERVER_NAME,user=session.get("user"))
    if user.get("_id") == None:
        return redirect("logout")
    return render_template("reviews.html",**locals())

@app.route("/shop-single.html",methods=["GET","POST"])
def detailPage():
    vehicle = {}
    msg = False
    if request.args.get("id"):
        vehicle_id = request.args["id"]
        vehicle = getVehicle(id=vehicle_id,server=SERVER_NAME)
    vehicle_detail = vehicle.get("vehicle")
    user = getUser(user=session.get("user"),server=SERVER_NAME)
    if request.method == "POST" and "vehicle_id" in request.form:
        vehicle_id = request.form["vehicle_id"] 
        user_id = request.form["user_id"] if "user_id" in request.form else None
        
        if "compare" not in request.form:
            x = addCart(vehicle=vehicle_id,user=session.get("user"),server=SERVER_NAME)
        else:
            x = addWish(vehicle=vehicle_id,user=session.get("user"),server=SERVER_NAME)
        msg = x.get("message") if x.get("message") else False 
        print(msg)
    return render_template("shop-single.html",**locals())

@app.route("/checkout",methods=["GET","POST"])
@app.route("/shop_checkout.html",methods=["GET","POST"])
def checkout():
    if session.get("user") == None:
        return redirect("login")
    cart = getCart(user=session.get("user"),server=SERVER_NAME)
    user = getUser(user=session.get("user"),server=SERVER_NAME)
    user = user if user else {}
    cart = cart.get("cart") if cart.get("cart") else {}
    if request.method == "POST" and "cardNumber" in request.form and "cardCvv" in request.form:
        try:
            cardNumber = request.form["cardNumber"]
            cardCvv = request.form["cardCvv"]
            cardAmount = request.form["cardAmount"]
            cardExpiry = request.form["cardExpiry"]
            country = request.form["country"]
            city = request.form["city"]
            data = {
                'cardNumber':cardNumber,
                'cardCvv':cardCvv,
                'cardNumber':cardNumber,
                'cardExpiry':cardExpiry,
                'country':country,
                'city':city,
            }
            pay = createCheckout(data,user=user,cart=cart)
        except Exception as e:
            msg = str(e)
            pass
    return render_template("shop_checkout.html",**locals())

@app.route("/cart")
@app.route("/shop_cart.html")
def cart():
    if session.get("user") == None:
        return redirect("login")
    cart = getCart(user=session.get("user"),server=SERVER_NAME)
    
    cart = cart.get("cart") if cart.get("cart") else {}
    empty = cart.get("total") if cart.get("total") else 0
    return render_template("shop_cart.html",**locals())

@app.route("/orders")
def orders():
    if session.get("user") == None:
        return redirect("logout")
    order = None
    if request.args.get("invoice"):
        order = getOrder(user=session.get("user"),invoice=request.args.get("invoice"),server=SERVER_NAME)
    cart = getCart(user=session.get("user"),server=SERVER_NAME)
    user = getUser(user=session.get("user"),server=SERVER_NAME)
    return render_template("orders.html",**locals())


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

@app.route("/login.html",methods=["GET","POST"] )
@app.route("/login",methods=["GET","POST"] )
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

@app.route("/signup.html",methods=["GET","POST"] )
@app.route("/signup",methods=["GET","POST"] )
def signup():
    msg = False
    if request.method == "POST":
        email= request.form["email"]
        phone = request.form["phone"] if "phone" in request.form else random.randint(123456789,987654321)
        username = request.form['name']
        password= request.form['password']
        result = Register(username,password,email,phone,server=SERVER_NAME)
        print(result)
        if result == False:
            msg = 'Error: An error occured, try again'
           
        else:
            if result.get("token"):
                session['user'] = result['token']
                return redirect("shop") 
            else:
                msg = result.get("message")
        alert = "error"
    return render_template("signup.html",**locals())

@app.route("/app/live/<string:id>")
def liveView(id):
    return render_template("tour.html")

@app.route("/tour.xml")
def tourXml():
    return send_file("tour.xml")
    
node_command = ["node", "server.js"]

if __name__ == '__main__':
    try:
        node_process = subprocess.Popen(node_command)
        result = node_process
        print(result)
    except Exception as e:
        print(str(e))
        pass
    app.run("0.0.0.0",debug=True)