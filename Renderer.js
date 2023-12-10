
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
            let [quoteData, meatData, pokemonData, allUsers] = Data
            let [userData, ...friendsData] = allUsers.results
            let Allfriends = []
            friendsData.forEach(friend=> {Allfriends.push({name: friend.name.first+" "+friend.name.last})})
            currentPage.friends = Allfriends
            currentPage.setAllAtOnce(userData.name.first, userData.name.last, userData.location.city,
                userData.location.country, quoteData.quote, meatData[0], (pokemonData.name).charAt(0).toUpperCase() + (pokemonData.name).slice(1),
                Allfriends, pokemonData.sprites.front_default, userData.picture.medium)
            this.callTheCommonSection(currentPage)
        })
    }

    showUserFromLocaStorage(Data){
        this.emptying()
        this.callTheCommonSection(Data)
    }

}