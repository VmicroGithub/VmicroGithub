/*
 Ce code Javascript réalise:

  - Le remplissage du sélecteur de projet (F1)

  La fonction start execute au départ les fonctions:
  - F1

*/
var filtre_photo = document.getElementById("filtre_photo");
var filtre_type_composant = document.getElementById("filtre_type_composant");
var divEtat = document.getElementById("divEtat");
var affichagePhoto = document.getElementById("affichagePhoto");
var selecteurProjet = document.getElementById("selecteurProjet");
var affichageNomClient = document.getElementById("affichageNomClient");
var selecteurWafer = document.getElementById("selecteurWafer");
var traitement = document.getElementById("traitement");
var affichageTypeWafer = document.getElementById("affichageTypeWafer");
var selecteurReticule = document.getElementById("selecteurReticule");
var representationReticule = document.getElementById("representationReticule");
var selecteurComposant = document.getElementById("selecteurComposant");
var representationComposant = document.getElementById("representationComposant");
var affichageTypeReticule = document.getElementById("affichageTypeReticule");
var affichageTypeComposant = document.getElementById("affichageTypeComposant");
var affichageIDComposant = document.getElementById("indicationComposant");
var affichageTypeComposantSurvol = document.getElementById("affichageTypeComposantSurvol");
var divTypeComposantSurvol = document.getElementById("divTypeComposantSurvol");
var colonne2 = document.getElementById("colonne2")
var colonne3 = document.getElementById("colonne3");
var colonne4 = document.getElementById("colonne4");
var divTypeReticuleSurvol = document.getElementById("divTypeReticuleSurvol");
var affichageTypeReticuleSurvol = document.getElementById("affichageTypeReticuleSurvol");
var affichageCoordReticuleSurvol = document.getElementById("affichageCoordReticuleSurvol");
var listMesure = document.getElementById("listMesure");
var legendeCouleur = document.getElementById("legendeCouleur");
var affichageClientSecret = document.getElementById("affichageClientSecret");
var lastComponent = document.getElementById("lastComponent");
var addBox = document.getElementById('boutonAjoutBoite');
var seeBox = document.getElementById('boutonVoirBoite');
var etatWafer = document.getElementsByName("etatWafer");
var mortWafer = document.getElementsByName("mortWafer");
var num_box = document.getElementById("num_box");
var coord_box = document.getElementById("coord_box");
var extra_box1 = document.getElementById("extra_box1");
var extra_box2 = document.getElementById("extra_box2");
var coordBoite = document.getElementById("coordBoite");

var variableGlobaleStockageRequeteProjetList;
var variableGlobaleStockageRequeteWaferByNameProject;
var variableGlobaleStockageRequeteComposant;
var typeReticuleGlobal;
var maxX_Ret = 0;
var maxY_Ret = 0;
var maxX_C = 0;
var maxY_C = 0;

var reticuleSelect;
var composantSelect;
var typeComposantMemory;
var idComposantMemory;
var reticuleSurvol;
var composantSurvol;

var tabCouleur = ['00F0DA', '007CF0', '3A00F0', '9100F0', 'E100F0', 'F00087', 'F00054', '5FF000'];
var bufferCouleurReticule = [];

var selectedComponent = document.getElementById("selectedComponent");


function remplissageNomTypeReticule(conteneur, valeurXReticule, valeurYReticule, contenu){
  //console.log(contenu);
  //console.log("valeur x reticule = "+valeurXReticule);
  //console.log("valeur y reticule = "+valeurYReticule);

  for(var indexTypeReticule = 0; indexTypeReticule < contenu['Nom_Type_Reticule'].length; indexTypeReticule++){
    if(contenu['Pos_X_Ret'][indexTypeReticule] == valeurXReticule){
      if(contenu['Pos_Y_Ret'][indexTypeReticule] == valeurYReticule){
        console.log(contenu['Nom_Type_Reticule'][indexTypeReticule]);
        conteneur.innerHTML = "";
        conteneur.innerHTML = contenu['Nom_Type_Reticule'][indexTypeReticule];
        break;
      }
    }
  }
}

