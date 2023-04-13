<?php
  session_start();
  include 'header.php';
  #---------------Alex ajout--------------------------------------------------------------------------------------------------------------
  if($_GET["action"] == "Type_Composant2")
  {
    if(isset($_GET["Nom_Wafer"]))
    {
      $reponse = $bdd->prepare(
        'SELECT DISTINCT Nom_Type_C FROM type_reticule
        INNER JOIN type_wafer on type_wafer.Nom_Type_Reticule=type_reticule.Nom_Type_Reticule
        INNER JOIN wafer on wafer.Type_Wafer=type_wafer.Nom_Type_Wafer
        WHERE wafer.Nom_Wafer=:nomWafer;'
        );
      $reponse->execute(array(
        'nomWafer' => $_GET["Nom_Wafer"]
      ));
    }
    while($donnees = $reponse->fetch())
    {
      $table['type_composant'][] = $donnees['Nom_Type_C'];
    }
    
    retour_json(true, "Données composant en fonction du nom 2", $table);
  }

  if($_GET["action"] == "Type_Wafer_withNomWafer")
  {
    if(isset($_GET["Type_Wafer"]))
    {
      $reponse = $bdd->prepare(
        'SELECT `Nom_Wafer` FROM `wafer` WHERE `Type_Wafer`=:type_wafer');
      $reponse->execute(array(
        'type_wafer' => $_GET["Type_Wafer"]
      ));
    }
    while($donnees = $reponse->fetch())
    {
      $table['nom_wafer'][] = $donnees['Nom_Wafer'];
    }
    
    retour_json(true, "Les wafer en fonction du type wafer : ", $table);
  }

  if($_GET["action"] == "Type_Wafer_withTypeReticule")
  {
    if(isset($_GET["Nom_Type_Reticule"]))
    {
      $reponse = $bdd->prepare(
        'SELECT distinct `Nom_Type_Wafer` FROM `type_wafer` WHERE `Nom_Type_Reticule`=:type_reticule;');
      $reponse->execute(array(
        'type_reticule' => $_GET["Nom_Type_Reticule"]
      ));
    }
    while($donnees = $reponse->fetch())
    {
      $table['type_wafer'][] = $donnees['Nom_Type_Wafer'];
    }
    
    retour_json(true, "Les type wafer en fonction du type reticule : ", $table);
  }

  if($_GET["action"] == "Type_Reticule_withType_Composant")
  {
    if(isset($_GET["Nom_Type_C"]))
    {
      $reponse = $bdd->prepare(
        'SELECT distinct `Nom_Type_Reticule` FROM `type_reticule` WHERE `Nom_Type_C`=:nom_type_c;');
      $reponse->execute(array(
        'nom_type_c' => $_GET["Nom_Type_C"]
      ));
    }
    while($donnees = $reponse->fetch())
    {
      $table['nom_type_reticule'][] = $donnees['Nom_Type_Reticule'];
    }
    
    retour_json(true, "Les wafer en fonction du type wafer : ", $table);
  }

  if($_GET["action"] == "WaferLIST_by_projet")
  {
    if(isset($_GET["ID_Projet"]))
    {
      $reponse = $bdd->prepare(
        'SELECT `Nom_Wafer` FROM `wafer` 
        INNER JOIN projet on wafer.ID_Projet= projet.ID_Projet
        WHERE projet.ID_Projet=:projet;'
        );
      $reponse->execute(array(
        'projet' => $_GET["ID_Projet"]
      ));
    }
    while($donnees = $reponse->fetch())
    {
      $table['Nom_wafer'][] = $donnees['Nom_Wafer'];
    }
    
    retour_json(true, "Données composant en fonction du nom 2", $table);
  }
  
  if($_GET["action"] == "GetAllProjects")
  {
    $reponse = $bdd->prepare(
      'SELECT projet.ID_Projet, projet.Nom_Projet, wafer.ID_Wafer, wafer.Nom_Wafer 
      from projet 
      INNER JOIN wafer 
      ON projet.ID_Projet = wafer.ID_Projet 
      WHERE wafer.ID_Wafer 
      IN(
        SELECT MAX(wafer.ID_Wafer) 
        from wafer 
        GROUP BY wafer.ID_Projet) 
      ORDER BY wafer.ID_Wafer 
      DESC'
    );

    $reponse->execute();

    while($donnees = $reponse->fetch())
    {
      $table['Project_id'][] = $donnees['ID_Projet'];
      $table['Project_Name'][] = $donnees['Nom_Projet'];
    }
    
    retour_json(true, "Data Ready", $table);
  }


  if($_GET["action"] == "GetAllWafersWithId")
  {
    if(isset($_GET["ProjectId"]))
    {
      $reponse = $bdd->prepare(
        'SELECT wafer.Nom_Wafer 
        FROM wafer 
        WHERE EXISTS(
          SELECT DISTINCT composant.Nom_Wafer 
          FROM composant 
          WHERE composant.Nom_Wafer = wafer.Nom_Wafer) 
        AND wafer.ID_Projet =:id
        ORDER BY wafer.ID_Wafer DESC'
      );

      $reponse->execute(array(
        'id' => $_GET["ProjectId"]
      ));

      while($donnees = $reponse->fetch())
      {
        $table['wafer'][] = $donnees['Nom_Wafer'];
      }
      
      retour_json(true, "Data Ready", $table);
    }
  }

  /*
  if($_POST['action'] == "addProjet")
  {
    if(($_POST['nom_Projet'])!="") // On vérifie que nom_Projet existe
    {
      if(($_POST['nom_Client'])!="") // On vérifie que nom_Client existe
      {
        if(($_POST['description_Projet'])!="") // On vérifie que description_Projet existe
        {
          if(($_POST['etat_Projet'])!="") // On vérifie que etat_Projet existe
          {
            $reponse = $bdd->prepare('SELECT DISTINCT ID_Client FROM client WHERE Nom_Entreprise =:n_e');
            $reponse->execute(array(
              'n_e' => $_POST['nom_Client']
            ));
            $donnees=$reponse->fetch();
            //echo $donnees['ID'];

            date_default_timezone_set('Europe/Paris');
            //echo date("Y-m-d H:i:s",$phptime);

            //On fait une requête pour ajouter le projet dans la base de données abec le nom, l'id client, la description , la dernière modification , et savoir si le projet est en cours ou non
            $req_Ajout = $bdd->prepare('INSERT INTO projet (Nom_Projet, ID_Client, Description, last_modif, etat, Activation) VALUES(:Nom_Projet, :ID_Client, :Description, :last_modif, :etat, 1)');
            $req_Ajout->execute(array(
                'Nom_Projet' => $_POST['nom_Projet'],
                'ID_Client' => $donnees['ID_Client'],
                'Description' => $_POST['description_Projet'],
                'last_modif' => date("Y-m-d H:i:s",time()),
                'etat' => $_POST['etat_Projet'],
                ));
                //Faire une redirection vers la page d'accueil
                retour_json(true, "Ajout du projet dans la base de données");
          }
          else { // Message Erreur
            retour_json(false, "Problème état projet");
            //echo "Il y a un problème avec l'état du projet";
          }
        }
        else { // Message Erreur
          retour_json(false, "Problème description projet");
          //echo "Il y a un problème avec la description du projet";
        }
      }
      else { // Message Erreur
        retour_json(false, "Problème nom client");
        //echo "Il y a un problème avec le nom du client";
      }
    }
    else { // Message Erreur
      retour_json(false, "Problème nom projet");
      //echo "Il y a un problème avec le nom du projet";
    }
  }
  */
  if($_POST["action"] == "addWaferCrosses")
  {
    if(isset($_POST["Nom_Type_Wafer"]))
      {
      if(isset($_POST["pos_x_c1"]))
      {
          if(isset($_POST["pos_y_c1"]))
        {
            if(isset($_POST["pos_x_c2"]))
          {
              if(isset($_POST["pos_y_c2"]))
            {
                if(isset($_POST["pos_x_c3"]))
              {
                  if(isset($_POST["pos_y_c3"]))
                {
                  $req_Ajout = $bdd->prepare(
                    'INSERT INTO croix (Nom_Type_Wafer, pos_x_c1,pos_y_c1,pos_x_c2,pos_y_c2,pos_x_c3,pos_y_c3) VALUES(:nom_type_wafer,:pos_x_C1,:pos_y_C1,:pos_x_C2,:pos_y_C2,:pos_x_C3,:pos_y_C3)'
                    );
                    $req_Ajout->execute(array(
                    'nom_type_wafer' => $_POST["Nom_Type_Wafer"],
                    'pos_x_C1' => $_POST["pos_x_c1"],
                    'pos_y_C1' => $_POST["pos_y_c1"],
                    'pos_x_C2' => $_POST["pos_x_c2"],
                    'pos_y_C2' => $_POST["pos_y_c2"],
                    'pos_x_C3' => $_POST["pos_x_c3"],
                    'pos_y_C3' => $_POST["pos_y_c3"],
                  ));
                  retour_json(true, "les croix sont reçu");
                }

              }
            }
          }
        }
      }
    }
    
  }

  
  if($_GET["action"] == "getCrossesFromWaferName")
  {
    if(isset($_GET["Nom_Wafer"]))
    {
      $reponse = $bdd->prepare(
        'SELECT DISTINCT croix.pos_x_c1, croix.pos_y_c1, croix.pos_x_c2, croix.pos_y_c2, croix.pos_x_c3, croix.pos_y_c3
        FROM croix
        INNER JOIN wafer on wafer.Type_Wafer = croix.Nom_type_wafer
        WHERE wafer.Nom_Wafer=:nomWafer;'
        );
      $reponse->execute(array(
        'nomWafer' => $_GET["Nom_Wafer"]
      ));
    }
    while($donnees = $reponse->fetch())
    {
      $table['c1_x'][] = $donnees['pos_x_c1'];
      $table['c1_y'][] = $donnees['pos_y_c1'];
      $table['c2_x'][] = $donnees['pos_x_c2'];
      $table['c2_y'][] = $donnees['pos_y_c2'];
      $table['c3_x'][] = $donnees['pos_x_c3'];
      $table['c3_y'][] = $donnees['pos_y_c3'];
    }
    
    retour_json(true, "Positions des croix recuperees", $table);
  }
  
  /*
  if($_GET["action"] == "NomWafer_infoxy")
  {
    if(isset($_GET["Nom_Wafer"]))
    {
      $reponse = $bdd->prepare(
        'SELECT DISTINCT composant.ID_Composant, composant.type_Composant_Ref, type_reticule.Nom_Type_Reticule, type_reticule.Taille_Ret_X, type_reticule.Taille_Ret_Y, composant.Pos_X_Ret, composant.Pos_Y_Ret, type_reticule.Pos_X_C, type_reticule.Pos_Y_C, type_reticule.Coord_X_C, type_reticule.Coord_Y_C, (type_wafer.Pos_X_R*1000)+type_reticule.Pos_X_C, (type_wafer.Pos_Y_R*1000)+type_reticule.Pos_Y_C, type_composant.taille_composant_X, type_composant.taille_composant_Y 
        FROM composant
        INNER JOIN type_composant on composant.type_Composant_Ref=type_composant.Nom_Type_C
        INNER JOIN type_reticule on composant.ID_Type_Reticule_Ref=type_reticule.ID_type_reticule
        INNER JOIN type_wafer on type_reticule.Nom_Type_Reticule=type_wafer.Nom_Type_Reticule
        WHERE composant.Nom_Wafer=:nomWafer AND composant.ID_Type_Reticule_Ref=type_reticule.ID_type_reticule AND composant.Pos_X_Ret=type_wafer.Coord_X_Ret AND composant.Pos_Y_Ret=type_wafer.Coord_Y_Ret GROUP BY composant.ID_Composant ORDER by composant.ID_Composant;'
        );
      $reponse->execute(array(
        'nomWafer' => $_GET["Nom_Wafer"]
      ));
    }
    while($donnees = $reponse->fetch())
    {
      $table['id_composant'][] = $donnees['ID_Composant'];
      $table['pos_x_wafer'][] = $donnees['(type_wafer.Pos_X_R*1000)+type_reticule.Pos_X_C'];
      $table['pos_y_wafer'][] = $donnees['(type_wafer.Pos_Y_R*1000)+type_reticule.Pos_Y_C'];
      $table['type_composant_ref'][] = $donnees['type_Composant_Ref'];
      $table['Nom_Type_Reticule'][] = $donnees['Nom_Type_Reticule'];
      $table['Taille_Ret_X'][] = $donnees['Taille_Ret_X'];
      $table['Taille_Ret_Y'][] = $donnees['Taille_Ret_Y'];
      $table['pos_x_ret'][] = $donnees['Pos_X_Ret'];
      $table['pos_y_ret'][] = $donnees['Pos_Y_Ret'];
      $table['pos_x_c'][] = $donnees['Pos_X_C'];
      $table['pos_y_c'][] = $donnees['Pos_Y_C'];
      $table['taille_composant_x'][] = $donnees['taille_composant_X'];
      $table['taille_composant_y'][] = $donnees['taille_composant_Y'];
      $table['coord_x_c'][] = $donnees['Coord_X_C'];
      $table['coord_y_c'][] = $donnees['Coord_Y_C'];
    }
    
    retour_json(true, "Données composant en fonction du nom", $table);
  }
  */


  if($_GET["action"] == "NomWafer_infoxy")
  {
    if(isset($_GET["Nom_Wafer"]))
    {
      $reponse = $bdd->prepare(
        'SELECT DISTINCT composant.ID_Composant,type_reticule.Nom_Type_Reticule,composant.type_Composant_Ref,type_wafer.Coord_X_Ret,type_wafer.Coord_Y_Ret,type_reticule.taille_composant_X,type_reticule.taille_composant_Y,type_reticule.Coord_X_C,type_reticule.Coord_Y_C,type_reticule.Pos_X_C,type_reticule.Pos_Y_C,type_wafer.Pos_X_R,type_wafer.Pos_Y_R,(type_wafer.Pos_X_R*1000)+type_reticule.Pos_X_C+(type_reticule.taille_composant_X/2),(type_wafer.Pos_Y_R*1000)+type_reticule.Pos_Y_C+(type_reticule.taille_composant_Y/2),type_wafer.Nom_Type_Wafer,composant.Pos_X_Ret,composant.Pos_Y_Ret
        FROM wafer
        INNER JOIN type_wafer on type_wafer.Nom_Type_Wafer=wafer.Type_Wafer
        INNER JOIN type_reticule on type_wafer.Nom_Type_Reticule=type_reticule.Nom_Type_Reticule
        INNER JOIN composant on composant.Nom_Wafer=wafer.Nom_Wafer and composant.ID_Type_Reticule_Ref=type_reticule.ID_type_reticule and composant.Pos_X_Ret=type_wafer.Coord_X_Ret and composant.Pos_Y_Ret=type_wafer.Coord_Y_Ret

        WHERE wafer.Nom_Wafer=:nomWafer;'
        );
      $reponse->execute(array(
        'nomWafer' => $_GET["Nom_Wafer"]
      ));
    }
    while($donnees = $reponse->fetch())
    {
      $table['id_composant'][] = $donnees['ID_Composant'];
      $table['nom_type_reticule'][] = $donnees['Nom_Type_Reticule'];
      $table['type_composant_ref'][] = $donnees['type_Composant_Ref'];
      $table['coord_x_ret'][] = $donnees['Coord_X_Ret'];
      $table['coord_y_ret'][] = $donnees['Coord_Y_Ret'];
      $table['taille_composant_x'][] = $donnees['taille_composant_X'];
      $table['taille_composant_y'][] = $donnees['taille_composant_Y'];
      $table['coord_x_c'][] = $donnees['Coord_X_C'];
      $table['coord_y_c'][] = $donnees['Coord_Y_C'];
      $table['pos_x_c'][] = $donnees['Pos_X_C'];
      $table['pos_y_c'][] = $donnees['Pos_Y_C'];
      $table['pos_x_r'][] = $donnees['Pos_X_R'];
      $table['pos_y_r'][] = $donnees['Pos_Y_R'];
      $table['pos_x_wafer'][] = $donnees['(type_wafer.Pos_X_R*1000)+type_reticule.Pos_X_C+(type_reticule.taille_composant_X/2)'];
      $table['pos_y_wafer'][] = $donnees['(type_wafer.Pos_Y_R*1000)+type_reticule.Pos_Y_C+(type_reticule.taille_composant_Y/2)'];
      $table['nom_type_wafer'][] = $donnees['Nom_Type_Wafer'];
      $table['pos_x_ret'][] = $donnees['Pos_X_Ret'];
      $table['pos_y_ret'][] = $donnees['Pos_Y_Ret'];
    }
    
    retour_json(true, "Données composant en fonction du nom", $table);
  }




  if($_GET["action"] == "GetComponentInfos")
  {
    if(isset($_GET["Wafer_Ref"]) && isset($_GET["Wafer_Ref"]) && isset($_GET["Wafer_Ref"]))
    {
      $reponse = $bdd->prepare(
        'SET @row_nu:=0');
      $reponse->execute();
      $reponse = $bdd->prepare(
        'SET @prev_value:=0');
      $reponse->execute();
      $reponse = $bdd->prepare(
        'SELECT composant.ID_Composant, composant.type_Composant_Ref, composant.Etat_Composant, composant.Vivant, y.Valeur, y.ID_Caracteristique, y.Last_Modif, caracteristique.Nom_Parametre, caracteristique.Unite
        FROM composant 
        LEFT JOIN
          (SELECT 
            * 
          FROM 
            (SELECT 
              mesure.ID_Composant, 
              mesure.Valeur, 
              mesure.ID_Caracteristique, 
              mesure.Last_modif, 
              @row_nu := IF(@prev_value = mesure.ID_Caracteristique, @row_nu + 1,1) AS Row_Number, 
              @prev_value := mesure.ID_Caracteristique AS value 
            FROM 
              mesure 
            ORDER BY 
              mesure.ID_Composant, 
              mesure.ID_Caracteristique, 
              mesure.Last_modif DESC)x 
          WHERE 
            Row_Number = 1 
          ORDER BY 
            ID_Composant, 
            ID_Caracteristique)y 
        ON 
          composant.ID_Composant = y.ID_Composant
        LEFT JOIN
          caracteristique
        ON
          y.ID_Caracteristique = caracteristique.ID_Caracteristique
        WHERE composant.Nom_Wafer=:wafer_reference
        ORDER BY 
          composant.ID_Composant, 
          y.ID_Caracteristique;'
      );
      $reponse->execute(array(
        'wafer_reference' => $_GET["Wafer_Ref"]
      ));
    }
    while($donnees = $reponse->fetch())
    {
      $table['id_composant'][] = $donnees['ID_Composant'];
      $table['type_composant_ref'][] = $donnees['type_Composant_Ref'];
      $table['etat_composant'][] = $donnees['Etat_Composant'];
      $table['vivant'][] = $donnees['Vivant'];
      $table['valeur'][] = $donnees['Valeur'];
      $table['id_caracteristique'][] = $donnees['ID_Caracteristique'];
      $table['last_modif'][] = $donnees['Last_Modif'];
      $table['nom_parametre'][] = $donnees['Nom_Parametre'];
      $table['unite'][] = $donnees['Unite'];
    }
    
    retour_json(true, "Infos composant en fonction du nom", $table);
  }

