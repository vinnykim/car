import pymongo
from datetime import datetime
import requests
import json

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["carservice"]

class myDB:
    def __init__(self):
        self.check_collection()
       
    def check_collection(self):
        self.users = mydb["user"]
        self.Services = mydb["service"]
        self.Book = mydb["booking"]
        self.Category = mydb["category"]
    def current_time(self):
        return datetime.now()
    def create_user(self,user):
        x = self.users.insert_one(user)
        return x.inserted_id
    def get_user(self,user):
        x = self.users.find_one(user,{ "_id": 1})
        print(x)
        if x != None:
            return x['_id']
        return x
    def get_services(self):
        x = self.Services.find()
        s = []
        for c in x:
            s.push(c)
        return s
    def get_Service(self,id):
        x = self.Services.find_one({'key':id})
        return x
    def get_categories(self,service):
        x = self.Service.find_one({'_id':service})
        s = []
        for c in x['categories']:
            x = self.Category.find_one({'_id':x})
            s.push(x)
        return s
    def book_service(self,data,user,book_data=None):
        x = book_data if book_data else {}
        x['service'] = data['_id']
        x['user'] = user
        x = self.Book.insert_one(x)
        return x    

def getService(id):
    db = myDB()
    result = db.get_Service(id)
    if result:
        return result
    return False
def bookService(server=None,user=None,book_data=None,id=None):
    if id == None:
        return {'message':"Service Id not Provided"}
    if server and user:
        headers = {
            'Content-Type': 'application/json',
            'x-auth-token':session.get('user')
        }

        response = requests.post(server+":8081/api/models/user/Book",
            json=book_data,
            headers = headers
        )
        if response.status_code == 200:
            return response.json()
        return response.json()
    return False

def Login(username,password,server=None):
    #handle lof=gin function and return either true or false
    data = {
        'email':username,
        'password':password
    }
    if server != None:
        response = requests.post(server+":8081/api/auth",json=data)
        if response.status_code == 200:
            result = response.json()
            return result
        return response.json()
    return False
def Register(username,password,email,phone,server=None):
    db = myDB()
    if server:
        data = {
            'name':username,
            'phone':phone,
            'email':email,
            'password':password,
        }
    
    response = requests.post(server+":8081/api/users/register",json=data)
    if response.status_code == 200:
        result = response.json()
        return result
    return response.json()
    
def getVehicles():
    file = open("vehicles.list","r")
    lines = file.readlines()
    file.close()
    
    return lines
def getCategories(id=None,server=None,key=None):
    if id == None:
        return []
    
    categories =[]
    response = requests.post(server+":8081/api/models/user/getCategories/"+id)
    if response.status_code == 200:
        res = response.json()
        for x in res["categories"]:
            categories.append(x)
        return categories
    else:
        return False
def getServices(server=None):
    db = myDB()
    response = requests.post(server+":8081/api/models/user/getServices",json={})
    services = []
    if response.status_code == 200:
        res = response.json()
        for x in res["services"]:
            services.append(x)
    print(services)
    return services