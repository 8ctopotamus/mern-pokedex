import { useMutation } from '@apollo/client'
import { ADD_POKEMON } from '../utils/mutations'
import { GET_TRAINER } from '../utils/queries'
import { MdSave } from 'react-icons/md'
import Container from './container'
import Auth from '../utils/auth'
import { useThemeContext } from '../ctx/themeContext'

const PokemonDetails = props => {
  const { theme } = useThemeContext()

  const {
    id,
    name,
    moves,
    sprites,
    base_experience,
    height,
    weight
  } = props.pokemon

  const [addPokemon] = useMutation(ADD_POKEMON, {
    refetchQueries: [
      {query: GET_TRAINER},
      'GET_TRAINER'
    ]
  })

  const currentUser = Auth.getLoggedInUser()

  const save = async () => {
    await addPokemon({
      variables: {
        trainerId: currentUser._id,
        pokemonId: id,
        name,
        height,
        weight,
        base_experience,
        image: sprites.other['official-artwork'].front_default,
        moves: moves.map(moveObj => moveObj.move.name)
      }
    })
    alert(`${name} saved!`)
  }

  return (
    <Container className="results">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>ID: {id}</h3>
        {Auth.loggedIn() && (
          <button onClick={save}> 
            <MdSave color={theme === 'light' ? 'white' : 'black'} size={25} /> 
          </button>
        )}
      </div>
      <img 
        src={sprites.other['official-artwork'].front_default}
        alt={name}
        height="auto"
        width="100%"
      />
      <h1>{name}</h1>
      <ul>
        <li>Base Experience: {base_experience}</li>
        <li>Height: {height}</li>
        <li>Weight: {weight}</li>
      </ul>
      <h2>Moves</h2>
      <ul>
        {moves.map(moveObj => (
          <li key={moveObj.move.name}>
            {moveObj.move.name}
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default PokemonDetails