/*
  if($_POST['action'] == "addPhotoProber")
  {
    if(isset($_POST['id_composant']))
    {
      if(isset($_POST['new_content']))
      {
        if(isset($_POST['datecom']))
        {
          if(isset($_POST['lien']))
          {
            #if(isset($_FILES['file_photo'])){

            $req = $bdd->prepare('INSERT INTO image (Extension, Chemin, ID_Composant) VALUES("jpg", :lien, :id_composant);
                                  INSERT INTO commentaire (Contenu, DateCom, ID_Composant, ID_Utilisateur, ID_Fichier) VALUES(:new_content, :datecom, :id_composant, 5, 0);
                                  UPDATE commentaire SET ID_Image = (SELECT ID_Image FROM image WHERE Chemin=:lien);');
            
            $req->execute(array(
              'id_composant' => $_POST['id_composant'],
              'new_content' => $_POST['new_content'],
              'datecom' => $_POST['datecom'],
              'lien' => $_POST['lien']
              #'file_photo' => $_FILES['file_photo']

            ));
            retour_json(true, "Modification du commentaire");
          }
        }
        else {retour_json(false, "Probleme ID commentaire");}
      }
      else{retour_json(false, "Probleme du contenu");}
    }
  }

  */


            

  #---------------Alex ajout fin------------------------------------------------------------------------------------------------------------------
  if($_GET["action"] == "UserLAW")
  {
    if(isset($_GET["UserID"]))
    {
      $reponse = $bdd->prepare('SELECT droit from utilisateur where id_utilisateur = :idUser ');
      $reponse->execute(array(
        'idUser' => $_GET["UserID"]
      ));
    }
    $resultsInter = $reponse->fetch();
    $results = $resultsInter['droit'];
    retour_json(true, "Voici les droits de l'utilisateur", $results);
  }
  if($_GET["action"] == "UserPICTURE")
  {
    if(isset($_GET["UserID"]))
    {
      $reponse = $bdd->prepare('SELECT lien_photo from utilisateur where id_utilisateur = :idUser ');
      $reponse->execute(array(
        'idUser' => $_GET["UserID"]
      ));
    }
    $resultsInter = $reponse->fetch();
    $results = $resultsInter['lien_photo'];
    retour_json(true, "Voici le lien vers la photo de profil de l'utilisateur", $results);
  }
  /* Plus utilisé normalement car on a la requête d'en dessous
  if($_GET["action"] == "CatLIST")
  {
    $reponse = $bdd->query('SELECT DISTINCT Nom_Categorie FROM categorie ORDER BY ID_Categorie DESC');
    $table =array();
    while($donnees = $reponse->fetch())
    {
      $table[] = $donnees['Nom_Categorie'];
    }
    $results = $table;
    retour_json(true, "Voici la liste des noms de catégorie de composant", $results);
  }
  */
  if($_GET['action'] == "CategorieLIST")
  {
    $req = $bdd->query('SELECT * FROM categorie ORDER BY ID_Categorie DESC');

    $table = array();

    while($donnees = $req->fetch())
    {
      $table['id_categorie'][] = $donnees['ID_Categorie'];
      $table['Nom_categorie'][] = $donnees['Nom_Categorie'];
      $table['id_caracteristique'][] = $donnees['ID_Caracteristique'];
      $table['activation'][] = $donnees['Activation'];
    }
    $results[] = $table;
    retour_json(true, "Voici la liste des categories", $results);
  }

  if($_GET['action'] == "TypeComposantNameLIST")
  {
    $req = $bdd->query('SELECT DISTINCT Nom_Type_C FROM type_composant');

    $table = array();

    while($donnees = $req->fetch())
    {
      $table['Nom_type_composant'][] = $donnees['Nom_Type_C'];
    }
    $results[] = $table;
    retour_json(true, "Voici la liste des noms des types composant", $results);
  }


  if($_GET["action"] == "ParamLIST")
  {
    $reponse = $bdd->query('SELECT * FROM caracteristique');
    $table =array();

    while($donnees = $reponse->fetch())
    {
      $table['id_param'][] = $donnees['ID_Caracteristique'];
      $table['Nom_Parametre'][] = $donnees['Nom_Parametre'];
      $table['Unite'][] = $donnees['Unite'];
      $table['activation'][] = $donnees['Activation'];
    }
    $results[] = $table;
    retour_json(true, "Voici la liste des noms de catégorie de composant", $results);
  }
  if($_GET['action'] == "ClientLIST")
  {
    $req = $bdd->query('SELECT * FROM client ORDER BY Nom_Entreprise');

    $table = array();

    while($donnees = $req->fetch())
    {
      $table['id_client'][] = $donnees['ID_Client'];
      $table['Nom_client'][] = $donnees['Nom_Entreprise'];
      $table['activation'][] = $donnees['Activation'];
    }
    $results[] = $table;
    retour_json(true, "Voici la liste des clients", $results);
  }
  if($_GET['action'] == "AllClientLIST")
  {
    //$req = $bdd->query('(SELECT ID_Client_E, Nom_Entreprise FROM client_expedition) UNION
//(SELECT ID_Client, Nom_Entreprise FROM client) ORDER BY Nom_Entreprise ASC');
    $req = $bdd->query('SELECT ID_Client_E, Nom_Entreprise FROM client_expedition');
    $table = array();

    while($donnees = $req->fetch())
    {
      $table['id_Client_E'][] = $donnees['ID_Client'];
      $table['Nom_client'][] = $donnees['Nom_Entreprise'];
    }
    $results[] = $table;
    retour_json(true, "Voici la liste des clients normaux et clients d'expedition", $results);
  }
  if($_GET['action'] == "ProjetLIST")
  {
    $req = $bdd->query('SELECT * FROM projet');

    $table = array();

    while($donnees = $req->fetch())
    {
      $table['id_projet'][] = $donnees['ID_Projet'];
      $table['Nom_projet'][] = $donnees['Nom_Projet'];
      $table['id_client'][] = $donnees['ID_Client'];
      $table['description'][] = $donnees['Description'];
      $table['last_modif'][] = $donnees['Last_modif'];
      $table['etat'][] = $donnees['etat'];
      $table['activation'][] = $donnees['Activation'];
    }
    $results[] = $table;
    retour_json(true, "Voici la liste des projets", $results);
  }

  if($_GET['action'] == "WaferTypeLIST")
  {
    $req = $bdd->query('SELECT DISTINCT * FROM type_wafer ORDER BY ID_Type_wafer');
    $table = array();
    while($donnees = $req->fetch()){
      $table['id_type_wafer'][] = $donnees['ID_Type_wafer'];
      $table['Nom_Type_wafer'][] = $donnees['Nom_Type_Wafer'];
      $table['position_reticule_x'][] = $donnees['Pos_X_R'];
      $table['position_reticule_y'][] = $donnees['Pos_Y_R'];
      $table['Nom_Type_reticule'][] = $donnees['Nom_Type_Reticule'];
      $table['taille_wafer'][] = $donnees['Taille_Wafer'];
      $table['coordonnee_reticule_x'][] = $donnees['Coord_X_Ret'];
      $table['coordonnee_reticule_y'][] = $donnees['Coord_Y_Ret'];
    }
    $results[] = $table;
    retour_json(true,"Voici la liste des types wafer",$results);
  }

  if($_GET['action'] == 'ReticuleTypeLIST'){
    $req = $bdd->query('SELECT DISTINCT * FROM type_reticule ORDER BY ID_type_reticule');
    $table = array();
    while($donnees = $req->fetch()){
      $table['reticule_type_ID'][] = $donnees['ID_type_reticule'];
      $table['reticule_type_nom'][] = $donnees['Nom_Type_Reticule'];
      $table['composant_position_X'][] = $donnees['Pos_X_C'];
      $table['composant_position_Y'][] = $donnees['Pos_Y_C'];
      $table['composant_type_nom'][] = $donnees['Nom_Type_C'];
      $table['reticule_taille_X'][] = $donnees['Taille_Ret_X'];
      $table['reticule_taille_Y'][] = $donnees['Taille_Ret_Y'];
      $table['composant_coord_X'][] = $donnees['Coord_X_C'];
      $table['composant_coord_Y'][] = $donnees['Coord_Y_C'];
      $table['composant_taille_X'][] = $donnees['taille_composant_X'];
      $table['composant_taille_Y'][] = $donnees['taille_composant_Y'];
    }
    $results[] = $table;
    retour_json(true, "Voici la liste des types de réticule",$results);
  }

  //if($_GET['action'] == 'TailleComposant') Modification du 30.06.2020
  if($_GET['action'] == 'composantWithCategorie')
  {
    if(isset($_GET['n_cat'])){
      $req = $bdd->prepare('SELECT DISTINCT Nom_Type_C, taille_Composant_X, taille_Composant_Y FROM type_composant WHERE Nom_Categorie =:n_cat');
      $req->execute(array(
        'n_cat' => $_GET['n_cat']
      ));
      while($donnees = $req->fetch()){
        $results['name'][] = $donnees['Nom_Type_C'];
        $results['taille_c_x'][] = $donnees['taille_Composant_X'];
        $results['taille_c_y'][] = $donnees['taille_Composant_Y'];
      }
      retour_json(true, "Voici la taille des composants appartenant à cette categorie", $results);
    }
    //Cela est étrange peut être a supprimer s'il y a un doublon dans la réponse ou s'il est inutile
    $reponse = $bdd->prepare('SELECT DISTINCT Nom_Type_C, taille_Composant_X, taille_Composant_Y FROM type_composant WHERE Nom_Categorie =:n_cat');
  $reponse->execute(array(
    'n_cat' => $_GET['param1']
  ));
  while($donnees = $reponse->fetch()) // On affiche le contenu du résultat de la requête
  {
    ?>
    <div>
      <?php echo $donnees['Nom_Type_C']." (".$donnees['taille_Composant_X']." x ".$donnees['taille_Composant_Y'].") um"; ?>
    </div>
    <?php
  }
  }
  if($_GET['action'] == 'getNTRByNTC'){
    if(isset($_GET['nom_C'])){
      $reponse = $bdd->prepare('SELECT DISTINCT type_reticule.Nom_Type_Reticule,  type_reticule.Taille_Ret_X, type_reticule.Taille_Ret_Y FROM type_reticule, type_composant WHERE type_reticule.Nom_Type_C=type_composant.Nom_Type_C AND type_composant.Nom_Categorie= :n_c');
      $reponse->execute(array(
        'n_c' => $_GET['nom_C']
      ));
      while($donnees = $reponse->fetch()){
        $results['Nom_Type_Reticule'][] = $donnees['Nom_Type_Reticule'];
      }
      retour_json(true, "Voici le resultat de la requete getNTRByNTC", $results);
    }
    else{
      retour_json(false, "Le nom de la catégorie n'a pas été renseigné");
    }
  }

  if($_GET['action'] == 'getWaferByNameProject'){
    if(isset($_GET['nom_projet'])){
      $reponse = $bdd->prepare('SELECT * FROM `wafer`, `projet` WHERE wafer.ID_Projet = projet.ID_Projet AND projet.Nom_Projet = :n_p');
      $reponse->execute(array(
        'n_p' => $_GET['nom_projet']
      ));

      while($donnees = $reponse->fetch()){
        $table['Nom_Wafer'][] = $donnees['Nom_Wafer'];
        $table['Nom_Type_Wafer'][] = $donnees['Type_Wafer'];
      }
      $results[] = $table;
      retour_json(true, "Voici le resultat de la requete getWaferByNameProject", $results);
    }
    else{
      retour_json(false, "Le nom du projet n'est pas renseigné");
    }
  }

  if($_GET['action'] == 'getComponentOnWafer'){
    if(isset($_GET['nom_wafer'])){
      //SELECT * FROM `composant`, `type_reticule` where Nom_Wafer = 'Test_Creation_Wafer1' AND composant.ID_Type_Reticule_Ref = type_reticule.ID_type_reticule ORDER BY Pos_Y_Ret ASC, Pos_X_Ret ASC
      $reponse = $bdd->prepare('SELECT * FROM composant where Nom_Wafer = :n_w  ORDER BY Pos_Y_Ret ASC, Pos_X_Ret ASC');
      $reponse->execute(array(
        'n_w' => $_GET['nom_wafer']
      ));
      while($donnees = $reponse->fetch()){
        $table['ID_Composant'][] = $donnees['ID_Composant'];
        $table['Nom_Wafer'][] = $donnees['Nom_Wafer'];
        $table['ID_Type_Reticule_Ref'][] = $donnees['ID_Type_Reticule_Ref'];
        $table['Pos_X_Ret'][] = $donnees['Pos_X_Ret'];
        $table['Pos_Y_Ret'][] = $donnees['Pos_Y_Ret'];
        $table['type_Composant_Ref'][] = $donnees['type_Composant_Ref'];
      }
      $results[] = $table;
      retour_json(true, "Voici le résultat de la requête getComponentOnWafer", $results);
    }
    else {
      retour_json(false, "Le nom du wafer n'est pas renseigné");
    }
  }
  if($_GET['action'] == 'getComponentOnWaferImprove'){
    if(isset($_GET['nom_wafer'])){
      $reponse = $bdd->prepare('SELECT * FROM composant, type_reticule where Nom_Wafer = :n_w AND composant.ID_Type_Reticule_Ref = type_reticule.ID_type_reticule ORDER BY Pos_X_Ret ASC, Pos_Y_Ret ASC, Coord_Y_C ASC, Coord_X_C ASC');
      $reponse->execute(array(
        'n_w' => $_GET['nom_wafer']
      ));
      while($donnees = $reponse->fetch()){
        $table['ID_Composant'][] = $donnees['ID_Composant'];
        $table['Nom_Wafer'][] = $donnees['Nom_Wafer'];
        //$table['ID_Type_Reticule_Ref'][] = $donnees['ID_Type_Reticule_Ref'];
        $table['Pos_X_Ret'][] = $donnees['Pos_X_Ret'];
        $table['Pos_Y_Ret'][] = $donnees['Pos_Y_Ret'];
        //$table['type_Composant_Ref'][] = $donnees['type_Composant_Ref'];
        $table['Nom_Type_Reticule'][] = $donnees['Nom_Type_Reticule'];
        $table['Nom_Type_C'][] = $donnees['Nom_Type_C'];
        $table['Pos_X_C'][] = $donnees['Pos_X_C'];
        $table['Pos_Y_C'][] = $donnees['Pos_Y_C'];
        $table['Coord_X_C'][] = $donnees['Coord_X_C'];
        $table['Coord_Y_C'][] = $donnees['Coord_Y_C'];
        $table['Vivant'][] = $donnees["Vivant"];
      }
      $results[] = $table;
      retour_json(true, "Voici le résultat de la requête getComponentOnWaferImprove", $results);
    }
    else {
      retour_json(false, "Le nom du wafer n'est pas renseigné");
    }
  }
  if($_GET['action'] == 'getCaracteristiqueWithIDcomponent'){
    if(isset($_GET['ID_Component'])){
      $reponse = $bdd->prepare("SELECT caracteristique.ID_Caracteristique, caracteristique.Nom_Parametre, caracteristique.Unite FROM caracteristique INNER JOIN (SELECT ID_Caracteristique FROM type_composant WHERE Nom_Type_C = (SELECT type_Composant_Ref FROM composant WHERE ID_Composant = :id_c))tmp ON caracteristique.ID_Caracteristique = tmp.ID_Caracteristique");
      $reponse->execute(array(
        'id_c' => $_GET['ID_Component']
      ));
      while($donnees = $reponse->fetch())
      {
        $table["ID_Caracteristique"][] = $donnees['ID_Caracteristique'];
        $table['Nom_Parametre'][] = $donnees['Nom_Parametre'];
        $table['Unite'][] = $donnees['Unite'];
      }
      /*
      $reponse = $bdd->prepare("SELECT ID_Caracteristique FROM type_composant WHERE Nom_Type_C = (SELECT type_Composant_Ref FROM composant WHERE ID_Composant = :id_c)");
      $reponse->execute(array(
        'id_c' => $_GET['ID_Component']
      ));
      while($donnees = $reponse->fetch())
      {
        //$table['ID_Caracteristique'] = $donnees['ID_Caracteristique'];
        //Faire deuxième requêtes
        $reponse2 = $bdd->prepare("SELECT * FROM caracteristique where ID_Caracteristique = :id_caracteristique ");
        $reponse2->execute(array(
          'id_caracteristique' => $donnees['ID_Caracteristique']
        ));
        echo("id_caracteristique = ".$donnees['ID_Caracteristique']);
        while($donnees2 = $reponse2->fetch()){
          echo("donnees2 = ".$donnees2['Nom_Parametre']);
          $table['Nom_Parametre'][] = $donnees2['Nom_Parametre'];
          $table['Unite'][] = $donnees2['Unite'];
        }
      }
      */
      $results[] = $table;
      retour_json(true, "Voici le résultat de la requête getCaracteristiqueWithIDcomponent", $results);
    }
    else {
      retour_json(false, "L'identifiant du composant n'est pas renseigné");
    }
  }

  if($_GET['action'] == 'getCommentWithIDcomponent'){
    if(isset($_GET['ID_Component'])){
      $reponse = $bdd->prepare('SELECT ex.Contenu_Exp AS "Mesure/Experience", "" AS "parametre", "" AS "unite", ut.Prenom AS "Auteur", ex.Last_Modif FROM experience ex, utilisateur ut WHERE ID_Composant =:id_c AND ex.ID_Auteur = ut.id_utilisateur UNION SELECT mes.Valeur AS "Mesure/Expérience", carac.Nom_Parametre AS "parametre", carac.Unite AS "unite", "" as "Auteur", mes.Last_Modif FROM mesure mes, caracteristique carac WHERE ID_Composant =:id_c AND mes.ID_Caracteristique = carac.ID_Caracteristique ORDER BY Last_Modif DESC');
      $reponse->execute(array(
        "id_c" => $_GET['ID_Component']
      ));
      while($donnees = $reponse->fetch())
      {
        $table["Mesure/Experience"][] = nl2br($donnees['Mesure/Experience']);
        $table['parametre'][] = $donnees['parametre'];
        $table['unite'][] = $donnees['unite'];
        $table['Auteur'][] = $donnees['Auteur'];
        $table['Last_Modif'][] = $donnees['Last_Modif'];
      }

      $results[] = $table;
      retour_json(true, "Voici le resultat de getCommentWithIDcomponent", $results);
    }
    else{retour_json(false, "L'identifiant du composant n'est pas renseigné");}
  }

  if($_GET['action'] == 'getComment2WithIDcomponent'){
    if(isset($_GET['ID_Component'])){
      $reponse = $bdd->prepare('SELECT commentaire.ID_Commentaire, commentaire.Contenu, utilisateur.prenom, utilisateur.nom, commentaire.DateCom, commentaire.ID_Image, commentaire.ID_Fichier FROM commentaire INNER JOIN utilisateur ON commentaire.ID_Utilisateur = utilisateur.id_utilisateur WHERE ID_Composant =:id_c ORDER BY DateCom DESC');
      $reponse->execute(array(
        'id_c' => $_GET['ID_Component']
      ));
      while($donnees = $reponse->fetch())
      {
        $table['ID_Commentaire'][] = $donnees['ID_Commentaire'];
        $table['Contenu'][] = nl2br($donnees['Contenu']);
        $table['prenom'][] = $donnees['prenom'];
        $table['nom'][] = $donnees['nom'];
        $table['DateCom'][] = $donnees['DateCom'];
        $table['ID_Image'][] = $donnees['ID_Image'];
        $table['ID_Fichier'][] = $donnees['ID_Fichier'];
      }

      $results[] = $table;
      retour_json(true, "Voici le resultat de getComment2WithIDcomponent", $results);
    }
    else{retour_json(false, "L'identifiant du composant n'est pas renseigné");}
  }
  if($_GET['action'] == 'getComment2WithIDret'){
    if(isset($_GET['ID_Component'])){
      $reponse = $bdd->prepare('SELECT commentaire.ID_Commentaire, commentaire.Contenu, utilisateur.prenom, utilisateur.nom, commentaire.DateCom, commentaire.ID_Image, commentaire.ID_Fichier FROM commentaire INNER JOIN utilisateur ON commentaire.ID_Utilisateur = utilisateur.id_utilisateur WHERE ID_Composant =:id_c ORDER BY DateCom DESC');
      $reponse->execute(array(
        'id_c' => $_GET['ID_Component']
      ));
      while($donnees = $reponse->fetch())
      {
        $table['ID_Commentaire'][] = $donnees['ID_Commentaire'];
        $table['Contenu'][] = nl2br($donnees['Contenu']);
        $table['prenom'][] = $donnees['prenom'];
        $table['nom'][] = $donnees['nom'];
        $table['DateCom'][] = $donnees['DateCom'];
        $table['ID_Image'][] = $donnees['ID_Image'];
        $table['ID_Fichier'][] = $donnees['ID_Fichier'];
      }

      $results[] = $table;
      retour_json(true, "Voici le resultat de getComment2WithIDcomponent", $results);
    }
    else{retour_json(false, "L'identifiant du composant n'est pas renseigné");}
  }
