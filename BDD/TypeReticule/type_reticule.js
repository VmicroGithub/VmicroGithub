const boutonValide = document.querySelector('.valide');
const boutonAnnule = document.querySelector('.retour');
const selecteur = document.getElementById('selectorCat');
const next1 = document.getElementById('next1');
const affichageTailleComposant = document.getElementById('result-requete');
const reticule = document.getElementById('rectangle');
const section2 = document.getElementById('section2');

var tailleX_Fenetre = 0;
var tailleY_Fenetre = 0;

boutonAnnule.addEventListener('click',()=>{
  window.location.href = "../Home/home.php";
});

boutonValide.addEventListener('click',()=>{

    var data = new FormData();
    var firstPosXComponent = parseInt(document.getElementById('first_Component_X').value);
    var firstPosYComponent = parseInt(document.getElementById('first_Component_Y').value);
    var Nom_Type_Reticule = document.getElementById("nom_Reticule").value;

    /* 
    requete pas de doublon
  */
    var urldoublon = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=ReticuleTypeLIST";
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", urldoublon, false); // false for synchronous request
    xmlHttp.send( null );
    var responseDoublon = JSON.parse(xmlHttp.responseText);
    console.log(responseDoublon.results[0].reticule_type_nom);
    try{
      if(responseDoublon.results[0].reticule_type_nom.includes(Nom_Type_Reticule)){
        alert(Nom_Type_Reticule + " existe deja dans la liste des types de reticule");
        return;
      }
    }
    catch(TypeError){
      console.log("c'est vide");
    }
    /* 
    Fin requete pas de doublon
    */

    var tailleX = parseInt(document.getElementById('tailleX').value);
    var tailleY = parseInt(document.getElementById('tailleY').value);
    var pasX = parseInt(document.getElementById('pas_X').value);
    var pasY = parseInt(document.getElementById('pas_Y').value);
    var tailleReticule_X = parseInt(document.getElementById("taille_RetX").value);
    var tailleReticule_Y = parseInt(document.getElementById("taille_RetY").value);

    console.log(Nom_Type_Reticule);

    var indexSelecteur = selecteur.selectedIndex;
    var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=composantWithCategorie&n_cat='+ selecteur.options[indexSelecteur].text;
    console.log(url);

    ajaxGet(url, function(reponse){
      resultReq = JSON.parse(reponse);

      if(resultReq.results!= null)
      {
        //1er boucle de parcours
        for(var y=tailleY; y>0; y--)
        {
          // 2ème boucle de parcours
          for(var x=1; x<=tailleX; x++)
          {
            var selecteurComposant = document.getElementById('select'+(x.toString())+(y.toString()));
            var indexSelecteur = selecteurComposant.selectedIndex;

            data.append('action', 'addTypeReticule');
            data.append('Nom_Type_Reticule',Nom_Type_Reticule);
            data.append('Pos_X_C',((pasX*(x-1))+firstPosXComponent));
            data.append('Pos_Y_C',((pasY*(y-1))+firstPosYComponent));
            data.append('Nom_Type_C', selecteurComposant.options[indexSelecteur].value);
            data.append('T_R_X',tailleReticule_X);
            data.append('T_R_Y',tailleReticule_Y);
            data.append('Coord_X_C',x);
            data.append('Coord_Y_C',y);

            resultReq.results['name'].forEach(function(item,idx){
              //console.log("item = "+item);
              //console.log("Nom_Type_C"+selecteurComposant.options[indexSelecteur].value);
              if(item==selecteurComposant.options[indexSelecteur].value){
                data.append('T_C_X',resultReq.results['taille_c_x'][idx]);
                data.append('T_C_Y',resultReq.results['taille_c_y'][idx]);
                console.log("T_C_X = "+resultReq.results['taille_c_x'][idx]);
                console.log("T_C_Y = "+resultReq.results['taille_c_y'][idx]);
              }
            });

            console.log("Nom_Type_Reticule = "+ Nom_Type_Reticule);
            console.log("composant sélectionné = " + selecteurComposant.options[indexSelecteur].value);
            console.log("Pos_X_C = " + ((pasX*(x-1))+firstPosXComponent));
            console.log("Pos_Y_C = " + ((pasY*(y-1))+firstPosYComponent));
            console.log("Taille_Ret_X = " + tailleReticule_X);
            console.log("Taille_Ret_Y = " + tailleReticule_Y);
            console.log("Coord_X_C = " + x);
            console.log("Coord_Y_C = " + y);

            var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=addTypeReticule';
            console.log(url);

            ajaxPost(url, data,function(reponse){
              console.log(reponse);
              //Attention il faut faire gaffe à l'url et tester la fonction de l'API
            });
          }
        }
        alert("Ajout du reticule type dans la base de données");
        document.location.href = "https://vmicro.fr/database/BDD_1.0/Home/home.php";
      }
    });
});
selecteur.addEventListener('change',()=>{
  tailleComposant(selecteur.selectedIndex);
});

