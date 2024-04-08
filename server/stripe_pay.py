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
def createCheckout(data,user=None,cart=None,server=None,checkout_id=None):
    try:
        #print("checkout",data,user,cart)
        price = createProduct(checkout_id,cart)
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
            success_url=server+'/cart?checkout=success',
            cancel_url=server+'/cart?checkout=cancel',
        )
        
        session_id = checkout_session.id
        #print("session",session_id)
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
            return False
        #print("got session",session)
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