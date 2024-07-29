<?php

namespace app;
abstract class Model{
    // Informations de la base de données
    private $host = "localhost";
    private $db_name = "mvc_sae303"; 
    private $username = "root";
    private $password = "";

    // Propriété qui contiendra l'instance de la connexion
    protected $_connexion;

    // Propriétés permettant de personnaliser les requêtes
    public $table;
    public $id;

    /**
    * Fonction d'initialisation de la base de données
    *
    * @return void
    */
    public function getAll(){

        $sql = "SELECT * FROM `{$this->table}`";

        $query = $this->_connexion->query($sql);
        
        return $query->fetch_all(MYSQLI_ASSOC);
        }

    public function getConnection(){
        // On supprime la connexion précédente
        $this->_connexion = null;

        // On essaie de se connecter à la base
        try{
        $this->_connexion = new \mysqli($this->host, $this->username, $this->password, $this->db_name);
        $this->_connexion->set_charset("utf8");

        }catch(\mysqli_sql_exception $exception){
        echo "Erreur de connexion : " . $exception->getMessage();
        }
    }
}


?>