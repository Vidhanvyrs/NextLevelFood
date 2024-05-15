import React from "react";
import classes from "./page.module.css";
import Image from "next/image";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

//for metadata on dynamic pages
export async function generateMetadata({ params }) {
  //we'll get the same data recieved by mealdetailspage
  const meal = getMeal(params.slug);
  //what if the meal is not found then an error message should be shown
  if (!meal) {
    notFound(); //get the closest error page if made
  }
  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealDetailspage({ params }) {
  //params is automatically given in next
  console.log(params.slug);
  const meal = getMeal(params.slug);

  //what if the meal is not found then an error message should be shown
  if (!meal) {
    notFound(); //get the closest error page if made
  }
  meal.instructions = meal.instructions.replace(/\n/g, "<br/>");
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by 📧<a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </div>
  );
}
