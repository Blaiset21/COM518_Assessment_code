
//Part B - task 5 allows users to create a point of interest
async function poiAdd() {
	const PointOfInterest= {
		name: document.getElementById('name').value,
		type: document.getElementById('type').value,
		country: document.getElementById('country').value,
		region: document.getElementById('region').value,
        lon: document.getElementById('lon').value,
		lat: document.getElementById('lat').value,
		description: document.getElementById('description').value
	};
	
	const response = await fetch(`http://localhost:3000/POI/POI/create`, {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify(PointOfInterest)
	});
// Part C - task 7 Adding simple error checking
	if(response.status == 200) {
		const Creation = document.createTextNode	
		("Successfully created a Point of Interest");
		document.getElementById('results').appendChild(Creation);
	} else if(response.status == 400) {
		const Creation = document.createTextNode
		("Please do not leave Blank Fields while adding a Poin of Interest");
		document.getElementById('results').appendChild(Creation);
	} else if(response.status == 401) {
		const Creation = document.createTextNode
		("You must be logged in before creating a Point of Interest");
		document.getElementById('results').appendChild(Creation);
	} else {
		alert(`Unknown error: code ${response.status}`);
	}
	}


document.getElementById('add').addEventListener('click', ()=> {
	poiAdd();
});
