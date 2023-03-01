import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import Pagination from "./Pagination";
const CharacterSuggestion = () => {
    const characters = useSelector((state) => Object.values(state.character))
    const [currentPage, setCurrentPage] = useState(1)
    const [charactersPerPage] = useState(25)
    const indexOfLastRecord = currentPage * charactersPerPage;
    const indexOfFirstRecord = indexOfLastRecord - charactersPerPage;
    const currentCharacters = characters.slice(indexOfFirstRecord, indexOfLastRecord)
    const nPages = Math.ceil(characters.length / charactersPerPage)
    return (
        <>
            <div className="characters">
                {characters.map((character) => <img className="character-icon" src={character.icon} />)}

            </div>
            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default CharacterSuggestion;
