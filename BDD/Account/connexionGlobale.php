<?php

  $servername = "db572379400.db.1and1.com";
  $username = "dbo572379400";
  $password = "Guillaume59!Guillaume59!";
  $dbname = "db572379400";

    try
    {
      $bdd = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8",$username, $password);
    }
    catch (Exception $e)
    {
      die('Erreur : ' .$e->getMessage());
    }

?>
