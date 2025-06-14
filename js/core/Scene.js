class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x000000, 0.00005);
        
        this.setupLights();
        this.createStarfield();
    }

    getScene() {
        return this.scene;
    }

    setupLights() {
        // 환경광
        const ambientLight = new THREE.AmbientLight(0x333366, 0.3);
        this.scene.add(ambientLight);

        // 점광원
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(0, 0, 0);
        this.scene.add(pointLight);
    }

    createStarfield() {
        // StarField 클래스를 사용하지 않고 직접 생성
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 2,
            sizeAttenuation: false,
            transparent: true,
            opacity: 0.8
        });

        const starsVertices = [];
        for (let i = 0; i < 10000; i++) {
            const radius = 900 + Math.random() * 100;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            starsVertices.push(x, y, z);
        }

        starsGeometry.setAttribute('position', 
            new THREE.Float32BufferAttribute(starsVertices, 3));
        
        const starField = new THREE.Points(starsGeometry, starsMaterial);
        this.scene.add(starField);
    }
}