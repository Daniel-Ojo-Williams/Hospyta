## Approach to Solving the Task
#### Database Schema Design
Before starting out, i developed a concise ERD (Entity Relationship Diagram), to help me visualise wholistically how the different sections (users, posts, comments, post_categories and comment_replies) of the task are connected.

#### Database and ORM
I used TypeORM and Postgres for the database architecture

#### Module Organisation
Using a modular approach which would aid scalability into a microservice architecture, I organised the different sections of the task into modules, each with the necessary features required to standalone, while minimally depending on other modules.

## Challenges faced
During the execution of this task i encountered mainly two challenges. 

The first was how to reduce the number of comments that are returned when a post is retrieved from the database, while it was just testing, i imagined a situation where a post has hundreds of comments, i resorted to lazy loading of the comments for a post retrieval such that only first 10 comments are returned and others can be gotten through another API, which also returns comments in batches

The second was figuring out filtering posts by Date, it was not returning the data as i thought it would, I was able to go through the documenation of TypeORM to get an answer on how to fix it.

I also was supposed to implement image uploads for the posts but i could not effect this becuase of time.
