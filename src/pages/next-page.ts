
export function pageStart(app:any) {
    // console.log('pageStart MainPage')
    const model = app.model
    model.setAtPath('testValues.mainLabel', 'Hello, World from Next Page!')

    console.log('>>>>>>>> calling extension test function....')
    app.callExtension('test', 'testFunction', 'this is an epic test').then((resp:any) => {
        console.log('test function responds with ', resp)
    })

    setTimeout(() => {
        model.setAtPath('testValues.mainLabel', 'Next Page updated @ 2 seconds!')
    }, 2000)
}

export function onClick(arg:any) {
    console.log('click from component', arg)
}
