// Create a plane, add texture to it, position it and then add to the scene

function Background(scene, height) {
	
	var geometry = new THREE.PlaneGeometry(3200, 7000);
	
	const textureLoader = new THREE.TextureLoader();
	var material = new THREE.MeshStandardMaterial({ map: textureLoader.load("../../assets/parking.jpg")});
	var bg = new THREE.Mesh(geometry, material);

	var modelLoader = new THREE.GLTFLoader();

	bg.rotation.z = -Math.PI / 2;
	bg.position.z = 0;
	bg.position.y = 0;
	bg.receiveShadow = true;

	scene.add(bg);

	modelLoader.load
		( 
			"../../assets/models/biedronka.gltf", 
			( function(obj) {

				this.model = obj.scene;

				this.model.rotation.x = Math.PI/2;
				this.model.rotation.y = Math.PI/2;

				this.model.scale.x = 4;
				this.model.scale.y = 4;
				this.model.scale.z = 4;
				
				scene.add(this.model);
				this.model.position.x=1700;
				this.model.position.y=-100;
				this.model.position.z=400;

				this.model.castShadow=true;
				this.model.receiveShadow=true;

				var planeBndBox = new THREE.Box3().setFromObject(this.model);
				
				this.height=planeBndBox.getSize().y;
				this.width=planeBndBox.getSize().x;

			}).bind(this)
		);

	
	this.update = function() {
	
	}

}

