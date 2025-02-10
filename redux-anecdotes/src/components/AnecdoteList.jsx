import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { hideNotification, showNotification } from '../reducers/notificationReducer'

const Anecdotelist = () => {
    const dispatch = useDispatch()

    const showFiltred = (anecdotes, filter) => {
        console.log("filter: ", filter)
        let filtered = []
        if (filter !== 'ALL') {
            anecdotes.forEach(a => {
                console.log("a content",a.content)
                if (a.content.toLowerCase().includes(filter)) {
                    filtered.push(a)
                }
            })
        } else {
            filtered = anecdotes
        }
        return filtered
    }

    const anecdotes = useSelector(state => {
        console.log("state: ",state)

        return showFiltred(state.anecdotes, state.filter)
})
    const vote = (id, message) => {
        console.log("message", message)
        dispatch(addVote(id))
        dispatch(showNotification(`You voted '${message}'`))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5 * 1000)
      }

    return(
        <div>
            {[...anecdotes].sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
        </div>
    )}
        </div>
    )
}

export default Anecdotelist