// Constante représentant les boutons "Valider" et "Retour"
const boutonValide = document.querySelector('.valide');
const boutonAnnule = document.querySelector('.retour');

// Si on clique sur le bouton valider
boutonValide.addEventListener('click',()=>{
  //On défini l'adresse vers l'API
  var url = "https://vmicro.fr/database/BDD_1.0/API/api.php";
  // On déclarer un conteneur pour les données
  var data = new FormData();

  var i=0;
  var nbcheck=0;

  // On récupère le nom de la catégorie
  var nomCat = document.getElementById('nom_Nouvelle_Cat').value;
   /* 
    requete pas de doublon
  */

    var urldoublon = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=CategorieLIST";
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", urldoublon, false); // false for synchronous request
    xmlHttp.send( null );
    var responseDoublon = JSON.parse(xmlHttp.responseText);
    console.log(responseDoublon);
    try{
      if(responseDoublon.results[0].Nom_categorie.includes(nomCat)){
        alert(nomCat + " existe deja dans la liste des categorie");
        return;
      }
    }
    catch(TypeError){
      console.log("c'est vide");
    }
    /* 
    Fin requete pas de doublon
    */
  // On récupère une liste de tous les paramètres cochés
  var listeParam = document.getElementsByClassName('check');
  //console.log(listeParam[0]);

  //console.log(document.getElementsByClassName('check').length);
  while(i < listeParam.length)
  {
    //console.log(listeParam[i].checked);
    //console.log(listeParam[i].value);

    // Si le nom de la catégorie est remplie alors on n'affiche pas d'erreur
    if(nomCat != ""){
      document.getElementById("error1").style.display="none";
      // Si le paramètre est coché alors on vient faire une requête POST vers l'API pour ajouter une catégorie
      if(listeParam[i].checked == true)
      {
        data.append('action','addCategorie');
        data.append('Nom_Categorie',nomCat);
        data.append('ID_Caracteristique',listeParam[i].value);

        //console.log(nomCat);
        //console.log(listeParam[i].value);

        ajaxPost(url, data, function(reponse){
          //console.log(reponse);
        });
        nbcheck++;
      }
    }
    // Si le nom de la catégorie n'est pas renseigné alors on affiche le message d'erreur
    else {
      document.getElementById("error1").style.display="block";
    }
    i++
  }

  // Si n'y a pas eu de catégorie sélectionnée alors on crée la catégorie sans ID_Caracteristique
  if(nbcheck == 0)
  {
    if(nomCat != "")
    {
      data.append('action','addCategorie');
      data.append('Nom_Categorie',nomCat);
      ajaxPost(url, data, function(reponse){
        console.log(reponse);
      });
    }
  }

  // On affiche un message pour indiquer que la catégorie à été ajouter à la base de données
  alert("La catégorie à été ajouté à la base de données");

  // On affiche la liste de toutes les catégories qui existent
  displayListCategorie();
});
// Si on clique sur le bouton retour alors on est redirigé vers la page vmicro.fr/database/BDD_1.0/Home/home.php
boutonAnnule.addEventListener('click',()=>{
    window.location.href = "../Home/home.php";
});

