
import {targetPlatform} from 'thunderbolt-desktop'
import {registerApp, TBBackApp, FrameworkBackContext} from "thunderbolt-common"

import * as myExtension from "./backExtensions/testExtension"

class TBTestApp implements TBBackApp {

    appStart(context: FrameworkBackContext): Promise<void> {
        console.log('Back App Start called', Date.now())

        console.log('registering as test', myExtension)
        context.registerExtensionModule('test', myExtension)

        return Promise.resolve(undefined);
    }

    appExit(context: FrameworkBackContext): Promise<void> {
        console.log('Back App Exit called')
        return Promise.resolve(undefined);
    }
}

const ourApp = new TBTestApp()
registerApp(targetPlatform, ourApp)

