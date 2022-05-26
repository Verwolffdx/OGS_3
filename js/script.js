window.onload = function () {
  const scene = new THREE.Scene();

  const car = createCar();
  scene.add(car);

  const car2 = createCar2();
  car2.position.x = -65
  car2.position.y = 0
  car2.position.z = 65
  scene.add(car2);

  const car3 = createCar3();
  car3.position.x = 65
  car3.position.y = 0
  car3.position.z = -65
  scene.add(car3);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(200, 500, 300);
  scene.add(dirLight);

  const aspectRatio = window.innerWidth / window.innerHeight;
  const cameraWidth = 150;
  const cameraHeight = cameraWidth / aspectRatio;

  const camera = new THREE.OrthographicCamera(
    -cameraWidth,
    cameraWidth,
    cameraHeight,
    -cameraHeight,
    0,
    1000
  );
  camera.position.set(200, 200, 200);
  camera.lookAt(10, 10, 10);

  // var helper = new THREE.CameraHelper(dirLight.shadow.camera);
  // var helper = new THREE.CameraHelper(camera);
  // scene.add(helper);

  // const gridHelper = new THREE.GridHelper(80, 8);
  // scene.add(gridHelper);

  // const axesHelper = new THREE.AxesHelper(80);
  // scene.add(axesHelper);

  var width = window.innerWidth;
  var height = window.innerHeight;
  var canvas = document.getElementById('canvas');

  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);

  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.render(scene, camera);

  renderer.setAnimationLoop(() => {
    car.rotation.y -= 0.007;
    car2.rotation.y -= 0.007;
    car3.rotation.y -= 0.007;
    renderer.render(scene, camera);
  });

  function createCar() {
    const car = new THREE.Group();

    const backWheel = createWheels();
    backWheel.position.y = 6;
    backWheel.position.x = -18;
    car.add(backWheel);

    const frontWheel = createWheels();
    frontWheel.position.y = 6;
    frontWheel.position.x = 18;
    car.add(frontWheel);

    const main = new THREE.Mesh(
      new THREE.BoxBufferGeometry(60, 15, 30),
      new THREE.MeshLambertMaterial({ color: 0xa52523 })
    );
    main.position.y = 12;
    car.add(main);

    const carFrontTexture = getCarFrontTexture();

    const carBackTexture = getCarFrontTexture();

    const carRightSideTexture = getCarSideTexture();

    const carLeftSideTexture = getCarSideTexture();
    carLeftSideTexture.center = new THREE.Vector2(0.5, 0.5);
    carLeftSideTexture.rotation = Math.PI;
    carLeftSideTexture.flipY = false;

    const cabin = new THREE.Mesh(new THREE.BoxBufferGeometry(33, 12, 24), [
      new THREE.MeshLambertMaterial({ map: carFrontTexture }),
      new THREE.MeshLambertMaterial({ map: carBackTexture }),
      new THREE.MeshLambertMaterial({ color: 0xffffff }),
      new THREE.MeshLambertMaterial({ color: 0xffffff }),
      new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
      new THREE.MeshLambertMaterial({ map: carLeftSideTexture })
    ]);
    cabin.position.x = -6;
    cabin.position.y = 25.5;
    car.add(cabin);

    return car;
  }

  function createWheels() {
    const geometry = new THREE.BoxBufferGeometry(12, 12, 33);
    const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const wheel = new THREE.Mesh(geometry, material);
    return wheel;
  }

  function getCarFrontTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 64, 32);

    context.fillStyle = "#666666";
    context.fillRect(8, 8, 48, 24);

    return new THREE.CanvasTexture(canvas);
  }

  function getCarSideTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 128, 32);

    context.fillStyle = "#666666";
    context.fillRect(10, 8, 38, 24);
    context.fillRect(58, 8, 60, 24);

    return new THREE.CanvasTexture(canvas);
  }

  function createCar2() {
    const car = new THREE.Group();

    const backWheel = createWheels2();
    backWheel.position.y = 6;
    backWheel.position.x = -29;
    car.add(backWheel);

    const frontWheel = createWheels2();
    frontWheel.position.y = 6;
    frontWheel.position.x = 29;
    car.add(frontWheel);

    const main = new THREE.Mesh(
      new THREE.BoxBufferGeometry(100, 15, 50),
      new THREE.MeshLambertMaterial({ color: 0xa52523 })
    );
    main.position.y = 12;
    car.add(main);

    const carFrontTexture = getCarFrontTexture();

    const carBackTexture = getCarFrontTexture();

    const carRightSideTexture = getCarSideTexture();

    const carLeftSideTexture = getCarSideTexture();
    carLeftSideTexture.center = new THREE.Vector2(0.5, 0.5);
    carLeftSideTexture.rotation = Math.PI;
    carLeftSideTexture.flipY = false;

    const cabin = new THREE.Mesh(new THREE.BoxBufferGeometry(28, 20, 45), [
      new THREE.MeshLambertMaterial({ map: carFrontTexture }),
      new THREE.MeshLambertMaterial({ map: carBackTexture }),
      new THREE.MeshLambertMaterial({ color: 0xffffff }),
      new THREE.MeshLambertMaterial({ color: 0xffffff }),
      new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
      new THREE.MeshLambertMaterial({ map: carLeftSideTexture })
    ]);
    cabin.position.x = 30;
    cabin.position.y = 25.5;
    car.add(cabin);

    const truck = new THREE.Mesh(new THREE.BoxBufferGeometry(65, 30, 49),
      new THREE.MeshLambertMaterial({ color: 0x6e6c6b }),
    );
    truck.position.x = -18;
    truck.position.y = 25.5;
    car.add(truck);

    return car;
  }

  function createWheels2() {
    const geometry = new THREE.BoxBufferGeometry(15, 15, 60);
    const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const wheel = new THREE.Mesh(geometry, material);
    return wheel;
  }

  function createCar3() {
    const car = new THREE.Group();

    const backWheel = createWheels3();
    backWheel.position.y = 5;
    backWheel.position.x = -26;
    car.add(backWheel);

    const frontWheel = createWheels3();
    frontWheel.position.y = 5;
    frontWheel.position.x = 26;
    car.add(frontWheel);

    const main = new THREE.Mesh(
      new THREE.BoxBufferGeometry(75, 15, 45),
      new THREE.MeshLambertMaterial({ color: 0xa52523 })
    );
    main.position.y = 12;
    car.add(main);

    const carFrontTexture = getCarFrontTexture();

    const carBackTexture = getCarFrontTexture();

    const carRightSideTexture = getCarSideTexture();

    const carLeftSideTexture = getCarSideTexture();
    carLeftSideTexture.center = new THREE.Vector2(0.5, 0.5);
    carLeftSideTexture.rotation = Math.PI;
    carLeftSideTexture.flipY = false;

    const cabin = new THREE.Mesh(new THREE.BoxBufferGeometry(53, 25, 39), [
      new THREE.MeshLambertMaterial({ map: carFrontTexture }),
      new THREE.MeshLambertMaterial({ map: carBackTexture }),
      new THREE.MeshLambertMaterial({ color: 0xffffff }),
      new THREE.MeshLambertMaterial({ color: 0xffffff }),
      new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
      new THREE.MeshLambertMaterial({ map: carLeftSideTexture })
    ]);
    cabin.position.x = -11;
    cabin.position.y = 22;
    car.add(cabin);



    return car;
  }

  function createWheels3() {
    const geometry = new THREE.BoxBufferGeometry(15, 15, 50);
    const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const wheel = new THREE.Mesh(geometry, material);
    return wheel;
  }

}
