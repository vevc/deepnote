// ==UserScript==
// @name         Deepnote keep alive
// @namespace    http://tampermonkey.net/
// @version      2025-05-15
// @description  Deepnote keep alive
// @author       vevc
// @match        https://deepnote.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deepnote.com
// @grant        none
// @run-at       document-end
// @noframes
// ==/UserScript==

window.checkCount = 0
window.wakeUpCount = 0
window.bootBtn = null

const queryBootBtn = function () {
    if (window.bootBtn) {
        return window.bootBtn
    }
    const btnList = document.querySelectorAll('.chakra-collapse button')
    if (btnList) {
        for (const bootBtn of btnList) {
            if (bootBtn.innerText === 'Start machine' || bootBtn.innerText === 'Stop machine') {
                console.log('[Tampermonkey] ' + new Date() + ' --- Power button found successfully')
                window.bootBtn = bootBtn
                return bootBtn
            }
        }
    }
    return null
}

setTimeout(() => {
    window.checkTimer = setInterval(function () {
        window.checkCount++
        const bootBtn = queryBootBtn()
        if (bootBtn) {
            if (bootBtn.innerText === 'Start machine') {
                window.wakeUpCount++
                console.log('[Tampermonkey] ' + new Date() + ' --- Deepnote keep alive, wake-up count: ' + window.wakeUpCount)
                window.bootBtn.click()
            }
        } else {
            console.log('[Tampermonkey] ' + new Date() + ' --- Power button not found, retrying...')
        }
    }, 1000)
}, 10000)

// Check the timer detection count
// console.log(window.checkCount)

// Cancel scheduled check
// clearInterval(window.checkTimer)