function checking(){
  var valideFormulaire = true;

  var Nom_Type_Reticule = document.getElementById("nom_Reticule").value;
  var tailleX = document.getElementById('tailleX').value;
  var tailleY = document.getElementById('tailleY').value;
  var pasX = document.getElementById('pas_X').value;
  var pasY = document.getElementById('pas_Y').value;
  var tailleReticule_X = document.getElementById("taille_RetX").value;
  var tailleReticule_Y = document.getElementById("taille_RetY").value;
  var firstPosXComponent = document.getElementById('first_Component_X').value;
  var firstPosYComponent = document.getElementById('first_Component_Y').value;

  console.log(firstPosXComponent);
  console.log(firstPosYComponent);

  if(Nom_Type_Reticule == ""){
    document.getElementById("error1").style.display="block";
    valideFormulaire = false;
  }
  else {
    document.getElementById("error1").style.display="none";
  }

  if(tailleX== ""){
    document.getElementById("error3").style.display="block";
    valideFormulaire = false;
  }
  else {
    document.getElementById("error3").style.display="none";
  }

  if(tailleY== ""){
    document.getElementById("error4").style.display="block";
    valideFormulaire = false;
  }
  else {
    document.getElementById("error4").style.display="none";
  }

  if(tailleReticule_X == ""){
    document.getElementById("error5").style.display="block";
    valideFormulaire = false;
  }
  else {
    document.getElementById("error5").style.display="none";
  }

  if(tailleReticule_Y == ""){
    document.getElementById("error6").style.display="block";
    valideFormulaire = false;
  }
  else {
    document.getElementById("error6").style.display="none";
  }

  if(pasX == ""){
    document.getElementById("error7").style.display="block";
    valideFormulaire = false;
  }
  else{
    document.getElementById("error7").style.display="none";
  }

  if(pasY == ""){
    document.getElementById("error8").style.display="block";
    valideFormulaire = false;
  }
  else{
    document.getElementById("error8").style.display="none";
  }

  if(firstPosXComponent == ""){
    document.getElementById("error9").style.display="block";
    valideFormulaire = false;
  }
  else {
    document.getElementById("error9").style.display="none";
  }

  if(firstPosYComponent == ""){
    document.getElementById("error10").style.display="block";
    valideFormulaire = false;
  }
  else {
    document.getElementById("error10").style.display="none";
  }

  return valideFormulaire;
}
//Si l'on clique sur le premier bouton next

next1.addEventListener('click',()=>{

  if(checking()==true){
    console.log("click next 1");
    $('html, body').animate({
          scrollTop: 925
        }, 800);

    createRepresentationComponent();
  }
});

