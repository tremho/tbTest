
import {tztable} from './Timezone'

let api:any, Path:any

export function pageStart(app:any) {

    api = app.MainApi
    Path = app.Path

    makeDSTRangeTable()
    // supportedLocales()
    // intlMonths()
    // intlWeekdays()
    // intlTimezones()
}

//@ts-ignore
const localeSet:any = {
        "am": {
            name: "Amharic (Ethiopian Semitic)",
            regions: []
        },
        "ar": {
            name: "Arabic",
            regions: [
                "AE (United Arab Emirates)",
                "AR (Arabic)",
                "BH (Bahrain)",
                "DJ (Djibouti)",
                "DZ (Algeria)",
                "EG (Egypt)",
                "EH (Western Sahara)",
                "ER (Eritrea)",
                "IL (Israel)",
                "IQ (Iraq)",
                "JO (Jordan)",
                "KM (Comoros)",
                "KW (Kuwait)",
                "LB (Lebanon)",
                "MA (Morocco)",
                "MR (Mauritania)",
                "OM (Oman)",
                "PS (West Bank / Gaza)",
                "QA (Qatar)",
                "SA (Saudi Arabia)",
                "SD (Sudan)",
                "SO (Somalia)",
                "SY (Syria)",
                "TD (Chad)",
                "TN (Tunisia)",
                "YE (Yemen)",
            ]
        },
        "az": {
            name: "Azerbaijani (Azeri)",
            regions: [
                "AZ (Azrbaijan)"
            ]
        },
        "bn": {
            name: "Bengali",
            regions: [
                "IN (India)"
            ]
        },
        "bs": {
            name: "Bosnian",
            regions: [
                "BA (Bosnia / Herzegovina"
            ]
        },
        "bg": {
            name: "Bulgarian",
            regions: [
                "BG (Bulgaria)"
            ]
        },
        "ca": {
            name: "Catalan, Valencian",
            regions: [
                "AD (Andorra)",
                "ES (Spain)"
            ]
        },
        "zh": {
            name: "Chinese",
            regions: [
                "CN (China)",
                "HK (Hong Kong)",
                "MO (Macao)",
                "SG (Singapore)",
                "TW (Taiwan)"
            ]
        },
        "hr": {
          name: "Croatian",
          regions: [
              "BA (Bosnia / Herzegovina)",
              "HR (Croatia)"
          ]
        },
        "cs": {
            name: "Czech",
            regions: [
                "CZ (Czech Republic)",
                "SK (Slovak Republic)"
            ]
        },
        "da": {
            name: "Danish",
            regions: [
                "DK (Denmark)",
                "FO (Faroe Islands)",
                "GL (Greenland)"
            ]
        },
        "nl" : {
            name: "Dutch, Flemish",
            regions: [
                "AN (Netherlands Antillles)",
                "AW (Aruba)",
                "BE (Belgium)",
                "CW (Curaçao)",
                "NL (Netherlands)",
                "SR (Suriname)",
                "SX (St. Maarten)"
            ]
        },
        "en": {
            name: "English",
            regions: [
            "AG (Antigua and Barbuda)",
            "AL (Anguilla)",
            "AS (American Samoa)",
            "AU (Australia)",
            "BB (Barbados)",
            "BD (Bangladesh)",
            "BM (Bermuda)",
            "BS (Bahamas)",
            "BW (Botswana)",
            "BZ (Belize)",
            "CA (Canada)",
            "CK (Cook Islands)",
            "CM (Cameroon)",
            "CW (Curaçao)",
            "DM (Dominica)",
            "ER (Eritrea)",
            "FJ (Fiji)",
            "FK (Falkland Is.)",
            "FM (Micronesia)",
            "GB (United Kingdom)",
            "GD (Grenada)",
            "GG (Guernsey)",
            "GH (Ghana)",
            "GI (Gibraltar)",
            "GM (Gambia)",
            "GU (Guam)",
            "GY (Guyana)",
            "HK (Hong Kong)",
            "IE (Ireland)",
            "IM (Isle of Man)",
            "IN (India)",
            "JE (Jersey)",
            "JM (Jamaica)",
            "KE (Kenya)",
            "KI (Kitribati)",
            "KN (St. Kitts & Nevis)",
            "KY (Cayman Islands)",
            "LC (St. Lucia)",
            "LK (Sri Lanka)",
            "LR (Liberia)",
            "LS (Lesotho)",
            "MH (Marshall Islands)",
            "MP (Northern Mariana Islands)",
            "MS (Montserrat)",
            "MT (Malta)",
            "MU (Mauritius)",
            "MW (Malawi)",
            "MY (Malaysia)",
            "NA (Namibia)",
            "NG (Nigeria)",
            "NR (Nauru)",
            "NU (Niue)",
            "NZ (New Zealand)",
            "PG (Papua New Guinea)",
            "PH (Philippines)",
            "PI (Pirate)",
            "PK (Pakistan)",
            "PN (Pitcairn Islands)",
            "PR (Puerto Rico)",
            "PW (Palau)",
            "RW (Rwanda)",
            "SB (Soloman Islands)",
            "SC (Seychelles)",
            "SD (Sudan)",
            "SG (Singapore)",
            "SH (Saint Helena)",
            "SL (Sierra Leone)",
            "SO (Somalia)",
            "SS (South Sudan)",
            "SZ (Swaziland)",
            "TC (Turks and Caicos Islands)",
            "TO (Tonga)",
            "TT (Trinidad & Tobago)",
            "TV (Tuvalu)",
            "TZ (Tanzania)",
            "UD (Upside down)",
            "UG (Uganda)",
            "US (United States)",
            "VC (St. Vincent and the Grenadines)",
            "VG (British Virgin Islands)",
            "VI (US Virgin Islands)",
            "VU (Vanuatu)",
            "WS (Samoa)",
            "ZA (South Africa)",
            "ZM (Zambia)",
            "ZW (Zimbabwe)"
            ]
        },
        "et": {
            name: "Estonian",
            regions: [
                "EE (Estonia)"
            ]
        },
        "fi": {
            name: "Finnish",
            regions: [
                "FI (Finland)"
            ]
        },
        "fr": {
            name: "French",
            regions: [
                "BE (Belgium)",
                "BF (Burkina Faso)",
                "BI (Burundi)",
                "CA (Canada)",
                "CD (Dem. Rep. of Congo)",
                "CF (Central African Republic)",
                "CG (Congo)",
                "CH (Switzerland)",
                "CI (Ivory Coast)",
                "CM (Cameroon)",
                "DJ (Djibouti)",
                "FR (France)",
                "GA (Gabon)",
                "GD (Grenada)",
                "GF (French Guiana)",
                "GN (Guinea)",
                "GP (Guadeloupe)",
                "HT (Haiti)",
                "KM (Comoros)",
                "LC (St Lucia)",
                "LU (Luxembourg)",
                "MC (Monaco)",
                "MF (St. Martin)",
                "MG (Madagascar)",
                "ML (Mali)",
                "MQ (Martinique)",
                "MU (Mauritius)",
                "NC (New Caledonia)",
                "NE (Niger)",
                "PF (French Polynesia)",
                "PM (Saint Pierre and Miquelon)",
                "RE (Reúnion)",
                "RW (Rwanda)",
                "SC (Seychelles)",
                "SN (Senegal)",
                "TD (Chad)",
                "TO (Togo)",
                "VU (Vanatu)",
                "WF (Wallis and Fortuna)",
                "YT (Mayotte)"
            ]
        },
        "de": {
            name: "German",
            regions: [
                "AT (Austria)",
                "BE (Belgium)",
                "CH (Switzerland)",
                "DE (Germany)",
                "LI (Liechtenstein)",
                "LU (Luxembourg)",
                "NA (Namibia)"
            ]
        },
        "el": {
            name: "Greek (Modern)",
            regions: [
                "CY (Cyprus)",
                "GR (Greece)"
            ]
        },
        "he": {
            name: "Hebrew",
            regions: [
                "IL (Israel)"
            ]
        },
        "hi": {
            name: "Hindi",
            regions: [
                "FJ (Fiji)",
                "IN (India)",
                "PK (Pakistan)"
            ]
        },
        "hu": {
            name: "Hungarian",
            regions: [
                "HU (Hungary)"
            ]
        },
        "id": {
            name: "Indonesian",
            regions: [
                "ID (Indonesia)"
            ]
        },
        "it": {
            name: "Italian",
            regions: [
                "CH (Switzerland)",
                "IT (Italy)"
            ]
        },
        "ja": {
            name: "Japanese",
            regions: [
                "JP (Japan)",
                "PW (Palau)"
            ]
        },
        "kn": {
            name: "Kannada",
            regions: [
                "IN (India)"
            ]
        },
        "lt": {
            name: "Lithuanian",
            regions: [
                "LT (Lithuania)"
            ]
        },
        "lv": {
            name: "Latvian",
            regions: [
                "LV (Latvia)"
            ]
        },
        "ms" : {
            name: "Malay",
            regions: [
                "MY (Malaysia)",
                "SG (Singapore)"
            ]
        },
        "ml": {
            name: "Malayalam",
            regions: [
                "MY (Malaysia)"
            ]
        },
        "mr": {
            name: "Marathi",
            regions: [
            ]
        },
        "nb": {
            name: "Norwegian Bokmål",
            regions: [
             "NO (Norway)"   
            ]
        },
        "pa": {
            name: "Punjabi",
            regions: [
                "IN (India)"
            ]
        },
        "fa": {
            name: "Persian",
            regions: [
                "IR (Iran)"
            ]
        },
        "pl": {
            name: "Polish",
            regions: [
                "PL (Poland)"
            ]
        },
        "pt": {
            name: "Portuguese",
            regions: [
                "BR (Brazil)",
                "CV (Cape Verde)",
                "GQ (Equatorial Guinea)",
                "GW (Guinea-Bissau)",
                "MO (Macao)",
                "MZ (Mozambique)",
                "PT (Portugal)",
                "ST (Såo tome´ and Principe´)",
                "TL (Timor-Leste)",
            ]
        },
        "ro": {
            name: "Romanian",
            regions: [
                "MO (Moldova)",
                "RO (Romania)"
            ]
        },
        "ru": {
            name: "Russian",
            regions: [
                "BY (Belarus)",
                "KG (Kyrgyz Republic)",
                "RU (Russia)",
                "TJ (Tajikistan')"
            ]
        },
        "sr": {
            name: "Serbian",
            regions: [
                "BA (Bosnia / Herzegovina)",
                "ME (Montenegro)",
                "RS (Serbia)"
            ]
        },
        "sk": {
            name: "Slovak",
            regions: [
                "CZ (Czech Republic)",
                "SK (Slovakia)"
            ]
        },
        "sl" : {
            name: "Slovenian",
            regions: [
                "SL (Slovenia)"
            ]
        },
        "es": {
            name: "Spanish",
            regions: [
                "AR (Argentina)",
                "BO (Bolivia)",
                "CL (Chile)",
                "CO (Columbia)",
                "CR (Costa Rica)",
                "CU (Cuba)",
                "DO (Dominican Republic)",
                "EC (Ecuador)",
                "ES (Spain)",
                "GI (Gibraltar)",
                "GQ (Equatorial Guinea)",
                "GT (Guatemala)",
                "HN (Honduras)",
                "MX (Mexico)",
                "NI (Nicaragua)",
                "PA (Panama)",
                "PE (Peru)",
                "PR (Puerto Rico)",
                "PY (Paraguay)",
                "SV (El Salvador)",
                "US (United States)",
                "UY (Uruguay)",
                "VE (Venezuela)"
            ]
        },
        "sw": {
            name: "Swahili",
            regions: [
                "KE (Kenya)"
            ]
        },
        "sv": {
            name: "Swedish",
            regions: [
                "FI (Finland)",
                "SE (Sweden)"
            ]
        },
        "ta": {
            name: "Tamil",
            regions: [
                "IN (India)"
            ]
        },
        "te": {
            name: "Telugu",
            regions: [
                "IN (India)"
            ]
        },
        "th": {
            name: "THai",
            regions: [
                "TH (Thailand)"
            ]
        },
        "fil" : { //// "tl"
            name: "Filipino",
            regions: [
                "PH (Philippines)"
            ]
        },
        "tr": {
            name: "Turkish",
            regions: [
                "CY (Cyprus)",
                "TR (Turkey)"
            ]
        },
        "uk": {
            name: "Ukrainian",
            regions: [
                "UK (Ukraine)"
            ]
        },
        "uz": {
            name: "Uzbek",
            regions: [
                "UZ (Uzbekistan)"
            ]
        },
        "vi": {
            name: "Vietnamese",
            regions: [
                "VN (Vietnam)"
            ]
        }
}



