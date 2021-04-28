
export const extensionInfo = {
    name: 'Test Back Extension',
    version: '1.0.0'
}

export function testFunction(banner) {
    console.log('---------------------')
    console.log(banner)
    console.log('---------------------')
    console.log('')
    console.log(`node version ${process.versions.node}`)
    return process.versions.node
}

