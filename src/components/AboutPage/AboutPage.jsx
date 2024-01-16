import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h1>Thank you for visiting Scene Report!</h1>
        <h2>TECH STACKS USED:</h2>
        <ul>
          <li>React JS, Redux, Redux-Saga</li>
          <li>PostgresQL for database management</li>
          <li>Passport and PG for auth</li>
          <li>Multer and Cloudinary API for image uploading</li>
          <li>dayjs for date manipulation</li>
          <li>Material UI and Sweetalert2 for styled components</li>
        </ul>
        <h2>CHALLENGES FACED:</h2>
        <ul>
          <li>Figuring out how to do date math</li>
          <li>Constructing and chaining multiple complex SQL queries</li>
          <li>General function chaining, needing to execute 6+ Saga functions in a row</li>
        </ul>
        <h2>FUTURE PLANS FOR SCENE REPORT:</h2>
        <ul>
          <li>Past Events Feature: Display past events, ability to upload and share content from the event</li>
          <li>Further integration of the Google Maps API</li>
          <li>Incorporating the Socket.IO for user to user direct messaging</li>
          <li>Deeper social media funcionalities, friends, requests, etc.</li>
          <li>Different types of accounts for users, venues, and artists</li>
        </ul>
        <h2>SPECIAL THANKS LINER NOTES:</h2>
        <ul>
          <li>Thanks to Prime Academy and the whole staff</li>
          <li>Big thanks to our instructor Matt Black for his sage wisdom, calming demeanor and colorful vocabulary</li>
          <li>Thank you to my fabulous classmates in the Moonstone cohort, I feel blessed</li>
          <li>Thank you to my unparalleled wife, Hannah, for being my rock, my rubber duck when I needed it, and the love of my life</li>
          <li>Thanks to all my friends who helped me with data, and who love me in general</li>
          <li>Most of all, thank you to anyone who has supported independant musicians in anyway.</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
