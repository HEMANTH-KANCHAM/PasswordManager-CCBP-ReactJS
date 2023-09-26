import {Component} from 'react'
import {v4} from 'uuid'

import PasswordItem from '../passwordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    showPasswords: false,
  }

  submitForm = event => {
    event.preventDefault()

    const {website, username, password} = this.state

    const newPassword = {
      id: v4(),
      website,
      username,
      password,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  onWebsiteChange = event => {
    this.setState({website: event.target.value})
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSearchInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  toggleCheckbox = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  renderNoPasswords = () => (
    <div className="no-passwords-img-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-img"
      />
      <p>No Passwords</p>
    </div>
  )

  deletePassword = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(each => each.id !== id),
    }))
  }

  render() {
    const {
      passwordsList,
      showPasswords,
      website,
      username,
      password,
      searchInput,
    } = this.state

    const filteredList = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const {length} = filteredList

    return (
      <div className="app-container">
        <div className="content-container">
          <img
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
          <div className="header-container">
            <form className="form-container" onSubmit={this.submitForm}>
              <h1 className="form-heading">Add New Password</h1>
              <div className="form-input-container">
                <label className="input-label" htmlFor="website">
                  <img
                    className="input-label-img"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                    alt="website"
                  />
                </label>
                <input
                  placeholder="Enter Website"
                  id="website"
                  className="form-input"
                  onChange={this.onWebsiteChange}
                  type="text"
                  value={website}
                />
              </div>
              <div className="form-input-container">
                <label className="input-label" htmlFor="username">
                  <img
                    className="input-label-img"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                    alt="username"
                  />
                </label>
                <input
                  placeholder="Enter Username"
                  id="username"
                  className="form-input"
                  type="text"
                  onChange={this.onUsernameChange}
                  value={username}
                />
              </div>
              <div className="form-input-container">
                <label className="input-label" htmlFor="password">
                  <img
                    className="input-label-img"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                    alt="password"
                  />
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  id="password"
                  className="form-input"
                  onChange={this.onPasswordChange}
                  value={password}
                />
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <div className="password-manager-img-container">
              <img
                className="password-manager-img"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
              />
            </div>
          </div>
          <div className="footer-container">
            <div className="search-count-container">
              <div className="password-count-container">
                <h1 className="password-count-text">Your Passwords</h1>
                <p className="password-count">{length}</p>
              </div>

              <div className="search-input-container">
                <label className="search-label" htmlFor="search">
                  <img
                    className="search-label-img"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                    alt="search"
                  />
                </label>
                <input
                  placeholder="Search"
                  id="search"
                  className="search-input"
                  type="search"
                  onChange={this.onSearchInputChange}
                  value={searchInput}
                />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="show-password-container">
              <div className="checkbox-container">
                <input
                  id="showPasswords"
                  type="checkbox"
                  className="show-password-input"
                  onChange={this.toggleCheckbox}
                />
                <label htmlFor="showPasswords" className="show-password-label">
                  Show Passwords
                </label>
              </div>
            </div>
            {length > 0 ? (
              <ul className="list-container">
                {filteredList.map(eachPassword => (
                  <PasswordItem
                    passwordDetails={eachPassword}
                    key={eachPassword.id}
                    showPasswords={showPasswords}
                    deletePassword={this.deletePassword}
                  />
                ))}
              </ul>
            ) : (
              this.renderNoPasswords()
            )}

            {/*  */}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
