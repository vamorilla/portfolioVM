
const d = document;

//Filtro de busqueda

const $cards = d.getElementById("cards");
const $searchBox = d.getElementById("search");

const elementSearch = () => {
    
    let filter = $searchBox.value.toUpperCase();
    let $figure = $cards.querySelectorAll("figure");

    for(let i = 0; i < $figure.length; i++){
        let textValue = $figure[i].textContent;

        if(textValue.toUpperCase().indexOf(filter) > -1){
            $figure[i].style.display = "";
        }else{
            $figure[i].style.display = "none";
        }
    }
}

elementSearch();

$searchBox.addEventListener("keyup", elementSearch);

//Sorteo Digital

const $languages = d.getElementById("languages");
const $wrapper = d.getElementById("lang-wrapper");

const obtenerGanador = (btn) => {
    
    let textLi = [...$languages.querySelectorAll("li")].map(el => el.textContent);

    document.addEventListener("click", (e) => {
        if(e.target.matches(btn)){
            document.getElementById(btn);
            let elAleatorio = textLi[Math.floor(Math.random() * textLi.length)];
            $wrapper.insertAdjacentHTML("beforebegin", `<p>El ganador es: ${elAleatorio}</p>`);
            alert(`El ganador es: ${elAleatorio}`);
        }
            
    })
}

obtenerGanador("#btnWinner");

// Conversor de texto a voz
 
function speech(){
    const $voices = document.getElementById('voices');
    const $message = document.getElementById('message');
    const $btnListen = document.getElementById('btn-listen');
    let speechMessage = new SpeechSynthesisUtterance();

    let voices = [];

    document.addEventListener('DOMContentLoaded', e => {
        speechSynthesis.addEventListener('voiceschanged', (e) =>{
            voices = speechSynthesis.getVoices();

            voices.forEach(voice => {
                let $option = document.createElement('option');
                $option.value = voice.name;
                $option.textContent = `${voice.name} - ${voice.lang}`;
                $voices.appendChild($option);
            });
        });
    });

    document.addEventListener('change', e => {
        if(e.target === $voices){
            speechMessage.voice = voices.find(voice => voice.name === e.target.value);
        }
    });

    document.addEventListener('click', e => {
        if(e.target === $btnListen){
            speechMessage.text = $message.value;
            speechSynthesis.speak(speechMessage);
        }
    });

 }

 speech();

 //Video inteligente

 document.addEventListener('DOMContentLoaded', () => {
    const $smartVideo = document.getElementById('inteligente-video');

    function playVideo() {
        const callback = (entries, obs) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    $smartVideo.play();
                }else{
                    $smartVideo.pause();
                }

                window.addEventListener('visibilitychange', e => {
                    document.visibilityState === 'visible' ? $smartVideo.play() : $smartVideo.pause()
                })
            })
            
        }
        const obs = new IntersectionObserver(callback, {
            threshold: 0.5,
        });
        obs.observe($smartVideo);
    }

    playVideo();
})

// Formulario de Contacto

document.addEventListener('DOMContentLoaded', () => {
    function contactFormValidate(){
        const $formContact = document.querySelector(".contacto-form");
        const $inputs = document.querySelectorAll(".contacto-form [required]");
        
        $inputs.forEach(input => {
            const $span = document.createElement("span");
            $span.id = input.name;
            $span.textContent = input.title;
            $span.classList.add("contact-form-error", "none");
            input.insertAdjacentElement("afterend", $span)
        });
        document.addEventListener("keyup", (e) => {
            if(e.target.matches(".contacto-form [required]")){
                let $input = e.target;
                let pattern = $input.pattern || $input.dataset.pattern;

            if(pattern && $input.value !== ""){
                let regex = new RegExp(pattern);
                return !regex.exec($input.value) ? document.getElementById($input.name).classList.add("is-active") : document.getElementById($input.name).classList.remove("is-active");
            }  
            
            if(!pattern){
                return $input.value === "" ? document.getElementById($input.name).classList.add("is-active") : document.getElementById($input.name).classList.remove("is-active");
            }
            }
        });
        document.addEventListener("submit", (e) => {
            e.preventDefault();//para enviarlo al mail debo desactivar esto 

            const $loader = document.querySelector(".contact-form-loader");
            const $response = document.querySelector(".contact-form-response");

            $loader.classList.remove("none");

            setTimeout(() => {
                $loader.classList.add("none");
                $response.classList.remove("none");
                $formContact.reset();

                setTimeout(() =>{
                    $response.classList.add("none");
                }, 3000);
            }, 3000);

        })

    }
    contactFormValidate();
})

