// les tableaux pour graphique des 4 domaines
const tableau02 = []; // Domaine 1 : cadres juridiques généraux et vie publique
const tableau03 = []; // Domaine 2 : violence à l'égard des femmes
const tableau04 = []; // Domaine 3 : emploi et avantages économiques
const tableau05 = []; // Domaine 4 : mariage et famille

data.forEach(item => {
  const indicateur = item["Indicateur"];
  const valide =
    item["Niveau d'éducation"] === "Tous les niveaux d'enseignement" &&
    item["Urbanisation"] === "National" &&
    item["Profession"] === "Toutes les professions" &&
    item["Ventilation composite"] === "N'est pas applicable" &&
    indicateur &&
    indicateur.includes("Cadres juridiques qui promeuvent") &&
    item.OBS_VALUE !== undefined &&
    item.TIME_PERIOD >= 2013 &&
    item.TIME_PERIOD <= 2021;

  if (valide) {
    const ligne = {
      pays: item["Pays et territoires insulaires du Pacifique"],
      valeur: item.OBS_VALUE,
      annee: item.TIME_PERIOD
    };

    if (indicateur.includes("Domaine 1: cadres juridiques")) {
      tableau02.push(ligne);
    } else if (indicateur.includes("Domaine 2: violence à l'égard des")) {
      tableau03.push(ligne);
    } else if (indicateur.includes("Domaine 3: emploi et avantages")) {
      tableau04.push(ligne);
    } else if (indicateur.includes("Domaine 4: mariage et famille")) {
      tableau05.push(ligne);
    }
  }
});

// test affichage
// console.log("Données Domaine 1 :", tableau02);
// console.log("Données Domaine 2 :", tableau03);
// console.log("Données Domaine 3 :", tableau04);
// console.log("Données Domaine 4 :", tableau05);

// Calcul des moyennes
function moyenne(tableau) {
    const valeurs = tableau.map(d => d.valeur);
    const total = valeurs.reduce((sum, v) => sum + v, 0);
    return valeurs.length > 0 ? total / valeurs.length : 0;
  }
  
  const domainesData = [
    // une moyenne pour l'afficher en un seul %
    { category: "Domaine 1: Cadres juridiques", value: moyenne(tableau02) },
    { category: "Domaine 2: Violence", value: moyenne(tableau03) },
    { category: "Domaine 3: Emploi", value: moyenne(tableau04) },
    { category: "Domaine 4: Mariage", value: moyenne(tableau05) }
  ];
  
  // graphique AmChart
  am5.ready(function() {
    var root = am5.Root.new("chartdiv04");
  
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
  
    var chart = root.container.children.push(am5percent.PieChart.new(root, {
      layout: root.verticalLayout
    }));
  
    var series = chart.series.push(am5percent.PieSeries.new(root, {
      alignLabels: true,
      calculateAggregates: true,
      valueField: "value",
      categoryField: "category"
    }));
  
    // pas d'annotation et de traits
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    series.slices.template.setAll({
      strokeWidth: 3,
      stroke: am5.color(0xffffff)
    });
  
    series.labelsContainer.set("paddingTop", 30);
  
    // Adapter pour rayon dynamique
    series.slices.template.adapters.add("radius", function (radius, target) {
      var dataItem = target.dataItem;
      var high = series.getPrivate("valueHigh");
      if (dataItem) {
        var value = target.dataItem.get("valueWorking", 0);
        return radius * value / high;
      }
      return radius;
    });
  
    // Injection des données calculées
    series.data.setAll(domainesData);
  
    // Légende
    var legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50,
      marginTop: 15,
      marginBottom: 15
    }));
  
    legend.data.setAll(series.dataItems);
  
    series.appear(1000, 100);
  });
  