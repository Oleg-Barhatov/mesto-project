export default class Section {
    constructor({items, renderer}, selector) {
        this._items=items
        this._renderer = renderer
        this._container = document.querySelector(selector)

    }
    set renderer(func){
        this._renderer = func
    }
    set items(itemsArr){
        this._items = itemsArr
    }
    renderItems = (reversed = false)=>{
        this._items = reversed? this._items.reverse(): this._items
        this._items.forEach(item=>this.addItem(item))
    }
    addItem = (item)=>{
        const element = this._renderer(item)
        this._container.prepend(element)
    }

}