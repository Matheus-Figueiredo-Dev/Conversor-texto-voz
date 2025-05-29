const text = document.getElementById('text')
const upload = document.getElementById('upload')
const voice = document.getElementById('voice')
const listenBtn = document.getElementById('listen-btn')
const downloadBtn = document.getElementById('download-btn')

const speak = new SpeechSynthesisUtterance()

let availableVoices = [];

const appValues = () => {
    availableVoices = window.speechSynthesis.getVoices()

    speak.voice = availableVoices[0]

    availableVoices.forEach((voices, index) => {
        const option = document.createElement('option')
        option.value = index
        option.textContent = voices.name
        voice.appendChild(option)
    })
};

window.speechSynthesis.onvoiceschanged = appValues

voice.addEventListener('change', () => {
    speak.voice = availableVoices[voice.value]
})

listenBtn.addEventListener('click', () => {
    speak.text = text.value

    window.speechSynthesis.speak(speak)
})

downloadBtn.addEventListener('click', () => {
    const downText = text.value

    const blob = new Blob([downText], { type: 'text-plain' })

    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')

    a.href = url
    a.download = 'conversor.txt'
    a.click()

    URL.revokeObjectURL(url)
})

upload.addEventListener('change', (event) => {
    const archive = event.target.files[0]

    if (archive) {
        const reader = new FileReader()
        reader.onload = (e) => {
            text.value = e.target.result
        }

        reader.readAsText(archive)
    }
})