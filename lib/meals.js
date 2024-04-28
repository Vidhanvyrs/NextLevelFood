//here i will write the code that reaches out the database for the data
import sql from "better-sqlite3";
const db = sql("meals.db");
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); //demo to make  the call slow

  //   throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all();
  //instead of all we can use following
  //run() used for inserting data
  //all() used for fetching data
  //get() for single row
}