window.addEventListener('resize', ()=>{

  var tailleX_Fenetre = window.innerHeight;
  var tailleY_Fenetre = window.innerWidth;
  var tailleRect;
  var tailleRepresentationComposantX=0;
  var tailleRepresentationComposantY=0;

  var tailleX = document.getElementById('tailleX').value;
  var tailleY = document.getElementById('tailleY').value;

  console.log("taille x => "+ tailleX_Fenetre);
  console.log("taille y => "+ tailleY_Fenetre);

  if(tailleX_Fenetre > (0.9* tailleY_Fenetre)){
    tailleRect = tailleY_Fenetre*0.9;
  }
  else {
    tailleRect = tailleX_Fenetre*0.9;
  }
  console.log(tailleRect);
  reticule.style.height = tailleRect +'px';
  reticule.style.width = tailleRect + 'px';

  tailleRepresentationComposantX = (tailleRect/tailleX)-(2*10);
  tailleRepresentationComposantY = (tailleRect/tailleY)-(2*10);

  console.log(tailleRepresentationComposantX);
  console.log(tailleRepresentationComposantY);

  for(var y=tailleY; y>0; y--)
  {
    // 2ème boucle de parcours
    for(var x=1; x<=tailleX; x++)
    {
      var IDelement = "";
      IDelement = (x.toString())+(y.toString());
      //console.log(IDelement);
      document.getElementById(IDelement).style.margin = 10+'px';
      document.getElementById(IDelement).style.width = tailleRepresentationComposantX+'px';
      document.getElementById(IDelement).style.height = tailleRepresentationComposantY+'px';
    }
  }

});

function createRepresentationComponent()
{
  var firstPosXComponent = parseInt(document.getElementById('first_Component_X').value);
  var firstPosYComponent = parseInt(document.getElementById('first_Component_Y').value);
  var pasX = parseInt(document.getElementById('pas_X').value);
  var pasY = parseInt(document.getElementById('pas_Y').value);
  var tailleX = parseInt(document.getElementById('tailleX').value);
  var tailleY = parseInt(document.getElementById('tailleY').value);

  console.log("tailleX = "+ tailleX);
  console.log("tailleY = "+ tailleY);
  console.log("pas en X =" + pasX);
  console.log("pas en Y =" + pasY);

  var currentDiv = document.getElementById('rectangle');
  currentDiv.innerHTML ="";
  var retourLigne = document.createElement("br");

  var selecteurComposant;
  var option;

  var indexSelecteur = selecteur.selectedIndex;
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=composantWithCategorie&n_cat='+ selecteur.options[indexSelecteur].text;

  var tailleX_Fenetre = window.innerHeight;
  var tailleY_Fenetre = window.innerWidth;

  if(tailleX_Fenetre > (0.9* tailleY_Fenetre)){
    tailleRect = tailleY_Fenetre*0.9;
  }
  else {
    tailleRect = tailleX_Fenetre*0.9;
  }
  console.log(tailleRect);
  reticule.style.height = tailleRect +'px';
  reticule.style.width = tailleRect + 'px';

  tailleRepresentationComposantX = (tailleRect/tailleX)-(2*10);
  tailleRepresentationComposantY = (tailleRect/tailleY)-(2*10);

  console.log(url);
  ajaxGet(url, function(reponse){
    resultReq = JSON.parse(reponse);
  //Creation des divs qui représentent les composants
  //1er boucle de parcours
    for(var y=tailleY; y>0; y--)
    {
      // 2ème boucle de parcours
      for(var x=1; x<=tailleX; x++)
      {
        var newDiv = document.createElement("div");
        var indexComposant = document.createElement("label");

        indexComposant.textContent = (x.toString())+(y.toString());
        newDiv.style.textAlign = "center";

        //Ajout de la nouvelle div dans une autre div
        newDiv.id = (x.toString())+(y.toString());
        newDiv.setAttribute('class','composantRet');
        newDiv.appendChild(indexComposant);

        //console.log(newDiv.innerHTML);
        newDiv.innerHTML += '<br/>X: <input class= "inputComposant" type="number" value="'+((pasX*(x-1))+firstPosXComponent)+'" id="positionXComposant'+(x.toString())+(y.toString())+'" required> (um)';
        newDiv.innerHTML += '<br/>Y: <input class= "inputComposant" type="number" value="'+((pasY*(y-1))+firstPosYComponent)+'" id="positionYComposant'+(x.toString())+(y.toString())+'" required> (um)';

        //Remplissage du sélecteur
        //Creation d'un nouveau sélecteur
        selecteurComposant = document.createElement("SELECT");
        selecteurComposant.id = 'select'+(x.toString())+(y.toString());

        if(resultReq.results != null)
        {
          resultReq.results['name'].forEach(function(item,idx){
            option = document.createElement('option');
            console.log('item = '+item);
            option.appendChild(document.createTextNode(item));
            option.value = item;
            //console.log(option);
            selecteurComposant.appendChild(option);
            //console.log(selecteurComposant);
          });
        }
        else {
          console.log("Resultat requete composantWithCategorie vide");
        }
        newDiv.appendChild(selecteurComposant);
        newDiv.style.margin = 10+'px';

        //console.log(tailleRepresentationComposantX);
        //console.log(tailleRepresentationComposantY);
        newDiv.style.width = tailleRepresentationComposantX+'px';
        newDiv.style.height = tailleRepresentationComposantY+'px';

        currentDiv.appendChild(newDiv);
        /*
        option = document.createElement('option');
        option.appendChild(document.createTextNode("AAA"+x+y));
        selecteurComposant.appendChild(option);
        option = document.createElement('option');
        option.appendChild(document.createTextNode("BBB"+x+y));
        selecteurComposant.appendChild(option);
        newDiv.appendChild(selecteurComposant);
        currentDiv.appendChild(newDiv);
        */
        console.log("Ajout div");
      }

      currentDiv.appendChild(retourLigne.cloneNode(true));
    }
  });
}

