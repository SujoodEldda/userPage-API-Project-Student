
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
    
    Render(currentPage){
        this.emptying()
        this.callTheCommonSection(currentPage)
    }

    showUserFromLocaStorage(Data){
        this.emptying()
        this.callTheCommonSection(Data)
    }

}