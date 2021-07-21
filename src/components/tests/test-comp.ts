
/*
Three potential methods to expose
beforeLayout and afterLayout and onAction

 */

export default class TestComp  {
    component:any;
    constructor(component:any) {
        this.component = component
    }

    beforeLayout() {
        this.component.cm.addProperty('bind', 'testValues.mainLabel as foobar')
    }

    afterLayout() {

    }

    onAction(ev:any) {
        console.log("onAction called")
    }
}
