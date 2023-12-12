const currentPage = new pageModel()
const render = new Renderer()
const apis = new APIManager(currentPage)

const displayUser = function(){
    apis.promising(render)
}

const saveUser = function(){
    localStorage.setItem(currentPage.first,JSON.stringify(currentPage))
}

const chooseUser = function(){
    let keys = Object.keys(localStorage)
    render.emptying()
    render.AddTemplateToHTML("choose-container-template",{keys},"quote-container")
}

const loadUser = function(key){
    const currentPageData = JSON.parse(localStorage.getItem(key))
    render.showUserFromLocaStorage(currentPageData)
}