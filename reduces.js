/****************************************************
 * Reduces 
 ****************************************************/

function nbParGenre(accumulateur, dateNaissance){
    if (dateNaissance["sexe"] == "h") accumulateur["Hommes"]++;
    else accumulateur["Femmes"]++;

    return accumulateur;
}

function nbParAnnees(accumulateur, dateNaissance) {    
    let annee = dateNaissance["annee"];

    if (!accumulateur[annee]) accumulateur[annee] = 0;

    accumulateur[annee]++;

    return accumulateur;
}

function nbParMois(accumulateur, dateNaissance) {
    accumulateur[dateNaissance["mois"] - 1]++;
    return accumulateur;
}

