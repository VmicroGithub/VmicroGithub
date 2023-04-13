const boutonValide = document.querySelector('.valide');
const boutonAnnule = document.querySelector('.retour');

boutonValide.addEventListener('click',()=>{
  var url = "https://vmicro.fr/database/BDD_1.0/API/api.php";
  var data = new FormData();

  var nomProjet = document.getElementById('nom_Projet').value;
  var nomClient = document.querySelector('.menuDeroulantClient').value;
  var descripProjet = document.getElementById('description_Projet').value;
  var etatProjet =  document.getElementById('etat_Projet').value;

  console.log(nomProjet);
  console.log(nomClient);
  console.log(descripProjet);
  console.log(etatProjet);

  data.append('action','addProjet');
  data.append('nom_Projet',nomProjet);
  data.append('nom_Client',nomClient);
  data.append('description_Projet',descripProjet);
  data.append('etat_Projet',etatProjet);

  ajaxPost(url,data,function(reponse){
    console.log("Commande envoyé au serveur");
    console.log(reponse)
    displayListProjet();
  });
});
boutonAnnule.addEventListener('click',()=>{
    window.location.href = "../Home/home.php";
});
function start(){

  var menu = document.querySelector(".menuDeroulantClient");
  var option;
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=ClientLIST';
  var i=0;
  ajaxGet(url,function(reponse){
    resultReq = JSON.parse(reponse);

    while(i<resultReq.results[0].id_client.length)
    {
      //console.log(resultReq.results[0].Nom_client[i]);
      option = document.createElement("option");
      option.text = resultReq.results[0].Nom_client[i];
      menu.add(option);
      i++;
    }
  });
}
function updateButton(){
  var gridButtonUpdate = document.querySelectorAll('.buttonUpdate');
  var gridButtonChange = document.querySelectorAll('.buttonChange');

  var tableau = document.getElementById("tableau");
  var trs = tableau.getElementsByTagName("tr");
  var tds = null;
  var input;
  var option;

  //console.log(gridButtonUpdate.length);
  gridButtonChange.forEach(function(item,idx){
    //console.log(item);
    trs[idx].getElementsByTagName("td")[6].style.display = "none";
    item.addEventListener('click',function(){
      //console.log("bouton" + idx + "appuyé");
      tds = trs[idx].getElementsByTagName("td");
      const buffNameProject  = tds[1].innerHTML;
      const buffIDClient = tds[2].innerHTML;
      const buffDescription = tds[3].innerHTML;
      const buffLastModif = tds[4].innerHTML;
      const buffState = tds[5].innerHTML;

      tds[1].innerHTML = "";
      tds[2].innerHTML = "";
      tds[3].innerHTML = "";
      //tds[4].innerHTML = "";
      tds[5].innerHTML = "";

      input = document.createElement("INPUT");
      input.setAttribute("type", "text");
      input.value = buffNameProject;
      tds[1].appendChild(input);

      input = document.createElement("INPUT");
      input.setAttribute("type", "text");
      input.value = buffIDClient;
      tds[2].appendChild(input);

      input = document.createElement("INPUT");
      input.setAttribute("type", "text");
      input.value = buffDescription;
      tds[3].appendChild(input);

      /*
      input = document.createElement("INPUT");
      input.setAttribute("type", "text");
      input.value = buffLastModif;
      tds[4].appendChild(input);
      */

      select = document.createElement("SELECT");
      option = document.createElement("option");
      option.text = "En cours";
      select.add(option);

      option = document.createElement("option");
      option.text = "Fini";
      select.add(option);

      option = document.createElement("option");
      option.text = "Abandonné";
      select.add(option);

      tds[5].appendChild(select);

      console.log(buffNameProject);
      console.log(buffIDClient);
      console.log(buffDescription);
      console.log(buffLastModif);
      console.log(buffState)

      item.style.display = "none";
      gridButtonUpdate[idx].style.display = "block";
    });
  });
  launchUPDATE(gridButtonUpdate,1);
  /*
  gridButtonUpdate.forEach(function(item,idx){
    item.addEventListener('click',function(){
      tds = trs[idx].getElementsByTagName("td");
      const sendIdProjet = tds[0].innerHTML;
      const sendNameProjet = tds[1].getElementsByTagName("input")[0].value;
      const sendIdClient = tds[2].getElementsByTagName("input")[0].value;
      const sendDescription = tds[3].getElementsByTagName("input")[0].value;
      const sendLastModif = tds[4].getElementsByTagName("input")[0].value;
      const sendEtat = tds[5].getElementsByTagName("select")[0].value;
      const sendActivation = 1;

      console.log(sendIdProjet);
      console.log(sendNameProjet);
      console.log(sendIdClient);
      console.log(sendDescription);
      console.log(sendLastModif);
      console.log(sendEtat);

      var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=updatePROJET&id_projet="+sendIdProjet+"&nom_projet="+sendNameProjet+"&id_client="+sendIdClient+"&description="+sendDescription+"&last_modif="+sendLastModif+"&etat="+sendEtat+"&activation="+sendActivation;
      //console.log(url);
      ajaxGet(url,function(reponse){
        console.log(JSON.parse(reponse));
      });
      displayListProjet();
    });
  });
  */
}

