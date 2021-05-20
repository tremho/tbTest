

import {ExampleIndicator} from "./toolExtensions/ExampleIndicator"

export function appStart(appContext:any) {
    // Log.info('App Front sees appStart', appContext)

    // Log.debug('setup Model')
    const model = appContext.model;
    model.addSection('testValues', {mainLabel: 'Hello, World! This is ThunderBolt!'})

    appContext.registerToolExtension('Example', ExampleIndicator)

    appContext.setPageData('file-test-page', {
        // exist1: false,
        // exist2: false,
        // readtext: false,
        // readtextErr: false,
        // writetext: false,
        // writetextErr: false,
        // rename: false,
        // renameErr: false,
        // move: false,
        // moveErr: false,
        // copy: false,
        // copyErr: false,
        // stat: false,
        // stat2: false,
        // statErr: false,
        // mkdir: false,
        // mkdir2: false,
        // mkdirErr: false,
        // rmdir: false,
        // rmdir2: false,
        // rmdirErr: false,
        // readdir: false,
        // readdirErr: false
    })

    // Log.debug('setup Menu')
    return appContext.setupMenu('menuDef.txt').then(() => {
        appContext.registerMenuHandler('VERTICAL_STACK', (menuEvent:any) => {
            appContext.navigateToPage('stack-test', {type:'vertical'})
        })
        appContext.registerMenuHandler('HORIZONTAL_STACK', (menuEvent:any) => {
            appContext.navigateToPage('stack-test', {type:'horizontal'})
        })
        appContext.registerMenuHandler('VERTICAL_STACK_ALIGNED', (menuEvent:any) => {
            appContext.navigateToPage('stack-test', {type:'vertical-spaced'})
        })
        appContext.registerMenuHandler('HORIZONTAL_STACK_ALIGNED', (menuEvent:any) => {
            appContext.navigateToPage('stack-test', {type:'horizontal-spaced'})
        })

        appContext.registerMenuHandler('FILEAPI', (menuEvent:any) => {
            appContext.navigateToPage('file-test')
        })
    })

}
export function appExit(appContext:any) {
    console.warn('App Front sees appExit', appContext)
}
