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
const sceneLoader = () => {
  // Scene creation
  const base = new Base()
  import.meta.env.MODE === 'production' && console.log(`init.js loaded`)
  
  const modules = import.meta.globEager('./scripts/scene/*/*.js', { import: 'default' })
  for (const path in modules) {
    // Disabled preload for physic.js
    const file = path.split('/')[path.split('/').length - 1]
    if(file === "physic.js") return


    import.meta.env.MODE === 'production' && console.log(`${file} loading`)
    console.log(modules[path].default)

    if(modules[path].default.prototype) {
      new modules[path].default(base)
    } else if(typeof modules[path].default === 'function') {
      modules[path].default()
    }
    import.meta.env.MODE === 'production' && console.log(`${file} loaded`)
  }
}

modulesLoader()
sceneLoader()