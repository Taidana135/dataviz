const tableau06 = [];

data.forEach(item => {
  if (
    item["Niveau d'éducation"] === "Tous les niveaux d'enseignement" &&
    item["Urbanisation"] === "National" &&
    item["Profession"] === "Toutes les professions" &&
    item["Ventilation composite"] === "N'est pas applicable" &&
    item["Indicateur"] === "Proportion de pays où le cadre juridique (y compris le droit\n            coutumier) garantit l'égalité des droits des femmes" &&
    item.OBS_VALUE !== undefined &&
    item.TIME_PERIOD >= 2013 &&
    item.TIME_PERIOD <= 2021
  ) {
    tableau06.push({
      pays: item["Pays et territoires insulaires du Pacifique"],
      valeur: item.OBS_VALUE,
      annee: item.TIME_PERIOD
    });
  }
});

// console.log("Données tableau :", tableau06);

// Extraire les années uniques
const annees = [...new Set(tableau06.map(d => d.annee))].sort();
// console.log("Années disponibles :", annees);

// Structure pour les données du graphique
const types = annees.map((annee, index) => {
  const dataAnnee = tableau06.filter(d => d.annee === annee);
  const total = dataAnnee.reduce((sum, d) => sum + d.valeur, 0);
  
  return {
    type: `${annee}`,
    percent: total,
    // color: am5.Color.brighten(am5.Color.fromHex("#3366cc"), index * 0.1),
    id: index,
    subs: dataAnnee.map(d => ({
      type: d.pays,
      percent: d.valeur
    }))
  };
});

// graphique AmChart
am5.ready(function () {
  var root = am5.Root.new("chartdiv05");

  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  var chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      layout: root.verticalLayout
    })
  );

  var series = chart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: "percent",
      categoryField: "type",
      fillField: "color",
      alignLabels: false
    })
  );

  series.slices.template.set("templateField", "sliceSettings");
  series.labels.template.set("radius", 30);

  let selected;

  // Clic sur un segment
  series.slices.template.events.on("click", function (event) {
    const context = event.target.dataItem.dataContext;
    // console.log("Segment cliqué :", context);
    if (context.id !== undefined) {
      selected = context.id;
    } else {
      selected = undefined;
    }
    series.data.setAll(generateChartData());
  });

  // Fonction pour générer les données dynamiques
  function generateChartData() {
    let chartData = [];
    for (let i = 0; i < types.length; i++) {
      if (i === selected) {
        for (let x = 0; x < types[i].subs.length; x++) {
          chartData.push({
            type: types[i].subs[x].type,
            percent: types[i].subs[x].percent,
            color: types[i].color,
            pulled: true,
            sliceSettings: {
              active: true
            }
          });
        }
      } else {
        chartData.push({
          type: types[i].type,
          percent: types[i].percent,
          color: types[i].color,
          id: i
        });
      }
    }
    return chartData;
  }

  // Initialisation des données
  series.data.setAll(generateChartData());

}); // end am5.ready()