function remplissageSelecteurComposant(conteneur, contenu){
  console.log(contenu);

  conteneur.innerHTML = "";

  var positionXReticuleSelecteur = selecteurReticule.value.substr(0,1);
  var positionYReticuleSelecteur = selecteurReticule.value.substr(1,2);

  var maxX=0;
  var maxY=0;

  contenu['ID_Composant'].forEach((composantID, indexComposant) => {
    console.log("test56");
    //remplissageCommentaire(composantID);
    if(contenu['Pos_X_Ret'][indexComposant] == positionXReticuleSelecteur){
      if(contenu['Pos_Y_Ret'][indexComposant] == positionYReticuleSelecteur){

        if(contenu['Coord_X_C'][indexComposant] > maxX){ maxX = contenu['Coord_X_C'][indexComposant];}
        if(contenu['Coord_Y_C'][indexComposant] > maxY){ maxY = contenu['Coord_Y_C'][indexComposant];}

        //console.log(composantID);
        //console.log(contenu['Coord_X_C'][indexComposant] + " ||| " + contenu["Coord_Y_C"][indexComposant]);

        var option = document.createElement('option');
        option.appendChild(document.createTextNode(contenu['Coord_X_C'][indexComposant] + contenu["Coord_Y_C"][indexComposant]));
        option.value = contenu['Coord_X_C'][indexComposant] + contenu["Coord_Y_C"][indexComposant];
        conteneur.appendChild(option);
      }
    }
  });
}

function remplissageNomTypeWafer(conteneur, contenu){
  conteneur.innerHTML = "";
  conteneur.innerHTML = contenu;
  conteneur.style.fontSize = "12px";
}


function remplissageSelecteurReticule(conteneur, contenu){
  //console.log(contenu);

  conteneur.innerHTML = ""; // On vide le conteneur qui est le sélecteur de réticule

  var option = document.createElement('option'); // On crée un élément option
  option.appendChild(document.createTextNode(contenu['Pos_X_Ret'][0]+contenu['Pos_Y_Ret'][0])); // On ajoute à l'élément option un texte qui contient le x et y du premier trouvé dans le contenu
  option.value = contenu['Pos_X_Ret'][0]+contenu['Pos_Y_Ret'][0]; // On défini la valeur de l'option comme étant le x et y du première élément de contenu
  conteneur.appendChild(option); // on ajoute l'option au conteneur

  var maxX = contenu['Pos_X_Ret'][0];
  var maxY = contenu['Pos_Y_Ret'][0];

  contenu['ID_Composant'].forEach((id, indexID) => {
    if(indexID > 0){

      if(contenu['Pos_X_Ret'][indexID] > maxX){ maxX = contenu['Pos_X_Ret'][indexID];}
      if(contenu['Pos_Y_Ret'][indexID] > maxY){ maxY = contenu['Pos_Y_Ret'][indexID];}

      var valeurReticule = (parseInt(contenu['Pos_X_Ret'][indexID])*10) + parseInt(contenu['Pos_Y_Ret'][indexID]);
      var valeurAncienneReticule = (parseInt(contenu['Pos_X_Ret'][indexID-1])*10) + parseInt(contenu['Pos_Y_Ret'][indexID-1]);

      if(valeurReticule != valeurAncienneReticule){
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(contenu['Pos_X_Ret'][indexID]+contenu['Pos_Y_Ret'][indexID]));
        option.value = contenu['Pos_X_Ret'][indexID]+contenu['Pos_Y_Ret'][indexID];
        conteneur.appendChild(option);
      }
    }
  });
  console.log(maxX);
  console.log(maxY);

  maxX_Ret = maxX;
  maxY_Ret = maxY;

  //creationGridReticule(representationReticule, parseInt(maxX), parseInt(maxY));

  reticuleSelect = document.getElementById("reticule"+contenu['Pos_X_Ret'][0]+contenu['Pos_Y_Ret'][0]);
  //reticuleSelect.style.backgroundColor = "#F06400";

  //remplissageNomTypeReticule(affichageTypeReticule, contenu['Pos_X_Ret'][0],contenu['Pos_Y_Ret'][0], contenu);

  
  remplissageSelecteurComposant(selecteurComposant, contenu);

}

