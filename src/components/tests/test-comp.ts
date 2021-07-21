
/*
Three potential methods to expose
beforeLayout and afterLayout and onAction

 */

export default class TestComp  {
    component:any;

    beforeLayout() {
        this.component.cm.addProperty('bind', 'testValues.mainLabel as foobar')
    }

    afterLayout() {

    }

    onAction(ev:any) {
        console.log("onAction called")
    }
}
