import { join } from 'path'
import { expect } from 'chai'
import webpack from './index'
import fileExtensions from '../file-extensions'

const saguiPath = join(__dirname, '../../../')
const projectPath = join(saguiPath, 'spec/fixtures/simple-project')

const baseSaguiConfig = {
  saguiPath,
  projectPath,
  pages: ['index']
}

describe('webpack', function () {
  describe('webpackConfig extension', function () {
    it('should allow extending the default configuration', function () {
      const saguiConfig = {
        ...baseSaguiConfig,
        additionalWebpackConfig: {
          target: 'electron'
        }
      }

      const config = webpack(saguiConfig)[0]

      expect(config.target).equal('electron')
    })

    it('should allow overwriting the default configuration', function () {
      const defaultConfig = webpack(baseSaguiConfig)[0]
      expect(defaultConfig.devtool).equal('inline-source-map')

      const saguiConfig = {
        ...baseSaguiConfig,
        additionalWebpackConfig: {
          devtool: 'cheap-source-map'
        }
      }

      const config = webpack(saguiConfig)[0]
      expect(config.devtool).equal('cheap-source-map')
    })

    it('should allow changing a loader based on the test (webpack-merge feature)', function () {
      // disable the default exclude behavior of Babel
      const saguiConfig = {
        ...baseSaguiConfig,
        additionalWebpackConfig: {
          module: {
            loaders: [
              {
                test: fileExtensions.test.JAVASCRIPT,
                loader: 'babel'
              }
            ]
          }
        }
      }

      const config = webpack(saguiConfig)[0]
      const loaders = config.module.loaders.filter((loader) => loader.loader === 'babel')

      // should change the existing loader, not add another
      expect(loaders.length).equal(1)

      // should remove the exclude attribute as requested
      expect(loaders[0].exclude).to.eql(undefined)
    })
  })
})
