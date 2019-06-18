// Fetch data from an API and show it in the DOM.
//Save the data on the Storage and use it when the user reload to immediately update the DOM while fetching new data from the API.
var list = {};

window.onload = function() {
  fetchData();
};

async function fetchData() {
  let listStored = sessionStorage.getItem("people");
  if (listStored != null) {
    list = JSON.parse(listStored);
    document.getElementById("listPeople").innerHTML = listData(list);
  }
  let nListOld = Object.keys(list).length;
  document.getElementById("spnCounter").innerHTML = nListOld;
  let listAPI = await fetch("https://randomuser.me/api/?results=10");
  listAPI = await listAPI.json();
  listAPI = listAPI.results;

  let nListAPI = listAPI.length + nListOld;
  let listNew = {};
  for (let i = nListOld; i < nListAPI; i++) {
    listNew[i] = listAPI[i - nListOld];
  }
  document.getElementById("listPeople").innerHTML += listData(listNew);
  list = Object.assign(list, listNew);
  nListOld = Object.keys(list).length;
  document.getElementById("spnCounter").innerHTML = nListOld;
  sessionStorage.setItem("people", JSON.stringify(list));
}

function listData(listRender) {
  let content = "";
  for (let key in listRender) {
    content += `<li>
      <img src="${listRender[key].picture.medium}" />
      <span>${listRender[key].name.first} ${listRender[key].name.last}</span>
    </li>`;
  }
  return content;
}