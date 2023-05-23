





export default class Card{
    constructor(cardNode, cardSelectors) {
        this._selectors = cardSelectors
        this._node = cardNode
        this._cardId = this._node.dataset?.cardId
        this._title = this._node.querySelector(cardSelectors.title)
        this._image = this._node.querySelector(cardSelectors.image)
        this._likeBtn = this._node.querySelector(cardSelectors.likeBtn)
        this._isLiked = this._likeBtn.classList.contains(cardSelectors.likeBtnActive)
        this._likeSpan = this._node.querySelector(cardSelectors.likeCounter)
        this._delBtn = this._node.querySelector(cardSelectors.delBtn)
    }
    get node(){
        return this._node
    }
    get cardId(){
        return this._cardId
    }
    set cardId(value){
        this._node.dataset.cardId = value
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

    static createCard (selectors,
                       cardData,
                       onSetLike,
                       onRmvLike,
                       onDelete,
                       onImageClick,
                       options = { trash: true, liked: false}) {
        const { template, element,  ...rest} = selectors;
        const {name, link, likes, _id} = cardData
        const node = document.querySelector(template).content.cloneNode(true).children[0]
        const card = new this(node, rest)
        card.title = name
        card.image = link
        card.likes = likes.length
        card.cardId = _id
        card._setEventListeners(onSetLike, onRmvLike, onDelete, onImageClick)
        card.disableTrash = !options.trash
        card.setLiked = options.liked
        return card
    }
     _setEventListeners(onSetLike, onRmvLike, onDelete, onImageClick){
        this._setLikeListener(onSetLike, onRmvLike)
         this._setDelListener(onDelete)
         this._setImageListener(onImageClick)
    }
    _setLikeListener(onSetLike, onRmvLike){
        this._likeBtn.addEventListener("click", ()=>{
            const method = this.isLiked? onRmvLike : onSetLike
            method(this.cardId).then((response)=>{
                this.likes = response.likes.length
                this.setLiked = !this.isLiked
            })
                .catch(reason => console.error(reason))
        })
    }
    _setDelListener(onDelete){
        this._delBtn.addEventListener("click", ()=>{
            onDelete(this.cardId)
                .then(this._node.remove())
                .catch(reason => console.error(reason))
        })
    }
    _setImageListener(onImageClick){
        this._image.addEventListener("click", ()=>onImageClick(this.title, this.imageUrl))
    }

}