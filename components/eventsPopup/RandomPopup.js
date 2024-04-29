import AlertPopup from "./AlertPopup";
import SelectionPopup from "./SelectionPopup";

function RandomPopup({ modalVisible, closeModal }) {
    const selectRandomModal = () => {
        const randomIndex = Math.floor(Math.random() * 2);
        return randomIndex === 0
            ? <AlertPopup modalVisible={modalVisible} closeModal={closeModal} />
            : <SelectionPopup modalVisible={modalVisible} closeModal={closeModal} />
    }
    return selectRandomModal();
}

export default RandomPopup;