function goToWebPage(webPage) {
  //changes the website location
  window.location = webPage;
}

$("#mapButton").click(function () {
  goToWebPage("map.html");
});

var ocean;
//function navigateTo(location){
//var loc = location.replace(" ", "+")
//var google_loc = "https://www.google.com/maps/dir/?api=1&destination=" + loc + "&travelmode=walking"
//goToWebPage(google_loc)
//}

var image = document.createElement("img");

$("area").click(function () {
  ocean = event.target;
  displayInfo(ocean.title);
});

function displayInfo(oceanClicked) {
  if (oceanClicked == "Atlantic Ocean") writeToTable(Atlantic);
  else if (oceanClicked == "Pacific Ocean") writeToTable(Pacific);
  else if (oceanClicked == "Indian Ocean") writeToTable(Indian);
  else if (oceanClicked == "Southern Ocean") writeToTable(Southern);
  else if (oceanClicked == "Arctic Ocean") writeToTable(Arctic);
  else if (oceanClicked == "Mediterranean Sea") writeToTable(Maditerranean);
  else if (oceanClicked == "Baltic Sea") writeToTable(Baltic);
}

function placeImage(left, top, level) {
  image.src = "Image/level" + level + ".png";
  image.style.position = "absolute";
  image.style.zIndex = "3";

  if (level == 1) changeSize(130, 70);
  if (level == 2) changeSize(150, 150);
  if (level == 3) changeSize(150, 150);

  image.style.left = left - image.width / 2 + "px";
  image.style.top = top - image.height / 2 + "px";

  document.getElementById("mainContent").appendChild(image);
  console.log("click");
}

function changeSize(height, width) {
  image.style.width = width + "px";
  image.style.height = height + "px";
}

function changeContinent(continent_name, amount_found) {
  document.getElementById("continent").innerHTML = continent_name;
  document.getElementById("found").innerHTML =
    amount_found + " Contaminents Found";
}

var locationItems = [];
var average;

let filter = (loc) => {
  if (Atlantic.contains(loc)) Atlantic.add(loc);
  else if (Pacific.contains(loc)) Pacific.add(loc);
  else if (Indian.contains(loc)) Indian.add(loc);
  else if (Arctic.contains(loc)) Arctic.add(loc);
  else if (Baltic.contains(loc)) Baltic.add(loc);
  else if (Southern.contains(loc)) Southern.add(loc);
  else if (Mediterranian.contains(loc)) Mediterranian.add(loc);
};

$.get(
  "https://services6.arcgis.com/C0HVLQJI37vYnazu/arcgis/rest/services/Estimate_of_Plastic_Pollution_in_the_World_s_Oceans_1_01_4_75/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json",
  function (items) {
    locationItems = items.features;

    locationItems.forEach((loc) => {
      filter(loc.attributes);
    });

    console.log("pacific amount: ", Pacific.opMaxLong());
    average = 653;
  }
);

function writeToTable(Ocean) {
  console.log(Ocean);
  changeContinent(Ocean.name(), Ocean.coordinateCount());
  if (Ocean.count > average - average / 3)
    placeImage(event.clientX, event.clientY, 3);
  else if (Ocean.count > average - (average / 3) * 2)
    placeImage(event.clientX, event.clientY, 2);
  else placeImage(event.clientX, event.clientY, 1);
  var tableRow = document.getElementById("tableRow");
  tableRow.innerHTML = "";
  for (let i = 0; i < Ocean.count; i++) {
    tableRow.innerHTML +=
      "<tr>" +
      "<th scope='row'>" +
      (i + 1) +
      "</th>" +
      "<td>" +
      array[i].LONGITUDE +
      "</td>" +
      "<td>" +
      array[i].LATITUDE +
      "</td>" +
      "</tr>";
  }
}
