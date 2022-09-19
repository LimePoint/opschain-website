console.log(`Font Awesome Free 5.15.2 by @fontawesome - https://fontawesome.com
License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
`)

var LOCAL_STORAGE_KEY = 'prerelease-trial__submitted'

Array.from(document.querySelectorAll('[data-role="honey"]')).forEach(function(elem) {
    elem.style.display = 'none'
})

var formEl = document.querySelector('form[name="prerelease-trial"]')

if(formEl) {
    var params = new URLSearchParams(window.location.search)
    Array.from(formEl.querySelectorAll('input[name]:not([type="checkbox"]):not([name="first-name"])')).forEach(function(el) {
        var valueFromParams = params.get(el.name)
        if(valueFromParams) {
            el.value = valueFromParams
        }
    })
    var submittedEl = document.querySelector('.interest__submitted')
    function thanksForSubmitting() {
        try {
            var submission = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))
        } catch(e) {}
        if(!submission) return
        submittedEl.style.display = 'block'
        var submitAgainButton = submittedEl.querySelector('button') || document.createElement('button')
        submitAgainButton.type = 'button'
        submitAgainButton.onclick = removeThanksForSubmitting
        submitAgainButton.classList.add('like-link')
        submitAgainButton.innerText = 'Request another invitation'
        submitAgainButton.title = 'Submitted: ' + new Date(submission.date) + '\n' + 'Name: ' + submission.name + '\n' + 'Email: ' + submission.email
        submittedEl.appendChild(submitAgainButton)
    }
    function removeThanksForSubmitting() {
        submittedEl.style.display = ''
        window.localStorage.removeItem(LOCAL_STORAGE_KEY)
    }

    thanksForSubmitting()
}

document.querySelector('.opschain-logo').style.top = document.querySelector('.main-header').clientHeight + 'px'