/*SELECT Chemin, Extension FROM image INNER JOIN composant ON composant.ID_Composant = image.ID_Composant WHERE (composant.Pos_X_Ret*10 + composant.Pos_Y_Ret) =14*/
  if($_GET['action'] == 'getLinkPictureWithID'){
    if(isset($_GET['ID_picture'])){
      $reponse = $bdd->prepare('SELECT Chemin, Extension FROM image WHERE ID_Image =:id_i');
      $reponse->execute(array(
        'id_i' => $_GET['ID_picture']
      ));
      while($donnees = $reponse->fetch()){
        $table["Chemin"][] = $donnees["Chemin"];
        $table["Extension"][] = $donnees["Extension"];
      }
      $results[] = $table;
      retour_json(true, "Voici le resultat de getLinkPictureWithID", $results);
    }
    else {
      retour_json(false, "L'identifiant de la photo n'est pas renseigné");
    }
  }

  if($_GET['action'] == 'getLinkPictureWithIDret'){
    if(isset($_GET['ID_ret'])){
      $reponse = $bdd->prepare('SELECT Chemin, Extension FROM image INNER JOIN composant ON composant.ID_Composant = image.ID_Composant WHERE (composant.Pos_X_Ret*10 + composant.Pos_Y_Ret) =:id_i');
      $reponse->execute(array(
        'id_i' => $_GET['ID_ret']
      ));
      while($donnees = $reponse->fetch()){
        $table["Chemin"][] = $donnees["Chemin"];
        $table["Extension"][] = $donnees["Extension"];
      }
      $results[] = $table;
      retour_json(true, "Voici le resultat de getLinkPictureWithIDret", $results);
    }
    else {
      retour_json(false, "L'identifiant du reticule n'est pas renseigné");
    }
  }

  if($_GET['action'] == 'getLinkPictureWithIDret2'){
    if(isset($_GET['Nom_Projet'])){
      if(isset($_GET['Nom_Wafer'])){
        if(isset($_GET['ID_ret'])){
          if(isset($_GET['Coord_C'])){
            
                //select chemin , Extension From image INNER JOIN composant on composant.ID_composant=image.ID_Composant INNER JOIN wafer on wafer.Nom_Wafer = composant.Nom_Wafer INNER JOIN projet on projet.ID_Projet = wafer.ID_Projet Where (composant.Pos_X_Ret*10 + composant.Pos_Y_Ret)=:id_i AND composant.Nom_Wafer=:nom_wafer AND projet.Nom_Projet =:nom_projet;
            $reponse = $bdd->prepare('SELECT Chemin , Extension From image INNER JOIN composant on composant.ID_Composant = image.ID_Composant INNER JOIN wafer on wafer.Nom_Wafer = composant.Nom_Wafer INNER JOIN projet on projet.ID_Projet = wafer.ID_Projet INNER JOIN type_reticule on type_reticule.ID_type_reticule = composant.ID_Type_Reticule_Ref  Where (type_reticule.Coord_X_C*10 + type_reticule.Coord_Y_C)=:Coord_compo AND (composant.Pos_X_Ret*10 + composant.Pos_Y_Ret)=:id_i AND composant.Nom_Wafer=:nom_wafer AND projet.Nom_Projet =:nom_projet');
            $reponse->execute(array(
              'Coord_compo' => $_GET['Coord_C'],
              'id_i' => $_GET['ID_ret'],
              'nom_wafer' => $_GET['Nom_Wafer'],
              'nom_projet' => $_GET['Nom_Projet']
            ));
            while($donnees = $reponse->fetch()){
              $table["Chemin"][] = $donnees["Chemin"];
              $table["Extension"][] = $donnees["Extension"];
            }
            $results[] = $table;
            retour_json(true, "Voici le resultat de getLinkPictureWithIDret", $results);
          
          }
          else {
            
            //select chemin , Extension From image INNER JOIN composant on composant.ID_composant=image.ID_Composant INNER JOIN wafer on wafer.Nom_Wafer = composant.Nom_Wafer INNER JOIN projet on projet.ID_Projet = wafer.ID_Projet Where (composant.Pos_X_Ret*10 + composant.Pos_Y_Ret)=:id_i AND composant.Nom_Wafer=:nom_wafer AND projet.Nom_Projet =:nom_projet;
            $reponse = $bdd->prepare('SELECT Chemin , Extension From image INNER JOIN composant on composant.ID_Composant = image.ID_Composant INNER JOIN wafer on wafer.Nom_Wafer = composant.Nom_Wafer INNER JOIN projet on projet.ID_Projet = wafer.ID_Projet Where (composant.Pos_X_Ret*10 + composant.Pos_Y_Ret)=:id_i AND composant.Nom_Wafer=:nom_wafer AND projet.Nom_Projet =:nom_projet');
            $reponse->execute(array(
              'id_i' => $_GET['ID_ret'],
              'nom_wafer' => $_GET['Nom_Wafer'],
              'nom_projet' => $_GET['Nom_Projet']
            ));
            while($donnees = $reponse->fetch()){
              $table["Chemin"][] = $donnees["Chemin"];
              $table["Extension"][] = $donnees["Extension"];
            }
            $results[] = $table;
            retour_json(true, "Voici le resultat de getLinkPictureWithIDret", $results);
          }
        }
        else {
          //select chemin , Extension From image INNER JOIN composant on composant.ID_composant=image.ID_Composant INNER JOIN wafer on wafer.Nom_Wafer = composant.Nom_Wafer INNER JOIN projet on projet.ID_Projet = wafer.ID_Projet Where (composant.Pos_X_Ret*10 + composant.Pos_Y_Ret)=:id_i AND composant.Nom_Wafer=:nom_wafer AND projet.Nom_Projet =:nom_projet;
          $reponse = $bdd->prepare('SELECT Chemin , Extension From image INNER JOIN composant on composant.ID_Composant = image.ID_Composant INNER JOIN wafer on wafer.Nom_Wafer = composant.Nom_Wafer INNER JOIN projet on projet.ID_Projet = wafer.ID_Projet Where composant.Nom_Wafer=:nom_wafer AND projet.Nom_Projet =:nom_projet');
          $reponse->execute(array(
            'nom_wafer' => $_GET['Nom_Wafer'],
            'nom_projet' => $_GET['Nom_Projet']
          ));
          while($donnees = $reponse->fetch()){
            $table["Chemin"][] = $donnees["Chemin"];
            $table["Extension"][] = $donnees["Extension"];
          }
          $results[] = $table;
          retour_json(true, "Voici le resultat de getLinkPictureWithIDret", $results);   
        }
      }
      else {
        //select chemin , Extension From image INNER JOIN composant on composant.ID_composant=image.ID_Composant INNER JOIN wafer on wafer.Nom_Wafer = composant.Nom_Wafer INNER JOIN projet on projet.ID_Projet = wafer.ID_Projet Where (composant.Pos_X_Ret*10 + composant.Pos_Y_Ret)=:id_i AND composant.Nom_Wafer=:nom_wafer AND projet.Nom_Projet =:nom_projet;
        $reponse = $bdd->prepare('SELECT Chemin , Extension From image INNER JOIN composant on composant.ID_Composant = image.ID_Composant INNER JOIN wafer on wafer.Nom_Wafer = composant.Nom_Wafer INNER JOIN projet on projet.ID_Projet = wafer.ID_Projet Where projet.Nom_Projet =:nom_projet');
        $reponse->execute(array(
          'nom_projet' => $_GET['Nom_Projet']
        ));
        while($donnees = $reponse->fetch()){
          $table["Chemin"][] = $donnees["Chemin"];
          $table["Extension"][] = $donnees["Extension"];
        }
        $results[] = $table;
        retour_json(true, "Voici le resultat de getLinkPictureWithIDret", $results);     
      }
    }
  }

  
  if($_GET['action'] == 'getLinkFileWithID'){
    if(isset($_GET['ID_file'])){
      $reponse = $bdd->prepare('SELECT Chemin, Extension FROM fichier WHERE ID_Fichier =:id_f');
      $reponse->execute(array(
        'id_f' => $_GET['ID_file']
      ));
      while($donnees = $reponse->fetch()){
        $table["Chemin"][] = $donnees["Chemin"];
        $table["Extension"][] = $donnees["Extension"];
      }
      $results[] = $table;
      retour_json(true, "Voici le resultat de getLinkPictureWithID", $results);
    }
    else {
      retour_json(false, "L'identifiant du fichier n'est pas renseigné");
    }
  }

  if($_GET['action'] == 'getAllNavDataWithIdComponent'){
    if(isset($_GET['id_comp'])){
      $reponse = $bdd->prepare('SELECT Nom_Wafer , ID_Type_Reticule_Ref, type_Composant_Ref, Pos_X_Ret, Pos_Y_Ret FROM composant WHERE ID_Composant =:id_comp'); //Avec cette requête on obtient Le nom du wafer, l'id du réticule type, et le nom du composant type
      $reponse->execute(array(
        'id_comp' => $_GET['id_comp']
      ));
      $donnees = $reponse->fetch();
      //print_r($donnees);
      $Nom_Wafer = $donnees[0];
      $type_Composant = $donnees[2];
      $Pos_X_Ret = $donnees[3];
      $Pos_Y_Ret = $donnees[4];

      if(isset($Nom_Wafer)){
        $reponse2 = $bdd->prepare('SELECT Type_Wafer, ID_Projet, Traitement FROM wafer WHERE Nom_Wafer =:n_wafer'); // Avec cette requête on obtient l'id du projet, et le type de wafer
        $reponse2->execute(array(
          'n_wafer' => $Nom_Wafer
        ));
        $donnees2 = $reponse2->fetch();
        //print_r($donnees2);
        $type_Wafer = $donnees2[0];
        $traitement_Wafer = $donnees2[2];

        $reponse3 = $bdd->prepare('SELECT Nom_Projet, ID_Client FROM projet WHERE ID_Projet =:id_project'); // Avec cette requête on obtient le nom du projet, et l'ID du client
        $reponse3->execute(array(
          "id_project" => $donnees2[1]
        ));
        $donnees3 = $reponse3->fetch();
        //print_r($donnees3);
        $Nom_Projet = $donnees3[0];
        $Id_Client = $donnees3[1];
        /*
        $reponse4 = $bdd->prepare('SELECT Nom_Entreprise FROM client WHERE ID_Client =:id_client'); // Avec cette requête on obtient le nom de l'entreprise
        $reponse4->execute(array(
          "id_client" => $donnees3[1]
        ));
        $donnees4 = $reponse4->fetch();
        $Nom_Client = $donnees4[0];
        */

        $reponse5 = $bdd->prepare('SELECT Nom_Type_Reticule, Coord_X_C, Coord_Y_C FROM type_reticule WHERE ID_type_reticule=:id_t_r'); //Avec cette requête on obtient le nom du reticule type
        $reponse5->execute(array(
          "id_t_r" => $donnees[1]
        ));
        $donnees5 = $reponse5->fetch();
        //print_r($donnees5);
        $type_Reticule = $donnees5[0];
        $Coord_X_C = $donnees5[1];
        $Coord_Y_C = $donnees5[2];

        $results[0] = $Nom_Wafer;
        $results[1] = $type_Composant;
        $results[2] = $Pos_X_Ret;
        $results[3] = $Pos_Y_Ret;
        $results[4] = $type_Wafer;
        $results[5] = $Nom_Projet;
        $results[6] = $Id_Client;
        $results[7] = $type_Reticule;
        $results[8] = $Coord_X_C;
        $results[9] = $Coord_Y_C;
        $results[10] = $traitement_Wafer;

        //print_r($results);
        retour_json(true, "Voici les informations en lien avec le composant", $results);
      }
    }else {
      retour_json(false, "Problème ID composant");
    }
  }

  if($_GET['action'] == "getAllBox"){
    if(isset($_GET['option'])){

      if($_GET['option'] == "1"){
        $reponse = $bdd->query('SELECT * FROM boite');

        while($donnees = $reponse->fetch()){
          $results[0][] = $donnees['Numero_Boite'];
          $results[1][] = $donnees['Pos_B'];
          $results[2][] = $donnees['ID_Composant'];
          $results[3][] = $donnees['Expedie'];
        }
        retour_json(true, "Resultat de la requete getAllBox", $results);
      }
      if($_GET['option'] == "2"){
        $nbResultat = 0;
        $reponse = $bdd->query('SELECT DISTINCT Numero_Boite, Expedie, Nom_Entreprise, Date_Expedition FROM boite, client_expedition WHERE boite.ID_Client = client_expedition.ID_Client_E ORDER BY ID_boite DESC');
        //$reponse = $bdd->query('SELECT DISTINCT Numero_Boite, Expedie, Client FROM boite');
        while($donnees = $reponse->fetch()){
          //echo "Numéro de la boite : ".$donnees['Numero_Boite']."\n";
          //echo "Expedie: ".$donnees['Expedie']."\n";
          //echo "Nom Entreprise : ".$donnees['Nom_Entreprise']."\n";
          $results[$nbResultat]["num_box"] = $donnees['Numero_Boite'];
          $results[$nbResultat]["Expedie"] = $donnees['Expedie'];
          $results[$nbResultat]["Nom_Entreprise"] = $donnees['Nom_Entreprise'];
          $results[$nbResultat]["Date_Expedition"] =$donnees['Date_Expedition'];

          $reponse2 = $bdd->prepare('SELECT COUNT(DISTINCT ID_Composant) FROM boite WHERE Numero_Boite =:num_box AND ID_Composant != -1');
          $reponse2->execute(array(
            'num_box' => $donnees['Numero_Boite']
          ));
          $donnees2 = $reponse2->fetch();
          $results[$nbResultat]["nb_compo"] = $donnees2;
          //echo "Il y a ".$donnees2[0]." composant(s) dans cette boite\n";

          $nbResultat++;
        }
        retour_json(true,"Resultat de la requête getAllBox",$results);
      }
    }
    else {retour_json(false,"L'option n'est pas définie");}
  }
  if($_GET['action'] == 'getInsideBox'){
    if(isset($_GET['num_box'])){
      $nbResultat = 0;
      $reponse = $bdd->prepare('SELECT ID_Composant, Pos_B FROM boite WHERE Numero_Boite =:num_box AND ID_Composant != -1 ORDER BY Pos_B  ASC');
      $reponse->execute(array(
        'num_box' => $_GET['num_box']
      ));
      while($donnees = $reponse->fetch()){
        $results[$nbResultat]["ID_Composant"] = $donnees["ID_Composant"];
        $results[$nbResultat]["Pos_B"] = $donnees["Pos_B"];
        $nbResultat++;
      }
      retour_json(true, "Voici l'interieur de la boite ",$results);
    }
    else{retour_json(false, "Le champ num_box n'est pas correct");}
  }
  if($_GET['action'] == 'getLastMesure'){
    if(isset($_GET['ID_Composant'])){
      if(isset($_GET['ID_Caracteristique'])){

        $reponse = $bdd->prepare('SELECT Valeur FROM mesure WHERE ID_Caracteristique =:id_carac AND ID_Composant =:id_comp ORDER BY Last_Modif DESC');
        $reponse->execute(array(
          'id_carac' => $_GET['ID_Caracteristique'],
          'id_comp' => $_GET['ID_Composant']
        ));
        while($donnees = $reponse->fetch()){
          $table["Valeur"][] = $donnees["Valeur"];
        }
        $results[] = $table;
        retour_json(true, "Voici la derniere mesure pour ce parametre et cette id de composant", $results);
      }
      else{retour_json(false, "L'ID caracteristique n'est pas correct");}
    }
    else{retour_json(false, "L'ID composant n'est pas correct");}
  }

  if($_GET['action'] == 'getTypicalMesure'){
    if(isset($_GET['ID_Composant'])){
    //if(isset($_GET['Nom_Type_C'])){
      //$reponse = $bdd->prepare('SELECT ID_Caracteristique, Valeur FROM type_composant WHERE Nom_Type_C =:ntc');
      //$reponse->execute(array(
        //"ntc" => $_GET['Nom_Type_C']
      //));
      $reponse = $bdd->prepare('SELECT Valeur, Nom_Parametre, Unite, caracteristique.ID_Caracteristique FROM type_composant, caracteristique WHERE caracteristique.ID_Caracteristique = type_composant.ID_Caracteristique AND Nom_Type_C = (SELECT type_Composant_Ref FROM composant WHERE ID_Composant =:id_c)');
      $reponse->execute(array(
        "id_c" => $_GET['ID_Composant']
      ));
      while($donnees = $reponse->fetch()){
        $table["Nom_Parametre"][] = $donnees["Nom_Parametre"];
        $table["Valeur"][] = $donnees["Valeur"];
        $table["Unite"][] = $donnees["Unite"];
        $table['ID_Caracteristique'][] = $donnees["ID_Caracteristique"];
      }
      $results[] = $table;
      retour_json(true, "Voici les mesures typique pour cette id de composant", $results);
    }
    else{retour_json(false, "Le nom du composant type est incorrect");}
  }

  if($_GET['action'] == 'getTypicalMesureWithNameTypeComponent'){
    if(isset($_GET['nom_type_composant'])){
      $reponse = $bdd->prepare('SELECT Valeur, Nom_Parametre, Unite, caracteristique.ID_Caracteristique FROM type_composant, caracteristique WHERE caracteristique.ID_Caracteristique = type_composant.ID_Caracteristique AND Nom_Type_C =:ntc');
      $reponse->execute(array(
        "ntc" => $_GET['nom_type_composant']
      ));
      while($donnees = $reponse->fetch()){
        $table["Nom_Parametre"][] = $donnees["Nom_Parametre"];
        $table["Valeur"][] = $donnees["Valeur"];
        $table["Unite"][] = $donnees["Unite"];
        $table['ID_Caracteristique'][] = $donnees["ID_Caracteristique"];
      }
      $results[] = $table;
      retour_json(true, "Voici les mesures typique pour ce type de composant", $results);
    }
    else{retour_json(false, "Le nom du composant type est incorrect");}
  }

  if($_GET['action'] == "getEtatComposant"){
    if(isset($_GET['ID_Component'])){
      $reponse = $bdd->prepare('SELECT Etat_Composant, Vivant FROM `composant` WHERE ID_Composant =:id_c ');
      $reponse->execute(array(
        "id_c" => $_GET['ID_Component']
      ));
      while($donnees = $reponse->fetch()){
        $table["etat"][] = $donnees["Etat_Composant"];
        $table["vie"][] = $donnees["Vivant"];
      }
      $results[] = $table;
      retour_json(true,"Voici l'état du composant",$results);
    }
    else {
      retour_json(false,"Problème ID");
    }
  }

  if($_GET['action'] == "getInformationBoxWithComponent"){
    if(isset($_GET['ID_Component'])){
      $reponse = $bdd->prepare('SELECT * FROM boite WHERE ID_Composant =:id_c');
      $reponse->execute(array(
        "id_c" => $_GET['ID_Component']
      ));
      while($donnees = $reponse->fetch()){
        $table["num_box"][] = $donnees["Numero_Boite"];
        $table["pos_box"][] = $donnees["Pos_B"];
        $table["expedition"][] = $donnees["Expedie"];
      }
      $results[] = $table;
      retour_json(true, "Voici les informations de la boite contenant le composant", $results);
    }
    else{
      retour_json(false, "Problème ID composant");
    }
  }
  //Requete POST

  if($_POST["action"] == "addPARAM")
  {
    if(isset($_POST['name_param'])) // On teste si le paramètre name_param existe
    {
      if(isset($_POST['unite'])) // On teste si le paramètre unite existe
      {
        if($_POST['name_param']!="" || $_POST['unite']!="")
        {
          // On fait une requête SQL
          $req_Ajout = $bdd->prepare('INSERT INTO caracteristique (Nom_Parametre, Unite, Activation) VALUES(:Nom_Param, :Unite, 1)');
          // On prépare la requête avec les différents valeurs acquises précedement
          $req_Ajout->execute(array(
            'Nom_Param' => $_POST['name_param'],
            'Unite' => $_POST['unite']
          ));

          retour_json(true, "Ajout du paramètre dans la base de données");
        }
        else {
          retour_json(false, "L'un ou les deux paramètre ne sont pas renseignés");
        }
      }
      else { // On affiche une erreur si unité n'existe pas
        retour_json(false, "L'unité du paramètre n'a pas été renseignée");
      }
    }
    else { // On affiche une erreur si name_param n'existe pas
      retour_json(false, "Le nom du paramètre n'a pas été renseignée");
    }
  }
  if($_POST['action'] == "addClient")
  {
    if($_POST["name_client"] != "")
    {
      $req = $bdd->prepare('INSERT INTO client (Nom_Entreprise, Activation) VALUES (:Nom_Entreprise, 1)');
      $req->execute(array(
        'Nom_Entreprise' => $_POST["name_client"]
      ));
      $req2 = $bdd->prepare('INSERT INTO client_expedition(ID_Client_E,Nom_Entreprise)
      SELECT ID_Client,Nom_Entreprise FROM client WHERE Nom_Entreprise=:Nom_Entreprise;');
      $req2->execute(array(
        'Nom_Entreprise' => $_POST["name_client"]
      ));
      retour_json(true, "Ajout du client dans la base de données");
    }
    else {
      retour_json(false, "Nom du client non renseigné");
    }
  }
  if($_POST['action'] == "addClientExpedition"){
    if($_POST["name_client"] != ""){
      $req = $bdd->prepare('INSERT INTO client_expedition (Nom_Entreprise) VALUES (:Nom_Entreprise)');
      $req->execute(array(
        'Nom_Entreprise' => $_POST["name_client"]
      ));
      retour_json(true, "Ajout du client d'expedition dans la base de données");
    }
    else{
      retour_json(false, "Nom client non renseigné");
    }
  }

  if($_POST['action'] == "addProjet")
  {
    if(($_POST['nom_Projet'])!="") // On vérifie que nom_Projet existe
    {
      if(($_POST['nom_Client'])!="") // On vérifie que nom_Client existe
      {
        if(($_POST['description_Projet'])!="") // On vérifie que description_Projet existe
        {
          if(($_POST['etat_Projet'])!="") // On vérifie que etat_Projet existe
          {
            $reponse = $bdd->prepare('SELECT DISTINCT ID_Client FROM client WHERE Nom_Entreprise =:n_e');
            $reponse->execute(array(
              'n_e' => $_POST['nom_Client']
            ));
            $donnees=$reponse->fetch();
            //echo $donnees['ID'];

            date_default_timezone_set('Europe/Paris');
            //echo date("Y-m-d H:i:s",$phptime);

            //On fait une requête pour ajouter le projet dans la base de données abec le nom, l'id client, la description , la dernière modification , et savoir si le projet est en cours ou non
            $req_Ajout = $bdd->prepare('INSERT INTO projet (Nom_Projet, ID_Client, Description, last_modif, etat, Activation) VALUES(:Nom_Projet, :ID_Client, :Description, :last_modif, :etat, 1)');
            $req_Ajout->execute(array(
                'Nom_Projet' => $_POST['nom_Projet'],
                'ID_Client' => $donnees['ID_Client'],
                'Description' => $_POST['description_Projet'],
                'last_modif' => date("Y-m-d H:i:s",time()),
                'etat' => $_POST['etat_Projet'],
                ));
                //Faire une redirection vers la page d'accueil
                retour_json(true, "Ajout du projet dans la base de données");
          }
          else { // Message Erreur
            retour_json(false, "Problème état projet");
            //echo "Il y a un problème avec l'état du projet";
          }
        }
        else { // Message Erreur
          retour_json(false, "Problème description projet");
          //echo "Il y a un problème avec la description du projet";
        }
      }
      else { // Message Erreur
        retour_json(false, "Problème nom client");
        //echo "Il y a un problème avec le nom du client";
      }
    }
    else { // Message Erreur
      retour_json(false, "Problème nom projet");
      //echo "Il y a un problème avec le nom du projet";
    }
  }
  if($_POST['action'] == "addCategorie")
  {
    if(isset($_POST['Nom_Categorie']))
    {
      if(isset($_POST['ID_Caracteristique']))
      {
        //Ajouter constante pour activation
        $req_Ajout = $bdd->prepare('INSERT INTO categorie (Nom_Categorie, ID_Caracteristique, Activation) VALUES(:Nom_Categorie, :ID_Caracteristique, 1)');
        $req_Ajout->execute(array(
            'Nom_Categorie' => $_POST['Nom_Categorie'],
            'ID_Caracteristique' => $_POST['ID_Caracteristique']
        ));
        retour_json(true, "Ajout du categorie dans la base de donnees");
      }
      else {
        $req_Ajout = $bdd->prepare('INSERT INTO categorie (Nom_Categorie, ID_Caracteristique, Activation) VALUES(:Nom_Categorie, 0, 1)');
        $req_Ajout->execute(array(
            'Nom_Categorie' => $_POST['Nom_Categorie']
        ));
        retour_json(true, "Ajout du categorie dans la base de donnees sans caracteristique");
      }
    }
    else {
      retour_json(false, "Problème Nom_Carateristique");
    }
  }
  if($_POST['action'] == "addParamInTypeComponent")
  {
    if(isset($_POST['Nom_Categorie']))
    {
      if(isset($_POST['ID_Caracteristique']))
      {
        if(isset($_POST['Valeur']))
        {
          $reponse = $bdd->prepare('SELECT DISTINCT Nom_Type_C, taille_composant_X, taille_composant_Y FROM type_composant WHERE Nom_Categorie =:nom_cat');
          $reponse->execute(array(
            'nom_cat' => $_POST['Nom_Categorie']
          ));
          while($donnees = $reponse->fetch()){
            echo($donnees["Nom_Type_C"]);
            if(isset($donnees["Nom_Type_C"])){

              //SELECT * FROM `type_composant` WHERE Nom_Type_C = "LprobeA" AND Nom_Categorie = "Lprobe" AND ID_Caracteristique = 9
              // On regarde si le paramètre existe deja dans la base de données pour savoir si on update ou si on ajoute
              $reponse2 = $bdd->prepare('SELECT COUNT(*) FROM type_composant WHERE Nom_Type_C =:nom_type_composant AND ID_Caracteristique=:id_carac');
              $reponse2->execute(array(
                'nom_type_composant' => $donnees["Nom_Type_C"],
                'id_carac' => $_POST["ID_Caracteristique"]
              ));
              while($donnees2 = $reponse2->fetch()){
                echo ("COUNT = ".$donnees2['COUNT(*)']);
                if($donnees2["COUNT(*)"] == 0){
                  // Nous allons faire un insert into

                  $req_Ajout = $bdd->prepare('INSERT INTO type_composant (Nom_Type_C, Valeur, ID_Caracteristique, Nom_Categorie, taille_Composant_X, taille_Composant_Y) VALUES(:ntc, :value, :idcarac, :ncat, :tCX, :tCY)');
                  $req_Ajout->execute(array(
                      'ntc' => $donnees["Nom_Type_C"],
                      'value' => $_POST['Valeur'],
                      'idcarac' =>$_POST['ID_Caracteristique'],
                      'ncat' => $_POST['Nom_Categorie'],
                      'tCX' =>$donnees["taille_composant_X"],
                      'tCY' =>$donnees["taille_composant_Y"]
                  ));

                }
                if($donnees2["COUNT(*)"] == 1){
                  // Nous allons faire un update
                  $req_Update = $bdd->prepare('UPDATE type_composant SET Valeur =:value WHERE Nom_Type_C=:ntc AND ID_Caracteristique=:idcarac AND Nom_Categorie=:ncat');
                  $req_Update->execute(array(
                    'value' => $_POST['Valeur'],
                    'ntc' => $donnees["Nom_Type_C"],
                    'idcarac' => $_POST['ID_Caracteristique'],
                    'ncat'=> $_POST['Nom_Categorie']
                  ));
                }
              }
            }
          }
          $results[] = $table;
          retour_json(true, "Ajout du paramètre dans type composant");
        }
      }
      else{retour_json(false, "Problème ID_Caracteristique");}
    }
    else{retour_json(false, "Problème nom catégorie");}
  }

  if($_POST['action'] == "addTypeComponent")
  {
    $iteration=0;
    $tableauInputValeur;
    $tableauIDCarac;
    if(isset($_POST['n_t_c']))
    {
      //echo "ok1";
      if(isset($_POST['id_carac']))
      {
        //echo "ok2";
        if(isset($_POST['n_cat']))
        {
          //echo "ok3";
          if(isset($_POST['taille_c_x']))
          {
            //echo "ok4";
            if(isset($_POST['taille_c_y']))
            {
              $tableauInputValeur = explode(',',$_POST['tabValeur']); // Il faut transformé une chaine de caractére en tableau
              $tableauIDCarac = explode(',',$_POST['id_carac']);
              foreach ($tableauInputValeur as $value) {

                $req_Ajout = $bdd -> prepare('INSERT INTO type_composant (Nom_Type_C, Valeur, ID_Caracteristique, Nom_Categorie, taille_composant_X, taille_composant_Y) VALUES (:nom_type_composant, :valeur, :ID_Carac, :Nom_Cat, :taille_comp_X, :taille_comp_Y)');
                $req_Ajout -> execute(array(
                  'nom_type_composant' => $_POST['n_t_c'],
                  'valeur' => $value,
                  'ID_Carac' => array_values($tableauIDCarac)[$iteration],
                  'Nom_Cat' => $_POST['n_cat'],
                  'taille_comp_X'=>$_POST['taille_c_x'],
                  'taille_comp_Y'=>$_POST['taille_c_y']
                ));

                $iteration++;
                }
                retour_json(true, "Ajout de type composant dans la base de données");
            }
            else{
              retour_json(false, "Problème taille composant Y");
            }
          }
          else{
            retour_json(false, "Problème taille composant X");
          }
        }
        else{
          retour_json(false, "Problème nom catégorie");
        }
      }
      else{
        retour_json(false, "Problème de l'identifiant caractéristique");
      }
    }
    else{
      retour_json(false, "Problème nom du type de composant");
    }
  }
  if($_POST['action'] == "addTypeReticule"){
    if(isset($_POST['Nom_Type_Reticule'])){
      if(isset($_POST['Pos_X_C'])){
        if(isset($_POST['Pos_Y_C'])){
          if(isset($_POST['Nom_Type_C'])){
            if(isset($_POST['T_R_X'])){
              if(isset($_POST['T_R_Y'])){
                if(isset($_POST['Coord_X_C'])){
                  if(isset($_POST['Coord_Y_C'])){
                    if(isset($_POST['T_C_X'])){
                      if(isset($_POST['T_C_Y'])){
                        $req_Ajout = $bdd->prepare('INSERT INTO type_reticule (Nom_Type_Reticule, Pos_X_C, Pos_Y_C, Nom_Type_C, Coord_X_C, Coord_Y_C, Taille_Ret_X, Taille_Ret_Y, taille_composant_X, taille_composant_Y) VALUES(:Nom_Type_Reticule, :Pos_X_C, :Pos_Y_C, :Nom_Type_C, :Coord_X_C, :Coord_Y_C, :Taille_Ret_X, :Taille_Ret_Y, :taille_composant_X, :taille_composant_Y)');
                        $req_Ajout->execute(array(
                            'Nom_Type_Reticule' => $_POST['Nom_Type_Reticule'],
                            'Pos_X_C' => $_POST['Pos_X_C'],
                            'Pos_Y_C' => $_POST['Pos_Y_C'],
                            'Nom_Type_C' => $_POST['Nom_Type_C'],
                            'Coord_X_C' => $_POST['Coord_X_C'],
                            'Coord_Y_C' => $_POST['Coord_Y_C'],
                            'Taille_Ret_X'=> $_POST['T_R_X'],
                            'Taille_Ret_Y'=> $_POST['T_R_Y'],
                            'taille_composant_X'=> $_POST['T_C_X'],
                            'taille_composant_Y'=> $_POST['T_C_Y'],
                            ));
                          retour_json(true, "Ajout du type réticule");
                      }
                      else{retour_json(false, "Problème taille du composant en y");}
                    }
                    else {retour_json(false, "Problème taille du composant en x");}
                  }
                  else {retour_json(false, "Problème coordonnées y du composant");}
                }
                else{retour_json(false, "Problème coordonnées x du composant");}
              }
              else{retour_json(false, "Problème taille réticule y");}
            }
            else{retour_json(false, "Problème taille reticule x");}
          }
          else{retour_json(false, "Problème nom du type composant");}
        }
        else{retour_json(false, "Problème position y du composant");}
      }
      else {retour_json(false, "Problème position x du composant");}
    }
    else{retour_json(false, "Problème nom type reticule");}
  }

  if($_POST['action'] == "addTypeWafer"){
    if(isset($_POST['nameWafer'])){
      if(isset($_POST['posX'])){
        if(isset($_POST['posY'])){
          if(isset($_POST['typeReticule'])){
            if(isset($_POST['coordXRet'])){
              if(isset($_POST['coordYRet'])){
                if(isset($_POST['tailleWafer'])){
                  $req_Ajout = $bdd->prepare('INSERT INTO type_wafer (Nom_Type_Wafer, Pos_X_R, Pos_Y_R, Nom_Type_Reticule, Coord_X_Ret, Coord_Y_Ret, Taille_Wafer) VALUES(:Nom_Type_Wafer, :Pos_X_R, :Pos_Y_R, :Nom_Type_Reticule, :Coord_X_Ret, :Coord_Y_Ret, :Taille_Wafer)');
                  $req_Ajout->execute(array(
                    'Nom_Type_Wafer' => $_POST['nameWafer'],
                    'Pos_X_R' => $_POST['posX'],
                    'Pos_Y_R' => $_POST['posY'],
                    'Nom_Type_Reticule' => $_POST['typeReticule'],
                    'Coord_X_Ret' => $_POST['coordXRet'],
                    'Coord_Y_Ret' => $_POST['coordYRet'],
                    'Taille_Wafer' => $_POST['tailleWafer']
                  ));
                  retour_json(true, "Ajout du type wafer");
                }
                else{retour_json(false, "Problème taille wafer");}
              }
              else{retour_json(false, "Problème coordoonée Y reticule");}
            }
            else{retour_json(false, "Problème coordonnnée X réticule");}
          }
          else{retour_json(false, "Problème type réticule");}
        }
        else{retour_json(false, "Problème position Y");}
      }
      else{retour_json(false, "Problème position X");}
    }
    else{retour_json(false, "Problème nom du wafer");}
  }

  if($_POST['action'] == "addWafer"){
    if(isset($_POST['nameWafer'])){
      if(isset($_POST['typeWafer'])){
        if(isset($_POST['num_Run'])){
          if(isset($_POST['id_Projet'])){
            $req_Ajout = $bdd->prepare('INSERT INTO wafer (Nom_Wafer, Type_Wafer, Num_Run, ID_Projet) VALUES (:Nom_Wafer, :Type_Wafer, :Num_Run, :ID_Projet)');
            $req_Ajout->execute(array(
              'Nom_Wafer' => $_POST['nameWafer'],
              'Type_Wafer' => $_POST['typeWafer'],
              'Num_Run' => $_POST['num_Run'],
              'ID_Projet' => $_POST['id_Projet']
            ));

            $reponse = $bdd->prepare('SELECT Coord_X_Ret, Coord_Y_Ret, Nom_Type_Reticule FROM type_wafer WHERE Nom_Type_Wafer = :n_w ORDER BY Coord_X_Ret, Coord_Y_Ret ASC');
            $reponse->execute(array(
              'n_w' => $_POST['typeWafer']
            ));
            while($donnees = $reponse->fetch())
            {
              $Nom_Type_Reticule_Provisoire = $donnees['Nom_Type_Reticule'];

              // On sélectionne Les noms, type du composant, coordonne, et l'ID_type correspondant au nom du type de réticule
              $reponse2 = $bdd->prepare('SELECT Nom_Type_C, Coord_X_C, Coord_Y_C, ID_type_reticule FROM type_reticule WHERE Nom_Type_Reticule = :n_t_r ORDER BY Coord_X_C, Coord_Y_C ASC');
              $reponse2->execute(array(
                'n_t_r' => $Nom_Type_Reticule_Provisoire
              ));
              while($donnees2 = $reponse2->fetch())
              {
                $req_Ajout = $bdd->prepare('INSERT INTO composant (Nom_Wafer, ID_Type_Reticule_Ref, Pos_X_Ret, Pos_Y_Ret, type_Composant_Ref) VALUES (:Nom_Wafer, :ID_Type_Reticule_Ref, :Pos_X_Ret, :Pos_Y_Ret, :type_Composant)');
                $req_Ajout->execute(array(
                  'Nom_Wafer'=> $_POST['nameWafer'],
                  'ID_Type_Reticule_Ref' =>$donnees2['ID_type_reticule'],
                  'Pos_X_Ret'=>$donnees['Coord_X_Ret'],
                  'Pos_Y_Ret'=>$donnees['Coord_Y_Ret'],
                  'type_Composant' =>$donnees2['Nom_Type_C']
                ));
              }
            }

            retour_json(true, "Ajout du wafer");
          }
          else{retour_json(false, "Probleme ID projet");}
        }
        else{retour_json(false, "Probleme numéro du run");}
      }
      else{retour_json(false,"Probleme type du wafer");}
    }
    else{retour_json(false,"Probleme nom du wafer");}
  }

  if($_POST['action'] == "addMesure"){
    echo("OK");
    if(isset($_POST['id_comp'])){
      if(isset($_POST['id_carac'])){
        if(isset($_POST['valeur'])){
            $req_Ajout = $bdd->prepare('INSERT INTO mesure (ID_Composant, Valeur, ID_Caracteristique) VALUES (:id_composant, :valeur, :id_caracteristique)');
            $req_Ajout->execute(array(
              'id_composant' => $_POST['id_comp'],
              'valeur' => $_POST['valeur'],
              'id_caracteristique' => $_POST['id_carac']
            ));
            retour_json(true, "Ajout du mesure");
          }
          else{retour_json(false, "Probleme valeur mesure");}
        }
        else{retour_json(false, "Probleme id caracteristique");}
      }
      else{retour_json(false,"Probleme id composant");}
  }

  if($_POST['action'] == "addExperience"){
    if(isset($_POST['id_comp'])){
      if(isset($_POST['id_auteur'])){
        if(isset($_POST['Contenu_Exp'])){
          $req_Ajout = $bdd->prepare('INSERT INTO experience (ID_Composant, ID_Auteur, Contenu_Exp) VALUES (:id_composant, :id_auteur, :contenuExp)');
          $req_Ajout->execute(array(
            'id_composant' => $_POST['id_comp'],
            'id_auteur' => $_POST['id_auteur'],
            'contenuExp' => $_POST['Contenu_Exp']
          ));
          retour_json(true, "Ajout de l'experience");
        }
        else{retour_json(false, "Probleme contenu expérience");}
      }
      else{retour_json(false, "Probleme id auteur");}
    }
    else{retour_json(false,"Probleme id composant");}
  }
  /*
  if($_POST['action'] == "addCommentaire"){
    if(isset($_POST['id_composant'])){
      if(isset($_POST['id_auteur'])){
        if(isset($_POST['id_photo'])){
          if(isset($_POST['contenu_Commentaire'])){


            if(isset($_FILES['file_photo'])){ // S'il y a des informations par rapport à la photo

              $uploadOk = 1;
              $imageFileType = strtolower(pathinfo(basename($_FILES["file_photo"]["name"]),PATHINFO_EXTENSION));
              $target_file = 'image/component/'.$_POST['id_composant'].'/';
              if(is_dir($target_file)){
                //Si le chemin du fichier existe deja
              }
              else {
                echo $target_file;
                if(!mkdir("../".$target_file)){
                  echo("Echec création dossier");
                }
              }

              $check = getimagesize($_FILES['file_photo']['tmp_name']);
              if($check === false){
                $uploadOk = 0; // ce n'est pas une image
              }
              //echo(date("dmyHis"));
              $target_file = $target_file.date("dmyHis");
              $target_file2 = '../'.$target_file.'.'.$imageFileType;

              if(file_exists($target_file)){$uploadOk=0;}
              if($_FILES["fileToUpload"]["size"] > 700000) { // On défini la taille max de l'image
                echo("Sorry, your file is too large."); // Message Erreur
                echo($_FILES["fileToUpload"]["size"]);
                $uploadOk = 0;
              }
              if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
                echo("Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
                $uploadOk = 0;
              }
              if($uploadOk!=0){
                $src = $_FILES['file_photo']['tmp_name'];
                echo ("Source:".$src." && Target:".$target_file2);
                if(move_uploaded_file($src, $target_file2)){
                  //echo "Your picture have been uploaded succesfully";

                  $req = $bdd->prepare('INSERT INTO image(Chemin, Extension, ID_Composant) VALUES(:chemin, :extension, :num_composant)');
                  $req->execute(array(
                    'chemin'=> $target_file,
                    'extension'=>$imageFileType,
                    'num_composant'=>$_POST['id_composant']
                  ));
                  echo $_POST['contenu_Commentaire'];
                  echo $_POST['id_composant'];
                  echo $_POST['id_auteur'];
                  echo $target_file;

                  $req = $bdd->prepare('SELECT ID_Image FROM image WHERE ID_Composant =:id_c  AND Chemin =:chemin');
                  $req->execute(array(
                    'id_c' => $_POST['id_composant'],
                    'chemin' => $target_file
                  ));
                  while($donnees = $req->fetch())
                  {
                    echo("ID_Image = ".$donnees['ID_Image']);
                    $req_Ajout = $bdd->prepare('INSERT INTO commentaire (Contenu, ID_Composant, ID_Utilisateur, ID_Image) VALUES(:contenu, :id_c, :id_user, :id_img)');
                    $req_Ajout->execute(array(
                      'contenu' => $_POST['contenu_Commentaire'],
                      'id_c' => $_POST['id_composant'],
                      'id_user' => $_POST['id_auteur'],
                      'id_img' => $donnees['ID_Image']
                    ));
                  }

                }
                else{
                  echo "Error";
                }
              }
            }
            else{
              $req_Ajout = $bdd->prepare('INSERT INTO commentaire (Contenu, ID_Composant, ID_Utilisateur, ID_Image) VALUES(:contenu, :id_c, :id_user, :id_img)');
              $req_Ajout->execute(array(
                'contenu' => $_POST['contenu_Commentaire'],
                'id_c' => $_POST['id_composant'],
                'id_user' => $_POST['id_auteur'],
                'id_img' => $_POST['id_photo']
              ));
            }

            retour_json(true, "Ajout du commentaire");
          }
          else{retour_json(false, "Le commentaire n'a pas de contenu");}
        }
        else{retour_json(false, "Problème ID image");}
      }
      else{retour_json(false, "Problème auteur commentaire");}
    }
    else{retour_json(false, "Problème ID du composant ");}
  }
  */
  if($_POST['action'] == "addCommentaire"){
    if(isset($_POST['id_composant'])){
      if(isset($_POST['id_auteur'])){
        if(isset($_POST['id_photo'])){
          if(isset($_POST['id_fichier'])){
            if(isset($_POST['contenu_Commentaire'])){

              $etatCommentaire = 0;
              if($_POST['id_photo'] == -1){
                // Pas de photo dans le commentaire
                if($_POST['id_fichier'] == -1){
                  // Pas de fichier dans le commentaire
                  $etatCommentaire = 1;
                  //SPSF
                }
                else{
                  // Il y a un fichier dans le commentaire
                  $etatCommentaire = 2;
                  //SPAF
                }
              }
              else {
                // Il y a une photo dans le commentaire
                if($_POST['id_fichier'] == -1){
                  // Pas de fichier dans le commentaire
                  $etatCommentaire = 3;
                  //APSF

                }
                else{
                  // Il y a un fichier dans le commentaire
                  $etatCommentaire = 4;
                  //APAF
                }
              }
              if($etatCommentaire == 1){
                $req_Ajout = $bdd->prepare('INSERT INTO commentaire (Contenu, ID_Composant, ID_Utilisateur, ID_Image, ID_Fichier) VALUES(:contenu, :id_c, :id_user, :id_img, :id_file)');
                $req_Ajout->execute(array(
                  'contenu' => $_POST['contenu_Commentaire'],
                  'id_c' => $_POST['id_composant'],
                  'id_user' => $_POST['id_auteur'],
                  'id_img' => $_POST['id_photo'],
                  'id_file' => $_POST['id_fichier']
                ));
                retour_json(true, "Ajout du commentaire sans photo et sans fichier");
              }

              if($etatCommentaire == 2){
                if(isset($_FILES['file_fichier'])){
                  $uploadOk = 1;
                  $fichierFileType = strtolower(pathinfo(basename($_FILES["file_fichier"]["name"]),PATHINFO_EXTENSION));
                  $target_file = 'fichier/component/'.$_POST['id_composant'].'/';
                  if(is_dir('../'.$target_file)){

                  }
                  else {
                    //Attention fichier/component/ doit deja exister
                    echo $target_file;
                    if(!mkdir("../".$target_file)){
                      echo("Echec création dossier fichier");
                    }
                    //chmod("../".$target_file,0777);
                  }
                  if($file_size < 2097152){ // Si le fichier est supérieur à 2 Mo
                    $src = $_FILES['file_fichier']['tmp_name'];
                    $target_file = $target_file.date("dmyHis");
                    $target_file2 = '../'.$target_file.'.'.$fichierFileType;
                    echo "Target 2: ".$target_file2 .'\n';
                    if(move_uploaded_file($src, $target_file2)){
                      $req = $bdd->prepare('INSERT INTO fichier(Chemin, Extension, ID_Composant) VALUES(:chemin, :extension, :num_composant)');
                      $req->execute(array(
                        'chemin'=> $target_file,
                        'extension'=>$fichierFileType,
                        'num_composant'=>$_POST['id_composant']
                      ));

                      $req = $bdd->prepare('SELECT ID_Fichier FROM fichier WHERE ID_Composant =:id_c  AND Chemin =:chemin');
                      $req->execute(array(
                        'id_c' => $_POST['id_composant'],
                        'chemin' => $target_file
                      ));
                      while($donnees = $req->fetch())
                      {
                        echo("ID_Fichier = ".$donnees['ID_Fichier']);
                        $req_Ajout = $bdd->prepare('INSERT INTO commentaire (Contenu, ID_Composant, ID_Utilisateur, ID_Image, ID_Fichier) VALUES(:contenu, :id_c, :id_user, :id_img, :id_file)');
                        $req_Ajout->execute(array(
                          'contenu' => $_POST['contenu_Commentaire'],
                          'id_c' => $_POST['id_composant'],
                          'id_user' => $_POST['id_auteur'],
                          'id_img' => $_POST['id_photo'],
                          'id_file' => $donnees['ID_Fichier']
                        ));
                      }
                    }
                  }
                }
              }

              if($etatCommentaire == 3){
                if(isset($_FILES['file_photo'])){ // S'il y a des informations par rapport à la photo

                  $uploadOk = 1;
                  $imageFileType = strtolower(pathinfo(basename($_FILES["file_photo"]["name"]),PATHINFO_EXTENSION));
                  $target_file = 'image/component/'.$_POST['id_composant'].'/';
                  if(is_dir($target_file)){
                    //Si le chemin du fichier existe deja
                  }
                  else {
                    echo $target_file;
                    if(!mkdir("../".$target_file)){
                      echo("Echec création dossier photo");
                    }
                  }

                  $check = getimagesize($_FILES['file_photo']['tmp_name']);
                  if($check === false){
                    $uploadOk = 0; // ce n'est pas une image
                  }
                  //echo(date("dmyHis"));
                  $target_file = $target_file.date("dmyHis");
                  $target_file2 = '../'.$target_file.'.'.$imageFileType;

                  if(file_exists($target_file)){$uploadOk=0;}
                  if($_FILES["fileToUpload"]["size"] > 700000) { // On défini la taille max de l'image
                    echo("Sorry, your file is too large."); // Message Erreur
                    echo($_FILES["fileToUpload"]["size"]);
                    $uploadOk = 0;
                  }
                  if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" && $imageFileType != "tif" ) {
                    echo("Sorry, only JPG, JPEG, PNG , GIF & tif files are allowed.");
                    $uploadOk = 0;
                  }
                  if($uploadOk!=0){
                    $src = $_FILES['file_photo']['tmp_name'];
                    echo ("Source:".$src." && Target:".$target_file2);
                    if(move_uploaded_file($src, $target_file2)){
                      //echo "Your picture have been uploaded succesfully";

                      $req = $bdd->prepare('INSERT INTO image(Chemin, Extension, ID_Composant) VALUES(:chemin, :extension, :num_composant)');
                      $req->execute(array(
                        'chemin'=> $target_file,
                        'extension'=>$imageFileType,
                        'num_composant'=>$_POST['id_composant']
                      ));
                      echo $_POST['contenu_Commentaire'];
                      echo $_POST['id_composant'];
                      echo $_POST['id_auteur'];
                      echo $target_file;

                      $req = $bdd->prepare('SELECT ID_Image FROM image WHERE ID_Composant =:id_c  AND Chemin =:chemin');
                      $req->execute(array(
                        'id_c' => $_POST['id_composant'],
                        'chemin' => $target_file
                      ));
                      while($donnees = $req->fetch())
                      {
                        echo("ID_Image = ".$donnees['ID_Image']);
                        $req_Ajout = $bdd->prepare('INSERT INTO commentaire (Contenu, ID_Composant, ID_Utilisateur, ID_Image) VALUES(:contenu, :id_c, :id_user, :id_img)');
                        $req_Ajout->execute(array(
                          'contenu' => $_POST['contenu_Commentaire'],
                          'id_c' => $_POST['id_composant'],
                          'id_user' => $_POST['id_auteur'],
                          'id_img' => $donnees['ID_Image']
                        ));
                      }
                      retour_json(true, "Ajout du commentaire avec photo et sans fichier");
                    }
                    else{
                      echo "Error";
                    }
                  }
                }
              }
              if($etatCommentaire == 4){
                if(isset($_FILES['file_fichier'])){ //On teste l'existance de file_fichier
                  if(isset($_FILES['file_photo'])){ //On teste l'existance de file_photo

                  }
                }
                retour_json(true, "Ajout du commentaire avec photo et avec fichier");
              }

            }
            else{retour_json(false, "Le commentaire n'a pas de contenu");}
          }
          else{retour_json(false, "Problème ID fichier");}
        }
        else{retour_json(false, "Problème ID image");}
      }
      else{retour_json(false, "Problème auteur commentaire");}
    }
    else{retour_json(false, "Problème ID du composant ");}
  }

  if($_POST['action'] == "addBox"){
    if(isset($_POST['num_box'])){
      if(isset($_POST['client'])){
        $req_Ajout = $bdd->prepare('INSERT INTO boite (Numero_Boite, Pos_B, ID_Client) VALUE(:num_box, -1, :client)');
        $req_Ajout->execute(array(
          'num_box' => $_POST['num_box'],
          'client' => $_POST['client']
          ));
          retour_json(true, "Ecriture de la boite");
      }
      else{retour_json(false, "Probleme champ client");}
    }
    else{retour_json(false, "Probleme champ numéro de la boite");}
  }
  //Requete PATCH

  if($_GET['action'] == "updatePARAM")
  {
    if(isset($_GET['id_param']))
    {
      if(isset($_GET['name_param'])) // On teste si le paramètre name_param existe
      {
        if(isset($_GET['unite'])) // On teste si le paramètre unite existe
        {
          if($_GET['name_param']!="" || $_GET['unite']!="")
          {
            // On fait une requête SQL
            $req = $bdd->prepare('UPDATE caracteristique SET Nom_Parametre = :name_param, Unite = :name_unit, Activation =:actif WHERE ID_Caracteristique = :id');
            $req->execute(array(
            	'name_param' => $_GET['name_param'],
            	'name_unit' =>$_GET['unite'],
            	'id' => $_GET['id_param'],
              'actif'=>$_GET['activation']
            	));

              retour_json(true, "Mise à jour du paramètre");
          }
          else {
            retour_json(false, "L'un ou les deux champs sont vides");
          }
        }
        else {
          retour_json(false, "Absence du paramètre Unite");
        }
      }
      else {
        retour_json(false, "Absence du nom du paramtre");
      }
    }
    else {
      retour_json(false, "Absence de l'ID du paramètre");
    }
  }
  if($_GET['action'] == "updateCLIENT")
  {
    if(isset($_GET['id_client']))
    {
      if($_GET['name_client']!="")
      {
        // On fait une requête SQL
        $req = $bdd->prepare('UPDATE client SET Nom_Entreprise = :name_client, Activation =:actif WHERE ID_Client = :id');
        $req->execute(array(
        	'name_client' => $_GET['name_client'],
        	'id' => $_GET['id_client'],
          'actif'=>$_GET['activation']
        	));

        $req2 = $bdd->prepare('UPDATE client_expedition SET Nom_Entreprise = :name_client WHERE Nom_Entreprise = (SELECT Nom_Entreprise FROM client WHERE ID_Client =:id)');
        $req2->execute(array(
          	'name_client' => $_GET['name_client'],
          	'id' => $_GET['id_client']
          ));

        retour_json(true, "Mise à jour du client");
      }
      else {
        retour_json(false, "Absence du nom du client");
      }
    }
    else {
      retour_json(false, "Absence de l'ID du client");
    }
  }
  if($_GET['action'] == "updatePROJET")
  {
    if(isset($_GET['id_projet']))
    {
      if($_GET['nom_projet']!="")
      {
        if($_GET['id_client']!="")
        {
          if($_GET['description']!="")
          {
            if($_GET['last_modif']!="")
            {
              if($_GET['etat']!="")
              {
                if($_GET['activation']!="")
                {
                  // On fait une requête SQL
                  $req = $bdd->prepare('UPDATE projet SET Nom_Projet =:nameProject, ID_Client =:ID_Client, Description =:Description, Last_modif=:Last_modif, etat=:state, Activation=:activation WHERE ID_Projet =:ID_project');
                  $req->execute(array(
                      'nameProject' => $_GET['nom_projet'],
                      'ID_Client' => $_GET['id_client'],
                      'Description' => $_GET['description'],
                      "Last_modif" => $_GET['last_modif'],
                      "state" => $_GET['etat'],
                      "activation" => $_GET['activation'],
                      "ID_project" => $_GET['id_projet']
                    ));

                  retour_json(true, "Mise à jour du projet");
                }
                else {retour_json(false, "Absence du paramètre activation");}
              }
              else {retour_json(false, "Absence du paramètre état");}
            }
            else {retour_json(false, "Absence de temps de la dernière modification");}
          }
          else {retour_json(false, "Absence de description");}
        }
        else {retour_json(false, "Absence de l'ID du client");}
      }
      else {retour_json(false, "Absence du nom du projet");}
    }
    else {retour_json(false, "Absence de l'ID du projet");}
  }

  if($_GET['action'] == "updateTheoricalValue"){
    if(isset($_GET['nom_type_composant'])){
      if(isset($_GET['id_caracteristique'])){
        if(isset($_GET['valeur'])){
          $req = $bdd->prepare('UPDATE type_composant SET Valeur =:value WHERE Nom_Type_C =:ntc AND ID_Caracteristique =:id_carac');
          $req->execute(array(
            'value' => $_GET['valeur'],
            'ntc' => $_GET['nom_type_composant'],
            'id_carac' => $_GET['id_caracteristique']
          ));
          retour_json(true, "Modification de la valeur");
        }
        else{retour_json(false, "Absence de valeur");}
      }
      else{retour_json(false, "Absence de id_caracteristique");}
    }
    else{retour_json(false, "Absence du nom du type de composant");}
  }

  if($_POST['action'] == "updateComment"){
    if(isset($_POST['new_content'])){
      if(isset($_POST['id_comment'])){
        //Voir s'il faut update la date aussi ou si cela est fait automatiquement
        $req = $bdd->prepare('UPDATE commentaire SET Contenu =:new_content, DateCom =:dateNewComment  WHERE ID_Commentaire =:id_comment');
        $req->execute(array(
          'new_content' => $_POST['new_content'],
          'id_comment' => $_POST['id_comment'],
          'dateNewComment' => date("Y-m-d H:i:s")
        ));
        retour_json(true, "Modification du commentaire");
      }
      else {retour_json(false, "Probleme ID commentaire");}
    }else{retour_json(false, "Probleme du contenu");}
  }

  if($_GET['action'] == "updateEtat1"){
    if(isset($_GET['id_comp'])){
      if(isset($_GET['valeur'])){
        $req = $bdd->prepare('UPDATE composant SET Etat_Composant =:valeur WHERE ID_Composant =:ID_comp');
        $req->execute(array(
          'valeur' => $_GET['valeur'],
          'ID_comp' => $_GET['id_comp']
        ));
        retour_json(true, "Changement de l'etat 1 du composant");
      }
      else{retour_json(false,"Probleme valeur");}
    }
    else{retour_json(false,"Probleme id composant");}
  }

  if($_GET['action'] == "updateEtat2"){
    if(isset($_GET['id_comp'])){
      if(isset($_GET['valeur'])){
        $req = $bdd->prepare('UPDATE composant SET Vivant =:valeur WHERE ID_Composant =:ID_comp');
        $req->execute(array(
          'valeur' => $_GET['valeur'],
          'ID_comp' => $_GET['id_comp']
        ));
        retour_json(true, "Changement de l'etat 2 du composant");
      }
      else{retour_json(false,"Probleme valeur");}
    }
    else{retour_json(false,"Probleme id composant");}
  }

  if($_GET['action'] == "updateExpedition"){
    if(isset($_GET['option'])){
      if(isset($_GET['num_box'])){
        if($_GET['option']==1){
          //$req = $bdd->prepare('UPDATE boite SET Expedie = 0, ID_Client = 0 WHERE Numero_Boite =:num_box');
          $req = $bdd->prepare('UPDATE boite SET Expedie = 0, Date_Expedition = "0000-00-00 00:00:00" WHERE Numero_Boite =:num_box');
          $req->execute(array(
            'num_box' => $_GET['num_box']
          ));
          retour_json(true, "La boite n'est pas expediee maintenant");
        }
        if($_GET['option']==2){
          if(isset($_GET['nom_client'])){
            date_default_timezone_set('Europe/Paris');

            $req = $bdd->prepare('UPDATE boite SET Expedie = 1, Date_Expedition =:date_Expe , ID_Client = (SELECT ID_Client_E FROM client_expedition WHERE Nom_Entreprise =:nom_client) WHERE Numero_Boite =:num_box');
            $req->execute(array(
              'nom_client' => $_GET['nom_client'],
              'date_Expe' => date("Y-m-d H:i:s"), //date("Y-m-d H:i:s",$phptime),
              'num_box' => $_GET['num_box']
            ));
            retour_json(true, "La boite est expédié avec le client indiqué");
          }
          else{retour_json(false, "Problème nom du client");}
        }
      }
      else{retour_json(false, "Problème numéro de la boite");}
    }
    else{retour_json(false, "Problème option");}
  }

  if($_GET['action'] == "updateTraitementWafer"){
    if(isset($_GET['traitement'])){
      if(isset($_GET['Nom_Wafer'])){
        $req = $bdd->prepare('UPDATE wafer SET Traitement =:trait WHERE Nom_Wafer =:name_w');
        $req->execute(array(
          'trait' => $_GET['traitement'],
          'name_w' => $_GET['Nom_Wafer']
        ));
        retour_json(true, "Le traitement à été modifié");
      }
      else {
        retour_json(false, "Problème id_wafer");
      }
    }
    else {
      retour_json(false, "Problème valeur traitement");
    }
  }

  if($_GET['action'] == "linkComponentWithBox"){ // Permet d'ajouter un composant dans une boite
    if(isset($_GET['num_box'])){
      if(isset($_GET['coord'])){
        $coord = $_GET['coord'];
        if(isset($_GET['ID_Composant'])){

          //On cherche si le composant existe deja ?
          $req = $bdd->prepare('SELECT ID_Composant, ID_boite, ID_Client FROM boite WHERE ID_Composant =:id_c');
          $req->execute(array(
            'id_c' => $_GET['ID_Composant']
          ));

          //Si un ou des composants existe deja dans des boites on les supprimes
          while($donnees = $req->fetch()){
            $req2 = $bdd->prepare('DELETE FROM boite WHERE ID_boite =:id_b');
            $req2->execute(array(
              'id_b' => $donnees['ID_boite']
            ));
          }

          $req3 = $bdd->prepare('SELECT DISTINCT ID_Client FROM boite WHERE Numero_Boite =:num_box');
          $req3->execute(array(
            'num_box' => $_GET['num_box']
          ));
          while($donnees2 = $req3->fetch()){
            $valeurClient = $donnees2['ID_Client'];
            echo $donnees2['ID_Client'];
          }
          if($valeurClient==null){
            $valeurClient=0;
          }

          if($coord == ""){ // Si la position n'est pas défini
            $req4 = $bdd->prepare('INSERT INTO boite (ID_Composant, Numero_Boite, Pos_B, ID_Client) VALUES (:id_c, :num_box, -1, :id_client)');
            $req4->execute(array(
              'id_c' => $_GET['ID_Composant'],
              'num_box' => $_GET['num_box'],
              'id_client' => $valeurClient
            ));
            echo "A";
          }
          else{
            $req5 = $bdd->prepare('INSERT INTO boite (ID_Composant, Numero_Boite, Pos_B, ID_Client) VALUES (:id_c, :num_box, :pos_box, :id_client)');
            echo $_GET['ID_Composant']."\n";
            echo $_GET['num_box']."\n";
            echo $coord."\n";
            echo $valeurClient."\n";
            $req5->execute(array(
              'id_c' => $_GET['ID_Composant'],
              'num_box' => $_GET['num_box'],
              'pos_box' => $coord,
              'id_client' => $valeurClient
            ));
            echo "B";
          }
          retour_json(true,"Ajout du composant dans la boite");
        }
        else{retour_json(false,"Probleme ID composant");}
      }
      else{retour_json(false,"Problème coordonnée");}
    }
    else{retour_json(false,"Problème numéro de la boite");}
  }
  /*
  if($_GET['action'] == "linkComponentWithBox"){ // Permet d'ajouter un composant dans une boite
    if(isset($_GET['num_box'])){
      if(isset($_GET['coord_x'])){
        $coord_x = $_GET['coord_x'];
        if(isset($_GET['coord_y'])){
          $coord_y = $_GET['coord_y'];
          if(isset($_GET['ID_Composant'])){

            //On cherche si le composant existe deja ?
            $req = $bdd->prepare('SELECT ID_Composant, ID_boite FROM boite WHERE ID_Composant =:id_c');
            $req->execute(array(
              'id_c' => $_GET['ID_Composant']
            ));

            //Si un ou des composants existe deja dans des boites on les supprimes
            while($donnees = $req->fetch()){
              $req2 = $bdd->prepare('DELETE FROM boite WHERE ID_boite =:id_b');
              $req2->execute(array(
                'id_b' => $donnees['ID_boite']
              ));
            }

            if($coord_x == "" || $coord_y ==""){ // Si la position n'est pas défini
              $req3 = $bdd->prepare('INSERT INTO boite (ID_Composant, Numero_Boite, Pos_X_B, Pos_Y_B) VALUES (:id_c, :num_box, -1, -1)');
              $req3->execute(array(
                'id_c' => $_GET['ID_Composant'],
                'num_box' => $_GET['num_box'],
              ));
            }
            else{
              $req4 = $bdd->prepare('INSERT INTO boite (ID_Composant, Numero_Boite, Pos_X_B, Pos_Y_B) VALUES (:id_c, :num_box, :pos_x_box, :pos_y_box)');
              $req4->execute(array(
                'id_c' => $_GET['ID_Composant'],
                'num_box' => $_GET['num_box'],
                'pos_x_box' => $coord_x,
                'pos_y_box' => $coord_y
              ));
            }
            retour_json(true,"Ajout du composant dans la boite");
          }
          else{retour_json(false,"Probleme ID composant");}
        }
        else{retour_json(false,"Problème coordonnée Y");}
      }
      else{retour_json(false,"Problème coordonnée X ");}
    }
    else{retour_json(false,"Problème numéro de la boite");}
  }
  */
  //desactivate
  if($_GET['action'] == "desactivateCategorie")
  {
    if(isset($_GET['nom_categorie']))
    {
      $req = $bdd->prepare('UPDATE categorie SET Activation = 0 WHERE Nom_Categorie = :n_cat');
      $req->execute(array(
        "n_cat" => $_GET['nom_categorie']
      ));
      retour_json(true, "La catégorie est desactive");
    }
    else {
      retour_json(false, "Il n'y a pas de nom de catégorie");
    }
  }
  // activate
  if($_GET['action'] == "activateClient")
  {
    if(isset($_GET['id_client']))
    {
      $req = $bdd->prepare('UPDATE client SET Activation = 1 WHERE ID_Client = :id_client');
      $req->execute(array(
        "id_client" => $_GET['id_client']
      ));
      retour_json(true, "Le client est ré-activé");
    }
    else {
      retour_json(false, "Il n'y a pas d'ID client");
    }
  }
  if($_GET['action'] == "activateProjet")
  {
    if(isset($_GET['id_projet']))
    {
      $req = $bdd->prepare('UPDATE projet SET Activation = 1 WHERE ID_Projet = :id_projet');
      $req->execute(array(
        "id_projet" => $_GET['id_projet']
      ));
      retour_json(true, "Le projet est ré-activé");
    }
    else {
      retour_json(false, "Il n'y a pas d'ID projet");
    }
  }
  if($_GET['action'] == "activateParametre")
  {
    if(isset($_GET['id_parametre']))
    {
      $req = $bdd->prepare('UPDATE caracteristique SET Activation = 1 WHERE ID_Caracteristique = :id_parametre');
      $req->execute(array(
        "id_parametre" => $_GET['id_parametre']
      ));
      retour_json(true, "Le parametre est ré-activé");
    }
    else {
      retour_json(false, "Il n'y a pas d'ID parametre");
    }
  }
  if($_GET['action'] == "activateCategorie")
  {
    if(isset($_GET['nom_categorie']))
    {
      $req = $bdd->prepare('UPDATE categorie SET Activation = 1 WHERE Nom_Categorie = :n_cat');
      $req->execute(array(
        "n_cat" => $_GET['nom_categorie']
      ));
      retour_json(true, "La catégorie est ré-activé");
    }
    else {
        retour_json(false, "Il n'y a pas de nom de catégorie");
    }
  }
  // ask
  if($_GET['action'] == "askParamWithCategorie")
  {
    if(isset($_GET['nomC']))
    {
      $cat_choix = $_GET['nomC'];
      $reponse = $bdd->query('SELECT DISTINCT CARAC.ID_Caracteristique, Nom_Parametre, Unite FROM caracteristique CARAC INNER JOIN categorie CAT ON CARAC.ID_Caracteristique = CAT.ID_Caracteristique WHERE Nom_Categorie = "'.$cat_choix.'"');
      $table = array();
      while($donnees = $reponse->fetch()) // On récupère le résultat de la requête un à un grâce à la fonction fetch()
      {
        $table['Nom_Parametre'][] = $donnees['Nom_Parametre'];
        $table['ID_Caracteristique'][] = $donnees['ID_Caracteristique'];
        $table['Unite'][] = $donnees['Unite'];
      }
      retour_json(true, "Requete askParamWithCategorie : OK", $table);
    }
    else {
      retour_json(false, "Le nom de la catégorie n'a pas été renseigné");
    }
  }
  // Requete SET
  if($_GET['action'] == "setCurrentComponent"){
    if(isset($_GET['id_comp'])){
      $_SESSION['lastComponent'] = $_GET['id_comp'];
      retour_json(true, "ID component SESSION changed");
    }
    else{
      retour_json(false, "Fail setCurrentComponent");
    }
  }
  // Requete DELETE
  if($_GET['action'] == "deletePARAM")
  {
    if(isset($_GET['id_param']))
    {
      $req = $bdd->prepare('DELETE FROM caracteristique WHERE ID_Caracteristique = :id');
      $req->execute(array(
        "id" => $_GET['id_param']
      ));
      retour_json(true, "Le paramètre à été supprimé");
    }
    else {
      retour_json(false, "L'ID du paramètre n'a pas été renseigné'");
    }
  }

  if($_GET['action'] == "deleteCLIENT")
  {
    if(isset($_GET['id_client']))
    {
      $req = $bdd->prepare('DELETE FROM client WHERE ID_Client = :id');
      $req->execute(array(
        "id" => $_GET['id_client']
      ));
      retour_json(true, "Le client à été supprimé");
    }
    else {
      retour_json(false, "L'ID du client n'a pas été renseigné'");
    }
  }

  if($_GET['action'] == "deletePROJET")
  {
    if(isset($_GET['id_projet']))
    {
      $req = $bdd->prepare('DELETE FROM projet WHERE ID_Projet = :id');
      $req->execute(array(
        "id" => $_GET['id_projet']
      ));
      retour_json(true, "Le projet à été supprimé");
    }
    else {
      retour_json(false, "L'ID du projet n'a pas été renseigné'");
    }
  }
  if($_GET['action'] == "deleteByNameCat")
  {
    if(isset($_GET['nameCat']))
    {
      $req = $bdd->prepare('DELETE FROM categorie WHERE Nom_Categorie = :nameCat');
      $req->execute(array(
        "nameCat" => $_GET['nameCat']
      ));
      retour_json(true, "Categorie à été supprimé");
    }
    else {
      retour_json(false, "Pas de nom de catégorie à supprimer");
    }
  }
  if($_GET['action'] == "deleteComment"){
    if(isset($_GET['ID_Comment'])){
      $req = $bdd->prepare('DELETE FROM commentaire WHERE ID_Commentaire = :id_Comment ');
      $req->execute(array(
        "id_Comment" => $_GET['ID_Comment']
      ));
      retour_json(true, "Commentaire supprimé");
    }
    else{
      retour_json(false, "Pas ID de commentaire");
    }
  }

  // if($etatCommentaire == 3){
  //   if(isset($_FILES['file_photo'])){ // S'il y a des informations par rapport à la photo

  //     $uploadOk = 1;
  //     $imageFileType = strtolower(pathinfo(basename($_FILES["file_photo"]["name"]),PATHINFO_EXTENSION));
  //     $target_file = 'image/component/'.$_POST['id_composant'].'/';
  //     if(is_dir($target_file)){
  //       //Si le chemin du fichier existe deja
  //     }
  //     else {
  //       echo $target_file;
  //       if(!mkdir("../".$target_file)){
  //         echo("Echec création dossier photo");
  //       }
  //     }

  //     $check = getimagesize($_FILES['file_photo']['tmp_name']);
  //     if($check === false){
  //       $uploadOk = 0; // ce n'est pas une image
  //     }
  //     //echo(date("dmyHis"));
  //     $target_file = $target_file.date("dmyHis");
  //     $target_file2 = '../'.$target_file.'.'.$imageFileType;

  //     if(file_exists($target_file)){$uploadOk=0;}
  //     if($_FILES["fileToUpload"]["size"] > 700000) { // On défini la taille max de l'image
  //       echo("Sorry, your file is too large."); // Message Erreur
  //       echo($_FILES["fileToUpload"]["size"]);
  //       $uploadOk = 0;
  //     }
  //     if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
  //       echo("Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
  //       $uploadOk = 0;
  //     }
  //     if($uploadOk!=0){
  //       $src = $_FILES['file_photo']['tmp_name'];
  //       echo ("Source:".$src." && Target:".$target_file2);
  //       if(move_uploaded_file($src, $target_file2)){
  //         //echo "Your picture have been uploaded succesfully";

  //         $req = $bdd->prepare('INSERT INTO image(Chemin, Extension, ID_Composant) VALUES(:chemin, :extension, :num_composant)');
  //         $req->execute(array(
  //           'chemin'=> $target_file,
  //           'extension'=>$imageFileType,
  //           'num_composant'=>$_POST['id_composant']
  //         ));
  //         echo $_POST['contenu_Commentaire'];
  //         echo $_POST['id_composant'];
  //         echo $_POST['id_auteur'];
  //         echo $target_file;

  //         $req = $bdd->prepare('SELECT ID_Image FROM image WHERE ID_Composant =:id_c  AND Chemin =:chemin');
  //         $req->execute(array(
  //           'id_c' => $_POST['id_composant'],
  //           'chemin' => $target_file
  //         ));
  //         while($donnees = $req->fetch())
  //         {
  //           echo("ID_Image = ".$donnees['ID_Image']);
  //           $req_Ajout = $bdd->prepare('INSERT INTO commentaire (Contenu, ID_Composant, ID_Utilisateur, ID_Image) VALUES(:contenu, :id_c, :id_user, :id_img)');
  //           $req_Ajout->execute(array(
  //             'contenu' => $_POST['contenu_Commentaire'],
  //             'id_c' => $_POST['id_composant'],
  //             'id_user' => $_POST['id_auteur'],
  //             'id_img' => $donnees['ID_Image']
  //           ));
  //         }
  //         retour_json(true, "Ajout du commentaire avec photo et sans fichier");
  //       }
  //       else{
  //         echo "Error";
  //       }
  //     }
  //   }
  // }
