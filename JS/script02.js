// 
//     exemple dans la BDD json : 
// 
//     "STRUCTURE": "DATAFLOW",
//     "STRUCTURE_ID": "SPC:DF_BP50_2(1.0)",
//     "STRUCTURE_NAME": "Blue Pacific 2050: People-Centered Development (Thematic Area 2)",
//     "ACTION": "I",
//     "FREQ": "A",
//     "Fréquence": "Annuel",
//     "INDICATOR": "IC_GEN_MGTL",
//     "Indicateur": "Proportion de femmes occupant des postes de direction", ======= l'indicateur pour le % =======
//     "GEO_PICT": "TO",
//     "Pays et territoires insulaires du Pacifique": "Tonga", ======= le pays / zone concernée =======
//     "SEX": "_T", ======= T pour Total, F pour Femme =======
//     "Sexe": "Total", ======= T pour Total, F pour Femme =======
//     "AGE": "_T",
//     "Âge": "Tous les âges", ======= ne sera pas inclus pour une question de données possiblement peu pertinente =======
//     "URBANIZATION": "_T",
//     "Urbanisation": "National", ======= niveau national =======
//     "INCOME": "_T",
//     "Revenu": "Total",
//     "EDUCATION": "_T",
//     "Niveau d'éducation": "Tous les niveaux d'enseignement", ======= pris en compte mais ne sera pas modifié =======
//     "OCCUPATION": "_T",
//     "Profession": "Toutes les professions", ======= pris en compte mais ne sera pas modifié =======
//     "COMPOSITE_BREAKDOWN": "_Z",
//     "Ventilation composite": "N'est pas applicable",
//     "DISABILITY": "_T",
//     "Invalidité": "Pas de ventilation par handicap",
//     "TIME_PERIOD": 2018, ======= la date recherché (faudra additionner) =======
//     "Période": "",
//     "OBS_VALUE": 40.34,  ======= la valeur recherché (le %) =======
//     "Valeur observée": "",
//     "UNIT_MEASURE": "PERCENT",
//     "Unité de mesure": "pourcents",
//     "REPORTING_TYPE": "G",
//     "Type de raportage": "Global",
//     "NATURE": "_X",
//     "Nature": "Indisponible",
//     "DATA_SOURCE": "",
//     "Source de données": "",
//     "OBS_STATUS": "B",
//     "Statut de l'observation": "Rupture de série chronologique",
//     "OBS_COMMENT": "Repository: ILO-STATISTICS - Micro data processing. Break in series: Methodology revised.",
//     "Commentaire": ""
//


const test_tableau = [];
// mise en place des filtre pour obtenir les données
data.forEach(item => {
  if (
    item["Niveau d'éducation"] === "Tous les niveaux d'enseignement" &&
    item["Urbanisation"] === "National" &&
    item["Profession"] === "Toutes les professions" &&
    item["Ventilation composite"] === "N'est pas applicable" &&
    item["Indicateur"] === "Proportion de sièges occupés par des femmes dans les parlements nationaux" &&
    item.OBS_VALUE !== undefined &&
    item.TIME_PERIOD >= 2013 &&
    item.TIME_PERIOD <= 2021
  ) {
    // mets dans le tableau
    test_tableau.push({
      pays: item["Pays et territoires insulaires du Pacifique"],
      valeur: item.OBS_VALUE,
      annee: item.TIME_PERIOD
    });
  }
});


// console.log("Données filtrées :", test_tableau);
// graphique AmChart
am5.ready(function() {

    // Create root element
    var root = am5.Root.new("chartdiv02");
  
    // Set themes
    root.setThemes([ am5themes_Animated.new(root) ]);
  
    // Create chart
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      paddingLeft: 0,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout
    }));
  
    // Add legend
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );
  
    // Groupes de pays réuni
    const groupes = {
      "Mélanésie": [
        "Fidji", "Nouvelle-Calédonie", "Papouasie-Nouvelle-Guinée", "Salomon", "Vanuatu"
      ],
      "Micronésie": [
        "États fédérés de Micronésie", "Îles Marshall", "Kiribati", "Nauru", "Palaos"
      ],
      "Polynésie": [
        "Îles Cook", "Niue", "Polynésie française", "Samoa", "Tonga", "Tuvatu"
      ]
    };

  
    // === Transformation des données ===
    const data = [];
  
    for (let year = 2013; year <= 2021; year++) {
      const entry = { year: year.toString() };
  
      for (const [region, paysList] of Object.entries(groupes)) {
        const valeurs = test_tableau
          .filter(item => item.annee === year && paysList.includes(item.pays))
          .map(item => item.valeur);
  
        const moyenne = valeurs.length ? (valeurs.reduce((a, b) => a + b, 0) / valeurs.length) : 0;
  
        entry[region] = moyenne;
      }
  
      data.push(entry);
    }
  
    // Create axes
    var xRenderer = am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      minorGridEnabled: true
    });
  
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "year",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));
  
    xRenderer.grid.template.setAll({ location: 1 });
    xAxis.data.setAll(data);
  
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {
        strokeOpacity: 0.1
      })
    }));
  
    // fonction pour créer les séries
    function makeSeries(name, fieldName) {
      var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: fieldName,
        categoryXField: "year"
      }));
  
      series.columns.template.setAll({
        tooltipText: "{name} : {valueY}%",
        width: am5.percent(90),
        tooltipY: 0,
        strokeOpacity: 0
      });
  
      series.data.setAll(data);
  
      series.appear();
  
      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 0,
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            fill: root.interfaceColors.get("alternativeText"),
            centerY: 0,
            centerX: am5.p50,
            populateText: true
          })
        });
      });
  
      legend.data.push(series);
    }
  
    // créer les 3 séries régionales avec les 3 groupes
    makeSeries("Mélanésie", "Mélanésie");
    makeSeries("Micronésie", "Micronésie");
    makeSeries("Polynésie", "Polynésie");
  
    chart.appear(1000, 100);
  
  }); // end am5.ready()