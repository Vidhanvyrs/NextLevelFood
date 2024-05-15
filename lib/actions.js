"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

//we are going to add a helper function here
//now note down this is more efficient way of checking things rather than just using if else
function isInvalidText(text) {
  return !text || text.trim() === "";
}

//in react we used to do onsubmit and manually submit the form to the by using the function fetchAPI and whatnot
//but next provides a better approach
export async function shareMeal(prevState, formData) {
  //creating a server action
  //what is so special about it?
  //well in next you can now assign this server action value to the action prop
  const meal = {
    title: formData.get("title"), //will get the formdata according to the name set by us in the form
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  //Now to be secure it is not enough to use client side validation that is the use of required keyword instead the validation should be server side also
  //let's do that
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    // throw new Error("Invalid input");
    //now this throwing of the error is a one thing to do but doing so we are destroying the entire input of the user
    //this is not a great UX thing so lets do some enhancement...
    //we can also use return here not only redirect or throw
    return {
      message: "Invalid input.",
    };
  }
  await saveMeal(meal);
  //during the use of production code we are not able to refetch the data as next using aggressive caching due to which on adding new meal data we were unable to see it
  //there is a function provided by next to ease it up
  // revalidatePath("/meals",'layout'); all nested page will be revalidated
  // revalidatePath("/",'layout'); all the pages of entire will be revalidated
  revalidatePath("/meals"); //passing meals to refetch the data at meals path
  //doing this our image got missing now why is that let's see in the next commit
  redirect("/meals");
}
