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
  if (oceanClicked == "Atlantic Ocean") writeToTable(atlantic);
  else if (oceanClicked == "Pacific Ocean") writeToTable(pacific);
  else if (oceanClicked == "Indian Ocean") writeToTable(indian);
  else if (oceanClicked == "Southern Ocean") writeToTable(southern);
  else if (oceanClicked == "Arctic Ocean") writeToTable(arctic);
  else if (oceanClicked == "Mediterranean Sea") writeToTable(maditerranean);
  else if (oceanClicked == "Baltic Sea") writeToTable(baltic);
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
var atlantic = [];
var pacific = [];
var indian = [];
var arctic = [];
var maditerranean = [];
var baltic = [];
var southern = [];
var average;

$.get(
  "https://services6.arcgis.com/C0HVLQJI37vYnazu/arcgis/rest/services/Estimate_of_Plastic_Pollution_in_the_World_s_Oceans_1_01_4_75/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json",
  function (items) {
    locationItems = items.features;
    console.log(locationItems[1].attributes.LATITUDE);
    for (let i = 0; i < locationItems.length; i++) {
      if (
        lat(locationItems[i]) > -60.0 &&
        lat(locationItems[i]) < 68.63 &&
        lon(locationItems[i]) > -98.05 &&
        lon(locationItems[i]) < 20.0
      )
        atlantic.push(locationItems[i]);
      else if (
        (lat(locationItems[i]) > -60.0 &&
          lat(locationItems[i]) < 58.21 &&
          lon(locationItems[i]) > 128.69 &&
          lon(locationItems[i]) < 180) ||
        (lon(locationItems[i]) < -67.25 && lon(locationItems[i]) > -180)
      )
        pacific.push(locationItems[i]);
      else if (
        lat(locationItems[i]) > -60.0 &&
        lat(locationItems[i]) < 31.18 &&
        lon(locationItems[i]) > 20.0 &&
        lon(locationItems[i]) < 146.89
      )
        indian.push(locationItems[i]);
      else if (
        (lat(locationItems[i]) > 51.14 &&
          lat(locationItems[i]) < 90.0 &&
          lon(locationItems[i]) > -180.0 &&
          lon(locationItems[i]) < 180) ||
        (lon(locationItems[i]) < 180.0 && lon(locationItems[i]) > -180)
      )
        arctic.push(locationItems[i]);
      else if (
        lat(locationItems[i]) > 30.26 &&
        lat(locationItems[i]) < 45.78 &&
        lon(locationItems[i]) > -6.03 &&
        lon(locationItems[i]) < 36.21
      )
        maditerranean.push(locationItems[i]);
      else if (
        lat(locationItems[i]) > 52.65 &&
        lat(locationItems[i]) < 67.08 &&
        lon(locationItems[i]) > 9.36 &&
        lon(locationItems[i]) < 37.46
      )
        baltic.push(locationItems[i]);
      else if (
        lat(locationItems[i]) > -85.56 &&
        lat(locationItems[i]) < -60.0 &&
        lon(locationItems[i]) > -180.0 &&
        lon(locationItems[i]) < 180.0
      )
        southern.push(locationItems[i]);
    }
    average = 653;
  }
);

function lon(item) {
  return item.attributes.LONGITUDE;
}

function lat(item) {
  return item.attributes.LATITUDE;
}

function writeToTable(array) {
  changeContinent(ocean.title, array.length);
  if (array.length > average - average / 3)
    placeImage(event.clientX, event.clientY, 3);
  else if (array.length > average - (average / 3) * 2)
    placeImage(event.clientX, event.clientY, 2);
  else placeImage(event.clientX, event.clientY, 1);
  var tableRow = document.getElementById("tableRow");
  tableRow.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    tableRow.innerHTML +=
      "<tr>" +
      "<th scope='row'>" +
      (i + 1) +
      "</th>" +
      "<td>" +
      lon(array[i]) +
      "</td>" +
      "<td>" +
      lat(array[i]) +
      "</td>" +
      "</tr>";
  }
}
