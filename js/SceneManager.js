function SceneManager(canvas) {

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    };
   
    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);

    var theCar, theBackground, theCoins, theEnemies, theLantern; //theBiedra;
    var health=3, info=false;

    var ambientLight = new THREE.AmbientLight('ff0000', 0.5);
    
    scene.add(ambientLight);

    //scene.fog = new THREE.Fog( 0xaaaaaaa, 0, 14000);

    const dynamicSubjects = [];
    createSceneSubjects();

    var keyMap = [];

    function buildScene() {
        const scene = new THREE.Scene();

        return scene;
    }

    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 

        renderer.setClearColor("f0000");
        renderer.setSize(width, height);

        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        return renderer;
    }

    function buildCamera({ width, height }) {

        const near = 1;
        const far = 5000; 
        //const camera = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, nearPlane, farPlane);
        const camera = new THREE.PerspectiveCamera( 50, width / height, near, far);
                
        camera.position.z = 2000;
        camera.position.y = -1200;
        camera.rotation.x = 0.5;

        return camera;
    }

    function createSceneSubjects() {
        theBackground = new Background(scene);
        theCar  = new Car(scene);
        theCoins = placeCoins(scene);
        theEnemies = placeEnemies(scene);
        theLantern = new Lantern(scene);
        //theBiedra = new Biedronka(scene);

        dynamicSubjects.push(theCar);
    }


    this.update = function() {
        if  (health>0 && theCoins.length>0) {

            for(let i=0; i<dynamicSubjects.length; i++)
                dynamicSubjects[i].update();

            checkCollisions();

            var infos = document.getElementById('instruction')
            if (keyMap[72] && infos.style.display=="none")
            {
                info=true;
                infos.style.display="block";
                //document.getElementById("info").innerHTML = ""; 
            }

            theCar.handleInput(keyMap, camera);
            renderer.render(scene, camera);
        } 
        else if (health > 0 && theCoins.length==0)
                document.getElementById("gameover").innerHTML = "ZWYCIĘSTWO"; 
        else
                document.getElementById("gameover").innerHTML = "PRZEGRANA"; 

        //console.debug(theCar.position.y);
        //if (theCar.position.y>1600 || theCar.position.y<-1200) health=0;
    }

    function checkCollisions() {

        var i = theCoins.length;
        while (i--) {
            if (isCollision(theCar, theCoins[i])) {
                scene.remove(theCoins[i].model);
                theCoins.splice(i, 1);
            } 
        }

        var i = theEnemies.length;
        while (i--) {
            if (isCollision(theCar, theEnemies[i])) {
                scene.remove(theEnemies[i].model);
                theEnemies.splice(i, 1);
                health--;
                document.getElementById("scoreboard").innerHTML = "ŻYCIA: "+health; 
            }
        }

        var k,l; 
        for(l=0; l<theEnemies.length; l++)
        {
            for(k=0; k<theCoins.length; k++)
            {
                if (isCollision(theEnemies[l], theCoins[k])) {
                    scene.remove(theCoins[k].model);
                    theCoins.splice(k, 1);
                }
            }
        }

        if (isCollision(theCar, theBackground)) {
            health=0;
        }
    }

    function isCollision(m1, m2) {

        if (m1.model && m2.model) {
            minX1 = m1.model.position.x - (m1.width/2);
            maxX1 = m1.model.position.x + (m1.width/2);
            minY1 = m1.model.position.y - (m1.height/2);
            maxY1 = m1.model.position.y + (m1.height/2);

            minX2 = m2.model.position.x - (m2.width/2);
            maxX2 = m2.model.position.x + (m2.width/2);
            minY2 = m2.model.position.y - (m2.height/2);
            maxY2 = m2.model.position.y + (m2.height/2);

            if (minX1 <= maxX2 && maxX1 >= minX2 && minY1 <= maxY2 && maxY1 >= minY2)
                return true;
            else
                return false;
        }
        else
            return false;
    } 


    this.onWindowResize = function() {
        const { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        renderer.setSize(width, height);

        camera.left = -width / 2;
        camera.right = width / 2;
        camera.top = height / 2;
        camera.bottom = -height / 2;
        camera.updateProjectionMatrix();      
    }

    this.handleInput = function(keyCode, isDown) {
        keyMap[keyCode] = isDown;
    }
}

