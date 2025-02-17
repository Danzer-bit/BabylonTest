//import spaceship from "../3DModels/Spaceship_Yellow.glb";
window.addEventListener('DOMContentLoaded', function () {
    // Ottieni il canvas HTML
    var canvas = document.getElementById('renderCanvas');

    // Crea l'engine Babylon.js
    var engine = new BABYLON.Engine(canvas, true);


    // Funzione per creare la scena
    var createScene = function () {
        // Crea una nuova scena
        var scene = new BABYLON.Scene(engine);
        
       

        // Aggiungi una telecamera alla scena (First Person Controller)
        var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 2, -10), scene);
        camera.attachControl(canvas, true);

        // Imposta i controlli della telecamera per il movimento
        camera.keysUp.push(87); // W
        camera.keysDown.push(83); // S
        camera.keysLeft.push(65); // A
        camera.keysRight.push(68); // D

        // Aggiungi una luce alla scena
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

        // Crea il pavimento
        var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 50, height: 50}, scene);

        // Aggiungi una sfera alla scena
        //var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
        //sphere.position.y = 1; // Solleva la sfera sopra il pavimento

        // *** Caricamento del modello 3D ***
        /*BABYLON.SceneLoader.ImportMesh("", "3DModels/", "Spaceship_Yellow.glb", scene, function (meshes) {
            let modello = meshes[0]; // Primo elemento della mesh
            modello.position = new BABYLON.Vector3(0, 1, 0); // Posizionato sopra il terreno
            modello.scaling = new BABYLON.Vector3(1, 1, 1); // Regola la scala se necessario
        });*/

        BABYLON.SceneLoader.Append("3DModels/", "Spaceship_Yellow.glb", scene, function() {
            console.log("Modello caricato con successo!");
        }, null, function (scene, message, exception) {
            console.error("Errore nel caricamento:", message, exception);
        });

        return scene;
    };

    // Crea la scena
    var scene = createScene();


    // Avvia il rendering della scena
    engine.runRenderLoop(function () {
        scene.render();
    });

    // Ridimensiona il canvas quando la finestra viene ridimensionata
    window.addEventListener('resize', function () {
        engine.resize();
    });
});