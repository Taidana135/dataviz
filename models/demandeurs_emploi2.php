<?php

namespace models;
class demandeurs_emploi2 extends \app\Model{
    
/**
* @param string $slug
* @return void
*/
    public function __construct()
    {
    // Nous définissons la table par défaut de ce modèle
    $this->table = "demandeurs_emploi2";
    
    // Nous ouvrons la connexion à la base de données
    $this->getConnection();
    }
    public function findBySlug(string $slug){
        $sql = "SELECT * FROM `".$this->table."` WHERE `slug`='".$slug."'";
        $query = $this->_connexion->query($sql);
    
        return $query->fetch_assoc();
    }
    public function get_genres() {
        $sql = "SELECT Genre, COUNT(*) nb FROM `".$this->table."` GROUP BY Genre";
        $query = $this->_connexion->query($sql);
    
        return $query->fetch_all(MYSQLI_ASSOC);;
    }
    public function get_annees_homme() {
        $sql = "SELECT Genre,CEILING(Annee_naissance/10)*10, COUNT(*) nb FROM `".$this->table."` WHERE Genre='HOMME' GROUP BY CEILING(Annee_Naissance/10);";
        $query = $this->_connexion->query($sql);
    
        return $query->fetch_all(MYSQLI_ASSOC);;
    }
    public function get_annees_femme() {
        $sql = "SELECT Genre,CEILING(Annee_naissance/10)*10, COUNT(*) nb FROM `".$this->table."` WHERE Genre='FEMME' GROUP BY CEILING(Annee_Naissance/10);";
        $query = $this->_connexion->query($sql);

        return $query->fetch_all(MYSQLI_ASSOC);;
    }
    public function get_nationalite() {
        $sql = "SELECT Nationalite, COUNT(*) nb FROM `".$this->table."` GROUP BY Nationalite; ";
        $query = $this->_connexion->query($sql);

        return $query->fetch_all(MYSQLI_ASSOC);;
    }
    public function get_statut_familial() {
        $sql = "SELECT Statut_familial, COUNT(*) nb FROM `".$this->table."` GROUP BY Statut_familial; ";
        $query = $this->_connexion->query($sql);

        return $query->fetch_all(MYSQLI_ASSOC);;
    }
    public function get_permis() {
        $sql = "SELECT permis_possede_code, COUNT(*) nb FROM `".$this->table."` GROUP BY permis_possede_code; ";
        $query = $this->_connexion->query($sql);

        return $query->fetch_all(MYSQLI_ASSOC);;
    }

}

?>