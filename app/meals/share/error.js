//if our database is offline then we should handle some error
//only works for the page.js in the same folder and its nested components
"use client";
//this must be a client component to include client errors
export default function Error() {
  return (
    <main className="error">
      <h1>An error occurred</h1>
      <p>Failed to create Meal</p>
    </main>
  );
}
