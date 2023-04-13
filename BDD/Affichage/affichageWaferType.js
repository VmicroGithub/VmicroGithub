import * as THREE from 'https://threejs.org/build/three.module.js';

import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

var camera;
var canvas;
var mouse, raycaster, isShiftDown = false;

var rollOverMesh, rollOverMaterial;
var rollOverGeo;

var scenes = [], renderer;
var objects = [];

var sceneWafer;

var selecteurWaferType = document.getElementById('selectWaferType');
var resultatTypeWafer;

init();
animate();

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

function init() {
  //Remplissage du sélecteur
  fillSelectorWithRequeteTypeWafer('https://vmicro.fr/database/BDD_1.0/API/api.php?action=WaferTypeLIST', selecteurWaferType);

  canvas = document.getElementById( "c" );

  var content = document.getElementById( 'content' );

  mouse = new THREE.Vector2();
  raycaster = new THREE.Raycaster();

  sceneWafer = new THREE.Scene();
  sceneWafer.background = new THREE.Color( 0xf0f0f0 );

  var element = document.createElement('div');
  element.className = 'list-item';
  element.id = "wafer";

  var sceneElement = document.createElement('div');
  element.appendChild(sceneElement);

  var descriptionElement = document.createElement('div');
  descriptionElement.id = 'descriptionWafer';
  descriptionElement.innerText = "visulation du wafer";
  element.appendChild(descriptionElement);

  sceneWafer.userData.element = sceneElement;
  content.appendChild(element);

  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set( 0, 0, 200 );
  camera.lookAt( 0, 0, 0 );
  sceneWafer.userData.camera = camera;

  // Deux solutions :
  // Parcours de tout les éléments du résultat de la requete wafer type mais il faut connaitre la taille du réticule en x et y
  // Ou sinon détectection du nombre de x et y.

  /*
  var geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
  geometry.rotateX( - Math.PI / 2 );
  var plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
  sceneWafer.add(plane);
  objects.push(plane);

  //cercle
  var geometry = new THREE.CircleGeometry( 500, 32 );
  geometry.rotateX( - Math.PI / 2 );
  var circle = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xffff00 }));
  sceneWafer.add(circle);

  // roll-over helpers
  */

  rollOverGeo = new THREE.BoxBufferGeometry( 10, 10, 1 );
  rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
  rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
  sceneWafer.add( rollOverMesh );


  // lights
  var ambientLight = new THREE.AmbientLight(0x606060);
  sceneWafer.add( ambientLight );

  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
  sceneWafer.add(directionalLight);

  scenes.push(sceneWafer);

  /*
  for ( var i = 0; i < 40; i ++ ) {

    var scene = new THREE.Scene();

    // make a list item
    var element = document.createElement( 'div' );
    element.className = 'list-item';

    var sceneElement = document.createElement( 'div' );
    element.appendChild( sceneElement );

    var descriptionElement = document.createElement( 'div' );
    descriptionElement.innerText = 'Scene ' + ( i + 1 );
    element.appendChild( descriptionElement );

    // the element that represents the area we want to render the scene
    scene.userData.element = sceneElement;
    content.appendChild( element );

    var camera = new THREE.PerspectiveCamera( 50, 1, 1, 10 );
    camera.position.z = 2;
    scene.userData.camera = camera;

    var controls = new OrbitControls( scene.userData.camera, scene.userData.element );
    controls.minDistance = 2;
    controls.maxDistance = 5;
    controls.enablePan = false;
    controls.enableZoom = false;
    scene.userData.controls = controls;

    // add one random mesh to each scene
    var geometry = geometries[ geometries.length * Math.random() | 0 ];

    var material = new THREE.MeshStandardMaterial( {

      color: new THREE.Color().setHSL( Math.random(), 1, 0.75 ),
      roughness: 0.5,
      metalness: 0,
      flatShading: true

    } );

    scene.add( new THREE.Mesh( geometry, material ) );

    scene.add( new THREE.HemisphereLight( 0xaaaaaa, 0x444444 ) );

    var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
    light.position.set( 1, 1, 1 );
    scene.add( light );

    scenes.push( scene );

  }
  */


  renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
  renderer.setClearColor( 0xffffff, 1 );
  renderer.setPixelRatio( window.devicePixelRatio );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

}