function localeLister(callback:any) {

    let arrAll = []
    let i=0;
    let langs = Object.getOwnPropertyNames(localeSet)
    while (i < langs.length) {
        let ln = langs[i]
        arrAll.push(ln)
        let regs = localeSet[ln].regions
        // console.log(ln, regs)
        for (let r=0; r<regs.length; r++) {
            let rg = regs[r].substring(0,2)
            arrAll.push(`${ln}-${rg}`)
        }
        i++
    }
    let opts:any = undefined
    let sup = Intl.DateTimeFormat.supportedLocalesOf(arrAll, opts)
    console.log(`Intl Supports ${sup.length} of ${arrAll.length} tested languages and regions`)
    for (let i = 0; i<sup.length; i++) {
        let loc = sup[i]
        let data = localeSet[loc.substring(0,2)]
        let name = data.name
        let reg = loc.split('-')[1] || ''
        let rgName = ''
        for (let r = 0; r<data.regions.length; r++) {
            let rc = data.regions[r].substring(0, 2)
            if(rc === reg) {
                let s = data.regions[r]
                rgName = s.substring(s.indexOf('(')+1, s.lastIndexOf(')'))
                break;
            }
        }
        callback(loc, name, rgName)
    }
}

function supportedLocales() {
    localeLister((loc:string, name:string, rgName:string) => {
        if(rgName) {
            console.log(`    ${loc} (${rgName})`)
        } else {
            console.log(`\n${loc} (${name})`)
        }
    })
}

