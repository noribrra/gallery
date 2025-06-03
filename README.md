How start project.

first cd back-end 

create .env file

MONGO_URI=mongodb+srv://password:user@data.krr8ydg.mongodb.net/
PORT=5000
JWT_SECRET=secret



and next  
cd front-end

open package.json file 

and add this

"proxy": "http://localhost:5000",


after that in root 


run this

npm run install-all
npm run build
npm run start

open this link  http://localhost:5000


