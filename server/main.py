from flask import Flask,render_template, request, session, jsonify,redirect,send_file
from db import *
import json
from keys import Key

import random
from stripe_pay import *
import stripe
import os

STRIPE_WEBHOOK = 'whsec_5f9146f9f271b5f3bd03d1c5bbd0e97880fcfda41ec69bdfd5b578bb0820399e'

app = Flask(__name__)

app.secret_key = "secret key"
SERVER_NAME = 'https://supercarstoreadmin-820c4e218a56.herokuapp.com'
SERVER_URL = 'http://localhost'

@app.route("/")
def landing():
    return redirect("/shop")

@app.route("/logout")
def logout():
    session.clear()
    session["user"] = None
    return redirect("/login")
    
@app.route("/alerts",methods=["GET","POST"])
def alerts():
    if session.get("user") == None:
        return redirect("logout")
    alerts = getAlerts(user=session.get("user"),server=SERVER_NAME)
    alerts = alerts["alerts"]
    print("alerts",alerts)
    msg = None
    if request.method == "POST":
        price = request.form["price"]
        name = request.form["name"]
        description = request.form["description"]
        data = {
            "name": name,
            "price":price,
            "description":description,
        }
        
        result = newAlert(data,user=session.get("user"),server=SERVER_NAME)
        print("new alert",result)
        msg = result["message"]
    if request.args.get("delete") != None:
        id = request.args.get("id")
        
        if id:
            result = deleteAlert(id,user=session.get("user"),server=SERVER_NAME)
            print("delete alert",result)
            msg = result["message"]
        return redirect("alerts?msg="+msg)
    #print(wishlist)
    return render_template("alerts.html",**locals())

@app.route("/compare")
def compare():
    if session.get("user") == None:
        return redirect("logout")
    vehicles = getVehicles(server=SERVER_NAME)
    wishlist = getWish(user=session.get("user"),server=SERVER_NAME)
    print(wishlist)
    wishlist = wishlist.get("wishlist") if wishlist.get("wishlist") else []
    #print(wishlist)
    return render_template("compare.html",**locals()) 

@app.route("/shop")
def shop():
    filter = request.args.get("search") if request.args.get("search") else None
    vehicles = getVehicles(server=SERVER_NAME)
    vehicle = None
    if filter != None:
        vehicle = []
        for v in vehicles:
            try:
                if filter in v["name"] or filter in v["description"]["vehicleDescription"] or filter in v["description"]["vehicleMake"]:
                    vehicle.append(v)
            except Exception as e:
                print(str(e))
                pass
    vehicles = vehicle if vehicle != None else vehicles
    
    #print(vehicles)
    return render_template("shop.html",**locals())

@app.route("/book")
def book():
    pass

@app.route("/review")
@app.route("/reviews")
def reviews():
    if session.get("user") == None:
        return redirect("logout")
    reviews = getReviews(server=SERVER_NAME,user=session.get("user"))
    reviews = reviews.get("reviews") if reviews.get("reviews") else []
    user = getUser(server=SERVER_NAME,user=session.get("user"))
    if user.get("user") == None:
        return redirect("logout")
    print(reviews)
    return render_template("reviews.html",**locals())

@app.route("/update",methods=["post"])
def update():
    user = getUser(user=session.get("user"),server=SERVER_NAME)
    
    if request.method == "POST" and "vehicle_id" in request.form:
        if user.get("user") == None:
            return redirect("logout")
        vehicle_id = request.form["vehicle_id"] 
        user_id = request.form["user_id"] if "user_id" in request.form else None
        
        if "compare" not in request.form:
            x = addCart(vehicle=vehicle_id,user=session.get("user"),server=SERVER_NAME)
        else:
            x = addWish(vehicle=vehicle_id,user=session.get("user"),server=SERVER_NAME)

        msg = x.get("message") if x else x 
        print(x)
        return redirect("shop-single.html?id="+vehicle_id+"&msg="+msg)
@app.route("/shop-single.html",methods=["GET","POST"])
def detailPage():
    vehicle = {}
    msg = request.args.get("msg") if request.args.get("msg") else False
    if request.args.get("id"):
        vehicle_id = request.args["id"]
        vehicle = getVehicle(id=vehicle_id,server=SERVER_NAME)
    else:
        return redirect("shop")
    vehicle_detail = vehicle.get("vehicle")
    user = getUser(user=session.get("user"),server=SERVER_NAME)
    #print(vehicle_detail)
    if request.method == "POST" and "vehicle_id" in request.form:
        if user.get("_id") == None:
            return redirect("logout")
        vehicle_id = request.form["vehicle_id"] 
        user_id = request.form["user_id"] if "user_id" in request.form else None
        
        if "compare" not in request.form:
            x = addCart(vehicle=vehicle_id,user=session.get("user"),server=SERVER_NAME)
        else:
            x = addWish(vehicle=vehicle_id,user=session.get("user"),server=SERVER_NAME)

        msg = x.get("message") if x else x 
        print(msg,x)
    return render_template("shop-single.html",**locals())

