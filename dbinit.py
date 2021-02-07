import sqlite3

#connect(s)/creates
conn = sqlite3.connect('gamesite.db') #creates db if it does not exist

#create a cursor
cur = conn.cursor()

#create a table with a doc string sqlite is case sensitive
#using """ lets us put this on multiple lines. Single quotes has to be in one line
#Sqlite use the following data types: NULL, INTEGER (WHOLE NUMBER), REAL (DECIMAL VALUES), TEXT (STRING), BLOB (code)

#cur.execute("""DROP TABLE scores""")


# cur.execute("""CREATE TABLE scores (
#  		score_id INTEGER PRIMARY KEY AUTOINCREMENT,
#  		name text NOT NULL,
#  		score INTEGER NOT NULL
#  	)""")

#cur.execute("INSERT INTO scores(name,score) VALUES (?,?)", ('Joe', 1200))
# cur.execute("INSERT INTO scores(name,score) VALUES (?,?)", ('Laura', 800))
# cur.execute("INSERT INTO scores(name,score) VALUES (?,?)", ('Brett', 600))
# cur.execute("INSERT INTO scores(name,score) VALUES (?,?)", ('Melissa', 1500))
# cur.execute("INSERT INTO scores(name,score) VALUES (?,?)", ('Brett', 750))


#comes out as a tupple
cur.execute("SELECT name, score from scores ORDER BY score DESC")
results = cur.fetchall() #cur.fetchmany(5);

print(results)

for result in results:
	print(result[0], result[1]) #can be used with [] notation


cur.execute("SELECT name, score from scores WHERE name = 'Brett' ORDER BY score DESC")
nameResults = cur.fetchall();
print(nameResults)
#do the execute
conn.commit()

# #close the command
conn.close()
