
function Car(scene) {
	
	var modelLoader = new THREE.GLTFLoader();

	this.model;
	this.height=100;
	this.width=100;

	var speed=0,angle=1.55;
	var max_speed=4;
	var acc=.35,dec=.075;
	var turn_speed=.0125;

	modelLoader.load
		( 
			"../../assets/models/car.gltf", 
			( function(obj) {

				this.model = obj.scene;

				this.model.rotation.x = -Math.PI / 2;
				this.model.rotation.y = -Math.PI / 2;
				
				scene.add(this.model);
				this.model.position.x=-1200;
				this.model.position.y=25;

				this.model.castShadow=true;
				this.model.receiveShadow=true;

				var planeBndBox = new THREE.Box3().setFromObject(this.model);
				
				this.height=planeBndBox.getSize().y;
				this.width=planeBndBox.getSize().x*0.75;
				//planeBndBox.rotation.y=this.model.rotation.y;

				/*const helper = new THREE.Box3Helper( box, 0xffff00 );
				scene.add(helper);*/

			}).bind(this)
		);

	
	this.update = function() {
		if (this.model)
		{
			this.model.position.x+=Math.sin(-angle)*speed;
			this.model.position.y-=Math.cos(angle)*speed;

			//console.debug("X: "+this.model.position.x+" Y: "+this.model.position.y);

			this.model.rotation.y=angle;
			//planeBndBox.rotation.y=this.model.rotation.y;
			//planeBndBox.rotation.y=angle;
		}
	}

	//car movement
	this.handleInput = function(keyMap, camera) {
		var up=keyMap[87],down=keyMap[83],left=keyMap[65],right=keyMap[68];

		var can_move=document.getElementById('instruction');
		if (can_move.style.display=="none")
		{
			if (up && speed>-max_speed) {
				if (speed > 0) speed-=dec;
				else speed-=acc;
						
			}

			if (down && speed<max_speed) {
				if (speed < 0) speed+=dec;
				else speed+=acc;
			}

			if (!up && !down)
			{
				if ((speed-dec) >0) speed-=dec;
				else if ((speed+dec)<0) speed+=dec;
				else speed=0;
			}

			if (right && speed!=0) //D
			{
				angle+=turn_speed * -speed/max_speed;
			}
		
			if (left && speed!=0) //A
			{
				angle-=turn_speed * -speed/max_speed;
			}
		}	
	}
}

