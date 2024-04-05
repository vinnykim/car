import stripe
import requests
import json

# Set your secret API key
stripe.api_key = 'your_secret_api_key'



def createCheckout(data,user=None,cart=None,server=None):
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'product_data': data,
                        'unit_amount': cart.amount,  # amount in cents
                    },
                    'quantity': cart.pending.length,
                },
            ],
            mode='payment',
            success_url=server+'/cart?checkout=success',
            cancel_url=server+'/cart?checkout=cancel',
        )
        session_id = checkout_session.id
        return session_id
    except Exception as e:
        print("erro->stripe_pay => ",str(e))
        pass
    return None

def saveCheckout(user=None,id=None,server=None,update=None):
    if user and id:
        headers = {
            'Content-Type': 'application/json',
            'x-auth-token':user
        }
        response = requests.post(server+":8081/api/models/user/saveCheckout",json={'id':id,'update':update},headers=headers)
        print(response,response.json())
        if response.status_code == 200:
            return response.json()
        return response.json()