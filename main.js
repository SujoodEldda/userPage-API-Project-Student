
const USER_NUM = 7
const currentPage = new pageModel()
const render = new Renderer()

const displayUser = function(){
    let randomNum = Math.floor(Math.random() * 949) + 1
    const apiQuote = new APIManager("https://api.kanye.rest")
    const apiMeat = new APIManager("https://baconipsum.com/api/?type=meat-and-filler")
    const apiPokemon = new APIManager(`https://pokeapi.co/api/v2/pokemon/${randomNum}/`)
    const allPromoises = [apiQuote.fetch(),apiMeat.fetch(), apiPokemon.fetch()]
    for(let i=0 ; i<USER_NUM; i++){
        let userAPI = new APIManager("https://randomuser.me/api")
        allPromoises.push(userAPI.fetch())
    }
    render.Render(allPromoises, currentPage)
}

const saveUser = function(){
    localStorage.setItem(currentPage.first,JSON.stringify(currentPage))
}

const loadUser = function(){
    let key = localStorage.key(0)
    const currentPageData = JSON.parse(localStorage.getItem(key))
    render.showUserFromLocaStorage(currentPageData)
}

