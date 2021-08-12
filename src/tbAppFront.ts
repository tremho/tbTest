

import {ExampleIndicator} from "./toolExtensions/ExampleIndicator"

export function appStart(appContext:any) {
    // Log.info('App Front sees appStart', appContext)

    // Log.debug('setup Model')
    const model = appContext.model;
    model.addSection('testValues', {mainLabel: 'Hello, World! This is a test, by Jove!'})

    appContext.registerToolExtension('Example', ExampleIndicator)


    // This must be here or nothing appears on screen.  TODO: look into this and fix defaults and/or display errors
    appContext.setPageData('file-test-page', {})
    appContext.setPageData('sys-info-page', {})

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

        appContext.registerMenuHandler('GRID_1', (menuEvent:any) => {
            appContext.navigateToPage('grid-test-1')
        })
        appContext.registerMenuHandler('GRID_2', (menuEvent:any) => {
            appContext.navigateToPage('grid-test-2')
        })
        appContext.registerMenuHandler('GRID_3', (menuEvent:any) => {
            appContext.navigateToPage('grid-test-3')
        })

        appContext.registerMenuHandler('PREPROC', (menuEvent:any) => {
            appContext.navigateToPage('preproc-test')
        })

        appContext.registerMenuHandler('PROPSET', (menuEvent:any) => {
            appContext.navigateToPage('propset-test')
        })

        appContext.registerMenuHandler('INTL', (menuEvent:any) => {
            appContext.navigateToPage('intl-test')
        })

        appContext.registerMenuHandler('FILEAPI', (menuEvent:any) => {
            appContext.navigateToPage('file-test')
        })

        // appContext.registerMenuHandler('APP_ABOUT', (menuEvent:any) => {
        //     console.log('APP_ABOUT Selected')
        //     return true
        // })
        appContext.registerMenuHandler('ABOUT_JOVE', (menuEvent:any) => {
            console.log('ABOUT_JOVE Selected')
            const options = {
                title:'About Jove Framework',
                message:'Jove is all you need',
                detail: 'Development for desktop and mobile apps\n©2021 Tremho Berserker Development, LLC',
                buttons: ['O&kay']
            }
            appContext.messageBox(options).then((rt:any) => {
                console.log(rt)
            })
            return true
        })
    })

}
export function appExit(appContext:any) {
    console.warn('App Front sees appExit', appContext)
}
