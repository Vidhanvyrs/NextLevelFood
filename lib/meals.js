//here i will write the code that reaches out the database for the data
import sql from 'better-sqlite3';
const db = sql('meals.db');
export function getMeals(){
    return db.prepare('SELECT * FROM mealse').all();
    //run() used for inserting data 
    //all() used for fetching data 
    //get() for single row
}