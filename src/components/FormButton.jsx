import PropTypes from 'prop-types'

const FormButton = ({valor}) => {
  return (
    <input 
        type="submit" 
        value={valor}
        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors text-center rounded-lg"
    />
  )
}

FormButton.propTypes = {
    valor: PropTypes.string.isRequired
}

export default FormButton