
function Coin(scene, x, y) {

	const radius = 50;
	const geometry = new THREE.CylinderGeometry( radius, radius, 10, 16 );
	const material = new THREE.MeshStandardMaterial( { color: 0xfbb000 } );
	this.model = new THREE.Mesh( geometry, material );	
	this.model.position.set(x, y, 50);
	
	scene.add(this.model);

	//animateCoin();
	
	this.height = 2*radius;
	this.width = 2*radius;
}

/*function Coin(scene, x, y) {

	const radius = 50;
	//const geometry = new THREE.CylinderGeometry( radius, radius, 10, 16 );
	var modelLoader = new THREE.OBJLoader();
	const material = new THREE.MeshStandardMaterial( { color: 0xfbb000 } );
	this.model;// = new THREE.Mesh( geometry, material );	
	//this.model.position.set(x, y, 50);
	this.height;
	this.width;
	
	modelLoader.load
	( 
		"../../assets/models/coin.obj", 
		( function(obj) {

			this.model = obj;
			//this.scale.set(.5,.5,.5);
			this.model.traverse( function (child) {
					if ( child.isMesh ) {
						child.material = modelMaterial;
					}
				}
			)

			this.model.rotation.x = -Math.PI / 2;
			
			scene.add(this.model);
			this.model.position.set(x, y, 50);

		}).bind(this)
	);
	//scene.add(this.model);
	
	this.height = 2*radius;
	this.width = 2*radius;
}*/