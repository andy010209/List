export default class Order{
    #id;
    #message;
    constructor(id,message){
        this.#id=id;
        this.#message=message;
    }
    getID(){
        return this.#id;
    }
    getMessage(){
        return this.#message;
    }
}