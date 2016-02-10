import * as actions from './action'
import plugins from './plugins'

export default {
  build (options) {
    const env = plugins({ ...options, buildTarget: 'build' })
    actions.buildAndDistribute(env)
  },

  dist (options) {
    const env = plugins({ ...options, buildTarget: 'dist' })
    actions.buildAndDistribute(env)
  },

  develop (options) {
    const env = plugins({ ...options, buildTarget: 'develop' })
    actions.startDevelop(env)
  },

  test (options) {
    const env = plugins({ ...options, buildTarget: 'test' })
    actions.runTest(env)
  },

  install (options) {
    const env = plugins({ ...options, buildTarget: 'test' })
    actions.install(env)
  }
}

