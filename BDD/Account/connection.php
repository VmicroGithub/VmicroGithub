<?php
  session_start();
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <?php
    include("connexionGlobale.php"); // On se connecte à la base de données
    $connect = false; //A l'état de base nous ne sommes pas connecté
    if(isset($_POST["uname"])) // On vérifie si le nom d'utilisateur à été reçu
    {
      $pseudo = $_POST["uname"]; // On affecte le parametre à une variable
      echo $pseudo;
      if(isset($_POST["psw"])) // On vérifie si le mot de passe à été reçu
      {
        $mdpRenseigne = $_POST["psw"]; // On affecte le parametre à une variable
        //echo $mdpRenseigne;
        $reponse = $bdd->prepare('SELECT id_utilisateur, mdp, prenom, nom from utilisateur where pseudo = :nameUser ');
        $reponse->execute(array(
          'nameUser' => $pseudo
        ));
        while($donnees = $reponse->fetch())
        {
          if($donnees["mdp"] == md5($_POST['psw'])) // On regarde si le mdp hashé = au mdp entré puis hashé
          {
            echo("Connecté");
            $connect=true;
            // Création d'une session
            $_SESSION['connect'] = True;
            $_SESSION['prenom'] = $donnees['prenom'];
            $_SESSION['nom'] = $donnees['nom'];
            $_SESSION['id_user']=$donnees['id_utilisateur'];
          ?>
            //Redirection vers menu principale
            <script> // La commande si dessous doit s'éxécuter en Javascript
              //window.location.href = "menu_Creation.php"; // Lorsque le composant est créer on renvoie l'utilisateur vers une autre page (Dans ce cas la page d'accueil : Accueil.php)
              window.location.href = "https://vmicro.fr/database/BDD_1.0/Home/home.php";
            </script>
          <?php
          }
        }
        if($connect==false)
        {
          //redirection vers pageIdentification.php
          ?>
          <script> // La commande si dessous doit s'éxécuter en Javascript
          window.location.href = "pageIdentification.php"; // Lorsque le composant est créer on renvoie l'utilisateur vers une autre page (Dans ce cas la page d'accueil : Accueil.php)
          </script>
          <?php
          $_SESSION['connect'] = False;
        }
      }
      else //Message d'erreur
      {
        echo "Pas de mot de passe";
        ?>
        <script> // La commande si dessous doit s'éxécuter en Javascript
        window.location.href = "pageIdentification.php"; // Lorsque le composant est créer on renvoie l'utilisateur vers une autre page (Dans ce cas la page d'accueil : Accueil.php)
        </script>
        <?php
      }
    }
    else //Message d'erreur
    {
      echo "Pas de nom d'utilisateur";
      ?>
      <script> // La commande si dessous doit s'éxécuter en Javascript
      window.location.href = "pageIdentification.php"; // Lorsque le composant est créer on renvoie l'utilisateur vers une autre page (Dans ce cas la page d'accueil : Accueil.php)
      </script>
      <?php
    }
    ?>
  <body>
</html>
