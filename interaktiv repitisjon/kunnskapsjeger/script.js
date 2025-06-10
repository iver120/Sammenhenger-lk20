document.addEventListener('DOMContentLoaded', function() {
    // Referanser til HTML-elementer
    const startTopicEl = document.getElementById('start-topic');
    const targetTopicEl = document.getElementById('target-topic');
    const startLinkEl = document.getElementById('start-link');
    const newChallengeBtn = document.getElementById('new-challenge-btn');
    const showSolutionBtn = document.getElementById('show-solution-btn');
    const solutionPathEl = document.getElementById('solution-path');
    const solutionTextEl = document.getElementById('solution-text');
    const solutionExplanationEl = document.getElementById('solution-explanation');

    // Liste med alle utfordringene
    const challenges = [
        {
            startTopic: "Fotosyntese",
            startUrl: "https://no.wikipedia.org/wiki/Fotosyntese",
            targetTopic: "Fossilt brensel",
            solutionPath: "Fotosyntese → Karbon → Organisk materiale → Geologisk tidsskala → Fossilt brensel",
            explanation: "Denne ruten viser hvordan energi fra solen, lagret i organisk materiale for millioner av år siden via fotosyntese, er grunnlaget for den kjemiske energien i fossile brensler."
        },
        {
            startTopic: "Vaksine",
            startUrl: "https://no.wikipedia.org/wiki/Vaksine",
            targetTopic: "Evolusjon",
            solutionPath: "Vaccine (engelsk) → Growth medium → Microorganism → Evolution",
            explanation: "Denne (engelske) ruten er svært effektiv fordi den går via produksjon (vekstmedium) og mikrobiologi for å vise den direkte koblingen. Virus og bakterier er våre beste eksempler på evolusjon i sanntid."
        },
        {
            startTopic: "Drivhuseffekt",
            startUrl: "https://no.wikipedia.org/wiki/Drivhuseffekt",
            targetTopic: "Venus",
            solutionPath: "Drivhuseffekt → Global oppvarming → Jorden → Solsystemet → Venus",
            explanation: "Denne ruten bruker Venus som et 'skrekkeksempel' på en løpsk drivhuseffekt, og setter dermed jordens klima i et større kosmisk perspektiv."
        },
        {
            startTopic: "Litium-ion-batteri",
            startUrl: "https://no.wikipedia.org/wiki/Litium-ion-batteri",
            targetTopic: "Havforsuring",
            solutionPath: "Litium-ion-batteri → Elbil → Fornybar energi → Global oppvarming → Karbondioksid → Havforsuring",
            explanation: "Denne ruten kobler en teknologisk løsning (batterier for elbiler) til et av de store klimaproblemene (havforsuring) ved å vise hvordan de begge er knyttet til håndteringen av karbondioksid."
        },
        {
            startTopic: "Mitokondrie",
            startUrl: "https://no.wikipedia.org/wiki/Mitokondrie",
            targetTopic: "Høyintensiv intervalltrening",
            solutionPath: "Mitokondrie → Celleånding → ATP → Muskelcelle → Anaerob trening → Høyintensiv intervalltrening",
            explanation: "Viser den direkte koblingen fra cellens 'kraftverk' til kroppens evne til å yte maksimalt ved å følge energiproduksjonens vei (ATP) til musklene."
        }
    ];

    let currentChallengeIndex = -1;

    function loadNewChallenge() {
        // Skjul løsningsforslaget
        solutionPathEl.classList.add('hidden');

        // Velg en ny, tilfeldig utfordring som ikke er den samme som sist
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * challenges.length);
        } while (newIndex === currentChallengeIndex);
        
        currentChallengeIndex = newIndex;
        const challenge = challenges[currentChallengeIndex];

        // Oppdater innholdet på siden
        startTopicEl.textContent = challenge.startTopic;
        targetTopicEl.textContent = challenge.targetTopic;
        startLinkEl.href = challenge.startUrl;
        
        solutionTextEl.textContent = challenge.solutionPath;
        solutionExplanationEl.textContent = challenge.explanation;
    }

    // Event listeners for knappene
    newChallengeBtn.addEventListener('click', loadNewChallenge);
    showSolutionBtn.addEventListener('click', () => {
        solutionPathEl.classList.toggle('hidden');
    });

    // Last den første utfordringen når siden åpnes
    loadNewChallenge();
});
