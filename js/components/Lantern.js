function lamp(xx, light, scene)
{
	var light = new THREE.SpotLight('#e2e37f', 0.6);
	light.position.set(xx,1800,1000);
	light.position.z=1000;
	light.angle=0.3;
	light.penumbra=0.3;

	light.target.position.x=xx;
	light.target.position.y=500;
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;
	light.shadow.camera.top = 10000;
	light.shadow.camera.bottom = -10000;
	light.shadow.camera.left = -10000;
	light.shadow.camera.right = 10000;
	light.shadow.camera.near = 1;
	light.shadow.camera.far = 32000;
	scene.add( light.target );

	light.target.position.x=xx;
	light.target.position.y=500;

	light.castShadow = true;
	light.receiveShadow = true;
    scene.add(light);
}

function Lantern(scene) {

	const radius = 20;
	const geometry = new THREE.CylinderGeometry( radius, radius, 1000, 16 );
	
	const material = new THREE.MeshStandardMaterial( { color: 0x757575  } );
	this.model1 = new THREE.Mesh( geometry, material );	
	this.model2 = new THREE.Mesh( geometry, material );	
	this.model3 = new THREE.Mesh( geometry, material );	
		
	var xx=-500;
	var small_light, small_light2, small_light3;

	this.model1.position.set(xx, 1000, 10);
	this.model1.rotation.x = 0.5*Math.PI;
	this.model1.receiveShadow = true;

	scene.add(this.model1);

	lamp(xx, small_light, scene);
	
	xx+=750;

	this.model2.position.set(xx, 1000, 10);
	this.model2.rotation.x = 0.5*Math.PI;
	this.model2.receiveShadow = true;
	scene.add(this.model2);

	lamp(xx, small_light2, scene);

	xx+=750;

	this.model3.position.set(xx, 1000, 10);
	this.model3.rotation.x = 0.5*Math.PI;
	this.model3.receiveShadow = true;
	scene.add(this.model3);

	lamp(xx, small_light3, scene);
	
	this.height = 2*radius;
	this.width = 2*radius;
}
	