function desactivateButton(){
  var gridButtonDesactivate = document.querySelectorAll('.buttonDesactivate');

  /*
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
      displayListProjet();
    });
  });
  */
  launchUPDATE(gridButtonDesactivate,0)
}

function launchUPDATE(grid,sendActivation)
{
  var tableau = document.getElementById("tableau");
  var trs = tableau.getElementsByTagName("tr");
  var tds = null;

  var sendIdProjet;
  var sendNameProjet;
  var sendIdClient;
  var sendDescription;
  var sendLastModif;
  var sendEtat;


  grid.forEach(function(item,idx){
    item.addEventListener('click',function(){
      tds = trs[idx].getElementsByTagName("td");

      if(sendActivation == 1)
      {
         sendIdProjet = tds[0].innerHTML;
         sendNameProjet = tds[1].getElementsByTagName("input")[0].value;
         sendIdClient = tds[2].getElementsByTagName("input")[0].value;
         sendDescription = tds[3].getElementsByTagName("input")[0].value;
         //sendLastModif = tds[4].getElementsByTagName("input")[0].value;
         sendLastModif = tds[4].innerHTML;
         sendEtat = tds[5].getElementsByTagName("select")[0].value;

         var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=updatePROJET&id_projet="+sendIdProjet+"&nom_projet="+sendNameProjet+"&id_client="+sendIdClient+"&description="+sendDescription+"&last_modif="+sendLastModif+"&etat="+sendEtat+"&activation="+sendActivation;
         console.log(url);
         ajaxGet(url,function(reponse){
           console.log(JSON.parse(reponse));
         });
      }
      if(sendActivation == 0)
      {
         sendIdProjet = tds[0].innerHTML;
         sendNameProjet = tds[1].innerHTML;
         sendIdClient = tds[2].innerHTML;
         sendDescription = tds[3].innerHTML;
         sendLastModif = tds[4].innerHTML;
         sendEtat = tds[5].innerHTML;

         var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=updatePROJET&id_projet="+sendIdProjet+"&nom_projet="+sendNameProjet+"&id_client="+sendIdClient+"&description="+sendDescription+"&last_modif="+sendLastModif+"&etat="+sendEtat+"&activation="+sendActivation;
         console.log(url);

         if(confirm("Attention ! Cette action va faire disparaitre ce projet ?"))
         {
           ajaxGet(url,function(reponse){
             console.log(JSON.parse(reponse));
           });
         }
      }
      displayListProjet();
      /*
      console.log(sendIdProjet);
      console.log(sendNameProjet);
      console.log(sendIdClient);
      console.log(sendDescription);
      console.log(sendLastModif);
      console.log(sendEtat);
      */

    });
  });
}

function displayListProjet(){
  var tableau = document.getElementById('tableau');
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=ProjetLIST';
  tableau.innerHTML = "";
  ajaxGet(url,function(reponse2){
    resultReq = JSON.parse(reponse2);
    console.log(resultReq.results[0]);
    //console.log(resultReq.results[0].id_projet.length);
    var i=0;
    var row;
    var cell;
    var cellText;

    while(i<resultReq.results[0].id_projet.length)
    {
      if(resultReq.results[0].activation[i] != 0)
      {
        row = document.createElement("tr");
        cell = document.createElement("td");
        cellText = document.createTextNode(resultReq.results[0].id_projet[i]);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(resultReq.results[0].Nom_projet[i]);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(resultReq.results[0].id_client[i]);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(resultReq.results[0].description[i]);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(resultReq.results[0].last_modif[i]);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(resultReq.results[0].etat[i]);
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

displayListProjet();
start();
