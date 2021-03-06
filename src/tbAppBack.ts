
import {targetPlatform} from '@tremho/jove-desktop'
import {registerApp, TBBackApp, FrameworkBackContext} from "@tremho/jove-common"

// import * as myExtension from "./backExtensions/testExtension"
const myExtension = {
    testFunction(banner:string) {
        console.log('---------------------')
        console.log(banner)
        console.log('---------------------')
        console.log('')
        if (typeof process !== 'undefined') {
            console.log(`node version ${process.versions.node}`)
        }
        return 'That was an epic test'
    }
}

class TBTestApp implements TBBackApp {

    appStart(context: FrameworkBackContext) {
        console.log('Back App Start called', Date.now())

        console.log('registering as test', myExtension)
        context.registerExtensionModule('test', myExtension)
    }

    appExit(context: FrameworkBackContext) {
        console.log('Back App Exit called')
    }
}

const ourApp = new TBTestApp()
registerApp(targetPlatform, ourApp)