let i18nRoot:string

function makei18n() {
    i18nRoot = Path.join(Path.appPath, '..', 'i18n')
    api.fileExists(i18nRoot).then((exists:boolean) => {
        if(!exists) {
            console.log('creating i8n Folder at ', i18nRoot)
            api.createFolder(i18nRoot)
        }
    })
}
let rootLang:any = {}

function intlMonths() {
    makei18n()
    let dt = new Date('2021-01-01T12:34:56')
    let styles = ['long', 'short']
    localeLister((loc: string, name: string, rgName: string) => {
        if(!rgName) {
            rootLang[name] = {
                long: [],
                short: []
            }
        }
        let lang = loc.split('-')[0]
        let fn = Path.join(i18nRoot, lang)
        let count = 0
        api.fileExists(fn).then((exists: boolean) => {
            let p = Promise.resolve()
            if (!exists) {
                p = api.createFolder(fn)
            }
            let special = false
            p.then(() => {
                    let out = ''
                    for (let si = 0; si < styles.length; si++) {
                        let style = styles[si]
                        let opts: any = {month: `${style}`}
                        let dtf = new Intl.DateTimeFormat(loc, opts)
                        for (let i = 0; i < 12; i++) {
                            dt.setMonth(i)
                            let r = dtf.format(dt)
                            if(!rgName || rootLang[name][style][i] !== r) {
                                if(count) out += ',\n'
                                out += (`    "date.month.${i + 1}.${style}" : "${r}"`)
                                count++
                                special = true
                            }
                            if(!rgName) {
                                rootLang[name][style][i] = r
                            }
                        }
                    }
                    if(special) {
                        out = '{\n'+out +'\n}'
                        let sfn = Path.join(i18nRoot, lang, `date-strings-${loc}.json`)
                        api.writeFileText(sfn, out).then(() => {
                            console.log(`wrote ${sfn} for ${loc}`)
                        })
                    }
                })
            })
        })
    }

