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
}

export default useKeyBoardSound;