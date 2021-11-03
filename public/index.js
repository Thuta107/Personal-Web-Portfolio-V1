// Navigation

/**
 * Function for controlling Menu Bar
 * @param {boolean} paraBool - true if not opened, false otherwise
 */
 const onMenu = paraBool => {
    const openMenu = document.querySelector('#nav-open')
    const closeMenu = document.querySelector('#nav-close')
    const menuSection = document.querySelector('#navigation')
    const mainSection = document.querySelector('#main-content')
    const toast = document.getElementById('toast')

    paraBool ? openMenu.style.animation = "fadeOut 1s" : closeMenu.style.animation = "fadeOut 1s"
    paraBool ? closeMenu.style.animation = "fadeIn 1s" : openMenu.style.animation = "fadeIn 1s" 
    
    openMenu.style.display = paraBool ? 'none' : 'block'
    closeMenu.style.display = paraBool ? 'block' : 'none'

    menuSection.style.animation = paraBool ? "fadeIn 0.5s forwards" : "fadeOut 0.5s forwards"
    mainSection.style.display = paraBool ? 'none' : 'block'

    toast.style.display = paraBool ? "none" : "block"
}


/**
 * Function for handling navigation links
 */
const onNavigate = () => {
    const openMenu = document.querySelector('#nav-open')
    const closeMenu = document.querySelector('#nav-close')
    const menuSection = document.querySelector('#navigation')
    const mainSection = document.querySelector('#main-content')
    const toast = document.getElementById('toast')

    openMenu.style.animation = "fadeIn 1s"
    closeMenu.style.animation = "fadeOut 1s"
    openMenu.style.display = 'block'
    closeMenu.style.display = 'none'
    menuSection.style.animation = "fadeOut 0.5s forwards"
    mainSection.style.display = 'block'
    toast.style.display = "block"
}


// About

/**
 * Function for downloading Image
 */
async function downloadCV() {
    window.open(
        window.location.origin + '/resume.pdf',
        '_blank' // Open a new window or tab
    );
}

/**
 * Function for showing the current year
 */
function showCurrent(element) {
    const currYear = document.querySelector(`#${element}`)
    currYear.innerText = new Date().getFullYear().toString()
    currYear.style.font
}


// Intersection Observer

function callObserver() {
    
    let sections = document.querySelectorAll("section");

    let options = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };
  
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => { 
            if(!entry.isIntersecting) {
                entry.target.style.animation = "fadeOut 1.5s ease-in-out forwards";
                return;
            }
            entry.target.style.animation = "fadeIn 1.5s ease-in-out forwards";
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
}


/**
 * Add Focus listeners for all the input
 */
function addListeners() {
    
    const emailNode = document.getElementById('email');
    const subjNode = document.getElementById('subject');
    const msgNode = document.getElementById('message');

    emailNode.addEventListener('focus', () => {
        const label = document.getElementById('email-label')
        const successIcon = document.getElementById('email-tick')
        const errorIcon = document.getElementById('email-cross')
        const errorMsg = document.getElementById('email-error')

        label.style.color = "black"
        successIcon.style.display = "none"
        errorIcon.style.display = "none"
        errorMsg.innerText = ""
        emailNode.style.border = "2px solid var(--color-blue)"
    });

    emailNode.addEventListener('focusout', () => {
        checkInputs(emailNode, "email")
    });

    subjNode.addEventListener('focus', () => {
        const label = document.getElementById('subject-label')
        const successIcon = document.getElementById('subject-tick')
        const errorIcon = document.getElementById('subject-cross')
        const errorMsg = document.getElementById('subject-error')

        label.style.color = "black"
        successIcon.style.display = "none"
        errorIcon.style.display = "none"
        errorMsg.innerText = ""
        subjNode.style.border = "2px solid var(--color-blue)"
    });

    subjNode.addEventListener('focusout', () => {
        checkInputs(subjNode, "subject")
    });

    msgNode.addEventListener('focus', () => {
        const label = document.getElementById('message-label')
        const successIcon = document.getElementById('message-tick')
        const errorIcon = document.getElementById('message-cross')
        const errorMsg = document.getElementById('message-error')

        label.style.color = "black"
        successIcon.style.display = "none"
        errorIcon.style.display = "none"
        errorMsg.innerText = ""
        msgNode.style.border = "2px solid var(--color-blue)"
    });

    msgNode.addEventListener('focusout', () => {
        checkInputs(msgNode, "message")
    });
}


