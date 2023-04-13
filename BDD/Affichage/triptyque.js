var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');

var selecteurWaferType = document.getElementById('selectWaferType');

var descriptionRet = document.getElementById("descriptionReticule");
var messageNoDescription = document.getElementById("noDescriptionReticule");

var centre1X;
var centre1Y;
var centre2X;
var centre2Y;

var ctx1;
var ctx2;

var rectCanvas1;
var rectCanvas2;
var past = new Object;
var facteurResize=1;

var lastReticule;

var tableauReticule = Array();
init()

function init(){

  past.posX = 0;
  past.posY = 0;
  past.sizeX = 0;
  past.sizeY = 0;

  fillSelectorWithRequeteTypeWafer('https://vmicro.fr/database/BDD_1.0/API/api.php?action=WaferTypeLIST', selecteurWaferType);

  canvas1.width = (window.innerWidth/2)-10;
  canvas1.height = (window.innerWidth/2)-10;

  canvas2.width = (window.innerWidth/2)-10;
  canvas2.height = (window.innerWidth/2)-10;

  ctx1 = canvas1.getContext('2d');
  ctx2 = canvas2.getContext('2d');

  rectCanvas1 = canvas1.getBoundingClientRect();
  rectCanvas2 = canvas2.getBoundingClientRect();

  //console.log(rectCanvas1.width);
  //console.log(rectCanvas1.height);

  centre1X = rectCanvas1.width/2;
  centre1Y = rectCanvas1.width/2;

  centre2X = rectCanvas2.width/2;
  centre2Y = rectCanvas2.width/2;

  //console.log(centreX);
  //console.log(centreY);

  ctx1.font = "30px Arial";
  ctx1.fillText("Pas de wafer selectionné", 125, centre1Y+15);
  ctx1.beginPath();
  ctx1.arc(centre1X, centre1Y, 250, -8*(Math.PI/10), 8*(Math.PI/10), false);
  ctx1.stroke();

  ctx2.fillRect(centre2X-201 ,centre2Y-201,402,402);
  ctx2.fillStyle = 'rgb(255, 255, 255)';
  ctx2.fillRect(centre2X-200 ,centre2Y-200,400,400);
  ctx2.fillStyle = 'rgb(0, 0, 0)';
  ctx2.font = "30px Arial";
  ctx2.fillText("Pas de reticule selectionné", 125, centre2Y+15);

  //On regarde s'il y a eu un click

  //canvas.addEventListener('click',handleClick);
  //canvas.addEventListener('click',intersection);
  canvas1.addEventListener('mousemove', intersection);
  window.onresize = resize;

}

function intersection(e){

  var retourLigne = document.createElement("br");

  var offsetSourisX = 0;
  var offsetSourisY = canvas1.offsetTop;
  var positionSourisX = e.clientX-offsetSourisX;
  var positionSourisY = e.clientY-offsetSourisY;

  //console.log(tableauReticule);

  for(var numReticule=0; numReticule<tableauReticule.length; numReticule++){
    /*
    console.log("positionSourisX = " + positionSourisX);
    console.log("positionSourisY = " + positionSourisY);
    console.log(tableauReticule[numReticule].posX + " < X < " + (tableauReticule[numReticule].posX + tableauReticule[numReticule].tailleX));
    console.log(tableauReticule[numReticule].posY + " < Y < " + (tableauReticule[numReticule].posY + tableauReticule[numReticule].tailleY));
    */

    if(positionSourisX >tableauReticule[numReticule].posX){
      //console.log("*    "+positionSourisX + ">" + tableauReticule[numReticule].posX);
      if(positionSourisX < (tableauReticule[numReticule].posX + tableauReticule[numReticule].tailleX)){
        //console.log("**   "+positionSourisX +"<" + (tableauReticule[numReticule].posX + tableauReticule[numReticule].tailleX));
        if(positionSourisY > tableauReticule[numReticule].posY){
          //console.log("***  "+positionSourisY + ">" + tableauReticule[numReticule].posY);
          if(positionSourisY < (tableauReticule[numReticule].posY + tableauReticule[numReticule].tailleY)){
            //console.log("**** "+positionSourisY +"<" + (tableauReticule[numReticule].posY + tableauReticule[numReticule].tailleY));
            //console.log(tableauReticule[numReticule].typeRet);
            //console.log(tableauReticule[numReticule].coordonneX);
            //console.log(tableauReticule[numReticule].coordonneY);

            descriptionRet.style.display = "block";
            descriptionRet.innerHTML = "Type reticule : " + tableauReticule[numReticule].typeRet;
            descriptionRet.appendChild(retourLigne.cloneNode(true));
            descriptionRet.innerHTML += "Coordonnées : ( " + tableauReticule[numReticule].coordonneX + " ; " + tableauReticule[numReticule].coordonneY +" )";
            messageNoDescription.style.display = "none";

            ctx1.fillStyle = 'rgb(100, 100, 100)';
            //console.log(past);
            ctx1.fillRect(past.posX, past.posY, past.sizeX, past.sizeY);
            past.posX = tableauReticule[numReticule].posX;
            past.posY = tableauReticule[numReticule].posY;
            past.sizeX = tableauReticule[numReticule].tailleX;
            past.sizeY = tableauReticule[numReticule].tailleY;

            ctx1.fillStyle = 'rgb(255, 0, 0)';
            ctx1.fillRect(tableauReticule[numReticule].posX, tableauReticule[numReticule].posY, tableauReticule[numReticule].tailleX, tableauReticule[numReticule].tailleY);

            if(lastReticule != tableauReticule[numReticule].typeRet)
            {
              dessineReticule(tableauReticule[numReticule].typeRet);
              lastReticule = tableauReticule[numReticule].typeRet;
            }
            break;
          }
        }
      }
    }
  }
}

