class APIManager {
    
    constructor(currentPage) {
        this.currentPage = currentPage
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

    getRandomNum(){
       return Math.floor(Math.random() * MAX_POKEMON_NUMBER) + 1
    }

    getPokemonAPI(){
        return this.fetch(API_POKEMON.replace("randomNum", this.getRandomNum()))
    }
    
    promising(render){
        const allPromoises = [this.getQuoteAPI(),this.getMeatAPI(), this.getPokemonAPI(),this.getUserAPI()]
        Promise.all(allPromoises).then((Data)=>{
            let [quoteData, meatData, pokemonData, allUsers] = Data
            let [userData, ...friendsData] = allUsers.results
            let Allfriends = []
            friendsData.forEach(friend=> {Allfriends.push({name: friend.name.first+" "+friend.name.last})})
            currentPage.friends = Allfriends
            currentPage.setAllAtOnce(userData.name.first, userData.name.last, userData.location.city,
                userData.location.country, quoteData.quote, meatData[0], (pokemonData.name).charAt(0).toUpperCase() + (pokemonData.name).slice(1),
                Allfriends, pokemonData.sprites.front_default, userData.picture.medium)
        })
        render.Render(this.currentPage)
    }
}