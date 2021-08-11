
export function pageStart(app:any, context:any) {
    console.log('system information ')

    const env = app.model.getAtPath('environment')
    const {cwd, assetsPath, appDataPath, documentsPath, downloadsPath, desktopPath} = app.Path

    let fwFront = ''
    let fwFrontVersion = ''
    let fwHost = ''
    let fwHostVersion = ''
    if(env.runtime.framework.riot) {
        fwFront = 'riot'
        fwFrontVersion = env.runtime.framework.riot
        fwHostVersion = env.runtime.framework.electron
        fwHost = fwHostVersion ? 'electron' : '???'
    } else if(env.runtime.framework.nativescript) {
        fwFront = 'nativescript'
        fwFrontVersion = env.runtime.framework.nativescript
        fwHost = 'TODO'
        fwHostVersion = 'TODO' // TODO: get NS host os and version info in env.
    }
    let nodeVersion = env.runtime.framework.version;
    app.setPageData('sys-info-page', 'appName', env.build.app.name)
    app.setPageData('sys-info-page', 'host', fwHost)
    app.setPageData('sys-info-page', 'hostVersion', fwHostVersion)
    app.setPageData('sys-info-page', 'front', fwFront)
    app.setPageData('sys-info-page', 'frontVersion', fwFrontVersion)

    app.setPageData('sys-info-page', 'check', 'value set')
    app.setPageData('sys-info-page', 'env', env)
    app.setPageData('sys-info-page', 'path', {
        cwd,
        assetsPath: assetsPath || '<undefined>',
        appDataPath: appDataPath  || '<undefined>',
        documentsPath: documentsPath  || '<undefined>',
        downloadsPath: downloadsPath  || '<undefined>',
        desktopPath: desktopPath || '<undefined>'
    })
    app.updatePage('sys-info-page')

    console.log('sys-info', env, app.Path)
}
