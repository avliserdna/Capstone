const GET_TEAM_SUGGESTION = 'teamsuggestion/GET_TEAM_SUGGESTION'
const ADD_TEAM_SUGGESTION = 'teamsuggestion/ADD_TEAM_SUGGESTION'

export const getTeamSuggestion = (teamSuggestion) => {
    return {
        type: GET_TEAM_SUGGESTION,
        teamSuggestion
    }
}

export const addTeamSuggestion = (teamSuggestion) => {
    return {
        type: ADD_TEAM_SUGGESTION,
        teamSuggestion
    }
}

export const getSuggestions = () => async (dispatch) => {
    const response = await fetch(`/api/teamsuggestions/`);
    const suggestionData = await response.json();
    dispatch(getTeamSuggestion(suggestionData))
}

export const getUserSuggestion = (user_id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${user_id}/suggestions`)
    const postSuggestionData = await response.json();
    dispatch(getTeamSuggestion(postSuggestionData))
}

export const addSuggestion = (suggestionData) => async (dispatch) => {
    const response = await fetch(`/api/teamsuggestions/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(suggestionData)
        })

    if (response.ok) {
        const suggestionData = await response.json()
        dispatch(addTeamSuggestion(suggestionData))
    }
}

export default function suggestionReducer(state = {}, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_TEAM_SUGGESTION:
            return { ...newState, ...action.teamSuggestion }
        case ADD_TEAM_SUGGESTION:
            return newState[action.teamSuggestion.id] = action.teamSuggestion
        default:
            return state
    }
}
