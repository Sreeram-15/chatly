<<<<<<< HEAD
// audio setup
const keyStrokeSounds = [
  new Audio("/sounds/keystroke1.mp3"),
  new Audio("/sounds/keystroke2.mp3"),
  new Audio("/sounds/keystroke3.mp3"),
  new Audio("/sounds/keystroke4.mp3"),
];

function useKeyBoardSound() {
  const playRandomKeyStrokeSound = () => {
    const  idx=Math.floor(Math.random() * keyStrokeSounds.length);
    const randomSound = keyStrokeSounds[idx];

    randomSound.currentTime = 0; // this is for a better UX, def add this
    randomSound.play().catch((error) => console.error("Audio play failed:", error));
  };

  return { playRandomKeyStrokeSound };
=======
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
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
}

export default useKeyBoardSound;