function remplissageSelecteurWafer(conteneur, nomProjet, value){
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getWaferByNameProject&nom_projet='+nomProjet;
  ajaxGet(url, function(reponseWaferList){
    listWafer = JSON.parse(reponseWaferList);
    console.log(listWafer);
    console.log(listWafer.results['Nom_Wafer']);
    conteneur.innerHTML = "";
    listWafer.results[0]['Nom_Wafer'].forEach((nomWafer, indexWafer) => {
      var option = document.createElement('option');
      option.appendChild(document.createTextNode(nomWafer));
      option.value = nomWafer;
      if(nomWafer == value){
        option.selected="selected";
      }

      if(value != null){
        if(nomWafer == value){
         console.log("test1111111111111111111");
         remplissageNomTypeWafer(affichageTypeWafer,listWafer.results[0]['Nom_Type_Wafer'][indexWafer]);
         loadComponent(listWafer.results[0]['Nom_Wafer'][indexWafer]);
        }
      }
      conteneur.appendChild(option);
    });

    variableGlobaleStockageRequeteWaferByNameProject = listWafer.results[0];
    if(value == null) {
     console.log("test1111111111111111222    " +  value);
     //remplissageNomTypeWafer(affichageTypeWafer,);
     loadComponent(listWafer.results[0]['Nom_Wafer'][0]);
      
      
    }

  });
  option.appendChild(document.createTextNode("."));
  option.value=".";
}

function loadComponent(nomWafer){
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getComponentOnWaferImprove&nom_wafer='+nomWafer;
  console.log(url);
  ajaxGet(url, function(reponseComponentList){
    listComponent = JSON.parse(reponseComponentList);
    console.log(listComponent);
    console.log(listComponent['results'][0]);
    if(listComponent['results'][0]!=null){
      console.log("Différent de null");
      variableGlobaleStockageRequeteComposant = listComponent['results'][0];
      console.log(variableGlobaleStockageRequeteComposant);
      remplissageSelecteurReticule(selecteurReticule, listComponent['results'][0]);
    }
    else {
      //selecteur réticule ---
      var option = document.createElement('option');
      option.appendChild(document.createTextNode("---"));
      selecteurReticule.innerHTML = "";
      selecteurReticule.appendChild(option);

      //selecteur composant ---
      var option = document.createElement('option');
      option.appendChild(document.createTextNode("---"));
      selecteurComposant.innerHTML = "";
      selecteurComposant.appendChild(option);

      representationComposant.innerHTML = "";
      representationReticule.innerHTML = "";
    }

  });

}
function remplissageNomTypeWafer(conteneur, contenu){
  conteneur.innerHTML = "";
  conteneur.innerHTML = contenu;
  conteneur.style.fontSize = "12px";
  console.log("yo");
}





function remplissageSelecteurProjet(conteneur){
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=ProjetLIST';
  ajaxGet(url,function(reponseProjetList){
    listProjet = JSON.parse(reponseProjetList);
    console.log(listProjet.results[0]);
    listProjet.results[0]["Nom_projet"].forEach((nomProjet, indexProjet) => {
      if(listProjet.results[0].activation[indexProjet] != 0){
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(nomProjet));
        console.log("test");
        console.log(nomProjet);
        console.log("test");
        option.value = nomProjet;
        conteneur.appendChild(option);
      }
    });
    variableGlobaleStockageRequeteProjetList = listProjet.results[0];
    console.log("remplissageSelecteurWafer");
    remplissageSelecteurWafer(selecteurWafer ,listProjet.results[0]["Nom_projet"][0]);
  });
}


