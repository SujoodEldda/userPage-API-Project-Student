class APIManager {
    constructor(url) {
        this.url = url
    }
    fetch() {
        return $.get(this.url)
    }
}