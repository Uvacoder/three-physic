import { Body, Sphere, Vec3 } from "cannon"
import { Mesh, MeshLambertMaterial, SphereGeometry } from "three" 

export default class Icosahedron {
  constructor({ scene, physic }) {
    this.scene = scene
    this.physic = physic

    this.settings = {
      instance: 100,
      size: 0.1,
      position: {
        x: 0,
        y: 10,
        z: 0
      },
      mass: 10
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

    this.obj = new SphereGeometry(this.settings.size);
    
    this.createObjects()
  }

  createObjects() {
    for(let i = 0; i < this.settings.instance; i++) {
      const displacementCoeff = {
        x: Math.random() * (0.2 - (-0.2) +0.2) + (-0.2),
        z: Math.random() * (0.2 - (-0.2) +0.2) + (-0.2)
      }
      const ico = new Mesh(this.obj, this.material);
      ico.position.x = displacementCoeff.x + this.settings.position.x
      ico.position.y = this.settings.position.y
      ico.position.z = displacementCoeff.z + this.settings.position.z

      ico.rotation.x = Math.random() * Math.PI / 2

      setTimeout(() => {
        const physic = this.initPhysic(displacementCoeff)
        this.objs.push([
          ico,
          physic
        ])
        this.scene.add(ico)
        this.physic.world.addBody(physic)
      }, 100 * i)
    }
  }

  initPhysic(displacementCoeff) {
    const sphereShape = new Sphere(this.settings.size)
    const spherePhysic = new Body({
      mass: this.settings.mass,
      position: new Vec3(displacementCoeff.x + this.settings.position.x, this.settings.position.y, displacementCoeff.z + this.settings.position.z),
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