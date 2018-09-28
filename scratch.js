class Person { 
    constructor(name, surname) { 
      this.name = name; 
      this.surname = surname; 
    } 
  } 

console.log(typeof Person);   //function 

var person = new Person("John", "Smith"); 
console.log(person)
// this will raise exception due to absence of new keyword
var person = Person("John", "Smith"); 

// this will raise exception cause class is not hoisted. need to declare first in order to use them 
var person = new Person2(); 
 
class Person2 {
    constructor(name, surname) { 
        this.name = name; 
        this.surname = surname; 
      } 
} 

