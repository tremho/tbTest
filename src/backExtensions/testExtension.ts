
export const extensionInfo = {
    name: 'Test Back Extension',
    version: '1.0.0'
}

export function testFunction(banner:string) {
    console.log('---------------------')
    console.log(banner)
    console.log('---------------------')
    console.log('')
    if (typeof process !== 'undefined') {
        console.log(`node version ${process.versions.node}`)
    }
    return 'That was an epic test'
}

