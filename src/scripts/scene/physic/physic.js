import { World, Material, ContactMaterial, Plane, Body, Vec3 } from 'cannon' 
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
    this.generateContainer()
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
          friction: 2,
          restitution: 0.05
      }
    )
    this.world.addContactMaterial(concretePlasticContactMaterial)
  }

  generateContainer() {
    // Plane -x
    var planeShapeXmin = new Plane();
    var planeXmin = new Body({ mass: 0 });
    planeXmin.material = this.materials.concreteMaterial
    planeXmin.addShape(planeShapeXmin);
    planeXmin.quaternion.setFromAxisAngle(new Vec3(0,1,0),Math.PI/2);
    planeXmin.position.set(-1,0,0);
    this.world.addBody(planeXmin);

    // Plane +x
    var planeShapeXmax = new Plane();
    var planeXmax = new Body({ mass: 0 });
    planeXmax.material = this.materials.concreteMaterial
    planeXmax.addShape(planeShapeXmax);
    planeXmax.quaternion.setFromAxisAngle(new Vec3(0,1,0),-Math.PI/2);
    planeXmax.position.set(1,0,0);
    this.world.addBody(planeXmax);

    // Plane -y
    var planeShapeYmin = new Plane();
    var planeYmin = new Body({ mass: 0 });
    planeYmin.material = this.materials.concreteMaterial
    planeYmin.addShape(planeShapeYmin);
    planeYmin.quaternion.setFromAxisAngle(new Vec3(1,0,0),-Math.PI/2);
    planeYmin.position.set(0,-1,0);
    this.world.addBody(planeYmin);

    // Plane +z
    var planeShapeZmax = new Plane();
    var planeZmax = new Body({ mass: 0 });
    planeZmax.material = this.materials.concreteMaterial
    planeZmax.addShape(planeShapeZmax);
    planeZmax.quaternion.setFromAxisAngle(new Vec3(0,1,0),-Math.PI);
    planeZmax.position.set(0,0,1);
    this.world.addBody(planeZmax);
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