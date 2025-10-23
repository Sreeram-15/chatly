const keyStrokeSounds=[
    new Audio("/sounds/keyStroke1.mp3"),
    new Audio("/sounds/keyStroke2.mp3"),
    new Audio("/sounds/keyStroke3.mp3"),
    new Audio("/sounds/keyStroke4.mp3"),
];

function useKeyBoardSound(){
    const playRandomKeyStrokeSound=()=>{
        const randomSound=keyStrokeSounds[Math.floor(Math.random()*playRandomKeyStrokeSound.length)];
        randomSound.currentTime=0; //for better UX
        randomSound.play().catch(error=>console.log("Audio play failed:-".error));
    };

    return {playRandomKeyStrokeSound};
}

export default useKeyBoardSound;