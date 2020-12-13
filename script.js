// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass");
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required!");
         event.preventDefault();
         return;
      }

      if (!typeof pilotName.value === 'string' || !typeof copilotName.value === 'string' || parseInt(fuelLevel.value) === NaN|| parseInt(cargoMass.value) === NaN) {
         alert("Field type invalid!");
         event.preventDefault();
         return;
      }

      document.getElementById("faultyItems").style.visibility= "visible";

      let pilotStatus = document.getElementById("pilotStatus");
      pilotStatus.innerHTML = `${pilotName.value} Ready`;
      let copilotStatus = document.getElementById("copilotStatus");
      copilotStatus.innerHTML = `${copilotName.value} Ready`;
      let launchStatus = document.getElementById("launchStatus");

      if (parseInt(fuelLevel.value) < 10000) {
         let fuelLevelInput = document.getElementById("fuelStatus");
         fuelLevelInput.innerHTML = `Not enough fuel for the journey.`;
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         launchStatus.style.color="red";
      }

      if (parseInt(cargoMass.value) > 10000) {
         let cargoStatus = document.getElementById("cargoStatus");
         cargoStatus.innerHTML = `Too much mass for shuttle liftoff.`
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         launchStatus.style.color="red";
      }

      if (launchStatus.style.color != "red") {
         launchStatus.innerHTML = `Shuttle is ready for launch!`;
         launchStatus.style.color="green";
      }

      

      fetch ("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        response.json().then( function(json) {
          let mars = json[3]

          let missionTarget = document.getElementById("missionTarget");
          missionTarget.innerHTML = `<h2>Mission Destination</h2>
          <ol>
             <li>Name: ${mars.name}</li>
             <li>Diameter: ${mars.diameter}</li>
             <li>Star: ${mars.star}</li>
             <li>Distance from Earth: ${mars.distance}</li>
             <li>Number of Moons: ${mars.moons}</li>
          </ol>
          <img src="${mars.image}">` 

        });
      })

      

      event.preventDefault();
   });
});
