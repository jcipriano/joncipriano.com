(function(){

  var vis = {},
  $container, container, camera, scene, renderer, width, height, cubes = [];

  vis.init = function() {
    $container = $('#vis-container');
    container = $container[0];

    camera = new THREE.PerspectiveCamera( 20, $container.width() / $container.height(), 1, 10000 );
    camera.position.z = 2000;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize($container.width(), $container.height());
    $container .append(renderer.domElement);

    var light1 = new THREE.SpotLight( 0xFFFFFF, 1.5 );
    light1.position.set( 0, 0, 5000 );
    scene.add( light1 );

    var material = new THREE.MeshLambertMaterial( { color: 0xCCCCCC } ),
    i = 0, len = 40,
    xRange = $container.width() * 2,
    yRange = $container.height() * 3,
    xPos = xRange, yPos, scale,
    cube,
    size;

    for(i; i<len; i++) {
      xPos = xPos - 120;
      yPos = Math.random() * yRange;
      scale = xPos / xRange;
      size =  100 * scale + 20;
      cube = new THREE.Mesh(new THREE.CubeGeometry(400 * Math.random() + 100, 10, size), material);


      cube.position.x = xPos - xRange / 2;
      cube.position.y = yPos - yRange / 2;
      cube.position.z = (Math.random() * -3000) + 1500;


      cube.rotation.x = 200;
      //cube.rotation.y = Math.random() * 100;

      scene.add(cube);
      cubes.push(cube);
    }

    vis.onResize()
    vis.animate();

    $(window).resize(function() {
      vis.onResize();
    });
  };

  vis.animate = function() {

    var i = 39, cube;
    for(i; i > -1; i--) {
      cube = cubes[i]; 

      if(cube.position.x > width * 2) {
        cube.position.x = -(width * 2)
      }

      cube.position.x += 2;

      //cube.rotation.x += 0.01;
      //cube.rotation.y += 0.01;
    }

    //requestAnimationFrame( vis.animate );

    renderer.render(scene, camera);
  };

  vis.onResize = function() {
    console.log('onResize');
    width = $container.width();
    height = $container.height(),
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  $(function(){
    vis.init();
  });

})();