//   function delete_folder($directory)
//  {
//      foreach ((array) $this->get_subfolder($directory) as $folder) {
//          $this->delete_folder($folder);
//      }
//      foreach ((array) $this->get_files($directory) as $file) {
//          Unlink($file);
//      }
//      RmDir($directory);
//  }

  
  if($_GET['action'] == "deleteWafer"){
    if(isset($_GET['Nom_Wafer'])){
      $reponse = $bdd->prepare(
        'SELECT DISTINCT image.ID_Composant, Chemin, Extension FROM composant
        INNER JOIN image on image.ID_Composant=composant.ID_Composant
        WHERE composant.Nom_Wafer =:nom_wafer;'
        );
      $reponse->execute(array(
        'nom_wafer' => $_GET["Nom_Wafer"]
      ));
      
      while($donnees = $reponse->fetch())
      {

        echo("image/component/".$donnees['ID_Composant'].'/');
        echo($donnees['Chemin'].".".$donnees['Extension']);
        $target_file2="../".$donnees['Chemin'].".".$donnees['Extension'];
        $target_file = "../image/component/".$donnees['ID_Composant'];
        
        chmod($target_file,0777);
        chmod($target_file2,0777);
        // $handler = opendir($target_file);
        // if (!$handler) {
        //   trigger_error('File Error: Failed to open the directory ' . $target_file, E_USER_ERROR);
        //   return false;
        // }
        // $file = readdir($handler);
        unlink($target_file2);
        // closedir($handler);
        rmdir($target_file);
        }
      
      retour_json(true, "Photo supprimé");

      $req = $bdd->prepare('DELETE experience, fichier, mesure, composant,image,commentaire
        FROM composant 
        INNER JOIN fichier on fichier.ID_Composant=composant.ID_Composant
        INNER JOIN experience on experience.ID_Composant=composant.ID_Composant
        INNER JOIN mesure on mesure.ID_Composant=composant.ID_Composant
        INNER JOIN image on image.ID_Composant=composant.ID_Composant
        INNER JOIN commentaire on commentaire.ID_Composant=composant.ID_Composant
        WHERE composant.Nom_Wafer =:nom_wafer');
      $req->execute(array(
        "nom_wafer" => $_GET['Nom_Wafer']
      ));
      retour_json(true, "mesure, commentaire... supprimé");

      $req = $bdd->prepare('DELETE composant FROM composant WHERE composant.Nom_Wafer=:nom_wafer;');
      $req->execute(array(
        "nom_wafer" => $_GET['Nom_Wafer']
      ));
      retour_json(true, "Composant supprimé");

      $req = $bdd->prepare('DELETE wafer FROM wafer WHERE wafer.Nom_Wafer=:nom_wafer;');
      $req->execute(array(
        "nom_wafer" => $_GET['Nom_Wafer']
      ));
      retour_json(true, "Wafer supprimé");

    }
    else{
      retour_json(false, "Pas de Nom Wafer");
    }
  }

  if($_GET['action'] == "deleteTypeWafer"){
    if(isset($_GET['Nom_Type_Wafer'])){
      $req = $bdd->prepare('DELETE type_wafer FROM type_wafer WHERE`Nom_Type_Wafer`=:type_wafer;');
      $req->execute(array(
        "type_wafer" => $_GET['Nom_Type_Wafer']
      ));
      retour_json(true, "Type wafer supprimé");
      }
  }

  if($_GET['action'] == "deleteTypeReticule"){
    if(isset($_GET['Nom_Type_Reticule'])){
      $req = $bdd->prepare('DELETE type_reticule FROM type_reticule WHERE`Nom_Type_Reticule`=:type_reticule;');
      $req->execute(array(
        "type_reticule" => $_GET['Nom_Type_Reticule']
      ));
      retour_json(true, "Type reticule supprimé");
      }
  }

  if($_GET['action'] == "deleteTypeComposant"){
    if(isset($_GET['Nom_Type_C'])){
      $req = $bdd->prepare('DELETE type_composant FROM type_composant WHERE`Nom_Type_C`=:type_c;');
      $req->execute(array(
        "type_c" => $_GET['Nom_Type_C']
      ));
      retour_json(true, "Type composant supprimé");
      }
  }
  

  if($_GET['action'] == "getStepByID"){
    if(isset($_GET['id'])){
      $req = $bdd->prepare('SELECT url_video, A, B, C, D FROM questionVideo WHERE id = :id');
      $req->execute(array(
        "id" => $_GET['id']
      ));
      $resultsInter = $req->fetch();
      $results['url_video'] = $resultsInter['url_video'];
      $results['A'] = $resultsInter['A'];
      $results['B'] = $resultsInter['B'];
      $results['C'] = $resultsInter['C'];
      $results['D'] = $resultsInter['D'];
      retour_json(true, "voici la requete video", $results);
  }
}
?>
