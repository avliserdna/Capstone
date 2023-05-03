import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { addSuggestion } from "../../../store/teamsuggestion";
// insert PostDispatch for TeamSuggestions Here
import Pagination from "./Pagination";
import './CharacterSuggestion.css'
const CharacterSuggestion = ({ mapId }) => {
    const dispatch = useDispatch()
    const characters = useSelector((state) => Object.values(state.character))
    const user = useSelector((state) => state.session.user)
    const map = useSelector((state) => state.map)
    const [currentPage, setCurrentPage] = useState(1)
    const [suggestion, setSuggestion] = useState([])
    const [charactersPerPage] = useState(25)
    const [active, setActive] = useState()
    const indexOfLastRecord = currentPage * charactersPerPage;
    const indexOfFirstRecord = indexOfLastRecord - charactersPerPage;
    const currentCharacters = characters.slice(indexOfFirstRecord, indexOfLastRecord)
    const nPages = Math.ceil(characters.length / charactersPerPage)
    const userSuggestion = useSelector((state) => Object.values(state.teamSuggestion))
    console.log(mapId, "<=== Character SUggestion Map Id")
    const handleCharacter = (character) => {

        if (suggestion.includes(character.api_id)) {
            return "duplicate entry"
        }

        if (suggestion.length >= 7) {
            console.log("No more characters!")
        }
        else {
            setSuggestion([...suggestion, character.api_id])
        }
    }

    const handleSuggestionSubmit = (e) => {
        e.preventDefault()
        // DO NOT ITERATE AND LOOP HERE, DO IT IN THE BACKGROUND
        if (userSuggestion.length) {
            console.log("You already HAVE suggestions")
        }
        else {
            const payload = {
                user_id: user.id,
                map_id: mapId,
                character_ids: suggestion
            }
            console.log(payload)
            dispatch(addSuggestion(payload))
        }

    }
    return (
        <>
            <h1>Character Suggestions</h1>
            <h3>You can select up to 7 characters to suggest!</h3>
            <div className="characters">
                {currentCharacters.map((character) => character.icon === "image" ? <img onClick={() => handleCharacter(character)} className="character-icon" src="/image-unavailable.jpeg" /> : <img onClick={() => handleCharacter(character)} className="character-icon" src={character.icon} />)}

            </div>
            <button onClick={handleSuggestionSubmit}>Suggest Character</button>
            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default CharacterSuggestion;
