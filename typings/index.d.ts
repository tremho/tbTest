declare module "thunderbolt-desktop"
declare module "thunderbolt-common" {
    interface TBBackApp {}
    class FrameworkBackContext {}
    function injectDesktopDependencies(injected:any) : void
    function registerApp(backApp:TBBackApp) : void
}
