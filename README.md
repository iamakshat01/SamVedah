# SamVedah

"SamVedah" in Sanskrit means education for all. This web app is made for poor children to match them with mentors for free as education is for everyone and everyone has the right to education. 

![alt text](https://i2.paste.pics/d3a24d88b59b17c1aa01a15c35176ee6.png)

# Inspiration

Studies have been affected a lot due to COVID-19. As government schools are closed, students in rural INDIA cannot afford private tuition. Also, the middle-class section of society has been affected financially the most. 
This App tends to match students with mentors. So that they can contact them to take guidance and utilize free resources on youtube and other platforms to get education and knowledge.

# What it does and future plans

A student can register and add the subjects for which he/she requires guidance. A mentor can also register and add the subjects of his expertise. 

The app searches through the database and provides him a list of students related to his expertise and he can select some from them to provide mentorship. 
A student is able to see all his mentors and a mentor is able to see all his accepted students.

I propose to add a real-time chatting feature between accepted student and mentor. We can also add features to build timetables, scholarship funding for needy students.

# How I built it

I have used React and Material-UI on the front end. 

The backend is made with node.js and express.js. The database used is MongoDB.

Would be working with sockets.io for the real-time feature.

# Learnings

I used react hooks for the first time and got to learn about it. I would not be using class-based components anymore :laughing: .

Got to learn material-UI, earlier I used to use reactstrap and plane bootstrap on the frontend.



# Local Setup

## Frontend

Move to client directory after cloning.
```bash
yarn install
yarn start
```

## Backend

Move to server directory after cloning.
make a .env file with the following details

```bash
DATABASE=' '
SECRET=' '
PORT=' '
```

```bash

npm install
npm start


```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
