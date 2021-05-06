
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
                                                app.updatePage(page)
                                            }).catch((e:Error)=>{ handleCatch(e) })
                                        }).catch((e:Error)=>{ handleCatch(e) })
                                    }).catch((e:Error)=>{ handleCatch(e) })
                                }).catch((e:Error)=>{ handleCatch(e) })
                            }).catch((e:Error)=>{ handleCatch(e) })
                        }).catch((e:Error)=>{ handleCatch(e) })
                    }).catch((e:Error)=>{ handleCatch(e) })
                }).catch((e:Error)=>{ handleCatch(e) })
            }).catch((e:Error)=>{ handleCatch(e) })
        }).catch((e:Error)=>{ handleCatch(e) })
    }).catch((e:Error)=>{ handleCatch(e) })
    function handleCatch(e:Error) {
        console.log(e)
        app.updatePage(page)
    }
}
let app:any
let api:any, page:any
let appPath:string

let binaryDataRead:any

function testExists() {
    const existingFile = app.isMobile ? app.Path.join(appPath, 'tbAppBack.ts') : app.Path.join(appPath, 'build', 'tbAppBack.js')
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
    let textFile:string
    if(app.isMobile()) {
        textFile = app.Path.join(appPath, 'app-root.xml')
    } else {
        textFile = '/Users/sohmert/file_in_user_space.txt'
    }
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
    let textFile:string
    if(app.isMobile()) {
        textFile = app.Path.join(appPath, 'textOut.txt')
    } else {
        textFile = '/Users/sohmert/textOut.txt'
    }
    const contents = 'This is a test of writing text to a file'
    return api.writeFileText(textFile, contents).then(() => {
        app.setPageData(page, 'writeText', 'wrote to '+textFile)

        return api.readFileText(textFile).then((verify:string) => {
            app.setPageData(page, 'writeTextVerify', verify)
        })
    })
}

function testReadBinary() {
    let binFile:string
    if(app.isMobile()) {
        binFile = app.Path.join(appPath, 'pages', 'logtest.ts')
    } else {
        binFile = '/Users/sohmert/tbd/thunderbolt-framework/.aJournal/structure.png'
    }
    return api.readFileArrayBuffer(binFile).then((ab:ArrayBuffer) => {
        const dv = new DataView(ab)

        binaryDataRead = ab
        app.setPageData(page, 'readBinary', `${dv.byteLength} bytes read`)
    })
}
function testWriteBinary() {
    let binFile:string
    if(app.isMobile()) {
        binFile = app.Path.join(appPath, 'copy.txt')
    } else {
        binFile = '/Users/sohmert/copy.png'
    }
    return api.writeFileArrayBuffer(binFile,binaryDataRead).then(() => {
        app.setPageData(page, 'writeBinary', 'copied image to '+binFile)
    })

}

function testDelete() {
    let textFile:string
    if(app.isMobile()) {
        textFile = app.Path.join(appPath, 'textOut.txt')
    } else {
        textFile = '/Users/sohmert/textOut.txt'
    }
    return api.fileDelete(textFile).then(() => {
        app.setPageData(page, 'delete', 'deleted file '+textFile)
    })

}
function testRename() {
    let copyFile:string
    if(app.isMobile()) {
        copyFile = app.Path.join(appPath, 'copy.txt')
    } else {
        copyFile = '/Users/sohmert/copy.png'
    }
    return api.fileRename(copyFile, 'copiedImage.png').then(() => {
        app.setPageData(page, 'rename', 'renamed to copiedImage.png')
    })
}
function testMove() {
    let source:string, dest:string
    if(app.isMobile()) {
        source = app.Path.join(appPath, 'copiedImage.png')
        dest = app.Path.join(appPath, 'pages', 'copiedImage.png')
    } else {
        source = '/Users/sohmert/copiedImage.png'
        dest = '/Users/sohmert/tbd/copiedImage.png'
    }
    return api.fileMove(source, dest).then(() => {
        app.setPageData(page, 'move', 'moved to '+dest)
    })

}
function testCopy() {
    let binFile:string
    let dest:string
    if(app.isMobile()) {
        binFile = app.Path.join(appPath, 'assets', 'menuDef.txt')
        dest = app.Path.join(appPath, 'duplicatedImage.png')
    } else {
        binFile = '/Users/sohmert/tbd/thunderbolt-framework/.aJournal/structure.png'
        dest = '/Users/sohmert/tbd/duplicatedImage.png'
    }

    return api.fileCopy(binFile, dest).then(() => {
        app.setPageData(page, 'copy', 'copied to '+dest)
    })

}
function testFstat() {
    let binFile: string
    if (app.isMobile()) {
        binFile = app.Path.join(appPath, 'assets', 'menuDef.txt')
    } else {
        binFile = '/Users/sohmert/tbd/thunderbolt-framework/.aJournal/structure.png'
    }
    return api.fileStats(binFile).then((info:object) => {
        const data = app.getPageData(page)
        data.stats = JSON.stringify(info)
        console.log(data)
        app.setPageData(page, data)
    })
}
function testMkdir() {
    let testDir:string
    if(app.isMobile()) {
        testDir = app.Path.join(appPath, 'testFolder/with/several/different/subfolders')
    } else {
        testDir = '/Users/sohmert/testFolder/with/several/nested/subfolders'
    }
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
    let testDir:string
    if(app.isMobile()) {
        testDir = app.Path.join(appPath, 'testFolder')
    } else {
        testDir = '/Users/sohmert/testFolder'
    }

    return api.removeFolder(testDir, true).then(() => {
        app.setPageData(page, 'rmdir', 'testFolder removed (-fr)')
        const f = app.Path.join(testDir, 'test')
        return api.fileExists(f).then((exist:boolean) => {
            app.setPageData(page, 'rmdir2', 'test file exists after cleanup? ' + exist)
        })

    })
}
function testReadDirectory() {
    let testDir:string = app.Path.home
    let out = '\nFiles in  folder '+testDir+':\n'
    return api.readFolder(testDir).then((entries:any[]) => {
        entries.forEach(entry => {
            out = out + `${entry.fileName} (${entry.type}, ${entry.size} bytes), `
        })
        app.setPageData(page, 'readFolder', out)
    })

}