function remplissageCommentaire(idComposant){
  console.log("test57");
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getComment2WithIDcomponent&ID_Component='+idComposant; // On indique le lien pour la requête
  console.log(url); // On affiche le lien (Optionnel)
  var newDivCommentaire = document.createElement("div"); // On crée une div nommée newDivCommentaire
  ajaxGet(url, function(reponseComment){ // On fait une requête get
    listComment = JSON.parse(reponseComment); // On parse la réponse
    console.log(listComment); // (Optionnel)
    console.log("aaaaaaaaaaaaaaaaaaaaaa");
    console.log(listComment['results'][0]); //(Optionnel)
    if(listComment['results'][0]!= null){ // S'il y a des commentaires alors on effectue les lignes en dessous
      listComment['results'][0]["Contenu"].forEach((commentaire, idCommentaire) => { // Pour chaque colonne contenu du résultat de la requête

        if(listComment['results'][0]["ID_Image"][idCommentaire] != -1){ // S'il y a une image
          console.log("test58");
          //On affiche la photo
          var img = document.createElement("img"); // On crée un élément image
          var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getLinkPictureWithID&ID_picture='+listComment['results'][0]["ID_Image"][idCommentaire]; // On défini le lien pour la requête chargé de trouver l'ID_Imag
          console.log(url); // On affiche le lien (Optionnel)
          ajaxGet(url, function(reponseLink){ // On fait une requête GET
            listLink = JSON.parse(reponseLink); // On parse la réponse
            if(listLink['results'][0]!=null){
              //console.log(listLink);
              //console.log('../'+listLink['results'][0]['Chemin']+"."+listLink['results'][0]['Extension']);
              img.src = '../'+listLink['results'][0]['Chemin']+"."+listLink['results'][0]['Extension']; // On défini le lien vers la source de l'image
              //img.src = '../image/component/5005/071020114450.jpg';
              img.style.height = "400px"; // On défini la hauteur de l'image
              img.style.width = "400px"; // On défini la largeur de l'image
              img.style.margin = "auto"; // On centre l'image
              newDivCommentaire.appendChild(img); // On associe l'image avec le div du commentaire
              //console.log("newDivCommentaire = " + newDivCommentaire.offsetHeight+"px");
            }
          })
        }
        

        
        //var newContentCommentaire = document.createTextNode(commentaire);
        //newDivCommentaire.appendChild(newContentCommentaire);



        affichagePhoto.appendChild(newDivCommentaire); // On associe newDivCommentaire avec affichagePhoto

      });
    }
  });
}

function remplissagePhotoComposant(idcomposant){

  //On affiche la photo
  var newDivCommentaire = document.createElement("div"); // On crée une div nommée newDivCommentaire
  var increment_photo = 0;
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getLinkPictureWithIDret&ID_ret='+idret; // On défini le lien pour la requête chargé de trouver l'ID_Imag
  console.log(url); // On affiche le lien (Optionnel)
  ajaxGet(url, function(reponseLink){ // On fait une requête GET
    listLink = JSON.parse(reponseLink); // On parse la réponse
    console.log("gggggggggggggggggg");
    console.log(listLink);
    if(listLink['results'][0]!=null){
      listLink['results'][0]["Chemin"].forEach( ID_Composant => {
        if(ID_Composant==idcomposant){
          var img = document.createElement("img"); // On crée un élément image
          //console.log(listLink);
          console.log("bbbbbbbbbbbbbbbbbbbbbbbb");
          console.log(Object.keys( listLink['results'][0]['Chemin'] ).length );
          // console.log('../'+listLink['results'][0]['Chemin'][ID_Composant]+"."+listLink['results'][0]['Extension'][ID_Composant]);
          img.src = '../'+listLink['results'][0]['Chemin'][increment_photo]+"."+listLink['results'][0]['Extension'][increment_photo]; // On défini le lien vers la source de l'image
          //img.src = '../image/component/5005/071020114450.jpg';
          img.style.height = "400px"; // On défini la hauteur de l'image
          img.style.width = "400px"; // On défini la largeur de l'image
          img.style.margin = "auto"; // On centre l'image
          newDivCommentaire.appendChild(img); // On associe l'image avec le div du commentaire
          //console.log("newDivCommentaire = " + newDivCommentaire.offsetHeight+"px");
          affichagePhoto.appendChild(newDivCommentaire);
        }
        increment_photo=increment_photo+1;
      
      });
    }
  });
}

function remplissagePhotoComp(coord_composant,idret,nom_wafer,nom_projet){

  //On affiche la photo
  var newDivCommentaire = document.createElement("div"); // On crée une div nommée newDivCommentaire
  var increment_photo = 0;
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getLinkPictureWithIDret2&Coord_C='+ coord_composant + '&ID_ret=' + idret + '&Nom_Wafer=' + nom_wafer + '&Nom_Projet=' + nom_projet; // On défini le lien pour la requête chargé de trouver l'ID_Imag
  console.log(url); // On affiche le lien (Optionnel)
  ajaxGet(url, function(reponseLink){ // On fait une requête GET
    listLink = JSON.parse(reponseLink); // On parse la réponse
    console.log("gggggggggggggggggg");
    console.log(listLink);
    if(listLink['results'][0]!=null){
      while(increment_photo!= Object.keys( listLink['results'][0]['Chemin'] ).length){
  
        var img = document.createElement("img"); // On crée un élément image
        //console.log(listLink);
        
        console.log("bbbbbbbbbbbbbbbbbbbbbbbb");
        console.log(Object.keys( listLink['results'][0]['Chemin'] ).length );
       // console.log('../'+listLink['results'][0]['Chemin'][ID_Composant]+"."+listLink['results'][0]['Extension'][ID_Composant]);
        img.src = '../'+listLink['results'][0]['Chemin'][increment_photo]+"."+listLink['results'][0]['Extension'][increment_photo]; // On défini le lien vers la source de l'image
        //img.src = '../image/component/5005/071020114450.jpg';
        img.style.height = "400px"; // On défini la hauteur de l'image
        img.style.width = "400px"; // On défini la largeur de l'image
        img.style.margin = "auto"; // On centre l'image
        newDivCommentaire.appendChild(img); // On associe l'image avec le div du commentaire
        //console.log("newDivCommentaire = " + newDivCommentaire.offsetHeight+"px");
        affichagePhoto.appendChild(newDivCommentaire);
        increment_photo=increment_photo+1;
      
      }
    }
  });
}


