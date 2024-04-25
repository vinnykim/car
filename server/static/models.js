
const api = ""

class Session {
	constructor(){
		document.cookie = "session=false";
		if(!this.get("loggedIn")){
			document.cookie = "token=None"
		}
		if(!this.get("token")){
			document.cookie = "token=false"
		}
		if(!this.get("company")){
			document.cookie = "company=false"
		}
	}
	
	check(session=false){
		return document.cookie
	}
	get(session){
		if(session){
			session = session.replace(" ","");
			let cookie = document.cookie;
			const slits = cookie.split(";");
			for(const slit of slits){
				let sls = slit.split("=");
				
				if( sls[0].replace(" ","") === session){
				
					this.session = sls[1].replace(" ","");
					if(this.session === "false" || this.session === "False" || this.session === "None"){return false}
					return this.session
				}
			}
			return false
		}
		return false;
	}
	set(session){
		document.cookie = session;
	}
	delete(){
		this.set("company=false")
		this.set("token=None")
		this.set("user=false")
		
		console.log(document.cookie)
	}
	toJson(session){
		return JSON.parse(session);
	}
} 

async function fetchFunction(apiUrl, payload, method,nextFunction,token) {
    try {
     
      const session = new Session()
      const options = {
        method: method || 'GET', // Default to GET if method is not provided
        headers: {
          'Content-Type': header || 'application/json', // Set content type to JSON
          "x-auth-token": token,
        }
      };
  
      if (payload) {
        options.body = JSON.stringify(payload); // Include payload in request body if provided
      }
  
      const response = await fetch(api+apiUrl, options);
    
      const data = await response.json();
      nextFunction(data); // Send data to the next function
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  
function createAlert(data){
    alert(data.message)
}

const modules = {}

$(document).ready(function()){
	modules.addReview = (id,elm) =>{
		$(".new-review").submit(function(e){
			e.preventDefault()
			fetchFunction("/api/models/user/addReview/"id,{rating:$(".review").val(),description:$(".desc").val)},"post",function(data){
				
			},token='{{session.get["user"]}}')
			return false;
		})
		$("#"+elm).html(`
			<form class='new-review' >
				<div class="form-group">
					<input type="number" clas="form-control review" min="1" max="5" />
				</div>
				<div class="form-group">
					<textarea class="form-control desc" >Your review Description</textarea>
				</div>
				<button type="submit" clas="btn btn-primary">Submit</button>
			</form>
		`)
	}
}

