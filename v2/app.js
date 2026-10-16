'use strict';
// Pintxo Map 2.1 — corrected research demonstrator. No network or persistent data storage.
(() => {
const LANG = {
 en: {overline:'Exploratory collaboration proposal · IES Xabier Zubiri-Manteo',lead:'Explore diverse pintxos, let chefs review them, then learn from comparisons. The model proposes; people decide.',status:'Demonstration only · Illustrative ingredient attributes · No real sensory validation',step1:'Explore',step2:'Chef reviews',step3:'Taste & learn',step4:'Evaluate',mapEyebrow:'01 / EXPLORATION',mapTitle:'A map of possibilities',mapIntro:'Each cell holds one candidate. Select a square to review it.',horizontal:'Horizontal',vertical:'Vertical',mapSelection:'Select candidates by',baselineView:'Fixed balance heuristic',adaptiveView:'Learning + diversity',legend:'Relative model preference (not a taste measurement)',chefEyebrow:'02 / CULINARY JUDGEMENT',chefTitle:'Chef review',chefCaution:'Attributes and compatibility are illustrative. A qualified chef must independently check food safety, preparation and allergens.',approve:'Approve for tasting',reject:'Reject candidate',modify:'Suggest a modification',mBase:'Base',mMain:'Main ingredient',mAccent:'Accent',mTech:'Technique',applyModification:'Explore this variation',modifyNote:'Modification is not an approval. Only combinations in the example catalog are supported.',tasteEyebrow:'03 / LEARNING',tasteTitle:'Taste-off',simMode:'Simulation',manualMode:'Manual tasting',tie:'Tie / equally preferred',skip:'Skip comparison',runSim:'Simulate four votes',blind:'Hide recipe names (not a validated blind-tasting protocol)',resetVotes:'Reset this mode',learnEyebrow:'WHAT THE MODEL LEARNS',learnTitle:'Estimated preferences',weightsNote:'Associations from comparisons, not causal explanations or calibrated confidence estimates.',shortEyebrow:'DIVERSE RESULTS',shortTitle:'A varied shortlist',shortNote:'One representative from each quadrant; diversity does not guarantee taste quality.',evalEyebrow:'04 / RESEARCH EVALUATION',evalTitle:'Does active learning help?',benchmark:'Run synthetic benchmark',evalIntro:'Twelve reproducible synthetic trials compare active versus random selection on 100 strictly held-out pairs from a fixed 6 × 5 archive (classic × rich axes). Results may favour either method; no human tasting is evaluated.',activeKey:'Active selection',randomKey:'Random baseline',researchEyebrow:'METHODOLOGY & GOVERNANCE',researchTitle:'About this experiment',export:'Export current mode (JSON)',research1:'Ingredient attributes, culinary balance, and simulated taste are illustrative. Combinations are enumerated from a sample catalog. The preference-informed archive may replace candidates in map cells.',research2:'Simulation and manual modes have independent preference histories. Manual votes remain in this browser tab until reset or closed and can be exported without names. The application does not transmit tasting data to a server.',research3:'GOe has not validated or endorsed this demo. Real research would require chef food-safety approval, expert sensory protocols, informed consent and managed data security.',researchFoot:'Exploratory educational demonstration by IES Xabier Zubiri-Manteo BHI · For possible discussion with GOe Tech Center, Basque Culinary Center.',footer:'Pintxo Map 2.1 · Prototype, not a culinary decision system.',dims:{nov:'Novelty',rich:'Richness',a:'Acidity',r:'Richness',c:'Crunch',u:'Umami',f:'Freshness',s:'Sweetness',h:'Heat',sa:'Saltiness',bi:'Bitterness',cr:'Creaminess',ge:'Gelatinous',fi:'Fibrous',ai:'Airy'},feat:['Balance','Novelty','Richness','Acidity','Crunch','Umami','Freshness','Sweetness','Heat'],pending:'Pending',approved:'Approved',rejected:'Rejected',pstatus:'Chef review status',empty:'Empty cell',changed:n=>`${n} recipes changed`,nochange:'The model has no tasting comparisons yet; the adaptive map uses initial balance scores.',changes:n=>`${n} cell representatives differ from the initial map. This is an illustrative selection model.`,simNotice:'Synthetic evaluator only: generated preferences, not people or real tasting.',manualNotice:'Manual tasting records only chef-approved candidates; no real panel data has been validated.',manualNeed:n=>`Approve ${n} more distinct candidate${n===1?'':'s'} for manual tasting. Choose map squares above.`,vote:n=>`${n} comparisons`,prefer:x=>`Prefer sample ${x}`,show:x=>`Pintxo ${x}`,noData:'No preference evidence yet',learning:n=>`${n} preference votes`,why:'Illustrative rationale',whyA:'Acidic accents may balance richer ingredients.',whyC:'Crunch contrasts with softer textures.',whyU:'Umami elements may add depth.',whyF:'Freshness may lighten the composition.',whySimple:'Recipe rationale is a heuristic; it was not discovered by the model.',allergens:'Potential allergens',noAllergens:'No flagged allergens in the example catalog (not a safety guarantee)',learnedSuggest:(p,n)=>`The fitted model currently associates ${p} with higher preference; ${n}. This is an uncertain association, not a culinary fact.`,learnedFew:'More real comparisons and an expert protocol would be needed before interpreting these coefficients.',neutral:'No clear negative feature yet',bRisk:'Balance (illustrative)',learningStatus:'Model disagreement (uncalibrated)',q:['Classic / light','Classic / rich','Novel / light','Novel / rich'],initial:'Initial',after:'Current',sample:'Sample',raw:'Raw / cured',rejectedNote:'Rejected: not eligible for tasting.',approvedNote:'Approved by the current browser user (not a certified safety check).',pendingNote:'Pending chef review.',modInvalid:'This main ingredient and technique combination is outside the catalog.',modSuccess:'Variation selected. It must be reviewed separately.',modMissing:'Variation is not present in the example catalog.',exported:'JSON session file prepared.',nothingToReset:'Current tasting mode reset.',benchmarkRunning:'Running reproducible synthetic trials…',benchmarkDone:(n)=>`Synthetic held-out pair accuracy, averaged over ${n} seeds. Bands show trial ranges (not confidence intervals).`,benchmarkIdle:'Run the benchmark to view synthetic held-out results.',benchAxis:'Accuracy',choose:'Select a map cell to view a recipe.',noPair:'No pair available. Approve at least two different candidates.',modeResetConfirm:'Reset votes in the current mode?',resetYes:'Mode cleared.',novLo:'Classic',novHi:'Novel',richLo:'Light',richHi:'Rich',axisLo:k=>`Less ${k}`,axisHi:k=>`More ${k}`,introManual:'Manual tasting is a local prototype, not a blinded research-grade sensory protocol.',methodShort:'Illustrative 6 × 5 archive',noEvidenceYet:'No comparisons yet',weightSign:'Weight',tieNote:'Ties are recorded but excluded from Bradley–Terry fitting.',approveReady:'Ready for tasting',noteNoRecord:'Nothing is saved to a server.'},
 es: {overline:'Propuesta de colaboración exploratoria · IES Xabier Zubiri-Manteo',lead:'Explora pintxos diversos, deja que los cocineros los revisen y aprende de las comparaciones. La IA propone; las personas deciden.',status:'Solo demostración · Atributos ilustrativos · Sin validación sensorial real',step1:'Explorar',step2:'Revisión del chef',step3:'Catar y aprender',step4:'Evaluar',mapEyebrow:'01 / EXPLORACIÓN',mapTitle:'Mapa de posibilidades',mapIntro:'Cada casilla muestra un candidato. Selecciona una para revisarlo.',horizontal:'Horizontal',vertical:'Vertical',mapSelection:'Seleccionar candidatos por',baselineView:'Reglas fijas de equilibrio',adaptiveView:'Aprendizaje + diversidad',legend:'Preferencia relativa del modelo (no es una medición del sabor)',chefEyebrow:'02 / CRITERIO CULINARIO',chefTitle:'Revisión del chef',chefCaution:'Los atributos y la compatibilidad son ilustrativos. Un profesional debe evaluar la seguridad alimentaria, preparación y alérgenos.',approve:'Aprobar para cata',reject:'Descartar candidato',modify:'Proponer una modificación',mBase:'Base',mMain:'Ingrediente principal',mAccent:'Complemento',mTech:'Técnica',applyModification:'Explorar esta variante',modifyNote:'Modificar no equivale a aprobar. Solo se permiten combinaciones del catálogo de demostración.',tasteEyebrow:'03 / APRENDIZAJE',tasteTitle:'Comparación de cata',simMode:'Simulación',manualMode:'Cata manual',tie:'Empate / preferencia igual',skip:'Omitir comparación',runSim:'Simular cuatro votos',blind:'Ocultar nombres (no equivale a una cata ciega validada)',resetVotes:'Reiniciar este modo',learnEyebrow:'LO QUE APRENDE EL MODELO',learnTitle:'Preferencias estimadas',weightsNote:'Asociaciones aprendidas, no explicaciones causales ni confianza calibrada.',shortEyebrow:'RESULTADOS DIVERSOS',shortTitle:'Selección variada',shortNote:'Un candidato por cuadrante; la diversidad no garantiza calidad gustativa.',evalEyebrow:'04 / EVALUACIÓN CIENTÍFICA',evalTitle:'¿Ayuda el aprendizaje activo?',benchmark:'Ejecutar simulación comparativa',evalIntro:'Doce ensayos sintéticos comparan selección activa y aleatoria sobre 100 parejas excluidas del entrenamiento en un archivo fijo de 6 × 5. Cualquiera de los métodos puede ganar. No son catas humanas.',activeKey:'Selección activa',randomKey:'Selección aleatoria',researchEyebrow:'METODOLOGÍA Y GOBERNANZA',researchTitle:'Sobre este experimento',export:'Exportar modo actual (JSON)',research1:'Los atributos de ingredientes, equilibrio culinario y gustos simulados son ilustrativos. Se enumeran combinaciones de un catálogo de ejemplo. El archivo adaptativo puede sustituir recetas en las casillas.',research2:'Simulación y cata manual tienen historiales independientes. Los votos manuales permanecen en esta pestaña hasta reiniciar o cerrar y pueden exportarse sin nombres. No se envían datos a ningún servidor.',research3:'GOe no ha validado ni avalado esta demo. La investigación real requeriría aprobación profesional de seguridad alimentaria, métodos sensoriales expertos, consentimiento informado y seguridad de datos.',researchFoot:'Demostración educativa exploratoria de IES Xabier Zubiri-Manteo BHI · Para una posible colaboración con GOe Tech Center, Basque Culinary Center.',footer:'Pintxo Map 2.1 · Prototipo, no sistema de decisiones culinarias.',dims:{nov:'Novedad',rich:'Contundencia',a:'Acidez',r:'Contundencia',c:'Crujiente',u:'Umami',f:'Frescor',s:'Dulzor',h:'Picante',sa:'Salado',bi:'Amargo',cr:'Cremoso',ge:'Gelatinoso',fi:'Fibroso',ai:'Aireado'},feat:['Equilibrio','Novedad','Contundencia','Acidez','Crujiente','Umami','Frescor','Dulzor','Picante'],pending:'Pendiente',approved:'Aprobado',rejected:'Descartado',empty:'Casilla vacía',changed:n=>`${n} recetas cambiadas`,nochange:'Aún no hay comparaciones; el mapa adaptativo utiliza los valores de equilibrio iniciales.',changes:n=>`${n} casillas tienen candidatos distintos del mapa inicial. Modelo de selección ilustrativo.`,simNotice:'Evaluador sintético: preferencias generadas, no personas ni catas reales.',manualNotice:'La cata manual solo usa candidatos aprobados por el chef; todavía no hay validación científica.',manualNeed:n=>`Aprueba ${n} candidato${n===1?'':'s'} más para la cata manual. Selecciona casillas del mapa.`,vote:n=>`${n} comparaciones`,prefer:x=>`Prefiero muestra ${x}`,show:x=>`Pintxo ${x}`,noData:'Aún no hay datos de preferencias',learning:n=>`${n} votos de preferencia`,why:'Justificación ilustrativa',whyA:'La acidez puede equilibrar ingredientes más contundentes.',whyC:'El crujiente puede contrastar con texturas suaves.',whyU:'Los elementos umami pueden aportar profundidad.',whyF:'El frescor puede aligerar la elaboración.',whySimple:'La explicación es una regla culinaria, no un descubrimiento del modelo.',allergens:'Posibles alérgenos',noAllergens:'Sin alérgenos marcados en este catálogo (no garantiza seguridad)',learnedSuggest:(p,n)=>`El modelo asocia ${p} con mayor preferencia; ${n}. Es una asociación incierta, no un hecho culinario.`,learnedFew:'Hacen falta más comparaciones y un protocolo experto para interpretar estos coeficientes.',neutral:'Aún no hay rasgos negativos claros',bRisk:'Equilibrio (ilustrativo)',learningStatus:'Discrepancia entre modelos (no calibrada)',q:['Clásico / ligero','Clásico / contundente','Novedoso / ligero','Novedoso / contundente'],initial:'Inicial',after:'Actual',sample:'Muestra',raw:'Crudo / curado',rejectedNote:'Descartado: no puede entrar en la cata.',approvedNote:'Aprobado en este navegador (no es una comprobación certificada).',pendingNote:'Pendiente de revisión culinaria.',modInvalid:'Combinación de ingrediente principal y técnica fuera del catálogo.',modSuccess:'Variación seleccionada. Requiere revisión aparte.',modMissing:'Variación no encontrada en el catálogo.',exported:'Archivo de sesión JSON preparado.',nothingToReset:'Modo de cata reiniciado.',benchmarkRunning:'Ejecutando ensayos sintéticos reproducibles…',benchmarkDone:n=>`Exactitud en parejas de prueba sintéticas, media de ${n} semillas. Las bandas indican el rango de los ensayos (no intervalos de confianza).`,benchmarkIdle:'Ejecuta la simulación comparativa para ver resultados.',benchAxis:'Exactitud',choose:'Selecciona una casilla del mapa.',noPair:'Sin pareja disponible. Aprueba al menos dos candidatos distintos.',modeResetConfirm:'¿Reiniciar los votos de este modo?',resetYes:'Modo reiniciado.',novLo:'Clásico',novHi:'Novedoso',richLo:'Ligero',richHi:'Contundente',axisLo:k=>`Menos ${k}`,axisHi:k=>`Más ${k}`,introManual:'La cata manual es un prototipo local, no un protocolo sensorial con cegamiento validado.',methodShort:'Archivo ilustrativo de 6 × 5',noEvidenceYet:'Sin comparaciones',weightSign:'Peso',tieNote:'Los empates se registran pero se excluyen del ajuste Bradley–Terry.',approveReady:'Preparado para cata',noteNoRecord:'No se guarda nada en un servidor.'},
 eu: {overline:'Lankidetza-proposamen esploratzailea · IES Xabier Zubiri-Manteo',lead:'Pintxo anitzak arakatu, sukaldariek aztertu eta konparazioetatik ikasi. AAk proposatzen du; pertsonek erabakitzen dute.',status:'Erakustaldia soilik · Osagaien datu ilustratiboak · Benetako baliozkotze sentsorialik ez',step1:'Arakatu',step2:'Sukaldariaren azterketa',step3:'Dastatu eta ikasi',step4:'Ebaluatu',mapEyebrow:'01 / ARAKETA',mapTitle:'Aukeren mapa',mapIntro:'Gelaxka bakoitzean hautagai bat dago. Hautatu bat aztertzeko.',horizontal:'Horizontala',vertical:'Bertikala',mapSelection:'Hautagaiak aukeratzeko',baselineView:'Oreka-arau finkoak',adaptiveView:'Ikaskuntza + aniztasuna',legend:'Ereduaren lehentasun erlatiboa (ez da zapore-neurketa)',chefEyebrow:'02 / SUKALDARITZA-IRIZPIDEA',chefTitle:'Sukaldariaren azterketa',chefCaution:'Ezaugarriak eta bateragarritasuna ilustratiboak dira. Profesional batek elikagaien segurtasuna, prestaketa eta alergenoak egiaztatu behar ditu.',approve:'Dastaketarako onartu',reject:'Hautagaia baztertu',modify:'Aldaketa proposatu',mBase:'Oinarria',mMain:'Osagai nagusia',mAccent:'Osagarria',mTech:'Teknika',applyModification:'Aldaera hau arakatu',modifyNote:'Aldatzeak ez du onarpena esan nahi. Demo-katalogoko konbinazioak soilik erabil daitezke.',tasteEyebrow:'03 / IKASKUNTZA',tasteTitle:'Dastaketa-konparazioa',simMode:'Simulazioa',manualMode:'Eskuzko dastaketa',tie:'Berdinketa / lehentasun bera',skip:'Saltatu konparazioa',runSim:'Simulatu lau boto',blind:'Ezkutatu errezeten izenak (ez da itsu-dastaketa balioztatua)',resetVotes:'Modu hau berrabiarazi',learnEyebrow:'EREDUAK IKASITAKOA',learnTitle:'Estimaturiko lehentasunak',weightsNote:'Konparazioetako loturak, ez azalpen kausalak edo konfiantza kalibratua.',shortEyebrow:'EMAITZA ANITZAK',shortTitle:'Hautaketa anitza',shortNote:'Hautagai bat koadrante bakoitzeko; aniztasunak ez du zaporearen kalitatea bermatzen.',evalEyebrow:'04 / IKERKETA-EBALUAZIOA',evalTitle:'Ikaskuntza aktiboak laguntzen al du?',benchmark:'Benchmark sintetikoa exekutatu',evalIntro:'Hamabi saiakuntza sintetikotan, aukeraketa aktiboa eta ausazkoa alderatzen dira 6 × 5eko artxibo finko bateko entrenamendutik kanpoko 100 bikotetan. Bi metodoetako edozein gailen daiteke; ez dira giza dastaketak.',activeKey:'Aukeraketa aktiboa',randomKey:'Ausazko aukeraketa',researchEyebrow:'METODOLOGIA ETA GOBERNANTZA',researchTitle:'Esperimentuari buruz',export:'Esportatu uneko modua (JSON)',research1:'Osagaien ezaugarriak, oreka eta simulatutako gustuak ilustratiboak dira. Konbinazioak adibide-katalogo batetik sortzen dira. Artxibo moldakorrak gelaxketako hautagaiak alda ditzake.',research2:'Simulazioak eta eskuzko dastaketak lehentasun-historia independenteak dituzte. Eskuzko botoak nabigatzaile-fitxa honetan soilik daude itxi edo berrabiarazi arte; izenik gabe esporta daitezke. Ez da daturik zerbitzarira bidaltzen.',research3:'GOek ez du demo hau baliozkotu edo babestu. Benetako ikerketak elikagaien segurtasunaren azterketa, zentzumen-protokolo adituak, baimena eta datuen kudeaketa segurua beharko lituzke.',researchFoot:'IES Xabier Zubiri-Manteo BHIren hezkuntza-demo esploratzailea · GOe Tech Centerrekin lankidetza posible bat aztertzeko.',footer:'Pintxo Map 2.1 · Prototipoa, ez sukaldaritzako erabaki-sistema.',dims:{nov:'Berritasuna',rich:'Astuntasuna',a:'Garrazitasuna',r:'Astuntasuna',c:'Kurruskaria',u:'Umamia',f:'Freskotasuna',s:'Gozotasuna',h:'Mina',sa:'Gazitasuna',bi:'Mikaztasuna',cr:'Krematsua',ge:'Gelatinatsua',fi:'Zuntzduna',ai:'Harrotua'},feat:['Oreka','Berritasuna','Astuntasuna','Garrazitasuna','Kurruskaria','Umamia','Freskotasuna','Gozotasuna','Mina'],pending:'Zain',approved:'Onartuta',rejected:'Baztertuta',empty:'Gelaxka hutsa',changed:n=>`${n} errezeta aldatuta`,nochange:'Oraindik ez dago dastaketa-konparaziorik; mapa moldakorrak hasierako puntuazioak erabiltzen ditu.',changes:n=>`${n} gelaxketako hautagaiak hasierako mapakoen desberdinak dira. Aukeraketa-eredu ilustratiboa.`,simNotice:'Ebaluatzaile sintetikoa: sortutako lehentasunak, ez pertsonak edo benetako dastaketak.',manualNotice:'Eskuzko dastaketak sukaldariak onartutako hautagaiak bakarrik erabiltzen ditu; ez dago baliozkotze zientifikorik.',manualNeed:n=>`Onartu beste ${n} hautagai eskuzko dastaketarako. Hautatu mapako gelaxkak.`,vote:n=>`${n} konparaketa`,prefer:x=>`${x} lagina nahiago dut`,show:x=>`${x} pintxoa`,noData:'Ez dago lehentasun-daturik',learning:n=>`${n} lehentasun-boto`,why:'Azalpen ilustratiboa',whyA:'Garrazitasunak osagai astunagoak orekatu ditzake.',whyC:'Kurruskariak ehundura bigunekin kontrasta dezake.',whyU:'Umamiak sakontasuna eman dezake.',whyF:'Freskotasunak platera arindu dezake.',whySimple:'Azalpena sukaldaritza-araua da, ez ereduaren aurkikuntza.',allergens:'Alergeno posibleak',noAllergens:'Katalogoan ez dago alergenorik markatuta (ez da segurtasun-bermea)',learnedSuggest:(p,n)=>`Ereduak ${p} eta lehentasun handiagoa lotzen ditu; ${n}. Lotura ziurgabea da, ez sukaldaritza-egia.`,learnedFew:'Koefizienteak interpretatzeko konparazio gehiago eta adituen protokoloa beharko lirateke.',neutral:'Oraindik ez dago ezaugarri negatibo argirik',bRisk:'Oreka (ilustratiboa)',learningStatus:'Ereduen desadostasuna (kalibratu gabe)',q:['Klasiko / arin','Klasiko / astun','Berritzaile / arin','Berritzaile / astun'],initial:'Hasierakoa',after:'Unekoa',sample:'Lagina',raw:'Gordin / ondu',rejectedNote:'Baztertuta: ezin da dastatu.',approvedNote:'Nabigatzailean onartua (ez da segurtasun-ziurtagiria).',pendingNote:'Sukaldariaren azterketaren zain.',modInvalid:'Osagai nagusiaren eta teknikaren konbinazioa katalogotik kanpo dago.',modSuccess:'Aldaera hautatuta. Bereiz aztertu behar da.',modMissing:'Aldaera ez dago demo-katalogoan.',exported:'JSON saio-fitxategia prest.',nothingToReset:'Dastaketa-modua berrabiarazita.',benchmarkRunning:'Proba sintetiko errepikagarriak egiten…',benchmarkDone:n=>`Proba-bikote sintetikoetako zehaztasuna, ${n} haziren batezbestekoa. Tarteek proben balio minimoa eta maximoa erakusten dituzte (ez konfiantza-tarteak).`,benchmarkIdle:'Exekutatu benchmark sintetikoa emaitzak ikusteko.',benchAxis:'Zehaztasuna',choose:'Hautatu mapako gelaxka bat.',noPair:'Ez dago bikoterik. Onartu gutxienez bi hautagai.',modeResetConfirm:'Modu honetako botoak ezabatu?',resetYes:'Modua berrabiarazita.',novLo:'Klasikoa',novHi:'Berritzailea',richLo:'Arina',richHi:'Astuna',axisLo:k=>`${k} gutxiago`,axisHi:k=>`${k} gehiago`,introManual:'Eskuzko dastaketa tokiko prototipoa da, ez zentzumen-protokolo itsu balioztatua.',methodShort:'6 × 5eko artxibo ilustratiboa',noEvidenceYet:'Konparaziorik ez',weightSign:'Pisua',tieNote:'Berdinketak gordetzen dira, baina Bradley–Terry doikuntzatik kanpo uzten dira.',approveReady:'Dastaketarako prest',noteNoRecord:'Ez da ezer gordetzen zerbitzarian.'}
};
const BASES = [
 {id:'bread',names:['toasted baguette','ogi txigortua','pan tostado'],t:.9,r:.3,c:.7,all:['gluten']},
 {id:'tortilla',names:['potato tortilla','patata-tortilla','tortilla de patata'],t:.8,r:.6,cr:.6,all:['egg']},
 {id:'rice',names:['rice cracker','arroz-galleta','galleta de arroz'],t:.1,c:.9,ai:.4},
 {id:'endive',names:['endive leaf','endibia-hostoa','hoja de endivia'],t:.3,f:.8,c:.5,bi:.5},
 {id:'brioche',names:['brioche','briochea','brioche'],t:.3,r:.7,s:.3,all:['gluten','egg','milk']},
 {id:'skewer',names:['skewer','makilatxoa','banderilla'],t:1}
];
const MAINS=[
 {id:'anchovy-vinegar',names:['anchovy in vinegar','bokarta ozpinetan','boquerón en vinagre'],t:.9,a:.7,u:.4,f:.3,sa:.5,all:['fish'],only:['Raw']},
 {id:'anchovy-salted',names:['salted anchovy','antxoa gazitua','anchoa en salazón'],t:.9,u:.9,r:.3,sa:1,all:['fish'],only:['Raw','Torched']},
 {id:'bonito',names:['bonito','hegaluzea','bonito'],t:.8,r:.6,u:.6,fi:.6,all:['fish'],only:['Raw','Grilled','Confit','Smoked','Torched']},
 {id:'crab',names:['spider crab','txangurroa','txangurro'],t:.9,r:.5,u:.7,fi:.6,all:['crustaceans'],only:['Grilled','Tempura','Torched']},
 {id:'mushrooms',names:['wild mushrooms','basa-perretxikoak','setas silvestres'],t:.7,u:.8,r:.4,fi:.5,only:['Grilled','Confit','Tempura','Smoked','Torched']},
 {id:'cheese',names:['Idiazabal cheese','Idiazabal gazta','queso Idiazabal'],t:.9,r:.8,u:.6,cr:.5,sa:.6,all:['milk'],only:['Raw','Smoked','Torched']},
 {id:'txistorra',names:['txistorra','txistorra','txistorra'],t:.8,r:.9,u:.4,h:.2,sa:.6,only:['Grilled','Tempura']},
 {id:'cod',names:['salt cod','bakailaoa','bacalao'],t:.9,u:.5,r:.5,fi:.5,all:['fish'],only:['Confit','Tempura','Grilled','Smoked']},
 {id:'octopus',names:['octopus','olagarroa','pulpo'],t:.6,u:.5,r:.3,ge:.6,all:['molluscs'],only:['Grilled','Confit','Smoked','Torched']},
 {id:'beetroot',names:['beetroot','erremolatxa','remolacha'],t:.1,f:.6,a:.3,s:.5,only:['Raw','Grilled','Confit','Smoked','Tempura']},
 {id:'eel',names:['eel','aingira','anguila'],t:.4,r:.8,u:.7,all:['fish'],only:['Smoked','Grilled','Torched']}
];
const ACCENTS=[
 {id:'piparra',names:['guindilla pepper','piparra','piparra'],t:1,a:.6,h:.3,f:.3},
 {id:'olive',names:['manzanilla olive','oliba','aceituna manzanilla'],t:.9,a:.4,u:.3,sa:.6},
 {id:'apple',names:['green apple','sagar berdea','manzana verde'],t:.3,a:.5,f:.55,c:.3,s:.3},
 {id:'txakoli',names:['txakoli gel','txakoli-gelatina','gel de txakoli'],t:.5,a:.8,f:.6,ge:.8},
 {id:'quince',names:['quince paste','irasagar-orea','membrillo'],t:.7,s:.9,r:.2},
 {id:'seaweed',names:['seaweed','alga','alga'],t:.2,u:.7,f:.4,sa:.5},
 {id:'pepper',names:['red pepper confit','piper gorri konfitatua','pimiento rojo confitado'],t:.8,s:.5,r:.3},
 {id:'cider',names:['cider reduction','sagardo-erredukzioa','reducción de sidra'],t:.6,a:.5,s:.4},
 {id:'kimchi',names:['kimchi','kimchia','kimchi'],t:0,a:.6,h:.5,u:.5},
 {id:'shallot',names:['pickled shallot','txalota ozpinetan','chalota encurtida'],t:.5,a:.8,c:.2},
 {id:'paprika',names:['smoked paprika oil','piperrauts ketu olioa','aceite de pimentón ahumado'],t:.6,r:.3,h:.2},
 {id:'hazelnut',names:['toasted hazelnut','hur txigortuak','avellana tostada'],t:.5,c:.8,r:.3,all:['nuts']},
 {id:'aioli',names:['garlic aioli','ali-olioa','alioli'],t:.6,r:.6,u:.1,cr:.9,all:['egg']},
 {id:'ciderfoam',names:['cider foam','sagardo-aparra','espuma de sidra'],t:.3,a:.4,s:.2,ai:.9}
];
const TECHS=[
 {id:'Raw',names:['raw / cured','gordinik / onduta','crudo / curado'],t:.8,f:.3},
 {id:'Grilled',names:['grilled','parrillan','a la brasa'],t:.8,u:.2,c:.1},
 {id:'Confit',names:['confit','konfitatua','confitado'],t:.7,r:.3,cr:.3},
 {id:'Tempura',names:['tempura','tenpuran','en tempura'],t:.2,c:.5,r:.3,ai:.3,all:['gluten']},
 {id:'Smoked',names:['smoked','ketua','ahumado'],t:.5,u:.3,sa:.1},
 {id:'Torched',names:['torched','kiskalia','al soplete'],t:.3,u:.1,c:.1}
];
const AXES=['nov','rich','a','c','u','f','s','sa','bi','cr','ge','fi','ai'];
LANG.en.reviewNote='Review note (optional; included in JSON export)';
LANG.es.reviewNote='Nota de revisión (opcional; se incluye en JSON)';
LANG.eu.reviewNote='Berrikuspen-oharra (aukerakoa; JSON esportazioan sartzen da)';
const FEATURES=['bal','nov','rich','a','c','u','f','s','h'];
const TASTE_KEYS=['r','a','c','u','f','s','h','sa','bi','cr','ge','fi','ai'];
const W_TRUE=[1.1,.25,-.7,.9,.7,.45,.55,-.5,-.25];
const N_COL=6,N_ROW=5;
const $=id=>document.getElementById(id);
const localeName=(obj,locale)=>obj.names[locale==='en'?0:locale==='eu'?1:2];
const clamp=(x,low,high)=>Math.max(low,Math.min(high,x));
const sig=x=>1/(1+Math.exp(-clamp(x,-40,40)));
const rngFrom=seed=>()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^(seed>>>15),1|seed);t^=t+Math.imul(t^(t>>>7),61|t);return ((t^(t>>>14))>>>0)/4294967296;};
const makeSession=()=>({votes:[],history:[],models:[],pair:null,orderCounts:new Map(),firstOrder:new Map(),orderRng:rngFrom(68021)});
let lang='en',mode='simulation',axisX='nov',axisY='rich',archiveView='adaptive';
let catalog=[],byId=new Map(),allMap=[],initialMap=[],selected=null;
let approved=new Set(),rejected=new Set(),reviewEvents=[];
let sessions={simulation:makeSession(),manual:makeSession()};
let benchmarkResults=null,benchmarkPending=false;
const BENCHMARK_VERSION='synthetic-2.1-fixed-novrich';
const BENCHMARK_SEEDS=[101,233,377,501,799,907,1051,1237,1423,1619,1811,1999];
let simulationRng=rngFrom(2026);
const tr=()=>LANG[lang];
function buildCatalog(){
  const all=[];
  for(const b of BASES)for(const m of MAINS)for(const a of ACCENTS)for(const t of TECHS){
    if(!m.only.includes(t.id)||(b.id==='skewer'&&t.id==='Tempura'))continue;
    const v={};for(const key of TASTE_KEYS)v[key]=.6*(b[key]||0)+(m[key]||0)+.8*(a[key]||0)+.6*(t[key]||0);
    const tradition=(b.t+m.t+a.t+t.t)/4;
    const gilda=b.id==='skewer'&&m.id.startsWith('anchovy')&&['piparra','olive'].includes(a.id);
    const q=.8*Math.min(v.a,v.r)+.35*v.u+.3*Math.min(v.c,.8)+.2*v.f-.6*Math.max(0,v.r-1.6)-.6*Math.max(0,v.a-1.5)-.6*Math.max(0,Math.min(v.s,v.h)-.1)-.4*Math.max(0,v.s-.9)+(gilda ? .45 : 0);
    const id=[b.id,m.id,a.id,t.id].join('/');
    all.push({id,b,m,a,t,v,nov:1-tradition,rich:v.r-v.f,bal:q,allergens:[...new Set([...(b.all||[]),...(m.all||[]),...(a.all||[]),...(t.all||[])])],gilda});
  }
  const balMin=Math.min(...all.map(d=>d.bal)),balMax=Math.max(...all.map(d=>d.bal));
  for(const d of all)d.bal=(d.bal-balMin)/(balMax-balMin||1);
  const raw=d=>[d.bal,d.nov,d.rich,d.v.a,d.v.c,d.v.u,d.v.f,d.v.s,d.v.h];
  const xs=all.map(raw);const n=all.length;
  const means=Array(9).fill(0),sd=Array(9).fill(0);
  xs.forEach(x=>x.forEach((v,j)=>means[j]+=v/n));
  xs.forEach(x=>x.forEach((v,j)=>sd[j]+=(v-means[j])**2/n));
  for(let i=0;i<n;i++)all[i].x=xs[i].map((v,j)=>(v-means[j])/Math.sqrt(sd[j]||1));
  return all;
}
function dot(a,b){let s=0;for(let i=0;i<a.length;i++)s+=a[i]*b[i];return s;}
function fit(votes,seed=101){
  const training=votes.filter(v=>v.result!=='tie');let w=Array(9).fill(0);if(!training.length)return w;
  const rng=rngFrom(seed);w=w.map(()=>.005*(rng()-.5));
  for(let step=0;step<125;step++){
    const g=w.map(v=>.5*v/training.length);
    for(const v of training){const A=byId.get(v.a),B=byId.get(v.b);if(!A||!B)continue;
      const diff=A.x.map((x,k)=>x-B.x[k]);const err=sig(dot(w,diff))-(v.result==='A'?1:0);
      for(let j=0;j<9;j++)g[j]+=err*diff[j]/training.length;
    }
    w=w.map((v,j)=>v-.12*g[j]);
  }
  return w;
}
function refit(sess){
  const votes=sess.votes.filter(v=>v.result!=='tie');sess.models=[];
  for(let i=0;i<7;i++){const r=rngFrom(1100+i*77+votes.length*31);const subset=i===0?votes:votes.map(()=>votes[Math.floor(r()*votes.length)]);sess.models.push(fit(subset,90+i));}
}
function meanWeights(sess){return Array(9).fill(0).map((_,j)=>sess.models.reduce((s,w)=>s+w[j],0)/Math.max(1,sess.models.length));}
function predict(d,sess){const a=sess.models.map(w=>dot(w,d.x)),avg=a.reduce((s,v)=>s+v,0)/Math.max(1,a.length);return {mean:avg,dis:Math.sqrt(a.reduce((s,v)=>s+(v-avg)**2,0)/Math.max(1,a.length))};}
function signedUtility(d){return dot(W_TRUE,d.x);}
function xy(d,k){return k==='nov'?d.nov:k==='rich'?d.rich:d.v[k];}
const axisBounds={};
function initBounds(){for(const k of AXES){const vals=catalog.map(d=>xy(d,k));axisBounds[k]=[Math.min(...vals),Math.max(...vals)];}}
function cellIndexFor(d,xAxis,yAxis){const [xmin,xmax]=axisBounds[xAxis], [ymin,ymax]=axisBounds[yAxis];
 const col=xmax>xmin?clamp(Math.floor((xy(d,xAxis)-xmin)/(xmax-xmin)*N_COL),0,N_COL-1):0;
 const row=ymax>ymin?clamp(Math.floor((xy(d,yAxis)-ymin)/(ymax-ymin)*N_ROW),0,N_ROW-1):0;
 return row*N_COL+col;
}
function cellIndex(d){return cellIndexFor(d,axisX,axisY);}
// Fixed benchmark corpus uses neither current axes, chef reviews nor tasting mode.
function benchmarkPool(){const slots=Array(N_COL*N_ROW).fill(null);
 for(const d of catalog){const i=cellIndexFor(d,'nov','rich');if(!slots[i]||d.bal>slots[i].bal)slots[i]=d;}
 return slots.filter(Boolean);
}
function score(d,sess,view){if(view==='baseline'||sess.votes.filter(v=>v.result!=='tie').length===0)return d.bal;
 const p=predict(d,sess);return .55*d.bal+.65*sig(p.mean)+.08*p.dis;
}
function arrange(sess,view){const cells=Array(N_COL*N_ROW).fill(null);
 for(const d of catalog){if(rejected.has(d.id))continue;const i=cellIndex(d);if(!cells[i]||score(d,sess,view)>score(cells[i],sess,view))cells[i]=d;}
 return cells;
}
function effectiveArchive(){return arrange(sessions[mode],archiveView);}
function pairKey(a,b){return [a.id,b.id].sort().join('|');}
function choosePair(sess,pool,rng=rngFrom(99),excluded=new Set(),fixedAxes=false){
 const sorted=[...new Map(pool.map(d=>[d.id,d])).values()];if(sorted.length<2)return null;
 const old=new Set(sess.history.slice(-15));const predictPairs=sess.models||[];
 // Recent repeats are avoided when possible, but never allow a held-out pair into training.
 for(let pass=0;pass<2;pass++){
  let best=null,bestScore=-Infinity;
  for(let i=0;i<sorted.length;i++)for(let j=i+1;j<sorted.length;j++){
   const A=sorted[i],B=sorted[j],key=pairKey(A,B);
   if(excluded.has(key)||(pass===0&&old.has(key)))continue;
   const ps=predictPairs.map(w=>sig(dot(w,A.x.map((v,k)=>v-B.x[k]))));
   const pm=ps.reduce((v,p)=>v+p,0)/Math.max(1,ps.length);
   const dis=Math.sqrt(ps.reduce((v,p)=>v+(p-pm)**2,0)/Math.max(1,ps.length));
   const ca=fixedAxes?cellIndexFor(A,'nov','rich'):cellIndex(A),cb=fixedAxes?cellIndexFor(B,'nov','rich'):cellIndex(B);
   const spread=Math.abs(ca%N_COL-cb%N_COL)/N_COL+Math.abs(Math.floor(ca/N_COL)-Math.floor(cb/N_COL))/N_ROW;
   const goodness=sess.votes.some(v=>v.result!=='tie')?1.5*dis+.65*(1-2*Math.abs(.5-pm))+.08*(A.bal+B.bal):spread+rng()*.2;
   if(goodness>bestScore){bestScore=goodness;best=[A,B];}
  }
  if(best)return best;
 }
 return null;
}
function presentPair(sess,canonical){
 if(!canonical)return null;
 const key=pairKey(...canonical);const count=sess.orderCounts.get(key)||0;
 if(!sess.firstOrder.has(key))sess.firstOrder.set(key,sess.orderRng()<.5);
 const flip=count%2===0?sess.firstOrder.get(key):!sess.firstOrder.get(key);
 sess.orderCounts.set(key,count+1);
 return flip?[canonical[1],canonical[0]]:canonical;
}
function setPair(){const s=sessions[mode];const pool=mode==='manual'?catalog.filter(d=>approved.has(d.id)&&!rejected.has(d.id)):effectiveArchive().filter(Boolean);
 s.pair=presentPair(s,choosePair(s,pool,simulationRng));
}
function recordVote(sess,result,isManual){
 if(!sess.pair)return;
 const [a,b]=sess.pair;
 sess.votes.push({a:a.id,b:b.id,result,recorded_at:new Date().toISOString(),pair_key:pairKey(a,b),
  presentation_index:sess.votes.length+1,order_occurrence:sess.orderCounts.get(pairKey(a,b)),
  // Historical approval snapshot remains intact if a candidate is later unapproved/rejected.
  ...(isManual?{approved_at_tasting:{A:approved.has(a.id),B:approved.has(b.id)},review_event_index:reviewEvents.length}:{}),
  sample_mapping:{A:a.id,B:b.id}});
 sess.history.push(pairKey(a,b));refit(sess);
}
function newVote(result){const s=sessions[mode];if(!s.pair)return;
 recordVote(s,result,mode==='manual');setPair();render();
}
function simulatedBatch(){if(mode!=='simulation')return;
 for(let i=0;i<4;i++){const s=sessions.simulation;if(!s.pair)break;
  const [a,b]=s.pair,p=sig((signedUtility(a)-signedUtility(b))*1.5);
  recordVote(s,simulationRng()<p?'A':'B',false);setPair();
 }
 render();
}
function candidateName(d){return [localeName(d.t,lang),localeName(d.m,lang),localeName(d.a,lang)].join(' · ');}
function fullName(d){return [localeName(d.m,lang),localeName(d.a,lang),localeName(d.b,lang),localeName(d.t,lang)].join(' · ');}
const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const labelBadge=d=>approved.has(d.id)?tr().approved:rejected.has(d.id)?tr().rejected:tr().pending;
function renderText(){document.documentElement.lang=lang;document.querySelectorAll('[data-i]').forEach(node=>{const k=node.dataset.i;if(typeof tr()[k]==='string')node.textContent=tr()[k];});
 document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));
 $('simMode').setAttribute('aria-pressed',String(mode==='simulation'));$('manualMode').setAttribute('aria-pressed',String(mode==='manual'));
}
function axisEnds(k){if(k==='nov')return [tr().novLo,tr().novHi];if(k==='rich')return [tr().richLo,tr().richHi];return [tr().axisLo(tr().dims[k]),tr().axisHi(tr().dims[k])];}
function renderAxes(){[['axisX',axisX],['axisY',axisY]].forEach(([id,cur])=>{const s=$(id);s.replaceChildren();for(const dim of AXES){const opt=el('option',null,tr().dims[dim]);opt.value=dim;s.append(opt);}s.value=cur;});
 $('archiveView').value=archiveView;[$('xLow').textContent,$('xHigh').textContent]=axisEnds(axisX);[$('yLow').textContent,$('yHigh').textContent]=axisEnds(axisY);
}
function renderGrid(){const s=sessions[mode],initial=arrange(s,'baseline'),adapt=arrange(s,'adaptive');
 initialMap=initial;allMap=archiveView==='baseline'?initial:adapt;
 const changed=adapt.reduce((n,d,i)=>n+((d?.id||'')!==(initial[i]?.id||'')),0);
 $('changedCount').textContent=tr().changed(changed);$('archiveInfo').textContent=changed?tr().changes(changed):tr().nochange;
 const box=$('grid');box.replaceChildren();const available=allMap.filter(Boolean);
 const values=available.map(d=>s.votes.some(v=>v.result!=='tie')?predict(d,s).mean:d.bal);
 const min=Math.min(...values),max=Math.max(...values);
 for(let row=N_ROW-1;row>=0;row--)for(let col=0;col<N_COL;col++){
  const d=allMap[row*N_COL+col],cell=el('button','cell');cell.type='button';
  if(!d){cell.classList.add('empty');cell.disabled=true;cell.textContent='–';cell.setAttribute('aria-label',tr().empty);box.append(cell);continue;}
  const value=s.votes.some(v=>v.result!=='tie')?predict(d,s).mean:d.bal;
  const norm=max>min?(value-min)/(max-min):.5;cell.style.backgroundColor=`color-mix(in oklab, var(--accent) ${Math.round(8+norm*50)}%, var(--surface))`;
  if(selected?.id===d.id)cell.classList.add('selected');if(approved.has(d.id))cell.classList.add('approved');
  const name=el('span','nm',localeName(d.m,lang)+' · '+localeName(d.a,lang));const meta=el('span','cellmeta',approved.has(d.id)?'✓':Math.round(d.bal*100)+'/100');
  cell.append(name,meta);cell.setAttribute('aria-label',fullName(d)+'. '+labelBadge(d));cell.addEventListener('click',()=>{selected=d;render();});box.append(cell);
 }
}
function renderDish(){const box=$('dish');box.replaceChildren();if(!selected){box.textContent=tr().choose;return;}
 const d=selected;const heading=el('h3',null,fullName(d));const pills=el('div','parts');
 for(const part of [d.b,d.m,d.a,d.t])pills.append(el('span','pill',localeName(part,lang)));
 const balance=el('p','micro',`${tr().bRisk}: ${Math.round(d.bal*100)}/100 · ${tr().learningStatus}: ${predict(d,sessions[mode]).dis.toFixed(2)}`);
 const profile=el('div','profile');for(const k of ['a','r','c','u','f','s']){
  const ln=el('div','profileline');const name=el('span',null,tr().dims[k]);const track=el('span','rail');const fill=el('i');fill.style.width=`${Math.round(clamp(d.v[k]/2.6,0,1)*100)}%`;track.append(fill);ln.append(name,track);profile.append(ln);
 }
 const why=el('p','reason',tr().why+': '+culinaryRationale(d));
 const all=el('p','micro',tr().allergens+': '+(d.allergens.length?d.allergens.join(', '):tr().noAllergens));
 const state=el('p','micro',approved.has(d.id)?tr().approvedNote:rejected.has(d.id)?tr().rejectedNote:tr().pendingNote);
 box.append(heading,pills,balance,profile,why,all,state);
 $('chefBadge').textContent=labelBadge(d);
 $('approve').textContent=approved.has(d.id)?{en:'Undo approval',es:'Quitar aprobación',eu:'Onarpena kendu'}[lang]:tr().approve;
 $('reject').textContent=rejected.has(d.id)?{en:'Restore candidate',es:'Recuperar candidato',eu:'Hautagaia berreskuratu'}[lang]:tr().reject;
 for(const [id,list,value] of [['modBase',BASES,d.b.id],['modMain',MAINS,d.m.id],['modAccent',ACCENTS,d.a.id],['modTech',TECHS,d.t.id]]){
  const select=$(id);if(select.options.length!==list.length){select.replaceChildren();for(const part of list){const opt=el('option',null,localeName(part,lang));opt.value=part.id;select.append(opt);}}
  else for(let i=0;i<list.length;i++)select.options[i].textContent=localeName(list[i],lang);
  if(document.activeElement!==select)select.value=value;
 }
}
function culinaryRationale(d){const reasons=[];
 if(d.v.a>.65&&d.v.r>.6)reasons.push(tr().whyA);
 if(d.v.c>.75)reasons.push(tr().whyC);
 if(d.v.u>1)reasons.push(tr().whyU);
 if(d.v.f>.8)reasons.push(tr().whyF);
 return reasons.length?reasons.slice(0,2).join(' '):tr().whySimple;
}
function renderPair(){const box=$('pair'),s=sessions[mode];box.replaceChildren();$('voteCount').textContent=tr().vote(s.votes.length);
 $('modeNotice').textContent=mode==='simulation'?tr().simNotice:tr().manualNotice;
 $('runSim').hidden=mode!=='simulation';$('blind').disabled=mode!=='manual';
 $('tie').disabled=!s.pair;$('skip').disabled=!s.pair;
 if(!s.pair){const need=Math.max(0,2-approved.size);box.append(el('p','small muted',mode==='manual'?(need>0?tr().manualNeed(need):tr().noPair):tr().noPair));return;}
 s.pair.forEach((d,i)=>{const key=i?'B':'A';const sample=el('div','candidate');sample.append(el('strong',null,tr().show(key)));
  if(mode==='simulation'||!$('blind').checked)sample.append(el('div','name',fullName(d)));
  else sample.append(el('div','name',tr().sample+' '+key));
  const b=el('button','btn',tr().prefer(key));b.type='button';b.addEventListener('click',()=>newVote(key));sample.append(b);box.append(sample);
 });
}
function renderWeights(){const s=sessions[mode],w=meanWeights(s),box=$('weights');box.replaceChildren();const scale=Math.max(1,...w.map(Math.abs));
 for(let j=0;j<9;j++){
  const row=el('div','weightrow');const label=el('span',null,tr().feat[j]);const track=el('div','weighttrack');const bar=el('div','weightbar'+(w[j]<0?' negative':''));
  const len=Math.abs(w[j])/scale*50;bar.style.left=`${w[j]<0?50-len:50}%`;bar.style.width=`${len}%`;track.append(bar);
  row.append(label,track,el('span',null,(w[j]>=0?'+':'')+w[j].toFixed(2)));box.append(row);
 }
 const n=s.votes.filter(v=>v.result!=='tie').length;
 $('modelState').textContent=n?tr().learning(n):tr().noEvidenceYet;
 const expl=$('explanation');
 if(n<3){expl.textContent=tr().learnedFew;return;}
 const rank=w.map((weight,j)=>({j,weight})).sort((a,b)=>b.weight-a.weight);
 const neg=[...rank].reverse().find(x=>x.weight<-.08);
 expl.textContent=tr().learnedSuggest(tr().feat[rank[0].j].toLowerCase(),neg?tr().feat[neg.j].toLowerCase()+' has a negative fitted weight':tr().neutral)+' '+tr().tieNote;
}
function renderShortlist(){const s=sessions[mode],box=$('shortlist');box.replaceChildren();const tests=[d=>cellIndex(d)%N_COL<3&&Math.floor(cellIndex(d)/N_COL)<3,d=>cellIndex(d)%N_COL<3&&Math.floor(cellIndex(d)/N_COL)>=3,d=>cellIndex(d)%N_COL>=3&&Math.floor(cellIndex(d)/N_COL)<3,d=>cellIndex(d)%N_COL>=3&&Math.floor(cellIndex(d)/N_COL)>=3];
 tests.forEach((f,i)=>{const pool=allMap.filter(Boolean).filter(f);if(!pool.length)return;const best=pool.reduce((a,b)=>score(a,s,archiveView)>score(b,s,archiveView)?a:b);
  const item=el('div','shortitem');item.append(el('span','q',tr().q[i]),el('span','title',localeName(best.m,lang)+' · '+localeName(best.a,lang)),el('span','sub',labelBadge(best)));box.append(item);
 });
}
function render(){renderText();renderAxes();renderGrid();renderDish();renderPair();renderWeights();renderShortlist();renderBenchmark();}
function setMode(next){mode=next;setPair();render();}
function setAxis(which,newValue){if(which==='x'){if(newValue===axisY)axisY=axisX;axisX=newValue;}else{if(newValue===axisX)axisX=axisY;axisY=newValue;}setPair();render();}
function chefReview(status){if(!selected)return;const id=selected.id;
 const before=approved.has(id)?'approved':rejected.has(id)?'rejected':'pending';
 if(status==='approved'){if(approved.has(id))approved.delete(id);else{rejected.delete(id);approved.add(id);}}
 else{if(rejected.has(id))rejected.delete(id);else{approved.delete(id);rejected.add(id);}}
 const after=approved.has(id)?'approved':rejected.has(id)?'rejected':'pending';
 // An audit event is recorded for both decisions and withdrawals; old votes remain as historical evidence.
 reviewEvents.push({event_id:reviewEvents.length+1,recorded_at:new Date().toISOString(),candidate_id:id,previous_status:before,new_status:after,review_note:$('reviewNote').value.trim()});
 $('reviewNote').value='';setPair();render();
}
function applyModification(){const id=[$('modBase').value,$('modMain').value,$('modAccent').value,$('modTech').value].join('/');
 const d=byId.get(id);if(!d){window.alert(tr().modInvalid);return;}
 selected=d;
 // Showing a candidate without changing the global learning or original recipes; it can be explicitly approved.
 render();window.alert(tr().modSuccess);
}
function exportVotes(){const s=sessions[mode];const payload={project:'Pintxo Map 2.1',version:'2.1.0',mode,kind:mode==='simulation'?'synthetic_demo':'unvalidated_manual_demo',exported_at:new Date().toISOString(),method:'Pairwise choices (ties excluded from model training); A/B order counterbalanced for repeated pairs',axes:{x:axisX,y:axisY},comparisons:s.votes.map(v=>({...v,left:v.a,right:v.b})),
 review_events:mode==='manual'?[...reviewEvents]:[],approved_candidate_ids:[...approved],rejected_candidate_ids:[...rejected],
 review_withdrawal_policy:'Votes already recorded remain in historical data after an approval is withdrawn; new manual votes require current approval. Past votes retain their at-tasting approval snapshot.',
 notice:'No participant identity, consent evidence, real blinding or certified safety approval is included. Synthetic and manual histories are distinct. Review notes are user-entered and may contain personal data: inspect before sharing.'};
 const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const link=document.createElement('a');const u=URL.createObjectURL(blob);link.href=u;link.download=`pintxo-map-2.1-${mode}-session.json`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(u),2500);
}
// Benchmark is frozen to the same versioned baseline candidates, seed list and axes.
// Held-out pairs are explicitly excluded from both sampling strategies (not unseen recipes).
function holdoutPairs(seed,pool){const r=rngFrom(seed),out=[],seen=new Set();let attempts=0;
 while(out.length<100&&attempts++<200000){const a=pool[Math.floor(r()*pool.length)],b=pool[Math.floor(r()*pool.length)];
  if(a.id===b.id||Math.abs(signedUtility(a)-signedUtility(b))<.2)continue;
  const k=pairKey(a,b);if(seen.has(k))continue;seen.add(k);out.push([a,b]);
 }
 if(out.length!==100)throw Error('Insufficient benchmark holdout pairs');
 return out;
}
function benchAccuracy(sess,holdout){const w=meanWeights(sess);let correct=0;
 for(const [a,b] of holdout){const d=dot(w,a.x)-dot(w,b.x),truth=signedUtility(a)-signedUtility(b);correct+=d===0?.5:(d*truth>0?1:0);}
 return correct/holdout.length;
}
function randomPair(pool,session,r,excluded){const old=new Set(session.history.slice(-15));const possibilities=[];
 for(let i=0;i<pool.length;i++)for(let j=i+1;j<pool.length;j++){
  const key=pairKey(pool[i],pool[j]);if(!excluded.has(key))possibilities.push([pool[i],pool[j],old.has(key)]);
 }
 const fresh=possibilities.filter(pair=>!pair[2]),eligible=fresh.length?fresh:possibilities;
 return eligible.length?eligible[Math.floor(r()*eligible.length)].slice(0,2):null;
}
// Stable pair-specific synthetic response: the same pair receives the same outcome in
// a given trial, irrespective of which method selected it or its A/B order.
function syntheticWinner(a,b,seed){const left=a.id<b.id?a:b,right=a.id<b.id?b:a,key=pairKey(a,b);
 let hash=seed|0;for(let i=0;i<key.length;i++)hash=Math.imul(hash^key.charCodeAt(i),16777619)|0;
 return rngFrom(hash)()<sig((signedUtility(left)-signedUtility(right))*1.5)?left.id:right.id;
}
function runBenchmark(){if(benchmarkPending)return;benchmarkPending=true;$('benchmark').disabled=true;$('benchmarkInfo').textContent=tr().benchmarkRunning;
 setTimeout(()=>{
 try{
  const checkpoints=[0,4,8,12,16],seeds=BENCHMARK_SEEDS,rows={active:[],random:[]};
  const pool=benchmarkPool();const metadata={version:BENCHMARK_VERSION,pool_count:pool.length,holdout_pairs_per_trial:100,
   training_holdout_overlap:0,trials:seeds.length,synthetic_only:true,axes:['nov','rich'],fixed_initial_heuristic:true};
  for(const seed of seeds){const hold=holdoutPairs(seed+10000,pool),forbidden=new Set(hold.map(pair=>pairKey(...pair)));
   for(const variant of ['active','random']){
    const sess=makeSession();refit(sess);const r=rngFrom(seed+(variant==='active'?13:41));const values=[benchAccuracy(sess,hold)];
    for(let step=1;step<=16;step++){
     const p=variant==='active'?choosePair(sess,pool,r,forbidden,true):randomPair(pool,sess,r,forbidden);
     if(!p)throw Error('No valid training pair');
     const [a,b]=p,key=pairKey(a,b);
     if(forbidden.has(key)){metadata.training_holdout_overlap++;throw Error('Training/test pair leakage detected');}
     const winner=syntheticWinner(a,b,seed);
     sess.votes.push({a:a.id,b:b.id,result:winner===a.id?'A':'B'});sess.history.push(key);refit(sess);
     if(checkpoints.includes(step))values.push(benchAccuracy(sess,hold));
    }
    rows[variant].push(values);
   }
  }
  benchmarkResults={checkpoints,seeds,rows,metadata};$('benchmarkInfo').textContent=tr().benchmarkDone(seeds.length);
 }catch(err){$('benchmarkInfo').textContent='Benchmark failed: '+err.message;console.error(err);}
 finally{benchmarkPending=false;$('benchmark').disabled=false;renderBenchmark();}
 },50);
}
const svgNS='http://www.w3.org/2000/svg';
function svgTag(tag,attrs,text){const x=document.createElementNS(svgNS,tag);for(const [k,v] of Object.entries(attrs||{}))x.setAttribute(k,String(v));if(text!==undefined)x.textContent=text;return x;}
function renderBenchmark(){const svg=$('chart');svg.replaceChildren();const x0=54,y0=18,w=515,h=160;
 const x=t=>x0+(t/16)*w,y=v=>y0+h-(v*h);
 const rows=benchmarkResults;
 for(let j=0;j<=4;j++){const p=j*.25;svg.append(svgTag('line',{x1:x0,y1:y(p),x2:x0+w,y2:y(p),stroke:'#e0e8dc','stroke-width':'1'}));svg.append(svgTag('text',{x:12,y:y(p)+4,fill:'#627168','font-size':'12'},Math.round(p*100)+'%'));}
 for(const step of [0,4,8,12,16])svg.append(svgTag('text',{x:x(step),y:204,'text-anchor':'middle',fill:'#627168','font-size':'12'},step));
 if(!rows){$('benchmarkInfo').textContent=tr().benchmarkIdle;return;}
 if(!benchmarkPending)$('benchmarkInfo').textContent=tr().benchmarkDone(rows.seeds.length);
 for(const [name,color] of [['random','#437d91'],['active','#486e34']]){
  const series=rows.rows[name],av=rows.checkpoints.map((_,j)=>series.reduce((s,arr)=>s+arr[j],0)/series.length);
  const upper=rows.checkpoints.map((_,j)=>Math.max(...series.map(r=>r[j]))),lower=rows.checkpoints.map((_,j)=>Math.min(...series.map(r=>r[j])));
  const band=upper.map((v,j)=>`${x(rows.checkpoints[j])},${y(v)}`).concat(lower.map((v,j)=>`${x(rows.checkpoints[j])},${y(v)}`).reverse()).join(' ');
  svg.append(svgTag('polygon',{points:band,fill:color,'fill-opacity':'.11'}));
  const poly=av.map((v,j)=>`${x(rows.checkpoints[j])},${y(v)}`).join(' ');
  svg.append(svgTag('polyline',{points:poly,fill:'none',stroke:color,'stroke-width':'3','stroke-linecap':'round','stroke-linejoin':'round'}));
  for(let j=0;j<av.length;j++)svg.append(svgTag('circle',{cx:x(rows.checkpoints[j]),cy:y(av[j]),r:3.5,fill:color}));
 }
}
function attachEvents(){
 document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{lang=button.dataset.lang;render();}));
 $('axisX').addEventListener('change',e=>setAxis('x',e.target.value));$('axisY').addEventListener('change',e=>setAxis('y',e.target.value));
 $('archiveView').addEventListener('change',e=>{archiveView=e.target.value;setPair();render();});
 $('approve').addEventListener('click',()=>chefReview('approved'));$('reject').addEventListener('click',()=>chefReview('rejected'));
 $('applyModification').addEventListener('click',applyModification);
 $('simMode').addEventListener('click',()=>setMode('simulation'));$('manualMode').addEventListener('click',()=>setMode('manual'));
 $('blind').addEventListener('change',renderPair);
 $('tie').addEventListener('click',()=>newVote('tie'));$('skip').addEventListener('click',()=>{const s=sessions[mode];if(!s.pair)return;s.history.push(pairKey(...s.pair));setPair();render();});
 $('runSim').addEventListener('click',simulatedBatch);
 $('resetVotes').addEventListener('click',()=>{if(!window.confirm(tr().modeResetConfirm))return;sessions[mode]=makeSession();refit(sessions[mode]);if(mode==='simulation')simulationRng=rngFrom(2026);setPair();render();});
 $('benchmark').addEventListener('click',runBenchmark);$('export').addEventListener('click',exportVotes);
}
function init(){try{const local=(navigator.language||'en').toLowerCase().slice(0,2);if(LANG[local])lang=local;}catch(_e){}
 catalog=buildCatalog();byId=new Map(catalog.map(d=>[d.id,d]));initBounds();
 refit(sessions.simulation);refit(sessions.manual);selected=arrange(sessions.simulation,'baseline').find(Boolean);
 attachEvents();setPair();render();
 window.PintxoDebug={getBenchmark:()=>benchmarkResults?JSON.parse(JSON.stringify(benchmarkResults)):null,getReviewEvents:()=>reviewEvents.map(e=>({...e})),getState:()=>({mode,lang,selected:selected?.id,votes:{simulation:sessions.simulation.votes.length,manual:sessions.manual.votes.length},approved:approved.size,rejected:rejected.size,catalog:catalog.length,changed:arrange(sessions[mode],'adaptive').reduce((n,d,i)=>n+(d?.id!==arrange(sessions[mode],'baseline')[i]?.id),0),benchmark:!!benchmarkResults}),getCandidate:id=>byId.get(id),getSession:kind=>sessions[kind]};
}
init();
})();
