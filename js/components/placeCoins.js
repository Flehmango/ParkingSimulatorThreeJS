
function placeCoins(scene) {

	const theCoins = [];
	[...Array(10).keys()].map(y => {

		getRandomPositions().map(x => { 
			const c = new Coin(scene, 260.1*(x-1.75), 160*(y-5));
			theCoins.push(c);
		});

	});

	return theCoins;

	function getRandomPositions() {

		var noCoins = Math.floor((Math.random() * 4));	
		
		var arr = [...Array(7).keys()];

		for (let i=arr.length-1; i>0; i--) {
		    
		    const j=Math.floor(Math.random()*i);
		    const temp=arr[i];
		    arr[i]=arr[j];
		    arr[j]=temp;
		}

		return arr.slice(0, noCoins);
    }

}



