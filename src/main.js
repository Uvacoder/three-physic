import './styles/main.scss'
import Base from './scripts/scene/base'

// Automatically load JS files in modules
const modulesLoader = () => {
  const modules = import.meta.globEager('./scripts/modules/*.js')
  for (const path in modules) {
    if(modules[path].default !== undefined) {
      if(modules[path].default.prototype) {
        new modules[path].default
      } else if(typeof modules[path].default === 'function') {
        modules[path].default()
      }
    }
  }
}

//Load Three.js scene & partials
const scene = []
const sceneLoader = () => {
  // Scene creation
  const base = new Base()
  import.meta.env.MODE === 'development' && console.log(`init.js loaded`)
  
  const modules = import.meta.globEager('./scripts/scene/*/*.js', { import: 'default' })
  for (const path in modules) {
    let module;

    // Disabled preload for physic.js
    if(path.split('/')[path.split('/').length - 1] === "physic.js") return

    if(!modules[path].default) return

    if(modules[path].default.prototype) {
      new modules[path].default(base)
    } else if(typeof modules[path].default === 'function') {
      modules[path].default(base)
    } else {
      return
    }
    import.meta.env.MODE === 'development' && console.log(`${path.split('/')[path.split('/').length - 1]} loaded`)
    scene.push(module)
  }
}

modulesLoader()
sceneLoader()