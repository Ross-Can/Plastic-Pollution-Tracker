$.get(
  "https://services6.arcgis.com/C0HVLQJI37vYnazu/arcgis/rest/services/Estimate_of_Plastic_Pollution_in_the_World_s_Oceans_1_01_4_75/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json",
  function (items) {
    items.features.forEach((loc) => {
      filter(loc.attributes);
    });

    average = 268;
  }
);

let filter = (loc) => {
  if (Atlantic.contains(loc)) Atlantic.add(loc);
  else if (Pacific.contains(loc)) Pacific.add(loc);
  else if (Indian.contains(loc)) Indian.add(loc);
  else if (Arctic.contains(loc)) Arctic.add(loc);
  else if (Baltic.contains(loc)) Baltic.add(loc);
  else if (Southern.contains(loc)) Southern.add(loc);
  else if (Mediterranian.contains(loc)) Mediterranian.add(loc);
};

$("area").click(function () {
  console.log("click");
  displayOceanData(this.title);
});

let displayOceanData = (oceanClicked) => {
  if (oceanClicked == "Atlantic Ocean") displayData(Atlantic);
  else if (oceanClicked == "Pacific Ocean") displayData(Pacific);
  else if (oceanClicked == "Indian Ocean") displayData(Indian);
  else if (oceanClicked == "Southern Ocean") displayData(Southern);
  else if (oceanClicked == "Arctic Ocean") displayData(Arctic);
  else if (oceanClicked == "Mediterranean Sea") displayData(Mediterranean);
  else if (oceanClicked == "Baltic Sea") displayData(Baltic);
};

let displayData = (Ocean) => {
  changeTableTitle(Ocean);
  changeCursor(Ocean);
  writeToTable(Ocean);
};

let changeTableTitle = (Ocean) => {
  document.getElementById("ocean").innerHTML = Ocean.name();
  document.getElementById("found").innerHTML =
    Ocean.coordinateCount() + " Instances Found";
};

let writeToTable = (Ocean) => {
  let table = document.getElementById("tableRow");
  table.innerHTML = Ocean.getTable();
};

function hideTable() {}

let changeCursor = (Ocean) => {
  let count = Ocean.coordinateCount();
  if (count > average - average / 3) cursorLevel(3);
  else if (count > average - (average / 3) * 2) cursorLevel(2);
  else cursorLevel(1);
};

let cursorLevel = (level) => {
  $("area").css({
    cursor: "url('assets/cursors/level" + level + "-cursor.png'), auto",
  });
};

function goToWebPage(webPage) {
  //changes the website location
  window.location = webPage;
}

$("#mapButton").click(function () {
  goToWebPage("map.html");
});

//function navigateTo(location){
//var loc = location.replace(" ", "+")
//var google_loc = "https://www.google.com/maps/dir/?api=1&destination=" + loc + "&travelmode=walking"
//goToWebPage(google_loc)
//}
