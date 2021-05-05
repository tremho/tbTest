
export function pageStart(appContext:any, context:any) {
    console.log('pageStart file Test Page', context)

    app = appContext
    api = app.MainApi

    appPath = app.Path.appPath

    page = 'file-test-page'
    app.setPageData(page, 'appPath', appPath)

    testExists()
    testReadText()
    testWriteText().then(() => {
        testReadBinary().then(() => {
            testWriteBinary().then(() => {
                testDelete().then(() => {
                    testRename().then(() => {
                        testMove().then(() => {
                            testCopy().then(() => {
                                testFstat().then(() => {
                                    testMkdir().then(() => {
                                        testReadDirectory().then(() => {
                                            testRmDir().then(() => {
                                                console.log('done with file tests')
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
let app:any
let api:any, page:any
let appPath:string

let binaryDataRead:any

function testExists() {
    const existingFile = app.Path.join(appPath, 'build', 'tbAppBack.js')
    api.fileExists(existingFile).then((exists:boolean) => {
        app.setPageData(page, 'exist1', (exists ?'Passed' : "Failed to find existing file at "+existingFile))
        try {
            api.fileExists('foobar').then((exists:boolean) => {
                app.setPageData(page, 'exist2', (exists ? 'Failed: file does not exist' : 'Success: file does not exist'))
            })
        } catch(e) {
            app.setPageData(page, 'exist2', e.message)
        }
    })
}

function testReadText() {
    const textFile = '/Users/sohmert/file_in_user_space.txt'
    api.readFileText(textFile).then((text:string) => {
        const success = (text.length > 0)
        app.setPageData(page, 'readText', text)
    })
    try {
        api.readFileText('no-exist').then((text:string) => {
            app.setPageData(page, 'readTextErr', 'unexpected')
        })
    } catch(e) {
        app.setPageData(page, 'readTextErr', true)

    }
}
function testWriteText() {
    const textFile = '/Users/sohmert/textOut.txt'
    const contents = 'This is a test of writing text to a file'
    return api.writeFileText(textFile, contents).then(() => {
        app.setPageData(page, 'writeText', 'wrote to '+textFile)

        return api.readFileText(textFile).then((verify:string) => {
            app.setPageData(page, 'writeTextVerify', verify)
        })
    })
}

function testReadBinary() {
    const binFile = '/Users/sohmert/tbd/thunderbolt-framework/.aJournal/structure.png'
    return api.readFileArrayBuffer(binFile).then((ab:ArrayBuffer) => {
        const dv = new DataView(ab)

        binaryDataRead = ab
        app.setPageData(page, 'readBinary', `${dv.byteLength} bytes read`)
    })
}
function testWriteBinary() {
    const binFile = '/Users/sohmert/copy.png'
    return api.writeFileArrayBuffer(binFile,binaryDataRead).then(() => {
        app.setPageData(page, 'writeBinary', 'copied image to '+binFile)
    })

}

function testDelete() {
    const textFile = '/Users/sohmert/textOut.txt'
    return api.fileDelete(textFile).then(() => {
        app.setPageData(page, 'delete', 'deleted file '+textFile)
    })

}
function testRename() {
    return api.fileRename('/Users/sohmert/copy.png', 'copiedImage.png').then(() => {
        app.setPageData(page, 'rename', 'renamed to copiedImage.png')
    })
}
function testMove() {
    return api.fileMove('/Users/sohmert/copiedImage.png', '/Users/sohmert/tbd/copiedImage.png').then(() => {
        app.setPageData(page, 'move', 'moved to tbd/copiedImage.png')
    })

}
function testCopy() {
    const binFile = '/Users/sohmert/tbd/thunderbolt-framework/.aJournal/structure.png'

    return api.fileCopy(binFile, '/Users/sohmert/tbd/duplicatedImage.png').then(() => {
        app.setPageData(page, 'copy', 'copied to tbd/duplicatedImage.png')
    })

}
function testFstat() {
    const binFile = '/Users/sohmert/tbd/thunderbolt-framework/.aJournal/structure.png'

    return api.fileStats(binFile).then((info:object) => {
        const data = app.getPageData(page)
        data.stats = JSON.stringify(info)
        console.log(data)
        app.setPageData(page, data)
    })


}
function testMkdir() {
    const testDir = '/Users/sohmert/testFolder/with/several/nested/subfolders'
    return api.createFolder(testDir).then(() => {
        app.setPageData(page, 'mkdir', testDir)
        return api.fileExists(testDir).then((exists:boolean) => {
            app.setPageData(page, 'mkdir2', 'tree exists')
            const f = app.Path.join(testDir, 'test')
            return api.writeFileText(f, 'Kill me').then(() => {
                app.setPageData(page, 'mkdir3', 'test file written to '+f)
            })
        })
    })

}
function testRmDir() {
    const testDir = '/Users/sohmert/testFolder'
    return api.removeFolder(testDir, true).then(() => {
        app.setPageData(page, 'rmdir', 'testFolder removed (-fr)')
        const f = app.Path.join(testDir, 'test')
        return api.fileExists(f).then((exist:boolean) => {
            app.setPageData(page, 'rmdir2', 'test file exists after cleanup? ' + exist)
        })

    })
}
function testReadDirectory() {
    const testDir = '/Users/sohmert/testFolder/with/several/nested/subfolders'
    let out = ''
    return api.readFolder(testDir).then((entries:any[]) => {
        entries.forEach(entry => {
            out = out + `${entry.fileName} (${entry.info.mode}, ${entry.info.size} bytes}<br/>`
        })
        app.setPageData(page, 'readFolder', out)
    })

}
