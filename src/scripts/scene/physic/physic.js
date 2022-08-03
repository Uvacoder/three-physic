import { World, Material, ContactMaterial, Sphere, Body, Vec3, Plane } from 'cannon' 
import { Clock } from 'three'

export default class Physic {
  constructor({ scene }) {
    this.scene = scene

    // Used to update on each frame
    this.clock = new Clock()
    this.oldElapsedTime = 0

    this.init()
    this.update()
  }

  init() {
    this.world = new World()
    this.world.gravity.set(0, - 9.82, 0)

    this.initMaterials()
  }

  initMaterials() {
    this.materials = {
      concreteMaterial: new Material('concrete'),
      plasticMaterial: new Material('plastic')
    }

    const concretePlasticContactMaterial = new ContactMaterial(
      this.materials.concreteMaterial,
      this.materials.plasticMaterial,
      {
          friction: 0.1,
          restitution: 0.7
      }
    )
    this.world.addContactMaterial(concretePlasticContactMaterial)
  }

  update() {
    const elapsedTime = this.clock.getElapsedTime()
    const deltaTime = elapsedTime - this.oldElapsedTime
    this.oldElapsedTime = elapsedTime

    this.world.step(1 / 60, deltaTime, 3)

    window.requestAnimationFrame(() => {
      this.update();
    });
  }
}