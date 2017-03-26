$(document).ready(function(){
	var fahrenheit = '';
	var celsius = '';
	var mph = '';
	var kph = '';
	
	// Get geolocation
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			lat =  position.coords.latitude;
			lon = position.coords.longitude;
			getWeatherData(lat, lon);
		});
	}
	
	function getWeatherData(lat, lon){
		$.ajax( {
			url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=c0b465e34d79b6eb1187c246c6822716',
			success: function(response) {
				var iconUrl = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png';
				convertTemps(response.main.temp);
				convertWindSpeeds(response.wind.speed);
				updateBackground(response.weather[0].id);
				
				$('#location').text(response.name + ', ' + response.sys.country);
				$('#weatherIcon').prop('src', iconUrl);
				$('#weatherMain').text(response.weather[0].main);
				$('#weatherDescription').text(response.weather[0].description);
				$('#temperature').text(fahrenheit); // Default to fahrenheit
				$('#humidity').text(response.main.humidity + '%');
				$('#wind').text(mph); // Default to miles per hour
			},
			error: function(response) {
				alert('There was an error in retrieving information from http://openweathermap.org');
			}
		});
		
	};
	
	
	// Converts kelvin to fahrenheit and celsius
	function convertTemps(kelvin){
		fahrenheit = Math.round(1.8 * (kelvin - 273) + 32);
		celsius = Math.round(kelvin - 273);
	};


	// Conver meters per second to miles per hour and kilometers per hour
	function convertWindSpeeds(windMeterPerSec){
		mph = Math.round(windMeterPerSec * 2.23694);
		kph = Math.round(3.6 * windMeterPerSec);
	};

	
	// Toggles temperature values between fahrenheit and celsius
	$("#temp-toggle").change(function(){
		if($("#temp-toggle").is(':checked')){
			$('#temperature').text(fahrenheit);
		} else {
			$('#temperature').text(celsius);
		}
	});
	
	
	// Toggles wind values between miles per hour and kilometers per hour
	$("#wind-toggle").change(function(){
		if($("#wind-toggle").is(':checked')){
			$('#wind').text(mph);
		} else {
			$('#wind').text(kph);
		}
	});
	
	// Updates the body background based on the weatherID passed
	function updateBackground(weatherID){
		weatherID = Math.floor(weatherID / 100);
		switch(weatherID){
			case 2:
			case 3:
			case 4:
			case 5:
				$("body").css("background-image", 'url("img/200-599.jpg")');	
				break;
			case 6:
				$("body").css("background-image", 'url("img/600-699.jpg")');
				break;
			case 7:
				$("body").css("background-image", 'url("img/700-799.jpg")');
				break;
			case 8:
					$("body").css("background-image", 'url("img/800.jpg")');
				break;
			default:
				$("body").css("background-image", 'url("img/other.jpg")');
		}
	};
	
});

