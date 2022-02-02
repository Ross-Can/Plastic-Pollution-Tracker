class Ocean {
  #name;
  #latitudeRange = new Array(2);
  #longitudeRange = new Array(4);
  #coversBothMapEdges = false;
  #mapCoordinates = [];
  #count = 0;
  #table = "";

  constructor(
    name,
    minLatitude,
    maxLatitude,
    minLongitude,
    maxLongitude,
    opMinLong,
    opMaxLong
  ) {
    this.#name = name;
    this.#latitudeRange[0] = minLatitude;
    this.#latitudeRange[1] = maxLatitude;
    this.#longitudeRange[0] = minLongitude;
    this.#longitudeRange[1] = maxLongitude;

    if (opMinLong != undefined && opMaxLong != undefined) {
      this.#longitudeRange[2] = opMinLong;
      this.#longitudeRange[3] = opMaxLong;
      this.#coversBothMapEdges = true;
    }
  }

  name = () => this.#name + " Ocean";

  minLat = () => this.#latitudeRange[0];

  maxLat = () => this.#latitudeRange[1];

  minLong = () => this.#longitudeRange[0];

  maxLong = () => this.#longitudeRange[1];

  opMinLong = () => this.#longitudeRange[2];

  opMaxLong = () => this.#longitudeRange[3];

  getTable = () => this.#table;

  add(coordinates) {
    this.#mapCoordinates.push(coordinates);
    this.#count++;
    this.#table +=
      "<tr>" +
      "<th scope='row'>" +
      this.#count +
      "</th>" +
      "<td>" +
      coordinates.LATITUDE +
      "</td>" +
      "<td>" +
      coordinates.LONGITUDE +
      "</td>" +
      "</tr>";
  }

  coordinateCount() {
    return this.#count;
  }

  //checks if the loc object's latitide is between points
  #betweenLatPoints = (latitude) =>
    latitude > this.minLat() && latitude < this.maxLat();

  //checks if the loc object's logitude is between points
  #betweenLongPoints = (longitude) =>
    longitude > this.minLong() && longitude < this.maxLong();

  #checkForWrap = (longitude) =>
    longitude > this.opMinLong() && longitude < this.opMaxLong();

  contains = (LOC) => {
    const { LONGITUDE: LONG, LATITUDE: LAT } = LOC;
    let wrapPresent = false;

    if (this.#coversBothMapEdges) wrapPresent = this.#checkForWrap(LONG);

    return (
      this.#betweenLatPoints(LAT) &&
      (this.#betweenLongPoints(LONG) || wrapPresent)
    );
  };
}

let Atlantic = new Ocean("Atlantic", -60, 68.63, -98.05, 20.0);
let Pacific = new Ocean("Pacific", -60, 58.21, 128.69, 180, -67.25, -180.25);
let Indian = new Ocean("Indian", -60, 31.18, 20, 146);
let Arctic = new Ocean("Arctic", 51.14, 90, -180, 180);
let Baltic = new Ocean("Baltic", 52.65, 67.08, 9.36, 37.46);
let Southern = new Ocean("Southern", -85.56, -60, -180, 180);
let Mediterranian = new Ocean("Mediterranian", 30.26, 45.78, -6.03, 36.21);
