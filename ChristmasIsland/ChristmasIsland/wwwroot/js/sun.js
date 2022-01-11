function sun() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    renderer.setClearColor(0xb7c3f3, 1);

    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    const end_position = 3;
    const start_position = -end_position;
    const crab_start_position = start_position / 2;
    const crab_end_position = -crab_start_position;

    const text = document.querySelector(".text");

    const TIME_LIMIT = 10;
    let gameStat = false;
    let isNight = true;

    function createCube(size, positionX, rotY = 0, color = 0xfbc851) {
        const geometry = new THREE.BoxGeometry(size.w, size.h, size.d);
        const material = new THREE.MeshBasicMaterial({ color: color });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = positionX;
        cube.rotation.y = rotY;
        scene.add(cube);

        return cube;
    }

    camera.position.z = 5;

    const loader = new THREE.GLTFLoader();

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    class Sphere {
        constructor() {
            loader.load("../models/sphere/scene.gltf", (gltf) => {
                scene.add(gltf.scene);
                gltf.scene.scale.set(.003, .003, .003);
                gltf.scene.position.set(0, 0, 0);

                this.sphere = gltf.scene;
            });
        }

        lookDay() {
            gsap.to(this.sphere.rotation, { x: -1.5, duration: .45 });
            setTimeout(() => isNight = false, 450);
        }

        lookNight() {
            gsap.to(this.sphere.rotation, { x: 1.5, duration: .45 });
            setTimeout(() => isNight = true, 150);
        }

        async start() {
            this.lookNight();
            await delay((Math.random() * 1000) + 1000);
            this.lookDay();
            await delay((Math.random() * 750) + 750);
            this.start();
        }
    }

    function createTrack() {
        createCube({ w: end_position * 2 + .2, h: 1.5, d: 1 }, 0, 0, 0xe5a716).position.z = -1;
        createCube({ w: .2, h: 1.5, d: 1 }, end_position, -.35);
        createCube({ w: .2, h: 1.5, d: 1 }, start_position, .15);
    }
    createTrack();

    class Crab {
        constructor() {
            const geometry = new THREE.PlaneGeometry(.3, .3);
            const loader = new THREE.TextureLoader();
            const material = new THREE.MeshBasicMaterial({
                map: loader.load("../image/pixel_crab.png"),
                transparent: true
            });
            const plane = new THREE.Mesh(geometry, material);
            plane.position.z = 3;
            plane.position.x = crab_start_position;
            scene.add(plane);
            this.crab = plane;

            this.crabInfo = {
                positionX: crab_start_position,
                velocity: 0
            };
        }

        run() {
            this.crabInfo.velocity = .01;
        }

        stop() {
            gsap.to(this.crabInfo, { velocity: 0, duration: .1 });
        }

        check() {
            if (this.crabInfo.velocity > 0 && !isNight) {
                location = "/ending-burning";
                alert("Game Over");
                return;
            }
            if (this.crabInfo.positionX > crab_end_position - .2) {
                location = "/rock/intro";
                alert("Clear");
                return;
            }
        }

        update() {
            this.check();
            this.crabInfo.positionX += this.crabInfo.velocity;
            this.crab.position.x = this.crabInfo.positionX;
        }
    }

    const crab = new Crab();
    const sphere = new Sphere();

    async function init() {
        await delay(500);
        text.innerText = "Starting in 3";
        await delay(500);
        text.innerText = "Starting in 2";
        await delay(500);
        text.innerText = "Starting in 1";
        await delay(500);
        text.innerText = "Go!!!";
        startGame();
    }

    function startGame() {
        gameStat = true;
        let progressBar = createCube({ w: 5, h: .1, d: 1 }, 0);
        progressBar.position.y = 3.35;
        gsap.to(progressBar.scale, { x: 0, duration: TIME_LIMIT, ease: "none" });
        sphere.start();
        setTimeout(() => {
            if (gameStat) {
                alert("Game Over");
                location = "/ending-burning";
            }
        }, TIME_LIMIT * 1000);
    }

    init();

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        crab.update();
    }
    animate();

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    document.addEventListener('keydown', function (event) {
        if (!gameStat) return;
        crab.run();
    })

    document.addEventListener('keyup', function (event) {
        crab.stop();
    })
}