import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import Pagination from "./Pagination";
const CharacterSuggestion = () => {
    const characters = useSelector((state) => state.character)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const charactersPerPage = 25;
    const indexOfLastRecord = currentPage * charactersPerPage;
    const indexOfFirstRecord = indexOfLastRecord - charactersPerPage + 1;
    // const currentCharacters = characters.slice(indexOfFirstRecord, indexOfLastRecord)
    const nPages = Math.ceil(Object.values(characters).length / charactersPerPage)

    const characterRender = () => {
        const charactersArray = [];
        if (!characters[1]) return
        for (let i = indexOfFirstRecord; i <= indexOfLastRecord; i++) {
            charactersArray.push(<img className="character-icon" src={characters[i].icon} />)
        }
        return charactersArray
    }

    return (
        <div className="character-holder">
            <div className="characters">
                {/* {currentCharacters.map((character) => <img className="character-icon" src={character.icon} loading="lazy" />)} */}
                {characterRender()}
            </div>
            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

export default CharacterSuggestion;
