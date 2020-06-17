var vertexShader = document.getElementById('vertexShader').textContent;
var fragmentShader = document.getElementById('fragmentShader').textContent;

var clock = new THREE.Clock();
var scene = new THREE.Scene();

var colorsPerFace = [
"#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000"];


// from https://stackoverflow.com/a/5624139
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255 };

}

var vertices = [];
var colors = [];
var particleCount = 13000;

var geometry = new THREE.BufferGeometry();

for (var i = 0; i < particleCount; i++) {
    var x = Math.floor(Math.random() * 1000 - 100);
    var y = Math.floor(Math.random() * 1000 - 800);
    var z = Math.floor(Math.random() * 1000 - 700);
    vertices.push(x, y, z);

    var rgbColor = hexToRgb(colorsPerFace[Math.floor(Math.random() * colorsPerFace.length)]);
    colors.push(rgbColor.r, rgbColor.g, rgbColor.b);
}

var verticesArray = new Float32Array(vertices);
geometry.addAttribute('position', new THREE.BufferAttribute(verticesArray, 3));

var colorsArray = new Float32Array(colors);
geometry.addAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

var uniforms = {
    time: {
        type: 'f',
        value: 0.0 },

    size: {
        type: 'f',
        value: 200.0 } };



var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending });


var points = new THREE.Points(geometry, material);
scene.add(points);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);


var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

var render = function render() {
    clock.getDelta();
    var time = clock.elapsedTime * 0.2;

    uniforms.time.value += 0.5;

    var cameraDistance = 100;
    camera.position.x = cameraDistance * Math.sin(time);
    camera.position.z = cameraDistance * Math.cos(time);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer.render(scene, camera);

    requestAnimationFrame(render);
};

onResize();
render();

window.addEventListener("resize", onResize);

function onResize() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
}