@app.route("/checkout",methods=["GET","POST"])
@app.route("/shop_checkout.html",methods=["GET","POST"])
def checkout():
    if session.get("user") == None:
        return redirect("login")
    cart = getCart(user=session.get("user"),server=SERVER_NAME)
    user = getUser(user=session.get("user"),server=SERVER_NAME)
    user = user.get("user") if user.get("user") else {}
    cart = cart.get("cart") if cart.get("cart") else {}
    customer = getCustomer(user=user)
    #print(user)
    user_card = getCard(user=session.get("user"),server=SERVER_NAME)
    print("user card =>",user_card)
    
    update_user = updateUserStripe(user=session.get("user"),server=SERVER_NAME,stripe_id = customer.get("id"))
    if request.args.get("checkout")=="success":
        result = saveCheckout(id=None,user=session.get("user"),server=SERVER_NAME)
        session_id = result.get("checkout")["id"]
        print("got sessionid",session_id)
        if session_id != None:
            #pay = getCheckout(user=user,session_id=session_id)
            pay = getIntent(user=user,id=session_id)
            if pay.get("payment_status") or pay.get("status"):
                msg = updateCheckout(pay,user=session.get("user"),server=SERVER_NAME)
                print(msg)
    if not request.args.get("card"):
        user_card = {}
    if request.method == "POST":# and "cardNumber" in request.form and "cardCvv" in request.form:
        try:
            if user_card == False:
                cardNumber = request.form["cardNumber"]
                cardCvv = request.form["cardCvv"]
                
                cardExpiry = request.form["cardExpiry"]
                country = request.form["country"]
                city = request.form["state"]
                data = {
                    'number':cardNumber,
                    'cvc':cardCvv,
                    'month':cardExpiry.split("/")[0],
                    'year':cardExpiry.split("/")[-1],
                    'country':country,
                    'city':city,
                }
                user_card = createCard(data,user=session.get("user"),server=SERVER_NAME)
            #print(cart)
            result = saveCheckout(id=None,user=session.get("user"),server=SERVER_NAME)
            #print(result)
            session_id = result.get("checkout")["id"]
            print("got sessionid",session_id)
            if not request.args.get("card"):
                user_card = {}
                if session_id != None:
                    pay = getCheckout(user=user,session_id=session_id)
                    if pay.get("payment_status"):
                        msg = updateCheckout(pay,user=session.get("user"),server=SERVER_NAME)
                        print(msg)
                    if pay == False:
                        pay = createCheckout(checkout_id=result["checkout"]["_id"],user=user,cart=cart,server=SERVER_NAME)
                else:
                    pay = createCheckout(checkout_id=result["checkout"]["_id"],user=user,cart=cart,server=SERVER_NAME)
                #print(pay)
                if pay:
                    msg = "Checkout success"
                    result = saveCheckout(id=pay["id"],user=session.get("user"),server=SERVER_NAME)
                    msg = result.get("message") if result.get("message") else msg
                    if pay.get("url"):
                        return redirect(pay["url"] )
                    if pay.get("payment_status") == "paid":
                        return redirect("orders")
            else:
                if session_id != None:
                    pay = getIntent(user=user,id=session_id)
                    if pay == False:
                        pay = createIntent(user=user,card=user_card,checkout_id=result["checkout"]["_id"])
                else:
                    pay = createIntent(user=user,card=user_card,checkout_id=result["checkout"]["_id"])
                if pay:
                    msg = "Checkout success, Charge will be automatically made on your card"
                    result = saveCheckout(id=pay["id"],user=session.get("user"),server=SERVER_NAME)
                    if pay.get("url"):
                        return redirect(pay["url"] )
                    if pay.get("payment_status") == "paid":
                        return redirect("orders")
            msg = "Checkout Incomplete"
        except Exception as e:
            msg = str(e)
            
            pass
        print(msg)
    return render_template("shop_checkout.html",**locals())

