// export class User {  
//     public constructor(
//         public firstName: string,         
//         public lastName: string, 
//         public age: number, 
//         public email: string, 
//         public tel: string,        
//         public state: string,        
//         public country: string, 
//         public address1: string,        
//         public address2: string,        
//         public interests: string[],
//         public subscribe : boolean, 
//         public user_img : string        
//     ) 
//         {}  
// }

export class User {
    public firstName: string;
    public lastName: string;
    public age: number;
    public ageRange : string;
    public email: string;
    public tel: string;
    public state: string;
    public country: string;
    public address1: string;
    public address2: string;
    public interests: string[] = [];
    public subscribe: boolean;
    public userImg: string;
    public subscribeDesc : string;
    // public addressType : string;
    // constructor(interests) {
    //     this.interests = interests;
    // }
}

export class Contact {

    name: string;

    constructor(name) {
        this.name = name;
    }
}
