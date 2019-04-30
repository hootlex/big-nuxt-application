const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const seeds = require('./seeds')
const outDir = 'output'

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir)
}

const capitalize = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const emptyObjFunc = () => ({})

const traverse = async (componentName, component, componentNamePrefix) => {
  console.log('traversing', componentName)

  if (!component.dependencies) {
    return await createTemplate(
      component.template,
      componentNamePrefix + componentName,
      [],
      outDir,
      component.data || emptyObjFunc
    )
  }

  if (component.dependencies) {
    let deps = await Promise.all(
      Object.entries(component.dependencies).map(c =>
        traverse(...c, componentNamePrefix)
      )
    )

    return await createTemplate(
      component.template,
      componentNamePrefix + componentName,
      deps,
      outDir,
      component.data || emptyObjFunc
    )
  }
}

const createTemplate = (
  template,
  componentName,
  dependencies,
  outDir,
  componentData
) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      template,
      {
        componentName,
        dependencies,
        ...componentData()
      },
      (err, str) => {
        // console.log(err, str)
        if (err) return reject(err)

        fs.writeFileSync(path.resolve(outDir, componentName + '.vue'), str)

        resolve({
          name: componentName,
          path: componentName + '.vue'
        })
      }
    )
  })
}

const createMod = moduleName => {
  fs.mkdirSync(path.resolve(__dirname, '..', 'pages', moduleName))
}

const createPage = (moduleName, pageName, pageDeps) => {
  const pageTemplatePath = path.resolve(__dirname, 'TemplatePage.ejs')
  const modulePath = path.resolve(__dirname, '..', 'pages', moduleName)

  return createTemplate(
    pageTemplatePath,
    pageName,
    pageDeps,
    modulePath,
    emptyObjFunc
  )
}

const createIndex = (moduleName, links) => {
  const indexTemplatePath = path.resolve(__dirname, 'TemplateIndex.ejs')
  const modulePath = path.resolve(__dirname, '..', 'pages', moduleName)

  return createTemplate(indexTemplatePath, 'index', [], modulePath, () => ({
    links
  }))
}
;(async () => {
  for (const mod of seeds.modules) {
    createMod(mod)
    for (const page of seeds.pages) {
      let pageDeps = []
      const componentNamePrefix = capitalize(mod) + capitalize(page)

      for (const [componentName, component] of Object.entries(
        seeds.components
      )) {
        pageDeps.push(
          await traverse(componentName, component, componentNamePrefix)
        )
      }

      await createPage(mod, page, pageDeps)
    }
    await createIndex(mod, seeds.pages)
  }

  await createIndex('', seeds.modules)
})()