@app.route("/cart")
@app.route("/shop_cart.html")
def cart():
    if session.get("user") == None:
        return redirect("login")
    if request.args.get("id") != None:
        id = request.args.get("id")
        invoice = getOrder(invoice=id,server=SERVER_NAME,user=session.get("user"))
        
        if invoice.get("invoice") and request.args.get("delete") == "true":
            booking = invoice.get("invoice")
            dell = deleteOrder(id=booking.get("booking"),server=SERVER_NAME,user=session.get("user"))
            print(invoice.get("invoice"),dell)
            msg = dell.get("message")
            return redirect("cart?msg="+msg)
    cart = getCart(user=session.get("user"),server=SERVER_NAME)
    #print(cart)
    cart = cart.get("cart") if cart.get("cart") else {}
    empty = cart.get("total") if cart.get("total") else 0
    if cart.get("amount") == None:
        return redirect("cart")
    return render_template("shop_cart.html",**locals())

@app.route("/history")
@app.route("/orders")
def orders():
    if session.get("user") == None:
        return redirect("logout")
    order = None
    if request.args.get("invoice"):
        order = getOrder(user=session.get("user"),invoice=request.args.get("invoice"),server=SERVER_NAME)
        order = order if order else {} 
    cart = getCart(user=session.get("user"),server=SERVER_NAME)
    user = getUser(user=session.get("user"),server=SERVER_NAME)
    if user.get("user") == None:
        return redirect("logout")
    print(cart)
    cart = cart.get("cart") if cart.get("cart") else {}
    print(order)
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
        stripe_id = getCustomer(user={"name":username,"email":email,"phone":phone})
        result = Register(username,password,email,phone,stripe_id=stripe_id["id"],server=SERVER_NAME)
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

@app.route('/webhook', methods=['POST'])
def webhook():
    payload = request.get_data(as_text=True)
    sig_header = request.headers.get('Stripe-Signature')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, STRIPE_WEBHOOK
        )
    except ValueError as e:
        print('Invalid payload',str(e))
        return 'Invalid payload', 400
    except stripe.error.SignatureVerificationError as e:
        print('Invalid signature',str(e))
        return 'Invalid signature', 400

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        result = saveCheckout(id=session["id"],user=session.get("user"),server=SERVER_NAME+":8081",update=True)
        print("Checkout session completed:", session)
    elif event['type'] == 'customer.created':
      customer = event['data']['object']
    elif event['type'] == 'customer.deleted':
      customer = event['data']['object']
    elif event['type'] == 'customer.updated':
      customer = event['data']['object']
    elif event['type'] == 'customer.discount.created':
      discount = event['data']['object']
    elif event['type'] == 'customer.discount.deleted':
      discount = event['data']['object']
    elif event['type'] == 'customer.discount.updated':
      discount = event['data']['object']
    elif event['type'] == 'customer.source.created':
      source = event['data']['object']
    elif event['type'] == 'customer.source.deleted':
      source = event['data']['object']
    elif event['type'] == 'customer.source.expiring':
      source = event['data']['object']
    elif event['type'] == 'customer.source.updated':
      source = event['data']['object']
    
      subscription = event['data']['object']
    elif event['type'] == 'customer.tax_id.created':
      tax_id = event['data']['object']
    elif event['type'] == 'customer.tax_id.deleted':
      tax_id = event['data']['object']
    elif event['type'] == 'customer.tax_id.updated':
      tax_id = event['data']['object']
    else:
      print('Unhandled event type {}'.format(event['type']))

    return jsonify({'status': 'success'})


@app.route("/app/live/<string:id>")
def liveView(id):
    vehicle = getVehicle(id=id,server=SERVER_NAME)
    vehicle_detail = vehicle.get("vehicle") if vehicle.get("vehicle") else {}
    return render_template("tour.html",**locals())

@app.route("/tour.xml")
def tourXml():
    return send_file("tour.xml")
    
@app.route("/tiles/f_on_closed/<string:filename>")
def routeFile(filename):
    return send_file("static/tiles/f_on_closed/"+filename)
@app.route("/tiles/b_on_closed/<string:filename>")
def routeFile2(filename):

    return send_file("static/tiles/b_on_closed/"+filename)

@app.route("/tiles/b_off_closed/<string:filename>")
def routeFile3(filename):
    
    return send_file("static/tiles/b_off_closed/"+filename)

@app.route("/tiles/f_off_closed/<string:filename>")
def routeFile4(filename):
    
    return send_file("static/tiles/f_off_closed/"+filename)
    


if __name__ == '__main__':

    try:
        #node_process = subprocess.Popen(node_command)
        #result = node_process
        #print(result)
        pass
    except Exception as e:
        print(str(e))
        pass

    app.run("0.0.0.0",port=80,debug=True)


