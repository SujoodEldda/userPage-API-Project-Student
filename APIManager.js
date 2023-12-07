//This is the class that will manage all your APIs

class APIManager {
    constructor(url) {
        this.url = url
    }
    fetch() {
        return $.get(this.url)
    }
}
