export default class UserInfo {
  constructor({name, about, avatar, _id}) {
    this._userName = document.querySelector(name);
    this._userAbout = document.querySelector(about);
    this._userAvatar = document.querySelector(avatar);
    this._userID = _id
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent
    };
  }

  getUseriD() {
    return {
      userID: this._userID
    };
  }

  setUserInfo({name, about, avatar, _id}) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
    this._userID = _id
  }
}