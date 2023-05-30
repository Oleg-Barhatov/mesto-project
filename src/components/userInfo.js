export default class UserInfo {
  constructor({name, about, avatar, _id}) {
    this._userName = document.querySelector(name);
    this._userAbout = document.querySelector(about);
    this._userAvatar = document.querySelector(avatar);
    this._userID = _id
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent
    };
  }

  getUseriD() {

    return this._userID
    
  }

  setUserInfo({name, about, avatar, _id}) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
    this._userID = _id
  }
}