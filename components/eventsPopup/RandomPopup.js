import AlertPopup from "./AlertPopup";
import SelectionPopup from "./SelectionPopup";

function RandomPopup({ modalVisible, closeModal }) {
    // Function to randomly select a modal component
    const selectRandomModal = () => {
        const randomIndex = Math.floor(Math.random() * 2); // Random index 0 or 1
        return randomIndex === 0
            ? <AlertPopup modalVisible={modalVisible} closeModal={closeModal} />
            : <SelectionPopup modalVisible={modalVisible} closeModal={closeModal} />
    }
    return selectRandomModal();
}

export default RandomPopup;