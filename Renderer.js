
class Renderer {

    callTheCommonSection(data){
        commonSection("quote-container-template",{quote:data.quote},"quote-container")
        commonSection("meat-container-template",{meat:data.meat},"meat-container")
        commonSection("user-container-template",{first:data.first,last:data.last,city:data.city,country:data.country,pic:data.pic},"user-container")
        commonSection("friends-container-template", {friends:data.friends},"friends-container")
        commonSection("pokemon-container-template",{pokemonName:data.pokemonName, img: data.img}, "pokemon-container")
    }
    
    Render(allPromoises, currentPage){
        emptying()
        Promise.all(allPromoises).then((Data)=>{
            let [quoteData, meatData, pokemonData, userData, ...friendsData] = Data
            currentPage.quote = quoteData.quote
            currentPage.meat = meatData[0]
            currentPage.first = userData.results[0].name.first
            currentPage.last = userData.results[0].name.last
            currentPage.city = userData.results[0].location.city
            currentPage.country = userData.results[0].location.country
            currentPage.pic = userData.results[0].picture.medium
            let Allfriends = []
            friendsData.forEach(friend=> {Allfriends.push({name: friend.results[0].name.first+" "+friend.results[0].name.last})})
            currentPage.friends = Allfriends
            currentPage.pokemonName = (pokemonData.name).charAt(0).toUpperCase() + (pokemonData.name).slice(1)
            currentPage.img = pokemonData.sprites.front_default
            this.callTheCommonSection(currentPage)
        })
    }
    showUserFromLocaStorage(Data){
        emptying()
        this.callTheCommonSection(Data)
    }
}

const emptying= function(){
    $(".user-container").empty()
    $(".quote-container").empty()
    $(".meat-container").empty()
    $(".friends-container").empty()
    $(".user-container").empty()
    $(".pokemon-container").empty()
}

const commonSection = function(templateName , data, aimDiv){
    let source = $(`#${templateName}`).html()
    let template = Handlebars.compile(source)
    let HTMLToAdd = template(data)
    $(`.${aimDiv}`).append(HTMLToAdd)
}