// Optional Type Test

type Pet = {
    name: string;
    breed?: string;
    tricks: string[]
};

const pet: Pet = {
    name: "Sako",
    breed: "Undiscovered",
    tricks: ["Sit", "Lay Down", "Roll Over"],
};

const pet2: Pet = {
    name: "Sako",
    breed: "Poodle",
    tricks: ["Fetch", "Eat"],
};

// find common tricks between two pets
const commonTricks = pet.tricks.filter(trick => pet2.tricks.includes(trick));
if (commonTricks.length > 0) {
    console.log(`Common Tricks: ${commonTricks}`);
} else {
    console.log("No common tricks found");

}

type User = {
    name: string;
    age: number;
};

// CUSTOM ERRORS

class MyCustomErrorType extends Error {

    someOtherProperty: string;

    constructor(message: string, public statusCode: number, someOtherProperty: string = "SomeOtherProperty") {
      super(message);
      this.name = 'Database Error';
      this.statusCode = statusCode;
      this.someOtherProperty = someOtherProperty;
    }

}

const databaseError = new MyCustomErrorType("Database Found a problem with something else", 500, "SOME_OTHER_PROPERTY-INIT");
const standardError = new Error("Standard Error; THIS IS THE MESSAGE FOR THE STANDARD ERROR");
console.log(databaseError.someOtherProperty);
const error = (databaseError as Error);
console.log(standardError.message);

// SERVICES

class UserService {

    users: User[] = [
        {
            name: "John",
            age: 30,
        },
        {
            name: "Jane",
            age: 25,
        },
    ];


    getUsers(): User[] {
        return this.users;
    }

    getUserByName(name: string): User | undefined {
        return this.users.find(user => user.name === name);
    }

    addUser(user: User): void {
        this.users.push(user);
    }

    updateUserByName(name: string, user: User): void {
        const index = this.users.findIndex(user => user.name === name);
        if (index !== -1) {
            this.users[index] = user;
        }
    }

    removeUserByName(name: string): void {
        this.users = this.users.filter(user => user.name !== name);
    }

}

const userService = new UserService();
userService.addUser({ name: "Alice", age: 20 });
userService.updateUserByName("Alice", { name: "Alice", age: 41 });

console.log("\n---------------------------------\n");
console.log(`Users: ${userService.users.map(user => user.name)}`);
console.log("\n---------------------------------\n");

userService.removeUserByName("John");

console.log("\n---------------------------------\n");
console.log(`Users: ${userService.users.map(user => user.name)}`);
console.log("\n---------------------------------\n");

userService.getUserByName("Sako");
