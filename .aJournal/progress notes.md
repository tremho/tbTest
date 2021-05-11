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

Or a better idea:
```
import {registerApp} from 'thunderbolt-desktop'
import {TBBackApp, FrameworkBackContext} from "thunderbolt-common"

class TBTestApp implements TBBackApp {

    // ... snip...
}

const ourApp = new TBTestApp()
registerApp(ourApp)
```
In this one, the beauty is we don't need to mess with the injection object
at all because it gets picked up inherently by a `registerApp` function
that lives in the desktop module.  

We could go further with that and make all the imports come from the targeted
module, but that risks going too far and making the common startup flow
code divergent.

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

- [X] Let's hook that up and see what the next step is

##### 4/29 wee AM

- [X] Now check what other dependencies we had before.
  - looks like:
  - riot
  - awesome-typescript-loader
  - references to Framework and FrameworkComponents we should purge
  - which means we need some common files in place too.

##### 4/29 AM
  - Past that. turns out modules must belong to tbTest for this bit.
  - also note weird issue where npm link references go away sometimes 
after another npm install
    
Currently, gets as far as needing files from common...

##### 4/29 6:36 am
__WhooHoo!__ build completes without errors.
Let's check it out...
- [X] tbx run fails
    - this turned out to be a missing path (.) because, just like build, it is now needed.
- [X] Electron runs and pop up error display `AppGateway is not a constructor`
      - missing parts of injection
- [X] Preload not found
    - move to desktop module
- [X] A series of unfortunate events, a complaint about 'window'
- [X] Fails to load main page

___7:39___<br/>
Okay, so we get it to 'run' and it's now loading the page, but
nothing is displaying.
Need to break it down and see where it goes sideways.

- looks like none of the framework components are getting registered
- testcomp appears to be, and it works great, even doing it's autobinding.

-- __Okay__: Everything seems to work nominally now that we got
the registration figured out. YES! (__8:39 am)

------------------
##### 4/29 moving ahead
- √ Let's revisit tbx run and the build-detect and build feature.

__At this point (10:16 am)__: Export to Nativescript doesn't run. No suprise. That's the next frontier.

-----------------
- needed to install thunderbolt-common and thunderbolt-mobule in ns project.
  - need to add to package template
- appBack needs reference to desktop changed to mobile on migration

- Known warning: Alias to Assets and Generated obviously don't work.
- components and pages reference thunderbolt-framework/mobile --> should be thunderbolt-mobile
- Are we importing {Application} from nscore? If so, nscore is undefined.
- revisit injection.
- let's start there and kill 2 birds with 1 stone:
  - move registerApp to platform target
    - working for desktop
    - [ ] desktop/mobile import migration
      - didn't work
    - [ ] also component/pages migration 
    - [ ] export componentsExport from mobile
  
------
###### Post-export manual fixes
```
npm uninstall thunderbolt-framework
npm link ../../thunderbolt-mobile
npm link ../../thunderbolt-common
```  
- replace 'desktop' with mobile in app/tbAppBack.ts

the appBack migration is frustratingly stubborn.  WTF?

dropping the links is a big deal. let's revisit the template
to try to fix some of this by making a file reference to the global.

- Okay.  those annoyances are fixed. 
- But it fails at launch/main.
--------------
###### Okay. end of day 4/29 (long day)

My quarry still eludes me.

Chipped away at it all with good progress, and I think the break-up
was a good thing.

Problem now is componentExports aren't coming through.

This doesn't look like a typo-related problem like the other bad
imports.  I think this one may be a failure to build or export 
files that depend upon the automagical nature of {N}.

Do a test with pure Npm: import componentExports and see what you 
see.  If that is positive, try a similar test with a vanilla NS app and see
if we can get actual instances.  I'm betting one of these will fail.

Which I think means we have to move the code into place at the target and build
it there.

If we have to do that, we should also find a way to limit it to components 
that are referenced (in pages and components)


Fun times.

##### 4/30
Okay. so maybe it is typo-related.
- tb-components must be .ts not .js
- TBPage / TBContent were never included in export

So that's been addressed. We'll try again.
- TBPage needs getTheApp access somehow

- Got to Simple Label.
- Okay! Problem with SimpleLabel was use of require() vs. import for a class.

##### 4/30 9:33am  -- First Light Across the universe
__Yay! It's working!__ Sort of. 

Problems exist: 
- √ click doesn't go to next page.
   - __Solved__: Problem was lack of handoff for getTheApp in ComponentBase.
   - √ ___New Problem___: Next page fails
  because `TestComp` isn't migrated (works to fix manually) 
- √ back icon appears on main page
  - appears to be inverted logic, because it's not on next page
- √ menu logs but of course doesn't open because of app access commented out.

------
##### 5/1 1:30 pm Saving progress with remaining issues:
- √ binding updates not working
   - √ Proper injection of ComCommon fixed this
  
- ◊ test component not appearing
  - √ problem 1: Not setting initial text
  - problem 2: Not calling beforeLayout to form auto-bind
      - √ Now it is called, but local binds weren't set
      - √ Local binds are set
    
  - issue 3: No style is applied
    - ◊ come back to this
  
  - click fails because the `handleAction` code is riot-specific
  and refers to `this.props.action` directly should use `getComponentAttribute`
    - √ Okay, but now it has problem with 'this' in handle action
    - √ Last but not least, wrong arguments were passed.
    
  - we should have a tagname prop that is portable
  

