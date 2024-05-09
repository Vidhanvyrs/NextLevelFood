//here i will write the code that reaches out the database for the data
import fs from 'node:fs';
import sql from "better-sqlite3";
import slugify from 'slugify';
import xss from 'xss';
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

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug =  ?").get(slug);
}

//saving the content in our database also using slugify and xss to be saved from cross site scripting attacks

export async function saveMeal(meal){
meal.slug = slugify(meal.title, {lower: true});
meal.instructions = xss(meal.instructions);//sanitizing our html based instructions
//the image should be stored in the file system not in databases
//instead what i want is to use the public folder to store user-uploaded image but this also has disadvantage which we will discuss later
const extension = meal.image.name.split('.').pop();
const fileName = `${meal.slug}.${extension}`
const stream = fs.createWriteStream(`public/images/${fileName}`)
//we will now convert our image into chunk to then pass it to stream.write()
const bufferedImage = await meal.image.arrayBuffer();//now as it is of type arraybuffer we want it to be converted to a regular buffer then only it can be provided to the stream.write 
stream.write(Buffer.from(bufferedImage), (error)=>{
 if(error){
    throw new Error('Saving image failed!');
 }
});
//now after storing the image in our folder we are now going to store the path in our database
 meal.image = `/images/${fileName}`

 //now lets save it to the database 
 //never inject directly this could led to sql injection which we will study further 
 // so to avoid that we can use ?, ?, ?, ?, but instead we are using another syntax provided by better-sqlite3 which is the use of @ but make sure that the order same as you got before the values
 db.prepare(`
 INSERT INTO meals 
   (title, summary, instructions, creator, creator_email, image, slug)
VALUES (
    @title,
    @summary,
    @instructions,
    @creator,
    @creator_email,
    @image,
    @slug
)
 `).run(meal);
}