$(document).ready(function() {
    var apiKey = "7cf78a66d77ca9e840ebb49ccd79461e" // Enter your API Key here
    console.log(`state_info is: ${state_info}`) // Notice the templating here, use that when you form your url


    // TODO
    // Iterate over the state_info array and call the api for each state_name to get the current temperature
    // Example to call the api using state_name
    // This should be done inside the for loop
    var states = document.getElementsByTagName('path');
    //console.log(state_info[states[0].id]);
    for (let i = 0; i < 50; i++) {
      let name = states[i].id;
      var state_obj = state_info[name];
      let url =`https://api.darksky.net/forecast/7cf78a66d77ca9e840ebb49ccd79461e/` + state_info[name]['lat'] + `,` + state_info[name]['lng'];
      console.log(name, url);
      var temperature = 0;
      $.ajax({url:url, dataType:"jsonp"}).then(function(data) {
                  temperature = data.currently.temperature;
                  console.log(i, name, temperature, url);
                  if (temperature <= 10) {
                    $('#' + name).css('fill', "#6495ED");
                  }
                  else if (temperature < 20) {
                    $('#' + name).css('fill', "#7FFFD4");
                  }
                  else if (temperature < 30) {
                    $('#' + name).css('fill', "#0000FF");
                  }
                  else if (temperature < 40) {
                    $('#' + name).css('fill', "#008B8B");
                  }
                  else if (temperature < 50) {
                    $('#' + name).css('fill', "#00BFFF");
                  }
                  else if (temperature < 60) {
                    $('#' + name).css('fill', "#F08080");
                  }
                  else if (temperature < 70) {
                    $('#' + name).css('fill', "#CD5C5C");
                  }
                  else if (temperature < 80) {
                    $('#' + name).css('fill', "#8B0000");
                  }
                  else if (temperature <= 90){
                    $('#' + name).css('fill', "#B22222");
                  }
                  else {
                    $('#' + name).css('fill', "#FF0000");
                  }
      });
    }
});