function intlWeekdays() {
    let dt = new Date('2021-06-20T12:34:56')
    let start = dt.getDate()
    let styles = ['long', 'short']
    localeLister((loc: string, name: string, rgName: string) => {
        if(!rgName) {
            rootLang[name] = {
                long: [],
                short: []
            }
        }
        let lang = loc.split('-')[0]
        let fn = Path.join(i18nRoot, lang)
        let count = 0
        api.fileExists(fn).then((exists: boolean) => {
            let p = Promise.resolve()
            if (!exists) {
                p = api.createFolder(fn)
            }
            let special = false
            p.then(() => {
                let out = ''
                for (let si = 0; si < styles.length; si++) {
                    let style = styles[si]
                    let opts: any = {weekday: `${style}`}
                    let dtf = new Intl.DateTimeFormat(loc, opts)
                    for (let i = 0; i < 7; i++) {
                        dt.setDate(start+i)
                        let r = dtf.format(dt)
                        if(!rgName || rootLang[name][style][i] !== r) {
                            if(count) out+=',\n'
                            out += (`    "date.weekday.${i}.${style}" : "${r}"`)
                            count++
                            special = true
                        }
                        if(!rgName) {
                            rootLang[name][style][i] = r
                        }
                    }
                }
                if(special) {
                    let sfn = Path.join(i18nRoot, lang, `date-strings-${loc}.json`)
                    api.readFileText(sfn).then((contents:string) => {
                        contents = contents.substring(0, contents.lastIndexOf('}'))
                        while(!contents.charAt(contents.length-1).trim()) contents = contents.substring(0, contents.length-1)
                        contents += ',\n'+out+'\n}\n'
                        api.writeFileText(sfn, contents).then(() => {
                            console.log(`wrote ${sfn} for ${loc}`)
                        })
                    }).catch((e:Error) => {
                        let contents = '{\n'+out+'\n}\n'
                        api.writeFileText(sfn, contents).then(() => {
                            console.log(`wrote ${sfn} for ${loc}`)
                        })
                    })
                }
            })
        })
    })
}

