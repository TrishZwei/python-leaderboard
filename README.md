# Python Leaderboard
 
This is leaderboard using python, flask and SQAlchemy. This serves the purpose of:
1. How to set up an SQLite table using SQAlchemy
2. How to to the first half of CRUD.
	*Create (insert) data into the scores table with the Score class
	*Read existing data from the scores table and output that to the pages on the website
3. How to get the data to get inserted into the scores table via the POST method in our forms

Like most things, you have to think about what you want to accomplish in order to figure out how to do it. 

In this example, I decided I needed to store at least 2 pieces of data: 
1. Name of the player
2. Score of the player

I created a form for the player to fill out their name and then a means for JavaScript to fill in the value of the score field (which is a hidden field on the form) once the game was over. The player would use the form to submit their name and score, making the data available to be inserted into the scores table. The form is in the code from templates > game.html

Find below a line by line explanation of what is happening in each file:

## Main Python File: app.py 

We need to be able to connect our python file (app.py) to our database. Line 13 stores the path to the base directory, so we can have reference to the location of our new SQLite database on line 17. Line 13 and 17 work together to create a complete path. This way we don't have to type out the entire path and if your directory is different from mine, you do not have to update the code.

Line 17 tells our app.py where to find the database.

Line 18 tells us not to track modifications. This should be set to True or False. The default is none and will issue warnings about huge overhead if you do not set it to one of those values. False tells the db not to reply when a change has been made to the database. (upon insert, update, or delete)

Line 21 stores the SQLAlchemy object in the variable 'db'. This way we can use the db variable to issue our CRUD commands to the database.


Line 24 we create class called Score. This class describes and defines all the ways we want to interact with the database.
Line 25 we specifically name the table what we want it to be named: scores
Line 26 creates a field with auto incremented identifiers for each row of data. 

An example row of data might look like:
```
2, 'Joe', 350

```
The first item is an id, which would be unique, so that if we want to update or delete that specific row of data, we have a way of pointing to only one row of data. Otherwise we'd be updating or deleting more than one row of data. See the image below:

![Table of Data](/assets/scoretable.png)

If I wanted to target one of Joe's scores for update or delete, I would have to target a row of data uniquely. If I wanted to delete row 2, where Joe has a score of 350, I can simply use the id. As seen below, the first one is easier to update or delete without potentially affecting the other rows of data.

```
delete where id = 2
 vs.
delete where p_name = 'Joe' AND p_score = 350
```
An update or delete on all the rows of data with p_name = 'Joe' would affect more than one row of data. So establishing a unique identifier is a good practice. 

Lines 28 & 29 create two other columns of data in our table: p_name and p_score. Notice that they are two different types of data. I purposefully want to store the score as an integer to make it more easily sortable.

Line 32 is a function to have the class initialize itself. What properties does this instance have, and what their values are are added in lines 33 and 34.

Line 36 is a function that creates a string representation of the object we just created whenever we call the Score class.

Line 39 has been commented out so that it does not re-initialize tables in our db.

### def index(): 
Line 41 is the route for the index function.
Line 42 is the index function.

Line 44 queries the db by calling the class Score and querying the table associated with the Score class. Here we are telling it to get the row data and order it by decending order the values in the p_score column, and give us the top 5 results. This is the READ part in CRUD

Line 45 sets up an empty list for us.

Line 47 creates a for each loop so we an append each item in the list of data from the database. This allows us to create a list of dictionaries which we send to the index.html page. It passes the list scores, which can then be displayed on the page with jinja. (see index.html)


### def game():
Line 53 is the route for this function and that route is how the function is called. 
Line 54 is the game function

Line 56 is not triggered until the form has been submitted via the POST method. So the first time this page is loaded, it loads the JavaScript game. Once the game is complete the player will have the opportunity to add their data to the scores table.

Line 56 when data is submitted and the condition is true...
Line 57 gets the value from the input where name="name"
If I enter my name: 
```
name="Trish"
```

Line 58 gets the value from the input where name="score"
```
score="14950"
```
It is important to know that almost everything from a value in HTML is a string. Because I had set up the database column to store this value as an integer, I cast the string value into an integer.

Lines 60 and 61 are so that when I was testing/debugging I could see if the values were being captured from the form.

Line 63 is a variable which stores an instance of Score so I could create new values in the scores table through the Scores class. 
Line 64 creates the database command to add a new row of data to the scores table.
Line 65 tells the database to do Line 64

Line 68 then redirects the player to scores.

### def scores():
Line 72/73 show the different ways we can access the scores function.
We can just go to the score page and we don't really get anything different than what is on the home page. This can be done from the main menu. But if we go to the scores page just *after* submitting a score, it allows you to filter out the scores by the name you just submitted.

Line 76 queries the results just like the front page.
Line 77 is an empty list.

Lines 79 - 81 runs a foreach loop that puts our rows of data from the database into a dictionary which then gets inserted into the list so it does exactly what the front page does.

Line 83 only gets triggered if the variable username has a value.
Line 86 queries the database to filter its results by the username variable's value. Then it tells it to order those results by the p_score value descending and only the top 5 results.

Line 87 creates another empty list for us (I see here an opportunity for refactoring)

Lines 89 - 91 does the same as 79-81 only with a different query with different results from the database.

Line 102 and 103 is the standard code to make this page run itself when called to do so.

### templates > layout.html
Layout contains the main html. Parts are broken up into chunks:
1. templates>includes>_head.html
 This page includes all the items that go  into the head tag of an html document.
2. templates>includes>_nav.html
	This page includes all the main navigation elements.
3. templates>includes>_foot.html
	This page ends the body tag and the html root. This ensures any JS goes above the closing body tag.


All the includes are only snippets and not complete pages, they have underscores in their names as part of their naming convention. 

The layout page and all pages that extend layout do not carry this convention since they are complete html documents

### templates > index.html
This is the home page. Shows the high scores, gives some instructions to the users. Lines 18 - 23 iterate out the rows of data.

### templates > game.html
This is the page where the pacman game is played and you can add your score to the database. The form is located on line 14. The JavaScript that enables that modal/popup window to show the form is controlled on line 301 of static > scripts > game.js 

Line 304 of the game.js file inserts the value of the score into the hidden field of the form. This happens when the user clicks the button that gets them the modal window to appear.

### templates > scores.html
This is the list of high scores. This works just like the home page but with one added bonus. If a player comes to this page after adding their score to the leaderboard, it will query the database for that player's score. This is case sensitive. So "Trish" would be different from "trish". The determining factor is if the user navigates to the page with a username or not. If there is no username, the database does not get queried and the second tab/table does not appear. This can be seen in the two conditional statements on lines 43 and 65 and 87.

Lines 87 - 101 govern if the local JavaScript appears on that page. No need for the tab JS if there is no tab. 

## Prerequisites

Your environment will need to have python available. In the app.py file from line 1 through line 7 shows all the imports and packages you need. If you use intellij, you should be able to import them into your environment. If you use the terminal window (mac) or the command line (win) you will need to know the commands to navigate and then install them into the development folder you are working in.

```
some knowledge of python and programming in general is important to understand this document and the programming behind it.

```

## Built With

* [Python](https://www.python.org/) - The main programming language used
* [Flask](https://flask.palletsprojects.com/en/1.1.x/) - The framework for rendering HTML pages
* [Jinja](https://jinja.palletsprojects.com/en/2.11.x/) - The ability to render variables on our HTML pages
* [SQLite](https://www.sqlite.org/index.html) - Our database
* [SQLAlchemy](https://www.sqlalchemy.org/) - Our database interface

