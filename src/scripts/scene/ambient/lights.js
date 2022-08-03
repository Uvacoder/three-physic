import { AmbientLight, SpotLight } from "three";

export default class Lights {
  constructor({ scene }) {
    this.scene = scene
    this.init()
  }

  init() {
    this.addAmbientLight()
    this.addSpotLight()
  }

  addAmbientLight() {
    this.light = new AmbientLight( 0x404040 );
    this.scene.add(this.light);
  }

  addSpotLight() {
    this.spotLight = new SpotLight( 0xffffff );
    this.spotLight.position.set( -40, 60, -10 );
    this.scene.add( this.spotLight );
  }
}