export default class patient{
    #id;
    #name;
    #orderID;
    constructor(id,name,orderID){
        this.#id=id;
        this.#name=name;
        this.#orderID=orderID;
    }
    getID(){
        return this.#id;
    }
    getName(){
        return this.#name;
    }
    getOrderID(){
        return this.#orderID;
    }
}