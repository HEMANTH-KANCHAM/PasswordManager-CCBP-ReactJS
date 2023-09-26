import './index.css'

const PasswordItem = props => {
  const {passwordDetails, showPasswords, deletePassword} = props
  const {id, website, username, password} = passwordDetails

  const passwordEl = showPasswords ? (
    <p className="password">{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars"
    />
  )

  const onDeleteButton = () => {
    deletePassword(id)
  }

  return (
    <li className="list-item">
      <div className="text">
        <p className="user-logo">{username[0]}</p>
        <div className="details">
          <p className="website">{website}</p>
          <p className="username">{username}</p>
          {passwordEl}
        </div>
      </div>
      <button
        onClick={onDeleteButton}
        type="button"
        className="delete-button"
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
