
var canvas = document.querySelector('canvas');
var selecteurWaferType = document.getElementById('selectWaferType');

var centreX;
var centreY;

var c;
var rectCanvas;
var past = new Object;
var facteurResize=1;

var tableauReticule = Array();
init()

function init(){

  past.posX = 0;
  past.posY = 0;
  past.sizeX = 0;
  past.sizeY = 0;

  fillSelectorWithRequeteTypeWafer('https://vmicro.fr/database/BDD_1.0/API/api.php?action=WaferTypeLIST', selecteurWaferType);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  c = canvas.getContext('2d');
  rectCanvas = canvas.getBoundingClientRect();

  console.log(rectCanvas.height);
  console.log(rectCanvas.width);

  centreX = rectCanvas.width/2;
  centreY = rectCanvas.height/2;
  //On regarde s'il y a eu un click

  //canvas.addEventListener('click',handleClick);
  //canvas.addEventListener('click',intersection);
  canvas.addEventListener('mousemove', intersection);
  window.onresize = resize;
}

function intersection(e){
  var positionSourisX = e.clientX;
  var positionSourisY = e.clientY;

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
            console.log(tableauReticule[numReticule].typeRet);
            console.log(tableauReticule[numReticule].coordonneX);
            console.log(tableauReticule[numReticule].coordonneY);
            /*c.fillRect((tableauReticule[numReticule].posX-tableauReticule[numReticule].tailleX) ,
            (tableauReticule[numReticule].posY-tableauReticule[numReticule].tailleY),
            tableauReticule[numReticule].tailleX,
            tableauReticule[numReticule].tailleY);*/

            c.fillStyle = 'rgb(100, 100, 100)';
            console.log(past);
            c.fillRect(past.posX, past.posY, past.sizeX, past.sizeY);
            past.posX = tableauReticule[numReticule].posX;
            past.posY = tableauReticule[numReticule].posY;
            past.sizeX = tableauReticule[numReticule].tailleX;
            past.sizeY = tableauReticule[numReticule].tailleY;

            c.fillStyle = 'rgb(255, 0, 0)';
            c.fillRect(tableauReticule[numReticule].posX, tableauReticule[numReticule].posY, tableauReticule[numReticule].tailleX, tableauReticule[numReticule].tailleY);

            break;
          }
        }
      }
    }
  }
}

function resize(){
  console.log(rectCanvas.height);
  console.log(rectCanvas.width);

  rectCanvas.width = window.innerWidth;
  rectCanvas.height = window.innerHeight;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  centreX = rectCanvas.width/2;
  centreY = rectCanvas.height/2;

  dessineWafer();
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
  var rect = c.getBoundingClientRect();
  return{
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function handleClick(e){
  var pos = getMousePos(canvas, e);
  posx = pos.x;
  posy = pos.y;

  console.log(posx);
  console.log(posy);
}

function dessineWafer(){


  c.clearRect(0,0,rectCanvas.width, rectCanvas.height); // On nettoie le canvas

  ajaxGet('https://vmicro.fr/database/BDD_1.0/API/api.php?action=WaferTypeLIST', function(reponse1){
    var resultReq1 = JSON.parse(reponse1);
    ajaxGet('https://vmicro.fr/database/BDD_1.0/API/api.php?action=ReticuleTypeLIST', function(reponse2){
      var resultReq2 = JSON.parse(reponse2);
      console.log(resultReq2.results[0]);

      var tableauWafer = selectionWafer(selectWaferType.value, resultReq1.results[0]);
      console.log(tableauWafer);
      if(tableauWafer['taille_wafer'][0] == '4'){
        facteurResize= rectCanvas.height/1000;
        console.log(facteurResize);

        c.beginPath();
        c.arc(centreX, centreY, 500*facteurResize, -5*(Math.PI/6), 7*(Math.PI/6), false);
        c.stroke();


      }
      else {
        facteurResize=1;
        c.beginPath();
        c.arc(centreX, centreY, 380, -5*(Math.PI/6), 7*(Math.PI/6), false);
        c.stroke();
      }

      c.beginPath();
      // Staring point (10,45)
      c.moveTo(centreX, centreY-10);
      // End point (180,47)
      c.lineTo(centreX, centreY+10);
      // Make the line visible
      c.stroke();

      c.beginPath();
      // Staring point (10,45)
      c.moveTo(centreX-10, centreY);
      // End point (180,47)
      c.lineTo(centreX+10, centreY);
      // Make the line visible
      c.stroke();

      tableauWafer['Nom_Type_reticule'].forEach((item, i) => {

        var positionX = (parseInt(tableauWafer['position_reticule_x'][i]*10*facteurResize)+centreX);
        var positionY = (-parseInt(tableauWafer['position_reticule_y'][i]*10*facteurResize)+centreY);

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

                c.beginPath();
                c.fillStyle = 'rgb(255, 255, 255)';
                // Staring point (10,45)
                c.moveTo(positionX, positionY-10);
                // End point (180,47)
                c.lineTo(positionX, positionY+10);
                // Make the line visible
                c.stroke();

                c.beginPath();
                // Staring point (10,45)
                c.moveTo(positionX-10, positionY);
                // End point (180,47)
                c.lineTo(positionX+10, positionY);
                // Make the line visible
                c.stroke();

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

          c.fillStyle = 'rgb(100, 100, 100)';

          c.fillRect(positionX ,positionY,tailleReticuleX,tailleReticuleY);

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