function resize(){
  console.log(rectCanvas1.height);
  console.log(rectCanvas1.width);

  //Le -15 permet normalement d'avoir les deux div a coté

  rectCanvas1.width = (window.innerWidth/2)-10;
  rectCanvas1.height = (window.innerWidth/2)-10;

  rectCanvas2.width = (window.innerWidth/2)-10;
  rectCanvas2.height = (window.innerWidth/2)-10;

  canvas1.width = (window.innerWidth/2)-10;
  canvas1.height = (window.innerWidth/2)-10;

  canvas2.width = (window.innerWidth/2)-10;
  canvas2.height = (window.innerWidth/2)-10;

  centre1X = rectCanvas1.width/2;
  centre1Y = rectCanvas1.height/2;

  centre2X = rectCanvas2.width/2;
  centre2Y = rectCanvas2.height/2;

  dessineWafer();
  dessineReticule();
}

function fillSelectorWithRequeteTypeWafer(lienAPI, conteneur){
  ajaxGet(lienAPI, function(reponse){
  var resultReq = JSON.parse(reponse);
  console.log(resultReq.results[0]);
  console.log(resultReq.results[0].Nom_Type_wafer);
  var tableauDistinct = removeDuplicates(resultReq.results[0].Nom_Type_wafer);
  console.log(tableauDistinct);
  tableauDistinct.forEach(function(item, i){
    var option = document.createElement('option');
    option.appendChild(document.createTextNode(item));
    option.value = item;
    conteneur.appendChild(option);
    });
  });
}

function selectionWafer(nomTypeWafer, tableauRecherche){
  var tableauRetour = Array();
  tableauRetour['Nom_Type_reticule'] = Array();
  tableauRetour['coordonnee_reticule_x'] = Array();
  tableauRetour['coordonnee_reticule_y'] = Array();
  tableauRetour['id_type_wafer'] = Array();
  tableauRetour['position_reticule_x'] = Array();
  tableauRetour['position_reticule_y'] = Array();
  tableauRetour['taille_wafer'] = Array();
  console.log(tableauRecherche);
  tableauRecherche['Nom_Type_wafer'].forEach((item, i) => {
    if(item == nomTypeWafer){
      tableauRetour['Nom_Type_reticule'].push(tableauRecherche['Nom_Type_reticule'][i]);
      tableauRetour['coordonnee_reticule_x'].push(tableauRecherche['coordonnee_reticule_x'][i]);
      tableauRetour['coordonnee_reticule_y'].push(tableauRecherche['coordonnee_reticule_y'][i]);
      tableauRetour['id_type_wafer'].push(tableauRecherche['id_type_wafer'][i]);
      tableauRetour['position_reticule_x'].push(tableauRecherche['position_reticule_x'][i]);
      tableauRetour['position_reticule_y'].push(tableauRecherche['position_reticule_y'][i]);
      tableauRetour['taille_wafer'].push(tableauRecherche['taille_wafer'][i]);
    }
  });
  //console.log(tableauRetour);
  return tableauRetour;
}

