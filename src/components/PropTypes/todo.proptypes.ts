import PropTypes from 'prop-types'

const todoPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
})

export default todoPropTypes
