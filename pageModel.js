class pageModel{
    constructor(){
        this.first = ''
        this.last = ''
        this.city = ''
        this.country = ''
        this.quote = ''
        this.meat = ''
        this.pokemonName = ''
        this.friends = []
        this.img = ''
        this.pic = ''
    }

    setAllAtOnce(first, last, city, country, quote, meat, pokemonName, friends, img, pic){
        this.first = first
        this.last = last
        this.city = city
        this.country = country
        this.quote = quote
        this.meat = meat
        this.pokemonName = pokemonName
        this.friends = friends
        this.img = img
        this.pic = pic
    }
}