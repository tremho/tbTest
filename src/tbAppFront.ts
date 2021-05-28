

import {ExampleIndicator} from "./toolExtensions/ExampleIndicator"

export function appStart(appContext:any) {
    // Log.info('App Front sees appStart', appContext)

    // Log.debug('setup Model')
    const model = appContext.model;
    model.addSection('testValues', {mainLabel: 'Hello, World! This is ThunderBolt!'})

    appContext.registerToolExtension('Example', ExampleIndicator)


    // This must be here or nothing appears on screen.  TODO: look into this and fix defaults and/or display errors
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

        appContext.registerMenuHandler('FLEX_LAYOUT', (menuEvent:any) => {
            appContext.navigateToPage('flex-layout-test')
        })
        appContext.registerMenuHandler('FLEX_JUSTIFY', (menuEvent:any) => {
            appContext.navigateToPage('flex-justify-test')
        })
        appContext.registerMenuHandler('FLEX_ALIGN_ITEMS', (menuEvent:any) => {
            appContext.navigateToPage('flex-align-test', {type:'items'})
        })
        appContext.registerMenuHandler('FLEX_ALIGN_CONTENT', (menuEvent:any) => {
            appContext.navigateToPage('flex-align-test', {type:'content'})
        })
        appContext.registerMenuHandler('FLEX_CHILDREN', (menuEvent:any) => {
            appContext.navigateToPage('flex-children-test')
        })


        appContext.registerMenuHandler('FILEAPI', (menuEvent:any) => {
            appContext.navigateToPage('file-test')
        })
    })

}
export function appExit(appContext:any) {
    console.warn('App Front sees appExit', appContext)
}
