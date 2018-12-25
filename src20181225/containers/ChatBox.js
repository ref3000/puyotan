import { connect } from 'react-redux'
import ChatBox from '../components/ChatBox';

const mapStateToProps = state => ({
  todos: state.chats
})

const mapDispatchToProps = dispatch => ({
  submitChat: (chatObj) => dispatch({
    type: '',
    obj: chatObj
  })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatBox)