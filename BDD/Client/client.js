const boutonValide = document.querySelector('.valide');
const boutonAnnule = document.querySelector('.retour');

boutonValide.addEventListener('click',()=>{
  var url = "https://vmicro.fr/database/BDD_1.0/API/api.php";
  var data = new FormData();

  var nomClient = document.getElementById('name_client').value;
  

  //console.log(nomClient);
  data.append('action','addClient');
  data.append('name_client',nomClient);

  ajaxPost(url,data,function(reponse){
    console.log("Commande envoyé au serveur");
    console.log(reponse)
    displayListClient();
  });
});
boutonAnnule.addEventListener('click',()=>{
    window.location.href = "../Home/home.php";
});

function updateButton(){
  var gridButtonUpdate = document.querySelectorAll('.buttonUpdate');
  var gridButtonChange = document.querySelectorAll('.buttonChange');

  var tableau = document.getElementById("tableau");
  var trs = tableau.getElementsByTagName("tr");
  var tds = null;
  var input;

  //console.log(gridButtonUpdate.length);
  console.log("test");
  gridButtonChange.forEach(function(item,idx){
    //console.log(item);
    trs[idx].getElementsByTagName("td")[2].style.display = "none";
    item.addEventListener('click',function(){
      //console.log("bouton" + idx + "appuyé");
      tds = trs[idx].getElementsByTagName("td");
      const buffName  = tds[1].innerHTML;

      tds[1].innerHTML = "";

      input = document.createElement("INPUT");
      input.setAttribute("type", "text");
      input.value = buffName;
      tds[1].appendChild(input);

      //console.log(buffName);
      //console.log(buffUnite);

      item.style.display = "none";
      gridButtonUpdate[idx].style.display = "block";
    });
  });
  launchUPDATE(gridButtonUpdate,1);
  /*
  gridButtonUpdate.forEach(function(item,idx){
    item.addEventListener('click',function(){
      tds = trs[idx].getElementsByTagName("td");
      const sendId = tds[0].innerHTML;
      const sendName = tds[1].getElementsByTagName("input")[0].value;

      console.log(sendId);
      console.log(sendName);

      var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=updateCLIENT&id_client="+sendId+"&name_client="+sendName;
      //console.log(url);
      ajaxGet(url,function(reponse){
        console.log(JSON.parse(reponse));
      });
      displayListClient();
    });
  });
  */
}
function desactivateButton(){
  var gridButtonDesactivate = document.querySelectorAll('.buttonDesactivate');
  launchUPDATE(gridButtonDesactivate,0);
}

function deleteButton(){
  var gridButtonDelete = document.querySelectorAll('.buttonDelete');
  var tableau = document.getElementById("tableau");
  var trs = tableau.getElementsByTagName("tr");
  var tds = null;
  //console.log(gridButtonDelete.length);
  gridButtonDelete.forEach(function(item,idx){
    //console.log(item);
    tds = trs[idx].getElementsByTagName("td");
    const sendId = tds[0].innerHTML;
    item.addEventListener('click',function(){
      //console.log("bouton" + idx + "appuyé");
      console.log(sendId);
      var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=deleteCLIENT&id_client="+sendId;
      ajaxGet(url,function(reponse){
        console.log(JSON.parse(reponse));
      });
      displayListClient();
    });
  });
}

function launchUPDATE(grid,sendActivation)
{
  var tableau = document.getElementById("tableau");
  var trs = tableau.getElementsByTagName("tr");
  var tds = null;

  var sendId;
  var sendName;

  grid.forEach(function(item,idx){
    item.addEventListener('click',function(){
      tds = trs[idx].getElementsByTagName("td");

      if(sendActivation == 1)
      {
        sendId = tds[0].innerHTML;
        sendName = tds[1].getElementsByTagName("input")[0].value;
        var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=updateCLIENT&id_client="+sendId+"&name_client="+sendName+"&activation="+sendActivation;
        console.log(url);
        ajaxGet(url,function(reponse){
          console.log(JSON.parse(reponse));
        });
      }
      else {
        sendId = tds[0].innerHTML;
        sendName = tds[1].innerHTML;
        var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=updateCLIENT&id_client="+sendId+"&name_client="+sendName+"&activation="+sendActivation;
        console.log(url);
        if(confirm("Attention ! Cette action va faire disparaitre ce projet ?"))
        {
          ajaxGet(url,function(reponse){
            console.log(JSON.parse(reponse));
          });
        }
      }

      //console.log(sendId);
      //console.log(sendName);

      displayListClient();
    });
  });
}
function displayListClient(){
  var tableau = document.getElementById('tableau');
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=ClientLIST';
  tableau.innerHTML = "";
  ajaxGet(url,function(reponse2){
    resultReq = JSON.parse(reponse2);
    //console.log(resultReq.results[0]);
    //console.log(resultReq.results[0].Nom_Parametre.length);
    var i=0;
    var row;
    var cell;
    var cellText;

    while(i<resultReq.results[0].id_client.length)
    {
      if(resultReq.results[0].activation[i] != 0)
      {
        row = document.createElement("tr");
        cell = document.createElement("td");
        cellText = document.createTextNode(resultReq.results[0].id_client[i]);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(resultReq.results[0].Nom_client[i]);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(resultReq.results[0].activation[i]);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        button = document.createElement("BUTTON");
        buttonText = document.createTextNode("UPDATE");
        button.appendChild(buttonText);
        button.className = "buttonUpdate";
        cell.appendChild(button);

        button = document.createElement("BUTTON");
        buttonText = document.createTextNode("CHANGE");
        button.appendChild(buttonText);
        button.className = "buttonChange";
        cell.appendChild(button);

        row.appendChild(cell);

        cell = document.createElement("td");
        button = document.createElement("BUTTON");
        buttonText = document.createTextNode("DESACTIVATE");
        button.appendChild(buttonText);
        button.className = "buttonDesactivate";
        cell.appendChild(button);
        row.appendChild(cell);

        tableau.appendChild(row);
      }
      i++;
    }
    updateButton();
    desactivateButton();
  });
}
displayListClient();
