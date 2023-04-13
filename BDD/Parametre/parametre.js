const boutonValide = document.querySelector('.valide');
const boutonAnnule = document.querySelector('.retour');


boutonValide.addEventListener('click',()=>{
  var url = "https://vmicro.fr/database/BDD_1.0/API/api.php";
  var data = new FormData();

  var valideFormulaire=true;

  var nomParam = document.getElementById('name_param').value;
  /* 
    requete pas de doublon
  */
    var urldoublon = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=ParamLIST";
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", urldoublon, false); // false for synchronous request
    xmlHttp.send( null );
    var responseDoublon = JSON.parse(xmlHttp.responseText);
    try{
      if(responseDoublon.results[0].Nom_Parametre.includes(nomParam)){
        alert(nomParam + " existe deja dans la liste des parametres");
        return;
      }
    }
    catch(TypeError){
      console.log("c'est vide");
    }
    /* 
    Fin requete pas de doublon
    */

  var uniteParam = document.getElementById('unite').value;

  if(nomParam == ""){
    document.getElementById("error1").style.display="block";
    valideFormulaire = false;
  }
  else{
    document.getElementById("error1").style.display="none";
  }

  if(uniteParam == ""){
    document.getElementById("error2").style.display="block";
    valideFormulaire = false;
  }
  else{
    document.getElementById("error2").style.display="none";
  }

  //console.log(nomParam);
  //console.log(uniteParam);

  if(valideFormulaire){

    data.append('action','addPARAM');
    data.append('name_param',nomParam);
    data.append('unite', uniteParam);
    
    ajaxPost(url,data,function(reponse1){
      console.log("Commande envoyé au serveur");
      alert("Le parametre à été ajouté à la base");
      displayListParam();
    
    });
    
  }
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
  gridButtonChange.forEach(function(item,idx){
    //console.log(item);
    trs[idx].getElementsByTagName("td")[3].style.display = "none";
    item.addEventListener('click',function(){
      //console.log("bouton" + idx + "appuyé");
      tds = trs[idx].getElementsByTagName("td");
      const buffName  = tds[1].innerHTML;
      const buffUnite = tds[2].innerHTML;

      tds[1].innerHTML = "";
      tds[2].innerHTML = "";

      input = document.createElement("INPUT");
      input.setAttribute("type", "text");
      input.value = buffName;
      tds[1].appendChild(input);

      input = document.createElement("INPUT");
      input.setAttribute("type", "text");
      input.value = buffUnite;
      tds[2].appendChild(input);

      //console.log(buffName);
      //console.log(buffUnite);

      item.style.display = "none";
      gridButtonUpdate[idx].style.display = "block";
    });
  });
  launchUPDATE(gridButtonUpdate, 1);
/*
  gridButtonUpdate.forEach(function(item,idx){
    item.addEventListener('click',function(){
      tds = trs[idx].getElementsByTagName("td");
      const sendId = tds[0].innerHTML;
      const sendName = tds[1].getElementsByTagName("input")[0].value;
      const sendUnit = tds[2].getElementsByTagName("input")[0].value;

      console.log(sendId);
      console.log(sendName);
      console.log(sendUnit);

      //data.append('action','updatePARAM');
      //data.append('name_param',input.value);
      //data.append('unite', uniteParam);
      var url = "http://vmicro.fr/database/BDD_1.0/API/api.php?action=updatePARAM&id_param="+sendId+"&name_param="+sendName+"&unite="+sendUnit;
      //console.log(url);
      ajaxGet(url,function(reponse){
        console.log(JSON.parse(reponse));
      });
      displayListParam();
    });
  });
  */
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
      //console.log(sendId);
      var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=deletePARAM&id_param="+sendId;
      ajaxGet(url,function(reponse){
        console.log(JSON.parse(reponse));
      });
      displayListParam();
    });
  });
}
function desactivateButton(){
  var gridButtonDesactivate = document.querySelectorAll('.buttonDesactivate');
  launchUPDATE(gridButtonDesactivate, 0);
}

function launchUPDATE(grid, sendActivation){

  //console.log("launchUPDATE");
  var tableau = document.getElementById("tableau");
  var trs = tableau.getElementsByTagName("tr");
  var tds = null;

  var sendId;
  var sendName;
  var sendUnit;

  grid.forEach(function(item,idx){
    item.addEventListener('click',function(){
      tds = trs[idx].getElementsByTagName("td");

      if(sendActivation == 1)
      {
        sendId = tds[0].innerHTML;
        sendName = tds[1].getElementsByTagName("input")[0].value;
        sendUnit = tds[2].getElementsByTagName("input")[0].value;

        var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=updatePARAM&id_param="+sendId+"&name_param="+sendName+"&unite="+sendUnit+"&activation="+sendActivation;
        console.log(url);
        ajaxGet(url,function(reponse){
          console.log(JSON.parse(reponse));
        });
      }
      if(sendActivation == 0)
      {
        sendId = tds[0].innerHTML;
        sendName = tds[1].innerHTML;
        sendUnit = tds[2].innerHTML;

        var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=updatePARAM&id_param="+sendId+"&name_param="+sendName+"&unite="+sendUnit+"&activation="+sendActivation;
        console.log(url);

        if(confirm("Attention ! Cette action va faire disparaitre ce projet"))
        {
          ajaxGet(url, function(reponse){
            console.log(JSON.parse(reponse));
          });
        }
      }
      displayListParam();
      /*
      console.log(sendId);
      console.log(sendName);
      console.log(sendUnit);
      */
    });
  });
}

function displayListParam(){
  var tableau = document.getElementById('tableau');
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=ParamLIST';
  tableau.innerHTML = "";
  ajaxGet(url,function(reponse2){
    resultReq = JSON.parse(reponse2);
    //console.log(resultReq.results[0]);
    //console.log(resultReq.results[0].Nom_Parametre.length);
    var i=0;
    var row;
    var cell;
    var cellText;
    console.log("test");
    while(i<resultReq.results[0].Nom_Parametre.length)
    {
      if(resultReq.results[0].activation[i] != 0)
      {
        row = document.createElement("tr");
        cell = document.createElement("td");
        cellText = document.createTextNode(resultReq.results[0].id_param[i]);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(resultReq.results[0].Nom_Parametre[i]);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(resultReq.results[0].Unite[i]);
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
displayListParam();