function remplissagePhotoRet(idret,nom_wafer,nom_projet){

  //On affiche la photo
  var newDivCommentaire = document.createElement("div"); // On crée une div nommée newDivCommentaire
  var increment_photo = 0;
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getLinkPictureWithIDret2&ID_ret=' + idret + '&Nom_Wafer=' + nom_wafer + '&Nom_Projet=' + nom_projet; // On défini le lien pour la requête chargé de trouver l'ID_Imag
  console.log(url); // On affiche le lien (Optionnel)
  ajaxGet(url, function(reponseLink){ // On fait une requête GET
    listLink = JSON.parse(reponseLink); // On parse la réponse
    console.log("gggggggggggggggggg");
    console.log(listLink);
    if(listLink['results'][0]!=null){
      while(increment_photo!= Object.keys( listLink['results'][0]['Chemin'] ).length){
  
        var img = document.createElement("img"); // On crée un élément image
        //console.log(listLink);
        
        console.log("bbbbbbbbbbbbbbbbbbbbbbbb");
        console.log(Object.keys( listLink['results'][0]['Chemin'] ).length );
       // console.log('../'+listLink['results'][0]['Chemin'][ID_Composant]+"."+listLink['results'][0]['Extension'][ID_Composant]);
        img.src = '../'+listLink['results'][0]['Chemin'][increment_photo]+"."+listLink['results'][0]['Extension'][increment_photo]; // On défini le lien vers la source de l'image
        //img.src = '../image/component/5005/071020114450.jpg';
        img.style.height = "400px"; // On défini la hauteur de l'image
        img.style.width = "400px"; // On défini la largeur de l'image
        img.style.margin = "auto"; // On centre l'image
        newDivCommentaire.appendChild(img); // On associe l'image avec le div du commentaire
        //console.log("newDivCommentaire = " + newDivCommentaire.offsetHeight+"px");
        affichagePhoto.appendChild(newDivCommentaire);
        increment_photo=increment_photo+1;
      
      }
    }
  });
}

function remplissagePhotoWafer(nom_wafer,nom_projet){

  //On affiche la photo
  var newDivCommentaire = document.createElement("div"); // On crée une div nommée newDivCommentaire
  var increment_photo = 0;
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getLinkPictureWithIDret2&Nom_Projet=' + nom_projet + '&Nom_Wafer=' + nom_wafer; // On défini le lien pour la requête chargé de trouver l'ID_Imag
  console.log(url); // On affiche le lien (Optionnel)
  ajaxGet(url, function(reponseLink){ // On fait une requête GET
    listLink = JSON.parse(reponseLink); // On parse la réponse
    console.log("gggggggggggggggggg");
    console.log(listLink);
    if(listLink['results'][0]!=null){
      while(increment_photo!= Object.keys( listLink['results'][0]['Chemin'] ).length){
  
        var img = document.createElement("img"); // On crée un élément image
        //console.log(listLink);
        
        console.log("bbbbbbbbbbbbbbbbbbbbbbbb");
        console.log(Object.keys( listLink['results'][0]['Chemin'] ).length );
       // console.log('../'+listLink['results'][0]['Chemin'][ID_Composant]+"."+listLink['results'][0]['Extension'][ID_Composant]);
        img.src = '../'+listLink['results'][0]['Chemin'][increment_photo]+"."+listLink['results'][0]['Extension'][increment_photo]; // On défini le lien vers la source de l'image
        //img.src = '../image/component/5005/071020114450.jpg';
        img.style.height = "400px"; // On défini la hauteur de l'image
        img.style.width = "400px"; // On défini la largeur de l'image
        img.style.margin = "auto"; // On centre l'image
        newDivCommentaire.appendChild(img); // On associe l'image avec le div du commentaire
        //console.log("newDivCommentaire = " + newDivCommentaire.offsetHeight+"px");
        affichagePhoto.appendChild(newDivCommentaire);
        increment_photo=increment_photo+1;
      
      }
    }
  });
}

