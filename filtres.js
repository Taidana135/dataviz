/****************************************************
 * Filtres
 ****************************************************/
function hommes(elt) { if (elt["sexe"] == "h") return elt; }
function femmes(elt) { if (elt["sexe"] == "f") return elt; }

// permet de passer des paramètres aux filtres (ici -> annee)
function parAnnee(annee) {
    return function (elt) {
        if (elt["annee"] == annee) return elt;
    }
}