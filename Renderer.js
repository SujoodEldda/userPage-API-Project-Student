
class Renderer {
    
    Render(allPromoises, currentPage){
        emptying()
        const processQuoteData = function(Data){
            currentPage.quote = Data.quote
            commonSection("quote-container-template",Data.quote,"quote-container")
        }
        const processMeatData = function(Data){
            currentPage.meat = Data[0]
            commonSection("meat-container-template",Data[0],"meat-container")
        }
        const processUserData = function(Data){
            let source = $(`#user-container-template`).html()
            let template = Handlebars.compile(source)
            currentPage.first = Data.results[0].name.first
            currentPage.last = Data.results[0].name.last
            currentPage.city = Data.results[0].location.city
            currentPage.country = Data.results[0].location.country
            currentPage.pic = Data.results[0].picture.medium
            let HTMLToAdd = template({first:currentPage.first, last:currentPage.last, city:currentPage.city, country:currentPage.country,pic:currentPage.pic})
            $(`.user-container`).append(HTMLToAdd)
        }
        const processFriendsData = function(Data){
            let source = $(`#friends-container-template`).html()
            let template = Handlebars.compile(source)
            let Allfriends = []
            for(let friend of Data){
                Allfriends.push({name: friend.results[0].name.first+" "+friend.results[0].name.last})
            }
            currentPage.friends = Allfriends
            let HTMLToAdd = template({friends: Allfriends})
            $(`.friends-container`).append(HTMLToAdd)
        }
        const processPokemonData = function(Data){
            let source = $(`#pokemon-container-template`).html()
            let template = Handlebars.compile(source)
            let pokemonName = Data.name
            let img = Data.sprites.front_default
            currentPage.pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
            currentPage.img = img
            let HTMLToAdd = template({pokemonName: currentPage.pokemonName,img})
            $(`.pokemon-container`).append(HTMLToAdd)
        }
        Promise.all(allPromoises).then((Data)=>{
            let [quoteData, meatData, pokemonData, userData, ...friendsData] = Data
            processQuoteData(quoteData)
            processMeatData(meatData)
            processUserData(userData)
            processFriendsData(friendsData)
            processPokemonData(pokemonData)
        })
    }
    pokemonLocalStorageData(templateName , name,img , aimDiv){
        let source = $(`#${templateName}`).html()
        let template = Handlebars.compile(source)
        let HTMLToAdd = template({pokemonName: name,img})
        $(`.${aimDiv}`).append(HTMLToAdd)
    }
    userLocalStorageData(templateName ,Data, aimDiv){
        let source = $(`#${templateName}`).html()
        let template = Handlebars.compile(source)
        let HTMLToAdd = template({first:Data.first, last:Data.last, city:Data.city, country:Data.country,pic:Data.pic})
        $(`.${aimDiv}`).append(HTMLToAdd)
    }
     friendsLocalStorageData(templateName ,Data, aimDiv){

        let source = $(`#${templateName}`).html()
        let template = Handlebars.compile(source)
        let HTMLToAdd = template({friends: Data})
        $(`.${aimDiv}`).append(HTMLToAdd)
    }
    showUserFromLocaStorage(Data){
        emptying()
        commonSection("meat-container-template",Data.meat,"meat-container")
        this.pokemonLocalStorageData("pokemon-container-template",Data.pokemonName,Data.img,"pokemon-container")
        this.friendsLocalStorageData("friends-container-template",Data.friends,"friends-container")
        this.userLocalStorageData("user-container-template",Data,"user-container")
        commonSection("quote-container-template",Data.quote,"quote-container")
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
    let HTMLToAdd = template({data})
    $(`.${aimDiv}`).append(HTMLToAdd)
}