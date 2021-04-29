declare module "thunderbolt-desktop"
declare module "thunderbolt-common" {
    interface TBBackApp {}
    class FrameworkBackContext {}
    function registerApp(targetPlatform:object, backApp:TBBackApp) : void
}
