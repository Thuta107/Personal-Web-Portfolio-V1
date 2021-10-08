/** 
 * Resize properly when the hamburger navigation is on
 */
window.addEventListener("resize", () => {
    let value = window.innerWidth;
    let burger = document.getElementById("burger");
    let burger_x = document.getElementById("burger-x");
    let nav = document.getElementById("nav-socials");
    let main = document.getElementById("main-container");

    if(value > 900) {
        burger.style.display = "none";
        burger_x.style.display = "none";
        nav.style.display = "none";
        main.style.display = "block"
    } else {
        burger.style.display = "inline";
    }
});


/** Intersection Observer Realated **/
window.addEventListener("load", () => {
    callObserver();
    focus();
});

function callObserver() {
    let sections = document.querySelectorAll("section");

    let options = {
        root: null,
        threshold: 0.3,
        rootMargin: "0px"
    };
  
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => { 
            if(!entry.isIntersecting) {
                return;
            }

            entry.target.style.animation = "myFadeIn 1s ease-in-out forwards";
            observer.unobserve(entry.target);
        });
    }, options);

    sections.forEach(section => {
        console.log("Testing")
        observer.observe(section);
    });
}


/**
 * Open/Close the Hamburger Menu
 * @param {Boolean} bool - true for burger (open) else false.
 */
function menuOn(bool) {
    let burger = document.getElementById("burger");
    let burger_x = document.getElementById("burger-x");
    let nav = document.getElementById("nav-socials");
    let main = document.getElementById("main-container");
    
    if (bool) {
        burger.style.display = "none";
        burger_x.style.display = "inline";
        nav.style.display = "flex";
        main.style.display = "none"
    } else {
        burger.style.display = "inline";
        burger_x.style.display = "none";
        nav.style.display = "none";
        main.style.display = "block";
    }
}


/** 
 * Download my Resume or CV 
 */
async function downloadCV() {
    window.open(
        window.location.origin + '/resume.pdf',
        '_blank' // Open a new window or tab
    );
}


/**
 * Submit Form Data
 */
async function submitMsg() {
    let name = document.getElementById('fullname');
    let email = document.getElementById('email');
    let subject = document.getElementById('subject');
    let message = document.getElementById('message');
    let toast = document.getElementById('toast');
    toast.classList.remove('toast-animation')


    // Check Name, Email, Subject and Message
    if (!name.checkValidity() || !email.checkValidity() || !subject.checkValidity() || !message.checkValidity()) {
        
        let err;

        if (!name.checkValidity()) {
            name.style.borderBottom = "2px solid red";
            name.style.animation = "myFadeIn 1s ease-in-out forwards";

            err = document.getElementById('err-name');
            err.style.visibility = "visible";
            err.style.animation = "myFadeIn 1s ease-in-out forwards";
            err.innerText = "Name field is required";
        }
    
        if (!email.checkValidity()) {
            email.style.borderBottom = "2px solid red";
            email.style.animation = "myFadeIn 1s ease-in-out forwards";

            err = document.getElementById('err-email');
            err.style.visibility = "visible";
            err.style.animation = "myFadeIn 1s ease-in-out forwards";
            if(email.validity.typeMismatch) {
                err.innerText = "Email is not a valid email format";
            } else {
                err.innerText = "Email field is required";
            }
        }

        if (!subject.checkValidity()) {
            subject.style.borderBottom = "2px solid red";
            subject.style.animation = "myFadeIn 1s ease-in-out forwards";

            err = document.getElementById('err-subj');
            err.style.visibility = "visible";
            err.style.animation = "myFadeIn 1s ease-in-out forwards";
            err.innerText = "Subject field is required";
        }

        if (!message.checkValidity()) {
            message.style.borderBottom = "2px solid red";
            message.style.animation = "myFadeIn 1s ease-in-out forwards";

            err = document.getElementById('err-msg');
            err.style.visibility = "visible";
            err.style.animation = "myFadeIn 1s ease-in-out forwards";
            err.innerText = "Message field is required";
        }

        return false;
    }

    console.log(name.value)
    console.log(email.value)
    console.log(subject.value)
    console.log(message.value)

    fetch('/', {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'fullname': name.value,
            'email': email.value, 
            'subject': subject.value, 
            'message': message.value 
        })
    })
    .then(response => { 
        if(response.status == 200 || response.status == 400) {
            return response.json()
        } else {
            return response.json()
        }
    })
    .then(response => {
        console.log(response)
        if(response.msg) {
            toast.classList.add('toast-animation');
            toast.innerText = response.msg;
        } else {
            toast.classList.add('toast-animation');
            toast.innerText = 'Internal Server Error Occured'
        }
    })
    .catch(error => console.log(error))
    
    form = document.getElementById('contact-form')
    form.reset();
    return false;
}


/**
 * Focus on the input
 */
function focus() {
    let name = document.getElementById('fullname');
    let email = document.getElementById('email');
    let subject = document.getElementById('subject');
    let message = document.getElementById('message');
    let err;

    name.addEventListener('focus', () => {
        name.style.border = "none";
        name.style.borderBottom = "3px solid var(--color-blue)";
        err = document.getElementById('err-name');
        err.style.visibility = "hidden";
    });

    name.addEventListener('focusout', () => {
        name.style.border = "none";
    });

    email.addEventListener('focus', () => {
        email.style.border = "none";
        email.style.borderBottom = "3px solid var(--color-blue)";
        err = document.getElementById('err-email');
        err.style.visibility = "hidden";
    });

    email.addEventListener('focusout', () => {
        email.style.border = "none";
    });

    subject.addEventListener('focus', () => {
        subject.style.border = "none";
        subject.style.borderBottom = "3px solid var(--color-blue)";
        err = document.getElementById('err-subj');
        err.style.visibility = "hidden";
    });

    subject.addEventListener('focusout', () => {
        subject.style.border = "none";
    });

    message.addEventListener('focus', () => {
        message.style.border = "none";
        message.style.borderBottom = "3px solid var(--color-blue)";
        err = document.getElementById('err-msg');
        err.style.visibility = "hidden";
    });

    message.addEventListener('focusout', () => {
        message.style.border = "none";
    });
}