function tailleComposant()
{
  // On fait la requête pour obtenir la taille des composants.
  var indexSelecteur = selecteur.selectedIndex;
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=composantWithCategorie&n_cat='+ selecteur.options[indexSelecteur].text;
  console.log(url);

  ajaxGet(url, function(reponse){
    resultReq = JSON.parse(reponse);

    affichageTailleComposant.innerHTML='';
    if(resultReq.results!= null)
    {
      resultReq.results['name'].forEach(function(item,idx){
        label = document.createElement('label');
        label.textContent = item+' ('+resultReq.results['taille_c_x'][idx]+' x '+resultReq.results['taille_c_y'][idx]+') um';
        label.innerHTML += "<br />";
        affichageTailleComposant.appendChild(label);
      });
    }
    else {
      label = document.createElement('label');
      label.textContent = "Aucun composant n'existe dans cette catégorie";
      affichageTailleComposant.appendChild(label);
    }
  });
}
function start(){

  tailleX_Fenetre = window.innerHeight;
  tailleY_Fenetre = window.innerWidth;
  console.log("taille x => "+ tailleX_Fenetre);
  console.log("taille y => "+ tailleY_Fenetre);
  var listeParam = document.getElementById('listeParam');
  console.log(listeParam);
  var input;
  var label;
  var saut;
  var i=0;

  // On rempli le sélecteur avec le nom des catégories
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=CategorieLIST';
  ajaxGet(url,function(reponse){
    var resultReq = JSON.parse(reponse);
    console.log(resultReq.results[0]);

    var tableauDistinct = doublonType1(resultReq.results[0].Nom_categorie,resultReq.results[0].activation);
    console.log(tableauDistinct);

    console.log(tableauDistinct);
    tableauDistinct[0].forEach((item, i) => {
      if(tableauDistinct[1][i] == "1")
      {
        console.log(item);
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(item));
        option.value = 'option value';
        selecteur.appendChild(option);
      }
    });

    // On affiche la taille de chaque composants pour la catégorie sélectionnée
    tailleComposant();
  });
  reticule.style.backgroundColor = "black";

}

start();