/**
 * Check the input element for its validity 
 * @param {Object} element - Input element to check for the validity
 */
function checkInputs(element, identifier) {

    const label = document.getElementById(`${identifier}-label`)
    const success = document.getElementById(`${identifier}-tick`)
    const error = document.getElementById(`${identifier}-cross`)
    const errorMsg = document.getElementById(`${identifier}-error`)

    if (!element.checkValidity()) {

        label.style.color = "red"
        element.style.border = "2px solid red"
        success.style.display = "none"
        error.style.display = "inline"
        errorMsg.style.color = "red"

        if(identifier === 'email' && element.validity.typeMismatch) {
            errorMsg.innerText = "Invalid Email Format";
        } else {
            errorMsg.innerText = "Field is required"
        }
        return false
    }

    label.style.color = "#03c04a"
    element.style.border = "2px solid #03c04a"
    success.style.display = "inline"
    error.style.display = "none"
    errorMsg.innerText = ""
    return true
} 


async function submitMsg() {
    
    const emailNode = document.getElementById('email');
    const subjNode = document.getElementById('subject');
    const msgNode = document.getElementById('message');

    if (!(checkInputs(emailNode, "email") && checkInputs(subjNode, "subject") && checkInputs(msgNode, "message"))) {
        return
    }

    const submitBtn = document.getElementById('submit');
    submitBtn.disabled = true;

    fetch('/', {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': emailNode.value, 
            'subject': subjNode.value, 
            'message': msgNode.value 
        })
    })
    .then(response => { return response.json() })
    .then(response => {
        const toast = document.getElementById("toast")
        const toastMsg = document.getElementById("toast-message")
        if(response) {   
            toastMsg.style.backgroundColor = "#03c04a"
            toastMsg.innerText = "Thank you! Your message is sent successfully."
        } else {
            toastMsg.style.backgroundColor = "red"
            toastMsg.innerText = "Server Error: Message Failed."
        }
        toast.style.animation = "fadeInOut ease-in-out 5s forwards";
        setTimeout(() => {
            toastMsg.innerText = ""
            toast.style.animation = "none"
        }, 10000)
        submitBtn.disabled = false;
    })
    .catch(error => {
        const toast = document.getElementById("toast")
        const toastMsg = document.getElementById("toast-message")
        toastMsg.style.backgroundColor = "red"
        toastMsg.innerText = `Client Error: Message Failed with ${error}.`
        toast.style.animation = "fadeInOut ease-in-out 5s forwards";
        setTimeout(() => {
            toastMsg.innerText = ""
            toast.style.animation = "none"
        }, 10000)
        submitBtn.disabled = false;
    })
    
    const form = document.getElementById('contact-form')
    form.reset();

    emailNode.style.border = "2px solid black"
    msgNode.style.border = "2px solid black"
    subjNode.style.border = "2px solid black"

    document.getElementById('email-label').style.color = "black"
    document.getElementById('email-label').style.color = "black"
    document.getElementById('email-label').style.color = "black"
    
    document.getElementById('email-tick').style.display = "none"
    document.getElementById('email-cross').style.display = "none"
    document.getElementById('subject-tick').style.display = "none"
    document.getElementById('subject-cross').style.display = "none"
    document.getElementById('message-tick').style.display = "none"
    document.getElementById('message-cross').style.display = "none"

    document.getElementById('email-error').innerText = ""
    document.getElementById('subject-error').innerText = ""
    document.getElementById('message-error').innerText = ""

    document.getElementById('subject-label').style.color = "black"
    document.getElementById('message-label').style.color = "black"
    document.getElementById('email-label').style.color = "black"
}

// Call all functions on Load

/** Intersection Observer Realated **/
window.addEventListener("load", () => {
    callObserver();
    addListeners();
    showCurrent('curr-year');
});