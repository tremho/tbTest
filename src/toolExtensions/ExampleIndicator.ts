
// import {ToolExtension} from "@tremho/jove-common";

// todo: we need declarations
class CompInfo {
    info:any
    component:any
}

export class ExampleIndicator {
    /**
     * When component is first mounted into layout, not yet rendered.
     * @param component
     */
    onSetToPage(compInfo:CompInfo) {
        // console.log('onSetToPage', compInfo)
    }

    /**
     * When there has been a change in state
     * @param component
     * @param state
     */
    onStateChange(compInfo:CompInfo, state:string|undefined) {
        console.log('onStateChange', compInfo.info.id, state)

    }

    /**
     * When the component has been pressed
     * (mousedown, or touch event)
     * @param component
     * @return {boolean} return true to prevent propagation / click handling
     */
    onPress(compInfo:CompInfo) {
        console.log('onPress', compInfo.info.id)
        return true;
    }

    /**
     * WHen the component has been released
     * (mouseup or touch release)
     * @param component
     */
    onRelease(compInfo:CompInfo) {
        console.log('onRelease', compInfo.info.id)
        return true;
    }

}