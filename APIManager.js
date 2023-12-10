class APIManager {
    constructor(currentPage) {
        this.data = currentPage
    }
    fetch(url) {
        return $.get(url)
    }
    getMeatAPI(){
        return this.fetch(API_MEAT)
    }
    getQuoteAPI(){
        return this.fetch(API_QUOTE)
    }
    getUserAPI(){
        return this.fetch(API_USER)
    }
    getPokemonAPI(){
        return this.fetch(API_POKEMON.replace("randomNum", Math.floor(Math.random() * 949) + 1))
    }
    promising(render){
        const allPromoises = [this.getQuoteAPI(),this.getMeatAPI(), this.getPokemonAPI(),this.getUserAPI()]
        render.Render(allPromoises,this.data)
    }
}