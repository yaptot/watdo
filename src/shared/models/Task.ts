export class Task {
    constructor (
        public id : Number,
        public name : string, 
        public isCompleted : boolean = false,
        public description : string,
        public dueDate : Date) {

    }
}