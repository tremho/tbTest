
/*
Three potential methods to expose
beforeLayout and afterLayout and onAction

 */

export default class TestComp  {
    component:any;
    bound: any;
    com: any; // ComCommon
    constructor(component:any) {
        this.component = component
        this.bound = component.bound
        this.com = component.com
    }

    beforeLayout() {
        this.com.addProperty('bind', 'testValues.mainLabel as foobar')
    }

    afterLayout() {

    }

    onAction(ev:any) {
        console.log("onAction called")
    }
}
