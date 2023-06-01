





export default class Card{
    constructor(cardModel,cardSelectors,callbacks) {
        this._selectors = cardSelectors
        this._callbacks = callbacks;
        this._cardModel = cardModel
        this._temaplate = document.querySelector(cardSelectors.template)
        this._cardId = this.node.dataset?.cardId
        this._title = this.node.querySelector(cardSelectors.title)
        this._image = this.node.querySelector(cardSelectors.image)
        this._likeBtn = this.node.querySelector(cardSelectors.likeBtn)
        this._isLiked = this._likeBtn.classList.contains(cardSelectors.likeBtnActive)
        this._likeSpan = this.node.querySelector(cardSelectors.likeCounter)
        this._delBtn = this.node.querySelector(cardSelectors.delBtn)
    }
    get node(){
        if (!this._node) {
            this._node = this._temaplate.content.cloneNode(true).children[0]
            return this._node
        }
        return this._node
    }
    get cardId(){
        return this._cardId
    }
    set cardId(value){
        this.node.dataset.cardId = value
        this._cardId = value
    }
    get imageUrl(){
        return this._image.src
    }
    set image(value){
        this._image.src = value
        this._image.alt = "Изображение для " + this._title
    }
    get title(){
        return this._title.innerText
    }
    set title(value){
        this._title.innerText = value
    }
    get isLiked(){
        return this._isLiked
    }
    set setLiked(state){
        if (state) {
            this._likeBtn.classList.add(this._selectors.likeBtnActive)

        } else {
            this._likeBtn.classList.remove(this._selectors.likeBtnActive)
        }
        this._isLiked = state
    }
    get likes(){
        const likes = this._likeSpan.innerText
        return likes? parseInt(likes) : 0
    }
    set likes(value){
        value = value? value: ""
        this._likeSpan.innerText = value
    }
    set disableTrash(state){
        if (state){
            this._delBtn.remove()
        }
    }
     createCard = (options) => {

        const {name, link, likes, _id} = this._cardModel
        this.title = name
        this.image = link
        this.likes = likes.length
        this.cardId = _id
        this._setEventListeners()
        this.disableTrash = !options.trash
        this.setLiked = options.liked
        return this.node
    }
     _setEventListeners(){
        this._setLikeListener()
         this._setDelListener()
         this._setImageListener()
    }
    _setLikeListener(){
        this._likeBtn.addEventListener("click", ()=>{
            const method = this.isLiked? this._callbacks.onRmvLike : this._callbacks.onSetLike
            method(this.cardId).then((response)=>{
                this.likes = response.likes.length
                this.setLiked = !this.isLiked
            })
                .catch(reason => console.error(reason))
        })
    }
    _setDelListener(){
        this._delBtn.addEventListener("click", ()=>{
            this._callbacks.onDelete(this.cardId)
                .then(()=>this._node.remove())
                .catch(reason => console.error(reason))
        })
    }
    _setImageListener(){
        this._image.addEventListener("click", ()=>this._callbacks.onImageClick(this.title, this.imageUrl))
    }

}