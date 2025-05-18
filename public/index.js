const map = L.map ("map1");

const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";
//Part B - task 4 use a Html and AJAX page that allows users to search for all points of interest in a given region
//Part B - task 6 Modify the code so that a recommend button is created for each search result allowing the user to reccomend a POI.
//Part D - task 8 Add a map using leaflet and open street map

L.tileLayer
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: attrib } ).addTo(map);

//F Implementing a review system
async function reviewLocation (review, id) {
	const reviewDetails = { poi_id: id,
		review: review.value
		};
		const response = await fetch(`http://localhost:3000/review/review/create`, {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify(reviewDetails)
		});
		if (response.status == 200) {
			alert(`Thank you for your review of this location`)
		} else if (response.status == 400) {
			alert(`Error: please do not leave blank fields for the loaction`);
		} else if (response.status == 401) {
			alert(`You are not logged in please login first to continue`);
		} else if (response.status == 404) {
			alert('Error: Point of interest not found')
		} else {
			alert(`Error, code: ${response.status}, creation unsucessful`);
		}
}


async function poiSearch(region) {
	
	const response = await fetch(`http://localhost:3000/POI/region/${region}`)
	
	const POIs = await response.json()

    let html = "";
	const results = document.getElementById('results');

	document.getElementById('results').innerHTML = "";
	POIs.forEach(POI => {
		const locations = document.createElement("p");

		const location = document.createTextNode
		(`Name: ${POI.name}, Region: ${POI.region}, Type: ${POI.type}, Description: ${POI.description}, Recommendations: ${POI.recommendations}`);

				
		locations.appendChild(location);

		results.appendChild(locations);


		map.setView([POI.lat, POI.lon], 13);
		const reviewDiv = document.createElement('div');
		const marker = L.marker([POI.lat,POI.lon]).addTo(map);
		const mapinfo = document.createTextNode
		(`Name: ${POI.name}, Description: ${POI.description}, `);
		const leaveAReview = document.createTextNode
		(`Leave a review for this place below: `);
		const review = document.createElement('input');
		const reviewButton = document.createElement('input'); 
		reviewButton.setAttribute('type', 'button');
		reviewButton.setAttribute('value','Review')
		reviewButton.setAttribute('id', `POI${POI.id}`);
		reviewDiv.appendChild(mapinfo);
		reviewDiv.appendChild(leaveAReview);
		reviewDiv.appendChild(review);
		reviewDiv.appendChild(reviewButton);
		marker.bindPopup(reviewDiv); 
		reviewButton.addEventListener('click', ()=> {
			reviewLocation(review, POI.id);
		})

		const buttonElement = document.createElement('input'); 
		buttonElement.setAttribute('type', 'button');
		buttonElement.setAttribute('value', 'Reccomend this Location')
		buttonElement.setAttribute('id', `POI${POI.id}`); 
		
		buttonElement.addEventListener ("click", async(e) => {	
			const locations = {
					qty: document.getElementById(`POI${POI.id}`).value,
			};
			const response = await fetch(`http://localhost:3000/POI/POI/${POI.id}/recommend`, {	

				method: 'POST',
				headers: {
					'Content-Type' : 'application/json'
				},
				body: JSON.stringify(locations)
			});
			if(response.status == 200) {
				alert('Thank you for recommending this location');
			} else if(response.status == 401) {
				alert('You must be logged in to recommend a location please login before recommending a location')
			}  else {
				alert(`Error, code: ${response.status}`);
			}
		});
		results.appendChild(buttonElement);
		});
	//Did this for task 4 however removed for modifcation for task 6
	//document.getElementById('results').innerHTML = html;
}

document.getElementById('search').addEventListener('click', ()=> {
	const region = document.getElementById('region').value;
    poiSearch(region);
});

// Part D task 9 allow the user to add a point of interest 

map.on("click", (e) => {
	const form = document.getElementById("form").hidden = false;
	document.getElementById('lat').value = e.latlng.lat;
	document.getElementById('lon').value = e.latlng.lng;
	document.getElementById('region1').value = document.getElementById('region').value;
});

