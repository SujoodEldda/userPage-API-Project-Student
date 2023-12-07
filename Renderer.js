
class Renderer {
    Render(allPromoises){
        $(".user-container").empty()
        $(".quote-container").empty()
        $(".meat-container").empty()
        $(".friends-container").empty()
        $(".user-container").empty()
        $(".pokemon-container").empty()

        const commonSection = function(templateName , data, aimDiv){
            let source = $(`#${templateName}`).html()
            let template = Handlebars.compile(source)
            let HTMLToAdd = template({data})
            $(`.${aimDiv}`).append(HTMLToAdd)
        }
        const processQuoteData = function(Data){
            let quote = Data.quote
            commonSection("quote-container-template",quote,"quote-container")
        }
        const procesMeatData = function(Data){
            commonSection("meat-container-template",Data[0],"meat-container")
        }
        const procesUserData = function(Data){
            let source = $(`#user-container-template`).html()
            let template = Handlebars.compile(source)
            let HTMLToAdd = template({first:Data.results[0].name.first, last:Data.results[0].name.last, city:Data.results[0].location.city, country:Data.results[0].location.country,pic:Data.results[0].picture.medium})
            $(`.user-container`).append(HTMLToAdd)
        }
        const procesFriendsData = function(Data){
            let source = $(`#friends-container-template`).html()
            let template = Handlebars.compile(source)
            let Allfriends = []
            for(let friend of Data){
                Allfriends.push({name: friend.results[0].name.first+" "+friend.results[0].name.last})
            }
            let HTMLToAdd = template({friends: Allfriends})
            $(`.friends-container`).append(HTMLToAdd)
        }
        const procesPokemonData = function(Data){
            let source = $(`#pokemon-container-template`).html()
            let template = Handlebars.compile(source)
            let pokemonName = Data.name
            let img = Data.sprites.front_default
            let HTMLToAdd = template({pokemonName,img})
            $(`.pokemon-container`).append(HTMLToAdd)
        }
        Promise.all(allPromoises).then((Data)=>{
            let [quoteData, meatData, pokemonData, userData, ...friendsData] = Data
            processQuoteData(quoteData)
            procesMeatData(meatData)
            procesUserData(userData)
            procesFriendsData(friendsData)
            procesPokemonData(pokemonData)
        })
    }
}