let dstStart, dstEnd

function findDSTStart(tzName:string, year:number, loc:string):number {
    let stdUntil
    let stdUntilUnixTime = 0
    let opts: any = {
        timeZone: tzName,
        timeZoneName: 'short'
    }
    // start at Jan 1 at noon
    let dt = new Date()
    dt.setUTCFullYear(year)
    dt.setUTCMonth(0) // january
    dt.setUTCDate(1) //
    dt.setUTCHours(12)
    dt.setUTCMinutes(0)
    dt.setUTCSeconds(0)
    dt.setUTCMilliseconds(0)

    let dtf = new Intl.DateTimeFormat(loc,opts)
    let tzStd = dtf.format(dt)
    tzStd = tzStd.substring(tzStd.lastIndexOf(' ')+1)
    let tzTest = tzStd
    // go forward by month until we find a tz change or we go through full year
    for(let m=1; m<12 && tzTest===tzStd; m++) {
        dt.setUTCMonth(m)
        tzTest = dtf.format(dt)
        tzTest = tzTest.substring(tzTest.lastIndexOf(' ')+1)
    }
    let tzDst = tzTest === tzStd ? '' : tzTest
    tzTest = tzDst
    // on tz change, go backward by day till next change
    if(tzDst) {
        while (tzTest === tzDst) {
            dt.setDate(dt.getDate() - 1)
            tzTest = dtf.format(dt)
            tzTest = tzTest.substring(tzTest.lastIndexOf(' ')+1)
        }
        // then go forward by hour until next change
        while(tzTest === tzStd) {
            dt.setHours(dt.getHours()+1)
            tzTest = dtf.format(dt)
            tzTest = tzTest.substring(tzTest.lastIndexOf(' ')+1)
        }
        // at this point we have hit the first hour of DST
        // the point of change is the difference in the tzoffsets prior to this time, since this is the first new time
        // (i.e. it is now 3:00 am since there is no 2:00 am; difference between PDT and PST being 1 hour)

        opts = {dateStyle: 'full', timeStyle: 'full'}
        stdUntil = new Intl.DateTimeFormat(loc, opts).format(dt)
        stdUntilUnixTime = dt.getTime()

    } else {
        // no DST
    }

    // console.log('Found Std Until', stdUntil)
    return stdUntilUnixTime
}

