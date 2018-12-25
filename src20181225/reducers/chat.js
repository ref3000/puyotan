export default (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_DB_CHATS':
      return action.docs.map((v) => ({
        name: v.name,
        text: v.text
      }))
    case 'POST_CHAT':
      return
    default:
      return state
  }
}