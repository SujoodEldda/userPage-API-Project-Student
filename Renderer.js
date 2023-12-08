
class Renderer {

    callTheCommonSection(data){
        this.commonSection("quote-container-template",{quote:data.quote},"quote-container")
        this.commonSection("meat-container-template",{meat:data.meat},"meat-container")
        this.commonSection("user-container-template",{first:data.first,last:data.last,city:data.city,country:data.country,pic:data.pic},"user-container")
        this.commonSection("friends-container-template", {friends:data.friends},"friends-container")
        this.commonSection("pokemon-container-template",{pokemonName:data.pokemonName, img: data.img}, "pokemon-container")
    }

    emptying(){
        $(".user-container").empty()
        $(".quote-container").empty()
        $(".meat-container").empty()
        $(".friends-container").empty()
        $(".user-container").empty()
        $(".pokemon-container").empty()
    }
    
    commonSection(templateName , data, aimDiv){
        let source = $(`#${templateName}`).html()
        let template = Handlebars.compile(source)
        let HTMLToAdd = template(data)
        $(`.${aimDiv}`).append(HTMLToAdd)
    }
    
    Render(allPromoises, currentPage){
        this.emptying()
        Promise.all(allPromoises).then((Data)=>{
            let [quoteData, meatData, pokemonData, userData, ...friendsData] = Data
            let Allfriends = []
            friendsData.forEach(friend=> {Allfriends.push({name: friend.results[0].name.first+" "+friend.results[0].name.last})})
            currentPage.friends = Allfriends
            currentPage.setAllAtOnce(userData.results[0].name.first, userData.results[0].name.last, userData.results[0].location.city,
                userData.results[0].location.country, quoteData.quote, meatData[0], (pokemonData.name).charAt(0).toUpperCase() + (pokemonData.name).slice(1),
                Allfriends, pokemonData.sprites.front_default, userData.results[0].picture.medium)
            this.callTheCommonSection(currentPage)
        })
    }

    showUserFromLocaStorage(Data){
        this.emptying()
        this.callTheCommonSection(Data)
    }

}