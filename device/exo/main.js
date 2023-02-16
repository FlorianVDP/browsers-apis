const batteryWrapper = document.getElementById("batteryWrapper");
const batt = document.getElementById("batt");
const level = document.getElementById("level");
const charging = document.getElementById("charging");
const chargingTime = document.getElementById("chargingTime");
const dischargingTime = document.getElementById("dischargingTime");
const networkWrapper = document.getElementById("networkWrapper");
const type = document.getElementById("type");
const effectiveType = document.getElementById("effectiveType");
const downlink = document.getElementById("downlink");
const downlinkMax = document.getElementById("downlinkMax");
const saveData = document.getElementById("saveData");
const memoryWrapper = document.getElementById("memoryWrapper");
const memory = document.getElementById("memory");

navigator.getBattery().then((res) => {
  res.addEventListener("chargingchange", () => {});
  battery.addEventListener("levelchange", () => {});
  battery.addEventListener("dischargingtimechange", () => {});
  charging.textContent = res.charging;
  level.textContent = res.level * 100 + "%";
  batt.style.width = res.level * 100 + "%";
  batt.style.backgroundColor =
    res.level < 0.2 ? "red" : res.level < 0.6 ? "orange" : "green";
  dischargingTime.textContent =
    res.dischargingTime === "Infinity"
      ? res.dischargingTime
      : res.dischargingTime / 60 + "min";
  battery.addEventListener("chargingtimechange", () => {});
  chargingTime.textContent =
    res.chargingTime === "Infinity" ? res.chargingTime : res.chargingTime / 60;
});
function getConnection() {
  return (
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection ||
    navigator.msConnection
  );
}
function updateInfos(info) {
  type.textContent = info.type;
  effectiveType.textContent = info.effectiveType;
  downlink.textContent = info.downlink + " Mbps";
  downlinkMax.textContent = info.downlinkMax + " Mbps";
  saveData.textContent = info.saveData;
}
const connectType = new Promise((resolve, reject) => {
  if (getConnection()) {
    resolve(getConnection());
  } else {
    reject("navigator.connection is not supported");
  }
});
connectType.then((res) => updateInfos(res));

const deviceMemory = new Promise((resolve, reject) => {
  if (navigator.deviceMemory) {
    resolve(navigator.deviceMemory);
  } else {
    reject("navigator.deviceMemory is not supported");
  }
});

deviceMemory.then((res) => {
  memory.textContent = res + " GiB";
});
