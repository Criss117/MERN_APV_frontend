import PropTypes from 'prop-types'

const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r text-center p-3 rounded-xl uppercase
    text-white font-bold mb-10`}>
        {alerta.msg}
    </div>
  )
}

Alerta.propTypes = {
  alerta: PropTypes.object.isRequired
}

export default Alerta
