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
        
        const forest = BABYLON.CubeTexture.CreateFromPrefilteredData("assets/forest.env", scene);
        forest.level = 2;

        // Aggiungi una telecamera alla scena (First Person Controller)
        //var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 2, -10), scene);
        // Aggiungi una arc rotate camera
        const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, 2, 0), scene);
        camera.attachControl(canvas, true);

        const environment = scene.createDefaultEnvironment({
            environmentTexture: forest,
            skyboxTexture: forest
          });

          if (environment.skybox) {
            environment.skybox.scaling = new BABYLON.Vector3(100, 100, 100); // Cambia la dimensione
          }  

        // Imposta i controlli della telecamera per il movimento
        //camera.keysUp.push(87); // W
        //camera.keysDown.push(83); // S
        //camera.keysLeft.push(65); // A
        //camera.keysRight.push(68); // D

        // Aggiungi una luce alla scena
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

        // Crea il pavimento
        //var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 50, height: 50}, scene);

        // Aggiungi una sfera alla scena
        //var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
        //sphere.position.y = 1; // Solleva la sfera sopra il pavimento

        // *** Caricamento del modello 3D ***
        BABYLON.SceneLoader.ImportMesh("", "3DModels/", "Spaceship_Yellow.glb", scene, function (meshes) {
            let modello = meshes[0]; // Primo elemento della mesh
            modello.position = new BABYLON.Vector3(0, 0, 0); // Posizionato sopra il terreno
            modello.scaling = new BABYLON.Vector3(1, 1, 1); // Regola la scala se necessario
            camera.setTarget(modello.meshes[0]);

            //cambia texture dal modello
            modello.PBRMaterial.emissiveTexture.level = 2;

            //cambia i level delle texture
            const metalMaterial = scene.getMaterialByID(16);
            metalMaterial.emissiveTexture.level = 2;
            metalMaterial.albedoTexture.level = 0;
            metalMaterial.emissiveTexture.name = "metalEmissiveTexture";
            const metalEmissiveTexture = scene.getTextureByName("metalEmissiveTexture");
            metalEmissiveTexture.level = 2;
            
            // ruota la mesh
            //scene.onBeforeRenderObservable.add(() => {
            //    modello.meshes[0].rotate(new Vector3(0, 1, 0), 0.001);
            //  });

            scene.registerBeforeRender(function () {
                // Ruota la mesh lungo l'asse Y
                modello.rotation.y += 0.09;  // Incrementa l'angolo di rotazione in ogni frame
            });  
        });

        /*BABYLON.SceneLoader.Append("3DModels/", "Spaceship.babylon", scene, function() {
            console.log("Modello caricato con successo!");
        }, null, function (scene, message, exception) {
            console.error("Errore nel caricamento:", message, exception);
        });*/

        
        

        return scene;
    };

    // Crea la scena
    var scene = createScene();

    // Crea un bottone per il scene explorer
    const btn = document.createElement("button");
    btn.innerText = "Apri Explorer";
    btn.style.position = "absolute";
    btn.style.bottom = "10px";
    btn.style.right = "10px";
    btn.onclick = () => scene.debugLayer.show();
    document.body.appendChild(btn);


    // Avvia il rendering della scena
    engine.runRenderLoop(function () {
        scene.render();
    });

    // Ridimensiona il canvas quando la finestra viene ridimensionata
    window.addEventListener('resize', function () {
        engine.resize();
    });
});