function getMousePos(c, evt){
  var rect = ctx1.getBoundingClientRect();
  return{
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function handleClick(e){
  var pos = getMousePos(canvas1, e);
  posx = pos.x;
  posy = pos.y;

  console.log(posx);
  console.log(posy);
}
function dessineReticule(nomRet){

  ctx2.clearRect(0,0, rectCanvas2.width, rectCanvas2.height);
  var iter=0;
  if(nomRet){
    ajaxGet('https://vmicro.fr/database/BDD_1.0/API/api.php?action=ReticuleTypeLIST', function(reponse){
      var resultatReq1 = JSON.parse(reponse);
      console.log(resultatReq1.results[0]);

      resultatReq1.results[0]['reticule_type_nom'].forEach((item, i) => {

        if( nomRet == item){

          var tailleReticuleX = resultatReq1.results[0]['reticule_taille_X'][i];
          var tailleReticuleY = resultatReq1.results[0]['reticule_taille_Y'][i];

          var tailleRectangleDiv2 = (rectCanvas2.width*0.9)/2;

          if(iter < 1){
            ctx2.fillStyle = 'rgb(0, 0, 0)';
            ctx2.fillRect(centre2X - tailleRectangleDiv2 - 1, centre2Y - tailleRectangleDiv2 - 1, tailleRectangleDiv2*2 +2, tailleRectangleDiv2*2 +2);
            ctx2.fillStyle = 'rgb(255, 255, 255)';
            ctx2.fillRect(centre2X - tailleRectangleDiv2, centre2Y - tailleRectangleDiv2, tailleRectangleDiv2*2, tailleRectangleDiv2*2);
          }
          else {
            iter=0;
          }

          var positionXrepresentationComposant = resultatReq1.results[0]['composant_position_X'][i] - (resultatReq1.results[0]['composant_taille_X'][i]/2);
          var positionYrepresentationComposant = resultatReq1.results[0]['composant_position_Y'][i] - (resultatReq1.results[0]['composant_taille_Y'][i]/2);
          var tailleXrepresentationComposant = resultatReq1.results[0]['composant_taille_X'][i];
          var tailleYrepresentationComposant = resultatReq1.results[0]['composant_taille_Y'][i];

          positionXrepresentationComposant = (positionXrepresentationComposant/100);
          positionYrepresentationComposant = centre2Y + tailleRectangleDiv2 - (positionYrepresentationComposant/100);
          tailleXrepresentationComposant = (tailleXrepresentationComposant/100);
          tailleYrepresentationComposant = (tailleYrepresentationComposant/100);


            console.log(i+": --------------");
            console.log(resultatReq1.results[0]['reticule_type_nom'][i]);
            console.log(resultatReq1.results[0]['composant_position_X'][i]);
            console.log(resultatReq1.results[0]['composant_position_Y'][i]);
            console.log(resultatReq1.results[0]['composant_position_X'][i]);
            console.log(resultatReq1.results[0]['composant_position_Y'][i]);
            console.log()
            console.log(positionXrepresentationComposant);
            console.log(positionYrepresentationComposant);
            console.log(tailleXrepresentationComposant);
            console.log(tailleYrepresentationComposant);
            console.log("-------------");

            ctx2.fillStyle = 'rgb(0, 200, 0)';
            ctx2.fillRect(positionXrepresentationComposant, positionYrepresentationComposant, tailleXrepresentationComposant, tailleYrepresentationComposant);
            iter++;
        }
      });
    });
  }
  else{
    ctx2.fillRect(centre2X-201 ,centre2Y-201,402,402);
    ctx2.fillStyle = 'rgb(255, 255, 255)';
    ctx2.fillRect(centre2X-200 ,centre2Y-200,400,400);
    ctx2.fillStyle = 'rgb(0, 0, 0)';
    ctx2.font = "30px Arial";
    ctx2.fillText("Pas de reticule selectionné", 125, centre2Y+15);
  }
}

function dessineWafer(){

  ctx1.clearRect(0,0,rectCanvas1.width, rectCanvas1.height); // On nettoie le canvas

  ajaxGet('https://vmicro.fr/database/BDD_1.0/API/api.php?action=WaferTypeLIST', function(reponse1){
    var resultReq1 = JSON.parse(reponse1);
    ajaxGet('https://vmicro.fr/database/BDD_1.0/API/api.php?action=ReticuleTypeLIST', function(reponse2){
      var resultReq2 = JSON.parse(reponse2);
      console.log(resultReq2.results[0]);

      var tableauWafer = selectionWafer(selectWaferType.value, resultReq1.results[0]);
      console.log(tableauWafer);
      if(tableauWafer['taille_wafer'][0] == '4'){
        facteurResize= rectCanvas1.height/1000;
        console.log(facteurResize);

        ctx1.beginPath();
        ctx1.arc(centre1X, centre1Y, 500*facteurResize, -8*(Math.PI/10), 8*(Math.PI/10), false);
        ctx1.stroke();


      }
      else {
        facteurResize=1;
        ctx1.beginPath();
        ctx1.arc(centre1X, centre1Y, 380, -8*(Math.PI/10), 8*(Math.PI/10), false);
        ctx1.stroke();
      }

      ctx1.beginPath();
      // Staring point (10,45)
      ctx1.moveTo(centre1X, centre1Y-10);
      // End point (180,47)
      ctx1.lineTo(centre1X, centre1Y+10);
      // Make the line visible
      ctx1.stroke();

      ctx1.beginPath();
      // Staring point (10,45)
      ctx1.moveTo(centre1X-10, centre1Y);
      // End point (180,47)
      ctx1.lineTo(centre1X+10, centre1Y);
      // Make the line visible
      ctx1.stroke();

      tableauWafer['Nom_Type_reticule'].forEach((item, i) => {

        var positionX = (parseInt(tableauWafer['position_reticule_x'][i]*10*facteurResize)+centre1X);
        var positionY = (-parseInt(tableauWafer['position_reticule_y'][i]*10*facteurResize)+centre1Y);

        //console.log("position x : " + positionX);
        //console.log("position y : " + positionY);
        console.log(item);

        if(tableauWafer['Nom_Type_reticule'][i] != "")
        {
          for(var iReticule=0; iReticule<resultReq2.results[0]['reticule_type_nom'].length; iReticule++){
            if(item == resultReq2.results[0]['reticule_type_nom'][iReticule]){

                var reticule = new Object();

                tailleReticuleX = resultReq2.results[0]['reticule_taille_X'][iReticule]*10*facteurResize;
                tailleReticuleY = resultReq2.results[0]['reticule_taille_Y'][iReticule]*10*facteurResize;


                //console.log("taille du reticule en X = "+tailleReticuleX);
                //console.log("taille du reticule en Y = "+tailleReticuleY);

                ctx1.beginPath();
                ctx1.fillStyle = 'rgb(255, 255, 255)';
                // Staring point (10,45)
                ctx1.moveTo(positionX, positionY-10);
                // End point (180,47)
                ctx1.lineTo(positionX, positionY+10);
                // Make the line visible
                ctx1.stroke();

                ctx1.beginPath();
                // Staring point (10,45)
                ctx1.moveTo(positionX-10, positionY);
                // End point (180,47)
                ctx1.lineTo(positionX+10, positionY);
                // Make the line visible
                ctx1.stroke();

                reticule.typeRet = item;
                //Important
                positionX -= tailleReticuleX/2;
                positionY -= tailleReticuleY/2;

                reticule.posX = positionX;
                reticule.posY = positionY;
                reticule.tailleX = parseInt(tailleReticuleX);
                reticule.tailleY = parseInt(tailleReticuleY);
                reticule.coordonneX = tableauWafer['coordonnee_reticule_x'][i];
                reticule.coordonneY = tableauWafer['coordonnee_reticule_y'][i];
                break;
              }
          }

          ctx1.fillStyle = 'rgb(100, 100, 100)';

          ctx1.fillRect(positionX ,positionY,tailleReticuleX,tailleReticuleY);

          tableauReticule.push(reticule);
        }
      });
    });
  });
}
selecteurWaferType.addEventListener('change', ()=>{
  tableauReticule.splice(0,tableauReticule.length); // On supprime le tableau
  past.posX = 0;
  past.posY = 0;
  past.sizeX = 0;
  past.sizeY = 0;
  dessineWafer();
});
