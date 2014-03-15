(function(){

  var vis = {},
  $container, container, camera, scene, renderer, width, height, cubeHolder, cubes = [], cubeTotal;

  vis.init = function() {
    $container = $('#vis-container');
    container = $container[0];

    camera = new THREE.PerspectiveCamera( 50, $container.width() / $container.height(), 1, 10000 );
    camera.position.z = 900;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize($container.width(), $container.height());
    $container .append(renderer.domElement);

    var light1, light2;

    light1 = new THREE.SpotLight( 0xFFFFFF, 0.9 );
    light1.position.set( -5000, 0, 3000 );
    scene.add( light1 );

    light2 = new THREE.SpotLight( 0xFFFFFF, 0.9 );
    light2.position.set( 5000, 0, 3000 );
    scene.add( light2 );

    var material = new THREE.MeshLambertMaterial( { color: 0xFFFFFF } ),
    c = 0, cols = 20,
    r = 0, rows = 4,
    cube;
    
    cubeHolder = new THREE.Object3D();
    cubeHolder.position.x = -2000;
    cubeHolder.position.y = -200;
    cubeHolder.rotation.x = 0.1;
    scene.add(cubeHolder);

    for(r; r<rows; r++) {

      for(c; c<cols; c++) {
        cube = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 5), material);
        cube.position.x = (c * 201); 
        cube.position.y = (r * 201);
        cube.position.z = Math.random() * -300 + 100;

        cubeHolder.add(cube);
        cubes.push(cube);
      }

      c = 0;
      cols = 20;
    }

    cubeTotal = cubes.length;

    vis.onResize()
    vis.animate();

    vis.tween();

    $(window).resize(function() {
      vis.onResize();
    });
  };

  vis.tween = function () {
    var i = cubeTotal-1, cube;
    for(i; i > -1; i--) {
      cube = cubes[i]; 
      new cubeTween(cube);
    }
  };

  vis.animate = function() {
    requestAnimationFrame( vis.animate );
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


  var cubeTween = function (cube) {
    this.cube = cube;

    this.tween = function () {
      var that = this;
      TweenLite.to(this.cube.position, 1 + Math.random()*4, {z: Math.random() * -300 + 100, delay: Math.random() * 2 + 2, onComplete: function() {
        that.tween(cube);
      }});
    }

    this.tween();
  };


  $(function(){
    vis.init();
  });

})();