function remplissagePhotoProjet(nom_projet){

  document.getElementById('selecteurComposant').disabled=true;
  document.getElementById('selecteurWafer').disabled=false;
  document.getElementById('selecteurReticule').disabled=true;
  document.getElementById('selecteurProjet').disabled=false;
  //On affiche la photo
  var newDivCommentaire = document.createElement("div"); // On crée une div nommée newDivCommentaire
  var increment_photo = 0;
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getLinkPictureWithIDret2&Nom_Projet=' + nom_projet; // On défini le lien pour la requête chargé de trouver l'ID_Imag
  console.log(url); // On affiche le lien (Optionnel)
  ajaxGet(url, function(reponseLink){ // On fait une requête GET
    listLink = JSON.parse(reponseLink); // On parse la réponse
    console.log("gggggggggggggggggg");
    console.log(listLink);
    if(listLink['results'][0]!=null){
      while(increment_photo!= Object.keys( listLink['results'][0]['Chemin'] ).length){
  
        var img = document.createElement("img"); // On crée un élément image
        //console.log(listLink);
        
        console.log("bbbbbbbbbbbbbbbbbbbbbbbb");
        console.log(Object.keys( listLink['results'][0]['Chemin'] ).length );
       // console.log('../'+listLink['results'][0]['Chemin'][ID_Composant]+"."+listLink['results'][0]['Extension'][ID_Composant]);
        img.src = '../'+listLink['results'][0]['Chemin'][increment_photo]+"."+listLink['results'][0]['Extension'][increment_photo]; // On défini le lien vers la source de l'image
        //img.src = '../image/component/5005/071020114450.jpg';
        img.style.height = "400px"; // On défini la hauteur de l'image
        img.style.width = "400px"; // On défini la largeur de l'image
        img.style.margin = "auto"; // On centre l'image
        newDivCommentaire.appendChild(img); // On associe l'image avec le div du commentaire
        //console.log("newDivCommentaire = " + newDivCommentaire.offsetHeight+"px");
        affichagePhoto.appendChild(newDivCommentaire);
        increment_photo=increment_photo+1;
      
      }
    }
  });
}
  


selecteurWafer.addEventListener('change', ()=>{ // Si le sélecteur de wafer change
  filtre_type_composant.innerHTML="";
  remplissageFiltre();
  console.log(variableGlobaleStockageRequeteWaferByNameProject);
  document.getElementById("affichagePhoto").innerHTML = "";
  console.log(selecteurWafer.value);
  remplissagePhotoWafer(selecteurWafer.value,selecteurProjet.value);

  variableGlobaleStockageRequeteWaferByNameProject["Nom_Wafer"].forEach((nomWafer, indexWafer) => {
    if(nomWafer == selecteurWafer.value){
      console.log(variableGlobaleStockageRequeteWaferByNameProject);
      //remplissageNomTypeWafer(affichageTypeWafer,variableGlobaleStockageRequeteWaferByNameProject['Nom_Type_Wafer'][indexWafer]);
      //loadComponent(variableGlobaleStockageRequeteWaferByNameProject['Nom_Wafer'][indexWafer]);

      loadComponent(listWafer.results[0]['Nom_Wafer'][indexWafer]);
      
      
      console.log("yo2");
    }
  });
  document.getElementById('selecteurComposant').disabled=true;
  document.getElementById('selecteurWafer').disabled=false;
  document.getElementById('selecteurReticule').disabled=false;
  document.getElementById('selecteurProjet').disabled=false;
});

/*
document.getElementById("affichagePhoto").innerHTML = "";
  console.log(selecteurWafer.value);
  remplissagePhotoRet(selecteurReticule.value,selecteurWafer.value,selecteurProjet.value);
*/

