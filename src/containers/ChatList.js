import { connect } from 'react-redux'
import ChatList from '../components/ChatList'

const mapStateToProps = state => ({
  todos: state.chats
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatList)