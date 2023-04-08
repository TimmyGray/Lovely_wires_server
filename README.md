# node_server
First, a few words about full project. It provides to make a various cables and their purchase. It consists of two large parts:   
1)Part for salesman - https://github.com/TimmyGray/Lovely_Wires; https://github.com/TimmyGray/Lovely_wires_server;  
2)Part for customer - https://github.com/TimmyGray/Buying_Client; https://github.com/TimmyGray/Dotnet_Server; https://github.com/TimmyGray/BuyingLibrary;  
Each part includes front and backend with joint mongo database. Most of features implemented, but not all. If something does't work correctly or doesn't work at all - 
please, write to me!In additional,i is writing(Not yet finished) this pet-project for show to potential employer my hard skills. So, it is not real app you should use in your business,ofc=)    

This is a server for Lovely Wires app, that you can find by this link https://github.com/TimmyGray/Lovely_Wires.  
CRUD operations with all parts of cable, cables,prices, images. Email sending;  

How to run ( 1-5 for the first time):  
1)Clone repo  
2)install node.js  
3)run "npm i" command in the root dir  
4)run "tsc" command in the src dir  
5)For the using email sending(optional) create "emailsettings.json" in root directory with follow fields: "email", "password","host","name";  
You must setup your mail to be used by applications; host - ssl mail server;  
6)install mongo db from official site  
7)if you don't want to use custom settings for mongo db, just run 'mongod.exe' command in mongodb root dir with admin rules. If you want to use custom settings, then  
find "mongod.cfg" file, open it and change connecting strings, after that, run "mongod.exe --config "path to mongod.cfg"" with admin rules. or, you can create simple bat file  
with the same actions;  
8)now, run "node dist/server/nodeserver.js mongodbconnectionstrings defaultapplicationport" just replace this two arguments. Or, you can make script command in package.json  
("start", "dev" for exmpl)  
 If allright, you have seen 'server listen on port...'

Stack:express.js,node.js,typescript,mongo;

