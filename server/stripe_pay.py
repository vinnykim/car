import stripe
import requests
import json
from datetime import datetime
# Set your secret API key
stripe.api_key = 'sk_test_51MBfXmHwqgFfBwcHuQUf60FfBBN0Pw0d5LELfDxCPm7kcstXQdSgIEMDJb0gY314JJpNqNo6R6jNg0iroPzm6pJK00MOQElz1r'

rate = 142

def updateUserStripe(stripe_id=None,user=None,server=None):
    if user:
        headers = {
            'Content-Type': 'application/json',
            'x-auth-token':user
        }
        data = {
            "stripe_id":stripe_id,
        }
        response = requests.post(server+":8081/api/models/user/updateStripe",json=data,headers=headers)
        if response.status_code == 200:
            return response.json()
        return response.json()
def updateUserCard(card=None,user=None,server=None):
    if user:
        headers = {
            'Content-Type': 'application/json',
            'x-auth-token':user
        }
        data = {
            "stripe_id":stripe_id,
        }
        response = requests.post(server+":8081/api/models/user/updateCard",json=card,headers=headers)
        if response.status_code == 200:
            return response.json()
        return response.json()
    
def createCard(data,user=None,server=None):
    try:
        card = stripe.PaymentMethod.create(
            type="card",
            card={
            "number": data["number"],
            "exp_month": data["month"],
            "exp_year": data["year"],
            "cvc": data["cvc"],
            }
        
        )
        updateUserCard(card=card,user=user,server=server)
        print("created card=>",card)
        return card
    except Exception as e:
        print("erro->stripe_createCard => ",str(e))
        pass

def getCard(card=None,user=None,server=None):
    try:
        if card == None:
            headers = {
                'Content-Type': 'application/json',
                'x-auth-token':user
            }
            response = requests.post(server+":8081/api/models/user/updateCard",json={'id':card,'update':True},headers=headers)
            print(response,response.json())
            if response.status_code == 200:
                card = response.json()
                card = card.get("card")
                if card.get("id") == None:
                    return False
                else:
                    card = card.get("id")
        print("card id =>",card)
        card = stripe.Card.retrieve(card)
        print("card =>",card)
        return card
    except Exception as e:
        print("erro->stripe_getCard => ",str(e))
        pass

def getIntent(id=None,user=None,server=None,card=None):
    try:
        intent = stripe.PaymentIntent.retrieve(id)
        print("payment intent => ",intent)
        intent["payment_status"] = "paid" if intent["status"] == "succeeded" else "pending"
        return intent
    except Exception as e:
        print("erro->stripe_getCard => ",str(e))
        pass

def createIntent(user=None,card=None):
    try:
        price = createProduct(checkout_id,cart)
        intent = stripe.PaymentIntent.create(
            line_items=[
                {
                    'price': price["id"],
                    'quantity': len(cart.get("pending")),
                },
            ],
            amount = price["unit_amount"],
            currency="usd",
            customer=user["stripe_id"],
            payment_method=card["id"],
            receipt_email = user["email"],
            confirmation=True,
            automatic_payment_methods={"enabled": True},
            return_url=server+'/checkout?checkout=success',
        )
        print("intent => ",intent)
        return intent
    except Exception as e:
        print("erro->stripe_createIntent => ",str(e))
        pass

def getCustomer(user=None):
    msg = False
    try:
        user_id = None
        if not user.get("stripe_id"):
            created_customer = stripe.Customer.create(
              name=user.get("name"),
              email=user.get("email"),
              phone=user.get("phone"),
            )
            user_id = created_customer.get("id")
        user_id = user.get("stripe_id") if user.get("stripe_id") else user_id
        customer = stripe.Customer.retrieve(user_id)
        #print(customer)
        return customer
        msg = True
    except Exception as e:
        msg = str(e)
        pass
    return msg

def createProduct(id,cart):
    
    invoices = cart.get("pending")
    for i in invoices:
        #print(i)
        i["vehicle"] = i["vehicle"]["_id"]
        i["book"] = i["book"]["_id"]
    #print("metadata",invoices)
    prod = stripe.Product.create(name=id,metadata={"invoices":json.dumps(cart.get("pending"),default=str)})
    amt = (int(cart.get("amount"))*100)/rate
    price = stripe.Price.create(
        unit_amount = int(amt),
        currency="usd",
        recurring=None,
        product = prod["id"],
    )
    #print(price)
    return price
def createCheckout(user=None,cart=None,server=None,checkout_id=None):
    try:
        
        price = createProduct(checkout_id,cart)
        #print("checkout",price,cart)
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            customer = user.get("stripe_id"),
            line_items=[
                {
                    'price': price["id"],
                    'quantity': len(cart.get("pending")),
                },
            ],
            mode='payment',
            success_url=server+'/checkout?checkout=success',
            cancel_url=server+'/cart?checkout=cancel',
        )
        
        session_id = checkout_session.id
        #print("session",session_id)
        checkout_session["status"] = checkout_session["payment_status"]
        return checkout_session
    except Exception as e:
        print("erro->stripe_createCheckout => ",str(e))
        pass
    return None

def getCheckout(user=None,session_id=None):
    try:
        current_datetime = datetime.now()
        current_time = int(current_datetime.timestamp() * 1000)
        session = stripe.checkout.Session.retrieve(session_id)
        if current_time > session["expires_at"]:

            print(current_time > session["expires_at"],current_time, session["expires_at"])
            #return False
        print("got session  "+session["id"]+" with status => ",session["payment_status"])
        return session
    except Exception as e:
        print("erro->stripe_getCheckout => ",str(e))
        pass

def saveCheckout(user=None,id=None,checkout_id=None,server=None,update=None):
    if user:
        headers = {
            'Content-Type': 'application/json',
            'x-auth-token':user
        }
        response = requests.post(server+":8081/api/models/user/saveCheckout",json={'id':id,'update':update},headers=headers)
        #print(response,response.json())
        if response.status_code == 200:
            return response.json()
        return response.json()

def updateCheckout(data,user=None,checkout_id=None,server=None,update=None):
    if user:
        headers = {
            'Content-Type': 'application/json',
            'x-auth-token':user
        }
        response = requests.post(server+":8081/api/models/user/updateCheckout",json=data,headers=headers)
        #print(response,response.json())
        if response.status_code == 200:
            return response.json()
        return response.json()