export default class UserInfo {
  constructor({name, about, avatar, _id}) {
    this._userName = document.querySelector(name);
    this._userAbout = document.querySelector(about);
    this._userAvatar = document.querySelector(avatar);
    this._userID = _id
  }

  getUserInfo() {
    return {
      userName: this._userName.innerText,
      userAbout: this._userAbout.innerText
    };
  }

  setUserInfo({name, about, avatar}) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
  }
}