- stack layout test fails
  - √ Reference to Div() replaced with new `<section>` component
    - ◊ Works Desktop, but no sections appear mobile 
      - Apparently, I never implemented conditional display
      - ◊ But then everything should appear at once, right?
  
---
  This  has revealed the following:

- ◊ `<section>` should become `<cond-sect>` and implement `if` property
on mobile to basically make it inverse setting for `hidden`
- ◊ We need to pick up the page conditional methods and access them
from the section.
- ◊ We also need to do bindings like we do for components here on the page.
Are we using PageComp? Shouldn't this be implemented at the TBContent level?
  

- ◊ simple-label isn't working in here, but regular label does. ??
  - √ Turns out setting props must be behind a timeout
  
- ◊ build the setControlProps method into ComponentBase and controls.

----------
- √ fileApi needs to be implemented
- ◊ tools and indicators need to be implemented
- ◊ menu icon not appearing
- ◊ menu options tests not working (either side -- not implemented)

- ◊◊  ~20 round-trips of next/back will hang
  - Not seeing this anymore

- ◊ SCSS support needed
  - √ did direct proof of concept
  - √ need to update template for app.scss and package.json changes
      - nothing really to do for template
  - ◊ ComponentWriterNS needs to export a like-named scss file by copying
    the scss code from the <style> block.
  - √ NS export needs to append app.scss with imports, by doing a
  recursive sweep of `src` for *.scss 
  - √ app.scss currently is the primary for desktop.
  √ This is defined by the build proc. What we should do instead
  is generate app.scss outside of the scss folder with imports of
  everything within.
  
  - ◊ We can take a page from {N} here and use prefixes like .desktop.scss
  and .mobile.scss and separate accordingly. mobile styles 
  can apply the .ns-ios and .ns-android class def
  notation if they like for mobile platform differentiation.
    - ◊ but to do that we need to copy all the mobile scss files over
  and let nativescript sort it out.
      
----
##### 5/9  - SCSS support
Implemented a scheme similar to what is named above to collect
scss imports and build app.scss on desktop. seems to work well.

Export of NS Component is also working well.

- ◊ Path problem exists in ExportNS attempt to gather and make
an app.scss there.  components folder.
  
Done for today.

----
Goals for tomorrow:
 - √  finish what we started for scss
 - √ get ios working
 - test ios/android/shared scss platform stuff
 - implement `[data-state='whatever']` support for NS in some fashion

need to think about styling 
- same for all targets
- different per target
- will need to test on other desktop platforms too, but save that for
when we tackle publishing.

----
##### 5/10 get ios working
This is going to be a rabbit-hole dive in itself, so here we go

- First things: 
  - original crash was due to inconsistencies in the 
Nativescript global object, so the revised code is a total punt
that basically detects node because @nativescript/core was imported.
Not great, but since {N} can't keep to their own specifications, 
what else can we do?
    - Back button was not appearing.  Turns out to be the setting of text after timeout issue.
      - ◊ reminder to build that into component methods properly.
 
- √ Toolbars not appearing on ios 
    - Problems with initial sizing so different on iOS. Works now. Tested both.
  
- ◊ Overall scale is tiny.  Should probably leave this bit for later as part of platform SCSS stuff.

- ◊ General running on iOS not tested / appears flakey.  Please test.

-----------

Apply and support the following global class hierarchy:  
  - (desktop): body class="theme desktop macos|windows|linux"
  - (mobile) : page class="theme mobile" 
    (ns-ios | ns-android supported by {N})
    

- ◊ indicators
  
- ◊ Back Extensions should be supported and test re-instated

-------
--------

- ◊ Logging
- ◊ Component Library
- ◊ C and Java support
- ◊ System indicators

- ◊ Set up Windows and Linux VMs
- ◊ publishing support

-------------
### GENERAL ASIDES
- __Aliases__: Not portable, and since we're truly importing our modules, let's change
them all to absolute module references.  
  These seem to mostly be found in legacy _.riot_ files.
  - the .riot ones don't matter because we properly alias in webpack
  - problem is with Generated and Assets mobile-side

- __Logging__: How did this become such a bane? Anyway, fix any conflict issues
  and streamline setup to include a config (from assets?). Config should acknowledge

- __Revisit Template__: Don't forget you have the tbns-template project and this hosts the
default files for our setup.  Make sure we have all we need here. Include
  stubs if appropriate.
  
- __Revisit init__: this should be the desktop equivalent of node init or nativescript create.
It should prompt us and set up our package.json, tsconfig, Readme.md, and stub files
  (assets/MenuDef.txt, components, pages, scss, Log config/setup, tbAppBack, tbAppFront (or as named)).
  
- __Nativescript component library__: before, we ran into a weird problem
in that we couldn't create a component library as a node module because
  of the automagical platform type module load.  We forced result at runtime all to load the android version.
  This allowed a build, but it would fail on ios.
  <br/>
  We may have to deal with this again.
  - <del>We can make a {N} Plugin instead of a node module.</del>  
  - ◊ We could make our own automagical loader that loads both under
    separate names and then maps the winner at runtime to a common
    identifier.

