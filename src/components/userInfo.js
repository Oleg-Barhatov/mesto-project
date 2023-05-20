export default class UserInfo {
  constructor({selectorName, selectorAbout, selectorAvatar}) {
    this._userName = selectorName;
    this._userAbout = selectorAbout;
    this._userAvatar = selectorAvatar;
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent
    };
  }

  setUserInfo({name, about, avatar}) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
  }

}