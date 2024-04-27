import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "../components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
export default async function page() {
  //in here you do not need to use the useEffect to communicate with the database instead you can easily communicate directly because it is next js all the components are server components so we are safe enough to do so
  //for simplicity i'll make another file
  const meals = await getMeals();
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and ook it yourself. It is easy and fun
        </p>
        <p className={classes.cta}>
          {/* cta means call to action  */}
          <Link href="/meals/share">Share your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <MealsGrid meals={meals} />
      </main>
    </>
  );
}