function findDSTEnd(tzName:string, year:number, loc:string):number {
    let dstUntil
    let dstUntilUnixTime = 0
    let opts: any = {
        timeZone: tzName,
        timeZoneName: 'short'
    }
    // start at Jan 1 at noon
    let dt = new Date()
    dt.setUTCFullYear(year)
    dt.setUTCMonth(0) // january
    dt.setUTCDate(1) //
    dt.setUTCHours(12)
    dt.setUTCMinutes(0)
    dt.setUTCSeconds(0)
    dt.setUTCMilliseconds(0)

    let dtf = new Intl.DateTimeFormat(loc,opts)
    let tzStd = dtf.format(dt)
    tzStd = tzStd.substring(tzStd.lastIndexOf(' ')+1)
    let tzTest = tzStd
    // go backward by month until we find a tz change or we go through full year
    for(let m=11; m>=0 && tzTest===tzStd; m--) {
        dt.setUTCMonth(m)
        tzTest = dtf.format(dt)
        tzTest = tzTest.substring(tzTest.lastIndexOf(' ')+1)
    }
    let tzDst = tzTest === tzStd ? '' : tzTest
    tzTest = tzDst
    // on tz change, go forward by day till next change
    if(tzDst) {
        let cnt = 0
        let earlyBail = dt.getTime()
        while (tzTest === tzDst) {
            if(++cnt > 31) {
                // no change after a month
                console.warn('earlyBail on month count up', tzName)
                return earlyBail // closest we got
            }
            dt.setDate(dt.getDate() + 1)
            earlyBail = dt.getTime()
            tzTest = dtf.format(dt)
            tzTest = tzTest.substring(tzTest.lastIndexOf(' ')+1)
        }
        // then go backward by hour until next change
        cnt = 0
        earlyBail = dt.getTime()
        while(tzTest === tzStd) {
            if(++cnt > 24) {
                // no change after a day
                console.warn('earlyBail on hour countback', tzName)
                return earlyBail // closest we got
            }
            dt.setHours(dt.getHours()-1)
            earlyBail = dt.getTime()
            tzTest = dtf.format(dt)
            tzTest = tzTest.substring(tzTest.lastIndexOf(' ')+1)
        }
        // at this point we have hit the first hour of STD

        opts = {dateStyle: 'full', timeStyle: 'full'}
        dstUntil = new Intl.DateTimeFormat(loc, opts).format(dt)
        dstUntilUnixTime = dt.getTime()

    } else {
        // no DST
    }
    // console.log('Found Dst Until', dstUntil)
    return dstUntilUnixTime
}

// so we need to do this for each locale and each timezone (or at least timezone, locale shouldn't matter except for name of zone)
// we also need to set years. how about 2014-2038 (24 years)
/*
so a table would need to look like this:

zone =>
 year => [dstStart, dstEnd]
zoneName = {
 '2014': [dstStart, dstEnd]
 '2015': [dstStart, dstEnd]
 /// etc
 }

refinement 1:
- turn range into minutes from start of year (time-yearStart)/60000
- only add a new year if range is different than last entry

Then, to look up, find first year in table >= year sought, turn current time into minutes from year start and check range for dst

when we look up, we take the UTC year and test our time in the ranges. it's dst if found in range, else or if there is no year, assume std

Revision 2
store as time in hours (time / 3600000) from epoch as start, end pairs where dst is active
test by traversing pairs.
Let's go back to 1970
 */

/*
TODO: Turn this into tha full table
1) fix bug. we should always have a 2014 entry
2) copy existing data from tabla and add dst block
 */
