# Third refactor

_... is the charm?_

#### What I'm doing this round
Turns out we can't include the framework as I had it in the single thunderbolt-framework
module because the NS webpack process chokes on submodules that require
node-specifics or other bad juju (like electron, fs, os, etc).

Of course, I'd already handled ___runtime___ conflicts with the try/catch
thing, but this problem occurs at webpack _build_ time, so that's a different
kettle of horses with various colors.  

Webpack has the concept of `resolve.alias.moduleName = false` as a config
fix for this sort of thing, but I can't get the Nativescript webpack 'chain'
directive to work for this, so it keeps doggedly including references to
'fs' or 'path' which seem to come from electron/index.js, so I think it's
toast.

Instead, I'm breaking it down into separate modules instead of one:

###### thunderbolt-common
basically replaces thunderbolt-framework in that it handles all the common 
features and the bootstrap and lifecycle flow, etc., but without importing
any of the target platform specific dependencies. 

###### thunderbolt-desktop
brings in the dependencies needed to faciliate the bootstrap and 
electron-side features and makes them available in an injectable export

###### thunderbolt-mobile
does much the same for the nativescript side.

###### thunderbolt-cli
This node-tool project is now separated from thunderbolt itself and
stands alone as a separate utility.

### Injection
Basically, a desktop app includes and injects like this:
```
import {startupInjection} from 'thunderbolt-desktop'
import {injectDesktopDependencies, registerApp, TBBackApp, FrameworkBackContext} from "thunderbolt-common"

injectDesktopDependencies(startupInjection)

class TBTestApp implements TBBackApp {

    // ... snip...
}

const ourApp = new TBTestApp()
registerApp(ourApp)

```
but in a later version I should be able to simplify as
```

import targetPlatform from 'thunderbolt-desktop'
import {registerApp, TBBackApp, FrameworkBackContext} from "thunderbolt-common"

injectDesktopDependencies(startupInjection)

class TBTestApp implements TBBackApp {

    // ... snip...
}

const ourApp = new TBTestApp()
registerApp(targetPlatform, ourApp)

```
Note the change to the first import and the parameter signature of
`registerApp`.

On Nativescript export, 'thunderbolt-desktop' is renamed 'thunderbolt-mobile'
and the rest should follow migration.

##### What's in a name
I intend to publish under the following scoped names:
`@thunderbolt/desktop`
`@thunderbolt/common`
`@thunderbolt/mobile`
`@thunderbolt/cli`

##### typings
note that the `tbTest` project has a typings folder.  This should
be an import that comes from the modules themselves.

-------------
##### 4/28 pm

###### Change to build command line
`tbx` is now globally linked. So that's cool.
But we have to include our project path now.
So `tbx build .` (or theoretically passing a path would also work)

###### More change TODO
This bit of command line is likely to change again anyway because
I want to support 'prepare' and 'compile' options.

###### Notes:
It's running the build script successfully up until it tries to
load from packPath (buildPack) as defined by tbx build, and of course
there's no files there.
Looks like these need to be there and compiled into build.

- [ ] Let's hook that up and see what the next step is

-------------



