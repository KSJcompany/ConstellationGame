class CameraController {
    constructor() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
        );
        this.camera.position.set(0, 0, 5);
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.mouseDown = false;
    }

    getCamera() {
        return this.camera;
    }

    setupControls(domElement) {
        domElement.addEventListener('mousedown', (e) => {
            this.mouseDown = true;
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        domElement.addEventListener('mousemove', (e) => {
            if (!this.mouseDown) return;

            const deltaX = e.clientX - this.mouseX;
            const deltaY = e.clientY - this.mouseY;
            
            this.targetRotationY += deltaX * 0.01;
            this.targetRotationX += deltaY * 0.01;

            // 수직 회전 제한
            this.targetRotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.targetRotationX));

            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        domElement.addEventListener('mouseup', () => {
            this.mouseDown = false;
        });

        domElement.addEventListener('wheel', (e) => {
            const fov = this.camera.fov + e.deltaY * 0.05;
            this.camera.fov = Math.max(10, Math.min(90, fov));
            this.camera.updateProjectionMatrix();
        });
    }

    update() {
        this.camera.rotation.x += (this.targetRotationX - this.camera.rotation.x) * 0.05;
        this.camera.rotation.y += (this.targetRotationY - this.camera.rotation.y) * 0.05;
    }
}