//Part E task 10 impelent a session based login system

async function ajaxLogin(username, password) {
	const login = {
		username: username,
		password: password
	};
	const response = await fetch('http://localhost:3000/users/login', {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify(login)
	});
	if(response.status == 200) {
		alert(`welcome ${username}`)
		onLoggedin(login)
	} else if(response.status == 401) {
		alert("error incorrect login please login correctly")
		onLoggedout
	}
}

async function ajaxLogut() {
	const response = await fetch('http://localhost:3000/users/logout', {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
	});
	alert("sucessfully logged out")
	onLoggedout();
}

async function onLoggedin (user) {
	const status = document.getElementById("loginStatus");
	const logout = document.getElementById("logout");
	const login = document.getElementById("login");
	logout.style.display = "block";
	login.style.display = "none";
	document.getElementById("user").innerHTML = user.username;
	const logoutElement = document.getElementById("logoutButton");
	logoutElement.addEventListener('click', ()=> {
		ajaxLogut();
	});
}

async function onLoggedout () {
	const status = document.getElementById("loginStatus");
	const logout = document.getElementById("logout");
	const login = document.getElementById("login");
	logout.style.display = "none";
	login.style.display = "block";
	const username = document.getElementById("Username");
	const password = document.getElementById("Password");
	const loginElement = document.getElementById("loginButton");
	loginElement.addEventListener('click', ()=> {
		ajaxLogin(username.value, password.value);
	});
}
	
	
window.addEventListener("load", async(e) => {
	const response = await fetch(`http://localhost:3000/users/loggedIn`)
	const user = await response.json();
	if(user.username == null) {
		onLoggedout();
	} else {
		onLoggedin(user);
	}

	document.getElementById('add').addEventListener('click',(e1)=> {
		addToMap();
	});

	async function addToMap() {
		const name = document.getElementById("name").value;
		const type = document.getElementById("type").value;
		const country = document.getElementById("country").value;
		const region = document.getElementById("region1").value;
		const lat = document.getElementById("lat").value;
		const lon = document.getElementById("lon").value;
		const description = document.getElementById("description").value;
		const details = { name: name,
		type: type, 
		country: country,
		region: region,
		lat :lat,
		lon: lon,
		description: description
		};
		
		const response2 = await fetch(`http://localhost:3000/POI/POI/create`, {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify(details)
		});

		const results  = document.getElementById('addResults');
		if(response2.status == 200) {
			const json = await response2.json();
			results.innerHTML = "";
			const Creation = document.createTextNode	
			("Successfully created a Point of Interest");
			results.appendChild(Creation);
			const reviewDiv = document.createElement('div');
			const marker = L.marker([lat,lon]).addTo(map);
			const mapinfo = document.createTextNode
			(`Name: ${name}, Description: ${description}, `);
			const leaveAReview = document.createTextNode
			(`Leave a review for this place below: `);
			const review = document.createElement('input');
			const reviewButton = document.createElement('input'); 
			reviewButton.setAttribute('type', 'button');
			reviewButton.setAttribute('value','Review')
			reviewButton.setAttribute('id', `POI${json.id}`);
			reviewDiv.appendChild(mapinfo);
			reviewDiv.appendChild(leaveAReview);
			reviewDiv.appendChild(review);
			reviewDiv.appendChild(reviewButton);
			marker.bindPopup(reviewDiv); 
			reviewButton.addEventListener('click', ()=> {
				reviewLocation(review, json.id);
			})
		} else if(response2.status == 400) {
			results.innerHTML = "";
			const Creation = document.createTextNode
			("Please do not leave Blank Fields while adding a Poin of Interest");
			results.appendChild(Creation);
		} else if(response2.status == 401) {
			results.innerHTML = "";
			const Creation = document.createTextNode
			("You must be logged in before creating a Point of Interest");
			results.appendChild(Creation);
		} else {
			alert(`Unknown error: code ${response2.status}`);
		}
	}
});
