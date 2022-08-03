import { Body, Plane, Vec3 } from "cannon"
import { DoubleSide, Mesh, MeshLambertMaterial, PlaneGeometry } from "three"

export default class Floor {
  constructor({ scene, physic }) {
    this.scene = scene
    this.physic = physic
    this.settings = {
      width: 20,
      height: 20,
      color: 0xffffff
    }
    this.init()
    this.initPhysic()
  }

  init() {
    const plane = new PlaneGeometry(this.settings.width, this.settings.width)
    const material = new MeshLambertMaterial({
      color: this.settings.color,
      side: DoubleSide
    })
    this.floor = new Mesh(plane, material)
    this.floor.rotation.x = Math.PI / 2
    this.floor.rotation.z = Math.PI / 4
    this.scene.add(this.floor)
  }

  initPhysic() {
    const floorShape = new Plane()
    this.floorBody = new Body()
    this.floorBody.mass = 0
    this.floorBody.addShape(floorShape)
    this.floorBody.material = this.physic.materials.concreteMaterial
    this.floorBody.quaternion.setFromAxisAngle(new Vec3(- 1, 0, 0), Math.PI * 0.5) 

    this.physic.world.addBody(this.floorBody)
  }
}
