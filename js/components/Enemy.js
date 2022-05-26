
function Enemy(scene, x, y) {
	
	var modelLoader = new THREE.GLTFLoader();
	this.model;
	this.height;
	this.width;

	modelLoader.load
		( 
			"../../assets/models/enemy.gltf", 
			( function(obj) {
				this.model = obj.scene;

				this.model.rotation.x = Math.PI / 2;
				this.model.rotation.y = -Math.PI / 2;

				this.model.castShadow=true;
				this.model.receiveShadow=true;

				this.model.position.set(x, y, 0);
				this.model.scale.set(0.75,0.75,0.75);

				//wyrownywanie do linii parkingu
				if (this.model.position.x<-277)
					this.model.position.x=-400;
				else if (this.model.position.x>-277 && this.model.position.x<-32)
					this.model.position.x=-155;
				else if (this.model.position.x>-32 && this.model.position.x<120)
					this.model.position.x=90;
				else if (this.model.position.x>120 && this.model.position.x<450)
					this.model.position.x=330;
				else if (this.model.position.x>450 && this.model.position.x<700)
					this.model.position.x=570;
				else if (this.model.position.x>700 && this.model.position.x<950)
					this.model.position.x=830;
				else if (this.model.position.x>950)
					this.model.position.x=830;

				if (this.model.position.y<-560)
					this.model.position.y=-860;
				else if (this.model.position.y>-560 && this.model.position.y<-100)
					this.model.position.y=-260;
				else if (this.model.position.y>-100 && this.model.position.y<410)
					this.model.position.y=100;
				else if (this.model.position.y>410)
					this.model.position.y=700;

				scene.add(this.model);
				var enemyBndBox = new THREE.Box3().setFromObject(this.model);
				this.height = enemyBndBox.getSize().y*0.8;
				this.width = enemyBndBox.getSize().x*0.8;
			}).bind(this)
		)

	this.destroy = function() {
		scene.remove(this.model);
	}
}