function onDocumentMouseMove( event ) {

  event.preventDefault();

  mouse.set( ( (event.clientX-26) / 500 )*2 -1 , - ( (event.clientY-90) / 500 ) * 2 + 1 );
  // 26 = x a gauche
  // 90 = y en haut
  //console.log(event.clientX);
  //console.log(event.clientY);

  raycaster.setFromCamera(mouse,camera);

  var intersects = raycaster.intersectObjects(objects);
  //console.log(intersects);
  if ( intersects.length > 0 ) {

    var intersect = intersects[ 0 ];
    //console.log(intersect.point);
    rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
    rollOverMesh.position.divideScalar(12).floor().multiplyScalar(12); //Correspond à la valeur du pas
    rollOverMesh.position.z = 2;
  }

  render();

}

function updateSize() {

  var width = canvas.clientWidth;
  var height = canvas.clientHeight;

  if ( canvas.width !== width || canvas.height !== height ) {

    renderer.setSize( width, height, false );

  }

}

function animate() {

  render();
  requestAnimationFrame( animate );

}

function render() {

  renderer.renderLists.dispose();
  updateSize();

  canvas.style.transform = `translateY(${window.scrollY}px)`;

  renderer.setClearColor( 0xffffff );
  renderer.setScissorTest( false );
  renderer.clear();

  renderer.setClearColor( 0xe0e0e0 );
  renderer.setScissorTest( true );

  scenes.forEach( function ( scene ) {

    // so something moves
    //scene.children[ 0 ].rotation.y = Date.now() * 0.001;

    // get the element that is a place holder for where we want to
    // draw the scene
    var element = scene.userData.element;

    // get its position relative to the page's viewport
    var rect = element.getBoundingClientRect();

    // check if it's offscreen. If so skip it
    if ( rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
       rect.right < 0 || rect.left > renderer.domElement.clientWidth ) {

      return; // it's off screen

    }

    // set the viewport
    var width = rect.right - rect.left;
    var height = rect.bottom - rect.top;
    var left = rect.left;
    var bottom = renderer.domElement.clientHeight - rect.bottom;

    renderer.setViewport( left, bottom, width, height );
    renderer.setScissor( left, bottom, width, height );

    var camera = scene.userData.camera;

    //camera.aspect = width / height; // not changing in this example
    //camera.updateProjectionMatrix();

    //scene.userData.controls.update();

    renderer.render( scene, camera );

  } );
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

selecteurWaferType.addEventListener('change', ()=>{

  console.log(sceneWafer.children);
  sceneWafer.children.forEach((item, i) => {
    if(item.name=="reticule"){
      sceneWafer.remove(item);
      render();
      for(var i=0; i<10000000; i++){;}
    }
  });

  console.log(sceneWafer);

  console.log(selectWaferType.value);

  var descriptionWafer = document.getElementById('descriptionWafer');
  if(descriptionWafer)
  {
    descriptionWafer.innerText = "";
    descriptionWafer.innerText = "Wafer : " + selectWaferType.value;
  }
  ajaxGet('https://vmicro.fr/database/BDD_1.0/API/api.php?action=WaferTypeLIST', function(reponse1){
    var resultReq1 = JSON.parse(reponse1);

    var tableauWafer = selectionWafer(selectWaferType.value, resultReq1.results[0]);
    if(tableauWafer['taille_wafer'] == 4){
      var geometry = new THREE.CircleGeometry(50, 32);
    }
    else {
      var geometry = new THREE.CircleGeometry(38, 32);
    }

    var formeWafer = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xffff00 }));
    formeWafer.name = "wafer";
    sceneWafer.add(formeWafer);

    console.log(tableauWafer);

    //Calculer le pas en X et en Y en faisant la différence de position entre deux reticules
    // Le calcul sera utile pour le raycaster

    tableauWafer['Nom_Type_reticule'].forEach((item, i) => {
      //console.log("position x : " + tableauWafer['position_reticule_x'][i]);
      //console.log("position y : " + tableauWafer['position_reticule_y'][i]);

      if(tableauWafer['Nom_Type_reticule'][i] != "")
      {
        var geometry = new THREE.PlaneBufferGeometry(10, 10);
        var reticule = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xbbbbbb }));
        reticule.position.x = tableauWafer['position_reticule_x'][i];
        reticule.position.y = tableauWafer['position_reticule_y'][i];
        reticule.position.z = 1;
        reticule.name = "reticule";
        sceneWafer.add(reticule);
        objects.push(reticule);
      }
    });

    render();


    ajaxGet('https://vmicro.fr/database/BDD_1.0/API/api.php?action=ReticuleTypeLIST', function(reponse2){
      var resultReq2 = JSON.parse(reponse2);
      console.log(resultReq2.results[0]);
    });
  });

});
