<?php

namespace models;
class Honkai extends \app\Model{

/**
* @param string $slug
* @return void
*/

public function __construct(){
    // Nous définissons la table par défaut de ce modèle

    $this->table = "utilisateur";
    // Nous ouvrons la connexion à la base de données

    $this->getConnection();
    }

public function findBySlug(string $slug){

    $sql = "SELECT * FROM `".$this->table."` WHERE `slug`='".$slug."'";
    $query = $this->_connexion->query($sql);

    return $query->fetch_assoc();
    }
}





?>