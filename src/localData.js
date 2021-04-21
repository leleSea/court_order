

export default class localData{
    constructor(){}
    //localstorage
    setItem(options){
        options = options || {}
        for(var i in options){
            localStorage.setItem(i, options[i])
        }
    }
    getItem(key){
        return localStorage.getItem(key)
    }
    removeItem(options){
        for(var i in options){
            localStorage.removeItem(i)
        }
    }
    clear(){
        localStorage.clear()
    }
    getAll(){
        return localStorage
    }
    setTemItem(options){
        for(var i in options){
            sessionStorage.setItem(i, options[i])
        }
    }
    removeTemItem(options){
        for(var i in options){
            sessionStorage.removeItem(i)
        }
    }
    getTemItem(key){
        return sessionStorage.getItem(key)
    }

}