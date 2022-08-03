import { Body, Sphere, Vec3 } from "cannon"
import { Mesh, MeshLambertMaterial, IcosahedronGeometry } from "three" 

export default class Icosahedron {
  constructor({ scene, physic }) {
    this.scene = scene
    this.physic = physic

    this.settings = {
      instance: 4,
      size: 0.2,
      position: {
        x: 0,
        y: 10,
        z: 0
      },
      mass: 100
    } 
    this.objs = []
    this.objsPhysics = []

    this.init()
    this.update()
  }
  
  init() {
    this.material = new MeshLambertMaterial({
      color: 0x9adcff,
    });

    this.obj = new IcosahedronGeometry(this.settings.size);
    
    this.createObjects()
  }

  createObjects() {
    for(let i = 0; i < this.settings.instance; i++) {
      const ico = new Mesh(this.obj, this.material);
      ico.position.x = this.settings.position.x
      ico.position.y = this.settings.position.y
      ico.position.z = this.settings.position.z

      setTimeout(() => {
        const physic = this.initPhysic()
        this.objs.push([
          ico,
          physic
        ])
        this.scene.add(ico)
        this.physic.world.addBody(physic)
      }, 2000 * i)
    }
  }

  initPhysic() {
    const sphereShape = new Sphere(this.settings.size)
    const spherePhysic = new Body({
      mass: this.settings.mass,
      position: new Vec3(this.settings.position.x, this.settings.position.y, this.settings.position.z),
      shape: sphereShape,
      material: this.physic.materials.plasticMaterial
    })
    return spherePhysic
  }

  update() {
    for(let i = 0; i < this.objs.length; i++) {
      const item = this.objs[i]
      item[0].position.x = item[1].position.x
      item[0].position.y = item[1].position.y
      item[0].position.z = item[1].position.z
    }

    window.requestAnimationFrame(() => {
      this.update()
    })
  }
}