selecteurReticule.addEventListener('change', ()=>{ // Si le sélecteur de projet change
  

  document.getElementById("affichagePhoto").innerHTML = "";
  console.log(selecteurWafer.value);
  remplissagePhotoRet(selecteurReticule.value,selecteurWafer.value,selecteurProjet.value);
  document.getElementById('selecteurComposant').disabled=false;
  document.getElementById('selecteurWafer').disabled=false;
  document.getElementById('selecteurReticule').disabled=false;
  document.getElementById('selecteurProjet').disabled=false;
});

selecteurComposant.addEventListener('change', ()=>{ // Si le sélecteur de projet change
  console.log("ffffff : " + String(increment_type_composant));
  document.getElementById("affichagePhoto").innerHTML = "";
  console.log(selecteurWafer.value);
  remplissagePhotoComp(selecteurComposant.value,selecteurReticule.value,selecteurWafer.value,selecteurProjet.value);
  document.getElementById('selecteurComposant').disabled=false;
  document.getElementById('selecteurWafer').disabled=false;
  document.getElementById('selecteurReticule').disabled=false;
  document.getElementById('selecteurProjet').disabled=false;
});

selecteurProjet.addEventListener('change', ()=>{ // Si le sélecteur de projet change
  
  console.log(variableGlobaleStockageRequeteProjetList);
  variableGlobaleStockageRequeteProjetList["Nom_projet"].forEach((nomProjet, indexProjet) => {
    if(nomProjet == selecteurProjet.value)
    {
      //remplissageNomClient(affichageNomClient ,listProjet.results[0]["id_client"][indexProjet]);
      //console.log("remplissageSelecteurWafer");
      document.getElementById("affichagePhoto").innerHTML = "";
      console.log(selecteurWafer.value);
      remplissagePhotoProjet(selecteurProjet.value);
      remplissageSelecteurWafer(selecteurWafer, listProjet.results[0]["Nom_projet"][indexProjet],null);
      
    }
  });
});

function checkbox_checked()
{
  for (let i = 0; i < 9; i++){
    if (document.getElementById('checkbox' + String(i)).checked == true) 
    {
      console.log("la checkbox est check : " + 'checkbox' + String(i));   
    } else {
      console.log("fail");  
    }
  }
}

function remplissageFiltre(){
  //var newDivCommentaire = document.createElement("div"); // On crée une div nommée newDivCommentaire
  increment_type_composant = 0;
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=Type_Composant2&Nom_Wafer=' + selecteurWafer.value; // On défini le lien pour la requête chargé de trouver l'ID_Imag
  console.log(url); // On affiche le lien (Optionnel)
  ajaxGet(url, function(reponseLink){ // On fait une requête GET
    listLink = JSON.parse(reponseLink); // On parse la réponse
    console.log("gggggggggggggggggg2");
    console.log(listLink);
    if(listLink['results']!=null){
      while(increment_type_composant!= Object.keys( listLink['results']['type_composant'] ).length){
        console.log("bbbbbbbbbbbbbbbbbbbbbbbb 2");
        var label = document.createElement("LABEL");
        var checkbox = document.createElement("input"); // On crée un élément image
        checkbox.type="checkbox";
        checkbox.id="checkbox" + String(increment_type_composant);
        checkbox.onclick=checkbox_checked();
        label.style="margin-right:2vw;";
        label.innerHTML=listLink['results']['type_composant'][increment_type_composant];
        //console.log(listLink);
        
        console.log(Object.keys( listLink['results']['type_composant'] ).length );
       // console.log('../'+listLink['results'][0]['Chemin'][ID_Composant]+"."+listLink['results'][0]['Extension'][ID_Composant]);
        //img.src = '../image/component/5005/071020114450.jpg';
        checkbox.style.margin = "auto"; // On centre l'image
        filtre_type_composant.appendChild(checkbox); // On associe l'image avec le div du commentaire
        filtre_type_composant.appendChild(label);
        //console.log("newDivCommentaire = " + newDivCommentaire.offsetHeight+"px");
        divEtat.appendChild(filtre_type_composant);
        increment_type_composant=increment_type_composant+1;
        console.log("test45");
      
      }
    }
  });

}


function start(){
  remplissageSelecteurProjet(selecteurProjet);
  //remplissageBarNavigationWithID();
  document.getElementById('selecteurComposant').disabled=true;
  document.getElementById('selecteurWafer').disabled=true;
  document.getElementById('selecteurReticule').disabled=true;
  document.getElementById('selecteurProjet').disabled=false;
}





start();
