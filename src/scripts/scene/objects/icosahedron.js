import { Body, Sphere, Vec3 } from "cannon"
import { Mesh, MeshLambertMaterial, IcosahedronGeometry } from "three" 

export default class ExempleCube {
  constructor({ scene, physic }) {
    this.scene = scene
    this.physic = physic
    this.init()
    this.initPhysic()
    this.update()
  }
  
  init() {
    const material = new MeshLambertMaterial({
      color: 0x9adcff,
    });

    const obj = new IcosahedronGeometry(1);
    this.ico = new Mesh(obj, material);

    this.scene.add(this.ico)
  }

  initPhysic() {
    const sphereShape = new Sphere(1)
    this.spherePhysic = new Body({
      mass: 1,
      position: new Vec3(0, 3, 0),
      shape: sphereShape,
      material: this.physic.materials.plasticMaterial
    })
    this.physic.world.addBody(this.spherePhysic)
  }

  update() {
    const position = this.spherePhysic.position

    this.ico.position.x = position.x
    this.ico.position.y = position.y
    this.ico.position.z = position.z

    window.requestAnimationFrame(() => {
      this.update()
    })
  }
}