let tzSet:any = {}
let newTable:any[] = []
function makeDSTRangeTable() {
    for (let year = 1970; year < 2038; year++) {
        console.log('doing year', year)
        let dt = new Date()
        dt.setUTCFullYear(year)
        dt.setUTCMonth(0)
        dt.setUTCDate(1)
        dt.setUTCHours(0)
        dt.setUTCMinutes(0)
        dt.setUTCSeconds(0)
        dt.setUTCMilliseconds(0)
        let yearStart = dt.getTime()
        for (let tzi = 0; tzi < tztable.length; tzi++) {
            // for each locale
            let loc = 'en-US'
            let tzd:any = tztable[tzi]
            let tzName = tzd.anchor.replace(/ /g, '_')
            let stdOffset = tzd.standard.offset
            let dstOffset = tzd.daylight.offset

            // note that in our table, detection of dst simply means get name/abbr/offset info from daylight block instead of standard
            // for Australia and other southern hemisphere zones, the meanings of the standard/daylight blocks are reversed.  It's
            // really more of a 'january' / 'june' thing.

            /* TODO:
            √ 1) make a function that returns the timezone name & abbreviation
            √ 2) call with january 1 and june 15 and record as tzd.standard.name, .abbr and tzd.daylight...
            2.5) BUG: We have dates preceding name. fix with `name = name.substring(name.lastIndexOf(',')+1).trim()`
            3) With the two above done, we are basically finished. just need to migrate tzinfo.
            4) create functions to reveal isDST and proper tz name per DST.

             */
            let block = getTZNames(loc, tzName)
            tzd.standard = block.standard
            tzd.daylight = block.daylight
            tzd.standard.offset = stdOffset
            tzd.daylight.offset = dstOffset

            if(!tzSet[tzName]) tzSet[tzName] = {dstRange:[]}
            let setEntry = tzSet[tzName]
            // console.log(`------${tzName}------`)
            // console.log(`${tzi}/${tztable.length}`)
            // console.log(year)
            // console.log(setEntry)
            try {
                let ts = Date.now()
                // console.log('looking...')
                let utStart = findDSTStart(tzName, year, loc)
                let utEnd = findDSTEnd(tzName, year, loc)
                let elapsed = Date.now() - ts
                // console.log(`found range in ${elapsed/1000} seconds`)
                if (utStart && utEnd) {
                    let stHfE = utStart / 3600000 // convert to hours from epoch
                    let endHfE = utEnd / 3600000 // convert to hours from epoch

                    // shouldn't happen anymore
                    if (stHfE < 0 || endHfE < 0) {
                        console.warn('Negative amounts!')
                        console.log(new Date(yearStart).toUTCString())
                        console.log(new Date(utStart).toUTCString())
                        console.log(new Date(utEnd).toUTCString())
                        return;
                    }

                    let setEntry = tzSet[tzName]
                    let dstRange = setEntry.dstRange

                    dstRange.push(stHfE)
                    dstRange.push(endHfE)
                    setEntry.dstRange = dstRange
                    Object.assign(setEntry, tzd)
                    // console.log(`${year}: ${stHfE} - ${endHfE}`)
                }
            } catch (e) {
                console.warn(e.message)
            }
            // console.log('------------------')
        }
    }
    Object.getOwnPropertyNames(tzSet).forEach(p => {
        let data = tzSet[p]
        newTable.push(data)
    })
    newTable.sort((a, b) => {
        let comparison = 0;
        if (a.anchor > b.anchor) {
            comparison = 1;
        } else if (a.anchor < b.anchor) {
            comparison = -1;
        }
        return comparison;
    })

    console.log('resulting table\n', newTable)
    let asJson = JSON.stringify(newTable, null, 2)

    let tblName = Path.join(Path.appPath, '..', 'tzInfo.json')

    api.writeFileText(tblName, asJson).then(() => {
        console.log(`wrote ${tblName} for ${newTable.length} zones`)
    })

}

function getTZNames(loc:string, tzName:string) {
    let opts: any = {
        timeZone: tzName,
        timeZoneName: 'short'
    }
    let dtfAbbr = new Intl.DateTimeFormat(loc, opts)
    opts.timeZoneName = 'long'
    let dtfFull = new Intl.DateTimeFormat(loc, opts)
    let jan = new Date()
    jan.setUTCMonth(0)
    jan.setUTCDate(1)
    jan.setUTCHours(0)
    jan.setUTCMinutes(0)
    jan.setUTCSeconds(0)
    jan.setUTCMilliseconds(0)
    let jun = new Date()
    jun.setUTCMonth(5)
    jun.setUTCDate(15)
    jun.setUTCHours(0)
    jun.setUTCMinutes(0)
    jun.setUTCSeconds(0)
    jun.setUTCMilliseconds(0)

    let stdFull = dtfFull.format(jan)
    let stdAbbr = dtfAbbr.format(jan)
    let dstFull = dtfFull.format(jun)
    let dstAbbr = dtfAbbr.format(jun)
    stdFull = stdFull.substring(stdFull.lastIndexOf(',')+1).trim()
    stdAbbr = stdAbbr.substring(stdAbbr.lastIndexOf(',')+1).trim()
    dstFull = dstFull.substring(dstFull.lastIndexOf(',')+1).trim()
    dstAbbr = dstAbbr.substring(dstAbbr.lastIndexOf(',')+1).trim()

    return {standard: {name: stdFull, abbr: stdAbbr}, daylight: {name: dstFull, abbr: dstAbbr}}
}