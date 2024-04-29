/* 

MongoDB Atlas CRUD testing
This exercise will focus on (CRUD) operations in MongoDB Atlas

If you have not already connected to your Atlas cluster with Compass, make sure to:

Log in to the MongoDB Atlas website
Locate the Cluster you set up earlier today, and hit the "Connect" button
Among the available options, select "Compass" and copy the connection string
Open MongoDB Compass, and use the connection string to connect to your Atlas Cluster
From now on, all remaining tasks should be completed in Compass

Create a new database with the name "dci" and a collection called "faculty"
Select the "dci" database and the "faculty" collection

CREATE
Insert one faculty member document into the "faculty" collection
{
    "name": "Krish",
    "age": 35,
    "exp": 10,
    "subjects": ["DS","C","OS"],
    "type": "Full Time",
    "qualification": "M.Tech"
},
Insert the following faculty member documents in the "faculty" collection using a single command:
{
    "name": "Manoj",
    "age": 38,
    "exp": 12,
    "subjects": ["JAVA","DBMS"],
    "type": "Full Time",
    "qualification": "Ph.D"
},
{
    "name": "Anush",
    "age": 32,
    "exp": 8,
    "subjects": ["C","CPP"],
    "type": "Part Time",
    "qualification": "M.Tech"
},
{
    "name": "Suresh",
    "age": 40,
    "exp": 9,
    "subjects": ["JAVA","DBMS","NETWORKING"],
    "type": "Full Time",
    "qualification": "Ph.D"
},
{
    "name": "Rajesh",
    "age": 35,
    "exp": 7,
    "subjects": ["DS","C","OS"],
    "type": "Full Time",
    "qualification": "M.Tech"
},
{
    "name": "Mani",
    "age": 38,
    "exp": 10,
    "subjects": ["JAVA","DBMS","OS"],
    "type": "Part Time",
    "qualification": "Ph.D"
},
{
    "name": "Sivani",
    "age": 33,
    "exp": 8,
    "subjects": ["C","CPP","MATHS"],
    "type": "Part Time",
    "qualification": "M.Tech"
},
{
    "name": "Nagesh",
    "age": 39,
    "exp": 11,
    "subjects": ["JAVA","DBMS","NETWORKING"],
    "type": "Full Time",
    "qualification": "Ph.D"
},
{
    "name": "Nagesh",
    "age": 35,
    "exp": 9,
    "subjects": ["JAVA",".Net","NETWORKING"],
    "type": "Full Time",
    "qualification": "Ph.D"
},
{
    "name": "Latha",
    "age": 40,
    "exp": 13,
    "subjects": ["MATHS"],
    "type": "Full Time",
    "qualification": "Ph.D"
},
{
    "name": "Suresh Babu",
    "age": 55,
    "exp": 25,
    "subjects": ["MATHS","DE"],
    "type": "Full Time",
    "qualification": "Ph.D"
}

READ
1. Get the details of all the faculty ==> db.faculty.find()
2. Get all the faculty members whose qualification is "Ph.D"
* {qualification: "Ph.D"}

3. Get all the faculty members whose exp is between 8 to 12 years
* {exp: {$gte: 8, $lte: 12}}
* {$and: [{exp: {$gt: 7}}, {exp: {$lt: 13}}]}

4. Get all the faculty members who teach "MATHS" or "NETWORKING"
* {$or: [{subjects: "MATHS"}, {subjects: "NETWORKING"}]}
* {subjects: {$in: ["MATHS", "NETWORKING"]}}

5. Get all the faculty members who teach "MATHS" and whose age is more than 30 years and whose qualification is "Ph.D"
* {subjects: {$in: ["MATHS"]}, age: {$gt: 30}, qualification: "Ph.D"}
* {subjects: "MATHS", age: {$gt: 30}, qualification: "Ph.D"}
* {$and: [{subjects: "MATHS"}, {age: {$gt: 30}}, {qualification: "Ph.D"}]}

6. Get all the faculty members who are working part-time or who teach "JAVA"
* {$or: [{type: "Part Time"}, {subjects: "JAVA"}]}

7. Get the count of all faculty members - this should return a number, not an array or an object (you may need to research this if you didn't do this in this morning's exercise!) Expected output: 11
*==> db.faculty.countDocuments()

8. Get only the name and qualification of all faculty members (research needed!)
* Add {} object and on right side click options and add {name: 1, qualification: 1} to the Project input.

9. Get the name, qualification and exp of all faculty members aged over 38, and display this data in ascending order of exp (research needed!)
* 1. Type {age: {$gt: 38}} in the query input field
* 2. Go to the right and click options
* 3. In the Project field, type {name: 1, qualification: 1, exp: 1, _id: 0}
* 4. To sort, type {exp: 1} in the Sort field

UPDATE
1. Update the faculty member "Sivani" with the following data: update qualification to "Ph.D" and type to "Full Time"
* 1. Type {name: "Sivani"} in the query input field to select the document
* 2. Hover on the document to see options like edit document and delete document
* 3. Click on the edit document and change the values as required.
* 4. Click on update to update the document.

2. Update all faculty members who are teaching "MATHS" such that they should now also teach "PSK" (hint: check the data type of this field).
* 1. Type {subjects: "MATHS"} in the query input field to select the documents.
* 2. Click on "UPDATE" to open the update pop-up
* 3. On the left side of the pop-up, write the command to update the documents, in this case it will be {$push: {subject: "PSK"}}.
* 4. Click on update documents on the pop-up and then refresh to see the updates.

3. Update the data of all faculty members by incrementing their age and exp by one year (research needed!)
* 1. Type {} in the query input field to select all the documents.
* 2. Click on "UPDATE" to open the update pop-up
* 3. On the left side of the pop-up, write the command to update the documents, in this case it will be {$inc: {age: 1, exp: 1}}.
* 4. Click on update documents on the pop-up and then refresh to see the updates.

DELETE
1. Delete all faculty members whose age is more than 55 years.
* Type {age: {$gt: 55}} in the query input field to select the documents.
* You can hover on the document (if it just one document that was found) and on the left side select "remove document" to delete the document
* If multiple documents were found, click on "DELETE" above the documents and delete the documents in the delete pop-up.

2. Delete the faculty member whose age is 33.
* Type {age: 33} in the query input field to select the document.
* Hover on the document and on the left side select "remove document" to delete the document.

3. Delete the faculty member whose exp is less than 12 and type is part time.
* 1. Type either {exp: {$lt: 12}, type: "Part Time"} 
OR 
* {$and: [{exp: {$lt: 12}}, {type: "Part Time"}]} in the query input field to select the document.
* 2. You can hover on the document (if it just one document that was found) and on the left side select "remove document" to delete the document
* 3. If multiple documents were found, click on "DELETE" above the documents and delete the documents in the delete pop-up.

*/
