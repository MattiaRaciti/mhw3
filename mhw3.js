const endpoint_token = '';
const endpoint = 'https://accounts.spotify.com/api/token';
const access_key = '35d3fc6d1fb64e9d98313aea93aa1640';
const secret_key = '07ecbcbbe0f94db5b2ade2787f735c70';

const content = '';

let token_data;

addEventListener('submit', search);

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com',
		'X-RapidAPI-Key': '9d303c9a33msh1c49b8e3844c91fp1f2a07jsnc53c380992bd'
	}
};

fetch(endpoint,
{
	method: 'POST',
	body: 'grant_type=client_credentials',
	headers:
	{
		'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization': 'Basic ' + btoa(access_key + ':' + secret_key)
	}
}
).then(onTokenResponse).then(getToken);


function onTokenResponse(response){
	console.log('Risposta ricevuta');
	console.log(response);
	return response.json();
}

function getToken(json)
{
	token_data = json;
	console.log(json);
}

function search(event){
	event.preventDefault();
	
	const content = document.querySelector('#content').value;
	
	
	if(content) {
		const text = encodeURIComponent(content);
		console.log('Eseguo ricerca elementi riguardanti: ' + text);
		
		const tipo = document.querySelector('#tipo').value;
		console.log('Ricerco elementi di tipo: ' +tipo);
		
		if(tipo === "album"){			
			fetch('https://api.spotify.com/v1/search?type=album&q=' + text, 
				{
					headers: {
						'Authorization': token_data.token_type + ' ' + token_data.access_token,
					}
				}).then(onResponse).then(onJsonAlbum);
		}
		
		if(tipo == "exercise"){
			event.preventDefault();
			rest_url = 'https://bing-image-search1.p.rapidapi.com/images/search?q=' + text + '&count=10';
			console.log('URL; ' + rest_url);
			fetch(rest_url, options).then(onResponse).then(onJson);
		}
	}
	else {
		alert("Inserisci il testo per cui effettuare la ricerca");
	}
}

function onJson(json){
	console.log(json);
	const library = document.querySelector('#library-view');
	library.innerHTML = '';
	const cover_url = json.value[1].thumbnailUrl;
	const img = document.createElement('img');
	img.src = cover_url;
	library.appendChild(img);
}

function onJsonAlbum(json) {
  console.log('JSON ricevuto');
  console.log(json);
  const results = json.albums.items;
  const album_data = results[1];
  const library = document.querySelector('#library-view');
  library.innerHTML = '';
  
  const selected_image = album_data.images[0].url;
  const img = document.createElement('img');
  img.src = selected_image;
  
  const caption = document.createElement('span');
  caption.textContent = album_data.name;
  
  const album = document.createElement('div');
  album.classList.add('album');
  
  album.appendChild(caption);
  album.appendChild(img);
  library.appendChild(album);
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}