function start(){
  var listeParam = document.getElementById('listeParam');
  console.log(listeParam);
  var input;
  var label;
  var saut;
  var i=0;
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=ParamLIST';

  ajaxGet(url, function(reponse){
    resultReq = JSON.parse(reponse);

    console.log(resultReq);

    while(i < resultReq.results[0].id_param.length)
    {
      if(resultReq.results[0].activation[i]==1){
        input = document.createElement("INPUT");
        input.setAttribute("type","checkbox");
        input.setAttribute("class", "check");
        input.value = resultReq.results[0].id_param[i];
        listeParam.appendChild(input);

        label = document.createElement('label');
        label.textContent = resultReq.results[0].Nom_Parametre[i];
        listeParam.appendChild(label);

        saut = document.createElement("br");
        listeParam.appendChild(saut);
      }

      i++;
      //console.log(i);
    }
  });
}
function indexToName(tab, index)
{
  var b=0;
  var name;

  for(b=0; b<tab.results[0].id_param.length;b++)
  {
    console.log("id_param = "+tab.results[0].id_param[b]);
    console.log("id_caracteristique = "+index);
    if(tab.results[0].id_param[b] == index)
    {
      name = tab.results[0].Nom_Parametre[b];
      break;
    }
  }
  return name;
}
function lookFor(nameCategorie, tab)
{
  // On lui donne une catégorie et il retourne un tableau avec les indexs des paramètre utilisés

  tabReturn = [];
  //console.table(tab);
  //console.log(nameCategorie);

  var i = 0;
  //console.log(tab);
  for(i=0; i<tab.id_categorie.length; i++)
  {
    //console.log(tab.Nom_categorie[i]);
    if(tab.Nom_categorie[i] == nameCategorie)
    {
      tabReturn.push(tab.id_caracteristique[i]);
      //console.log(tab.id_caracteristique[i]);
    }
  }
  return tabReturn;
}
function onlyOne(tabNom, tabActivation)
{
  var tableauSortieNom = tabNom;
  var tableauSortieActivation = tabActivation;
  var tableauSortie = [];
  var a=0;

  for(a=0; a<tableauSortieNom.length;a++)
  {
    for(b=a+1;b<tableauSortieNom.length;b++)
    {
      if(tableauSortieNom[a]==tableauSortieNom[b])
      {
        tableauSortieNom.splice(b,1);
        tableauSortieActivation.splice(b,1);
        b=a+1;
      }
    }
  }
  tableauSortie.push(tableauSortieNom);
  tableauSortie.push(tableauSortieActivation);

  return tableauSortie;
}
function trackCheckBox(){
  console.log("trackCheckBox()");
  var gridCheckBox = document.querySelectorAll('.checkUpdate');

  gridCheckBox.forEach((item, i) => {
    item.addEventListener('change',function(e){
      if(e.target.checked == true)
      {
        e.path[2].children[2].style.display = "block";
      }
      else{
        e.path[2].children[2].style.display = "none";
      }
    });
  });
  console.log(gridCheckBox);
}
function updateButton(){
  var gridButtonUpdate = document.querySelectorAll('.buttonUpdate');
  var gridButtonChange = document.querySelectorAll('.buttonChange');

  var tableauNom = document.getElementById("listeNomCategorie");
  var trs = tableauNom.getElementsByTagName("tr");
  var tds = null;

  var tableauCheck = document.getElementById('checkParam');

  var data = new FormData();


  gridButtonChange.forEach(function(boutonChange, idxBC){ // On parcours chaque boutons change
    boutonChange.addEventListener('click', function(e){ // On écoute tous les boutons

      tableauCheck.innerHTML = "";
      /*
      console.log(e);
      console.log(e.path[1]);
      console.log(e.path[1].children[0]);
      */

      e.path[1].children[0].style.display = "block"; // On affiche le bouton update
      e.target.style.display = "none"; // On efface de l'écran le bouton change

      tds = trs[idxBC].getElementsByTagName("td");

      //Afficher tous les paramètres dans une fenetre avec les paramètres coché et non cochés
      url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=CategorieLIST';
      ajaxGet(url, function(reponse){
        url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=ParamLIST';
        ajaxGet(url, function(reponse2){
          var resultReq = JSON.parse(reponse);
          var resultReq2 = JSON.parse(reponse2);

          //console.table(resultReq.results[0]);
          //console.table(resultReq2.results[0]);

          //console.table(lookFor(tds[0].innerHTML,resultReq.results[0]));
          var resultlookFor = lookFor(tds[0].innerHTML,resultReq.results[0]); // On extrait les paramètres utilisés pour la catégorie

          resultReq2.results[0].Nom_Parametre.forEach((nom_Parametre, indexListeParametreAffiche) => {

            //Création d'une ligne avec checkbox, nom du paramètre, et enfin champs permettant de définir la valeur du nouveau paramètre
            var divLigne = document.createElement("div");
            divLigne.id = "divLigne";
            divLigne.style.display = "grid";
            divLigne.style.gridTemplateColumns = " 20px repeat(2,1fr)";

            //On crée les checkbox qui sont en réalité des inputs
            var divCheckbox = document.createElement("div");
            input = document.createElement("INPUT");
            input.setAttribute("type","checkbox");
            input.setAttribute("class", "checkUpdate");

            // On affecte l'ID du parametre
            input.value = resultReq2.results[0].id_param[indexListeParametreAffiche];
            // On coche ou non la case du paramètre s'il est utilisé ou non
            for(let index=0; index<resultlookFor.length; index++)
            {
              if(resultlookFor[index] == resultReq2.results[0].id_param[indexListeParametreAffiche])
              {
                input.checked = true;
                break;
              }
            }
            divCheckbox.appendChild(input);

            // On affiche le nom du paramètre
            var divLabel = document.createElement("div");
            var label = document.createElement('label');
            label.textContent = nom_Parametre;

            divLabel.style.margin = "auto";
            divLabel.appendChild(label);

            var divValeurParam = document.createElement("div");
            divValeurParam.style.margin = "auto";
            divValeurParam.setAttribute("class", "valeurParam");
            var newLabelA = document.createElement("label");
            newLabelA.innerHTML = "Valeur théorique : ";
            var inputValeurNewParam = document.createElement("INPUT");
            inputValeurNewParam.id = "inputSETTER"+indexListeParametreAffiche;
            var newLabelB = document.createElement("label");
            newLabelB.innerHTML = resultReq2.results[0]["Unite"][indexListeParametreAffiche];

            // On affecte les div à la div parent
            divValeurParam.appendChild(newLabelA);
            divValeurParam.appendChild(inputValeurNewParam);
            divValeurParam.appendChild(newLabelB);

            // Par defaut on n'affiche pas la setter de parametre
            divValeurParam.style.display = "none";

            divLigne.appendChild(divCheckbox);
            divLigne.appendChild(divLabel);
            divLigne.appendChild(divValeurParam);

            tableauCheck.appendChild(divLigne);
          });
          //Fonction permettant de voir si la case à était activée
          trackCheckBox();
        });
      });
    });
  });
  gridButtonUpdate.forEach(function(item, idx){
    item.addEventListener('click',function(){
      // On lit la valeur des checkboxs
      // On compare avec le résultat de la requete de base
      // On delete les trucs qui existe deja

      var tds = trs[idx].getElementsByTagName("td");
      var suppressNameCat =  tds[0].innerHTML;
      var nbcheck = 0;
      console.log(suppressNameCat);

      /*
      url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=deleteByNameCat&nameCat='+suppressNameCat;
      console.log(url);
      ajaxGet(url, function(reponse){
        console.log(JSON.parse(reponse));
      });
      */

      // On recréer toutes les nouvelles Caracteristiques
      url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=CategorieLIST';
      ajaxGet(url, function(reponse){
        var resultReq = JSON.parse(reponse);
        var valeurIdCaracteristique;
        var indexInputSETTER = 0;
        var tableauDistinct = onlyOne(resultReq.results[0].Nom_categorie,resultReq.results[0].activation);
        console.log(tableauDistinct);

        console.table(lookFor(tds[0].innerHTML,resultReq.results[0]));
        //console.log(tableauCheck.getElementsByTagName('input').length);
        for(let iterCheck2 = 0; iterCheck2 < tableauCheck.getElementsByTagName('input').length; iterCheck2++)
        {
          //console.log(tableauCheck.getElementsByTagName('input')[iterCheck2].type);
          if(tableauCheck.getElementsByTagName('input')[iterCheck2].type == "checkbox"){

            //console.log(tableauCheck.getElementsByTagName('input')[iterCheck2].checked);
            console.log(tableauCheck.getElementsByTagName('input')[iterCheck2].value);


            valeurIdCaracteristique = tableauCheck.getElementsByTagName('input')[iterCheck2].value;
            if(tableauCheck.getElementsByTagName('input')[iterCheck2].checked == true)
            {
              //url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=addCategorie&Nom_Categorie='+tableauDistinct[0][idx]+'&ID_Caracteristique='+valeurIdCaracteristique;
              url = 'https://vmicro.fr/database/BDD_1.0/API/api.php';
              console.log(url);
              data.append('action','addCategorie');
              //data.append('Nom_Categorie',tableauDistinct[0][idx]);
              data.append('Nom_Categorie',suppressNameCat);
              console.log(suppressNameCat);
              data.append('ID_Caracteristique',valeurIdCaracteristique);
              console.log(valeurIdCaracteristique);
              ajaxPost(url, data, function(reponse){
                console.log(JSON.parse(reponse));
              });
              nbcheck++;
            }

          }
          if(tableauCheck.getElementsByTagName('input')[iterCheck2].type == "text"){ // On regarde si l'input est de type text
            //console.log(tableauCheck.querySelectorAll('.valeurParam'));
            //console.log(tableauCheck.querySelectorAll('.valeurParam')[indexInputSETTER]);
            if(tableauCheck.querySelectorAll('.valeurParam')[indexInputSETTER].style.display == "block"){ // On regarde si l'input affiché ou non
              console.log("Non checkbox : " + tableauCheck.getElementsByTagName('input')[iterCheck2].value);

              //--> Envoyer requête vers type composant pour rajouter le nouveau paramètre avec sa valeur théorique
              console.log("Catégorie : " + tds[0].innerHTML);
              console.log("Parametre : " + tableauCheck.getElementsByTagName('input')[iterCheck2-1].value + " avec valeur = " + tableauCheck.getElementsByTagName('input')[iterCheck2].value);

              //On fait une requete pour trouver le type de composant, et la taille du composant en x et y
              //SELECT DISTINCT Nom_Type_C, taille_composant_X, taille_composant_Y FROM type_composant WHERE Nom_Categorie = "Lprobe"
              // On regarde si l'id caracteristique est deja utilisé ou non
              // Si il n'est pas utilisé :
              //    alors rajout du parametre dans la table type_Composant
              // Si il est utilisé:
              //    alors mise a jour de la valeur de l'id_caracteristique pour chaque type composant


              /*-------Partie Uniquement pour tester API -------------*/
              /*
              url = 'https://vmicro.fr/database/BDD_1.0/API/api.php';
              data.append('action','addParamInTypeComponent');
              data.append('Nom_Categorie',"Lprobe");
              data.append('ID_Caracteristique',333);
              data.append('Valeur', 111);
              ajaxPost(url, data, function(reponse){
                console.log(reponse);
                console.log(JSON.parse(reponse));
              });
              */
              /*-------------------------------------------------------*/


              url = 'https://vmicro.fr/database/BDD_1.0/API/api.php';
              data.append('action','addParamInTypeComponent');
              data.append('Nom_Categorie',suppressNameCat);
              console.log(suppressNameCat);
              console.log(tableauCheck.getElementsByTagName('input')[iterCheck2-1].value);
              data.append('ID_Caracteristique',tableauCheck.getElementsByTagName('input')[iterCheck2-1].value);
              data.append('Valeur', tableauCheck.getElementsByTagName('input')[iterCheck2].value);
              ajaxPost(url, data, function(reponse){
                console.log(JSON.parse(reponse));
              });

            }
            indexInputSETTER+=1;
          }
        }

        if(nbcheck == 0)
        {
          console.log(tableauDistinct[0][idx]);
          console.log(valeurIdCaracteristique);
          data.append('action','addCategorie');
          data.append('Nom_Categorie',suppressNameCat);
          console.log(suppressNameCat);
          data.append('ID_Caracteristique',0);
          ajaxPost(url, data, function(reponse){
            console.log(JSON.parse(reponse));
          });
        }

        displayListCategorie();
      });
    });
  });

}
function desactivateButton(){

  var tableauNom = document.getElementById("listeNomCategorie");
  var trs = tableauNom.getElementsByTagName("tr");
  var tds = null;
  var gridButtonDesactivate = document.querySelectorAll('.buttonDesactivate');

  gridButtonDesactivate.forEach(function(item,idx){
    item.addEventListener('click',function(){
      tds = trs[idx].getElementsByTagName("td");
      nom_categorie = tds[0].innerHTML;
      if(confirm("Attention ! Cette action va faire disparaitre cette categorie ?"))
      {
        var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=desactivateCategorie&nom_categorie="+nom_categorie;
        console.log(url);
        ajaxGet(url,function(reponse){
          console.log(JSON.parse(reponse));
        });
        displayListCategorie();
      }
    });
  });
}
function displayListCategorie()
{
  //Afficher tous les noms de catégorie dans un tableau
  var tableauNom = document.getElementById('listeNomCategorie');
  var tableauDistinct;

  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=CategorieLIST';
  tableauNom.innerHTML = "";
  ajaxGet(url,function(reponse){
    var resultReq = JSON.parse(reponse);
    console.log(resultReq.results[0]);

    //console.log(onlyOne(resultReq.results[0].Nom_categorie));
    //console.table(onlyOne(resultReq.results[0].Nom_categorie,resultReq.results[0].activation));
    
    if(resultReq.results[0].length == 0){
      return;
    }

    //tableauDistinct = onlyOne(resultReq.results[0].Nom_categorie,resultReq.results[0].activation);
    console.table(doublonType1(resultReq.results[0].Nom_categorie,resultReq.results[0].activation));
    tableauDistinct = doublonType1(resultReq.results[0].Nom_categorie,resultReq.results[0].activation);

    tableauDistinct[0].forEach((item, i) => {
      if(tableauDistinct[1][i] != 0){
        row = document.createElement("tr");
        cell = document.createElement("td");
        cellText = document.createTextNode(item);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        button = document.createElement("BUTTON");
        buttonText = document.createTextNode("UPDATE");
        button.appendChild(buttonText);
        button.className = "buttonUpdate";
        cell.appendChild(button);

        row.appendChild(cell);

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

        tableauNom.appendChild(row);
      }
    });
    updateButton();
    desactivateButton();
  });
}
function displayListCategorieBefore()
{
  var tableau = document.getElementById('tableau');
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=CategorieLIST';
  tableau.innerHTML = "";
  ajaxGet(url,function(reponse){
    var resultReq = JSON.parse(reponse);
    console.log(resultReq.results[0]);
    //console.log(resultReq.results[0].id_projet.length);
    var i=0;
    var a=0;
    var row;
    var cell;
    var cellText;
    var div;
    var tabMemoire;
    let tableauMemoire = [];
    var exist = false;
    var trs = tableau.getElementsByTagName("tr");
    console.table(resultReq);
    url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=ParamLIST';
    ajaxGet(url, function(reponse2){
      var resultReq2 = JSON.parse(reponse2);

      while(i<resultReq.results[0].id_categorie.length)
      {
        for(a=0; a<tableauMemoire.length; a++){
          //console.log(tableauMemoire[a]);
          if(resultReq.results[0].Nom_categorie[i] == tableauMemoire[a])
          {
            exist = true;
            break;
          }
          else {
            exist = false;
          }
        }
        if(exist == false)
        {
          tableauMemoire.push(resultReq.results[0].Nom_categorie[i]);
          div = document.createElement("div");
          div.setAttribute('class', 'divTab');
          div.setAttribute('id', resultReq.results[0].Nom_categorie[i]);

          row = document.createElement("tr");
          cell = document.createElement("td");
          cellText = document.createTextNode(resultReq.results[0].Nom_categorie[i]);
          cell.appendChild(cellText);
          row.appendChild(cell);

          cell = document.createElement("td");
          cellText = document.createTextNode(indexToName(resultReq2,resultReq.results[0].id_caracteristique[i]));
          cell.appendChild(cellText);
          row.appendChild(cell);

          div.appendChild(row);
          tableau.appendChild(div);

          //tableau.appendChild(row);
        }
        else{
          console.log(resultReq.results[0].Nom_categorie[i]);
          console.log(document.getElementsByClassName('divTab'));
          row = document.createElement("tr");
          cell = document.createElement("td");
          cellText = document.createTextNode("");
          row.appendChild(cell);

          cell = document.createElement("td");
          cellText = document.createTextNode(indexToName(resultReq2,resultReq.results[0].id_caracteristique[i]));
          cell.appendChild(cellText);
          row.appendChild(cell);

          tableau.appendChild(row);

          /*
          //console.log(a);
          tds = trs[a].getElementsByTagName("td");

          saut = document.createElement("br");

          cell = document.createElement("td");
          console.log(indexToName(resultReq2,resultReq.results[0].id_caracteristique[i]));
          cellText = document.createTextNode(indexToName(resultReq2,resultReq.results[0].id_caracteristique[i]));
          tds[1].appendChild(saut);
          cell.appendChild(cellText);
          tds[1].appendChild(cell);
          //console.log(tds);
          */
        }
        i++;
      }
    });
  });
}
start();
//updateButton();
displayListCategorie();
