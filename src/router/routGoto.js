import router from './index'

export default class routeGoto{
    constructor(){
        this.pageList = {
            'login': '/login',
            'index': '/index'
        }
    }
    goto_replace(path, from, to) {
        let query = null
        if (from || to) {
            query = {
                from: from,
                to: to
            }
        }
        router.replace({
            path: path,
            query: query
        })
    }

    goto(path, from, to) {
        let query = null
        if (from || to) {
            query = {
                from: from,
                to: to
            }
        }
        router.push({
            path: path,
            query: query
        })
    }
    goto_new(path, query) {
        const { href } = router.resolve({
            path: path,
            query: query
        })
        window.open(href, '_blank')
    }
    gotoPage(page, opt){
        opt = opt || {}
        if(!page) return
        let path = this.pageList[page]
        if(!path) return
        let params = opt.params
        if (params != undefined) {
            if(!this.isArray(params)){
                params = [params]
            }
            for(var i in params){
                path = `${path}/${params[i]}`
            }
        }
        if(opt.hash !== undefined){
            path = path + `#${opt.hash}`
        }
        let optnType = opt.openType
        this.jumpToByList(path, optnType)
    }
    jumpToByList(path, type) {
        type = type || 'goto'
        if (!this[type]) return
        this[type](path)
    }
}