var mainHeaderEl = document.querySelector('.main-header')
function scrollToSectionListener(e) {
    var anchorTarget = e.target.getAttribute('href')
    var elem = anchorTarget && document.querySelector(anchorTarget)
    if(elem) {
        e.preventDefault()
        window.history.replaceState(null, null, anchorTarget)
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

mainHeaderEl.addEventListener('click', scrollToSectionListener)

var activeHighlightEl = document.querySelector('[data-role="active"]')
function setNavActive() {
    var heights = Array.from(document.querySelectorAll('section[id]')).reduce(function(obj, el) {
        obj[el.id] = el.getBoundingClientRect().top + (el.id === 'about' ? 400 : 0)
        return obj
    }, {})
    var titles = Object.keys(heights)
    var activeTitle = titles[titles.reverse().findIndex(function(id) { return window.scrollY > heights[id] }) ] || titles[titles.length - 1]
    var activeEl = document.querySelector(`[href="#${activeTitle}"]`)
    var positions = activeEl.getBoundingClientRect()
    activeHighlightEl.style.left = `${positions.left}px`
    activeHighlightEl.style.width = `${positions.width}px`
    if(!activeHighlightEl.style.transition) {
        // setting this on load to avoid the initial transition
        window.requestAnimationFrame(function() { activeHighlightEl.style.transition = 'all 0.4s' })
    }
}

if(activeHighlightEl) {
    window.addEventListener('scroll', setNavActive, { passive: true })
    window.addEventListener('resize', setNavActive, { passive: true })
    setNavActive()
}

var mobileMenuButtonEl = document.querySelector('[data-role="mobile-menu-button"]'), mobileMainNavEl = document.querySelector('[data-role="main-nav"]')

if(mobileMainNavEl) {
    mobileMainNavEl = mobileMainNavEl.cloneNode(true)

    mobileMainNavEl.addEventListener('click', scrollToSectionListener)

    function tetherNavSetup() {
        var tether = new window.Tether({ element: mobileMainNavEl, target: mobileMenuButtonEl, attachment: 'top right', targetAttachment: 'bottom right' })
        window.addEventListener('scroll', function() { tether.position() }, { passive: true })
        requestAnimationFrame(function() { tether.position() })
    }
    if(typeof window.Tether === 'undefined') {
        document.querySelector('[data-role="tether-script"]').addEventListener('load', tetherNavSetup)
    } else {
        tetherNavSetup()
    }

    mobileMenuButtonEl.addEventListener('click', function() {
        mobileMainNavEl.classList.toggle('mobile-active')
    })

    document.body.addEventListener('click', function(e) {
        if(e.target !== mobileMenuButtonEl) {
            mobileMainNavEl.classList.remove('mobile-active')
        }
    })

    var logoEl = document.querySelector('.opschain-logo-wrapper img')
    window.addEventListener('load', function() { window.requestAnimationFrame(function(){ logoEl.style.top = `${logoEl.getBoundingClientRect().top}px` }) })
}

document.body.addEventListener('submit', function(e) {
    e.preventDefault()
    if('gtag' in window) {
        window.gtag('event', 'signup', { event_category: 'engagement', event_label: 'Register form submit' })
    }
    var form = e.target
    var submitButton = form.querySelector('button')
    var attempt = 0
    var name = form.querySelector('[name="name"]').value
    var email = form.querySelector('[name="email"]').value
    !(function doSubmit() {
        submitButton.classList.add('loading')
        submitButton.disabled = true
        attempt++
        var data = Array.from(form.elements)
            .filter(function(elem) {
                return !!elem.name && elem.name !== 'first-name' // honeypot
            })
            .map(function(elem) {
                return encodeURIComponent(elem.name) + '=' + encodeURIComponent(elem.value)
            }).join('&')
        fetch(form.action, {
            method: 'post',
            body: data + '&first-name=',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function(response) {
            submitButton.classList.remove('loading')
            submitButton.disabled = false
            if(response.ok) {
                window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ name: name, email: email, date: Date.now() }))
                thanksForSubmitting()
            } else {
                if(attempt < 3) {
                    return doSubmit()
                } else {
                    response.text().then(function(text) {
                        alert('Failed to submit form: ' + text + '\n' + response.statusText)
                    })
                }
            }
        })
    }())
})

function mailcheckSetup() {
    Mailcheck.defaultTopLevelDomains.push('com.au', 'net.au', 'id.au', 'org.au')
    function tetherSetup() {
        Array.from(document.querySelectorAll('input[type="email"]')).forEach(function(el) {
            var message = document.createElement('div')
            message.style.background = '#333'
            message.style.color = 'white'
            message.style.borderRadius = '4px'
            message.style.padding = '5px 4px'
            console.log(message)
            document.body.appendChild(message)
            var tether = new window.Tether({ element: message, target: el, attachment: 'bottom left', targetOffset: '0 -100%' })
            var timeout = null
            el.addEventListener('blur', function(e) {
                var targetEl = e.target
                Mailcheck.run({
                    email: targetEl.value,
                    empty: hide,
                    suggested: function(suggestion) {
                        clearTimeout(timeout)
                        setTimeout(hide, 2e3)
                        message.style.display = 'block'
                        message.style.cursor = 'pointer'
                        message.innerText = 'Did you mean: ' + suggestion.full + '?'
                        message.onclick = function() {
                            hide()
                            targetEl.value = suggestion.full
                        }
                        tether.position()
                    }
                })
                function hide() {
                    clearTimeout(timeout)
                    message.style.display = 'none'
                }
            })
        })
    }
    if(typeof window.Tether === 'undefined') {
        document.querySelector('[data-role="tether-script"]').addEventListener('load', tetherSetup)
    } else {
        tetherSetup()
    }
}

if(typeof window.Mailcheck === 'undefined') {
    document.querySelector('[data-role="mailcheck-script"]').addEventListener('load', mailcheckSetup)
} else {
    mailcheckSetup()
}
