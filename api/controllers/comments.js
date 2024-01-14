import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getComments = (req,res) => {
    // const q =  "SELECT * FROM comments";
    const q =  "SELECT p.id, `content`,`userId`, `username`, u.img AS userImg FROM users u JOIN comments p ON u.id=p.userId";

    db.query(q,[req.query.cat],(err,data)=>{
        if(err) return res.send(err);

        return res.status(200).json(data);
    });
}


// export const getComment = (req,res) => {
//     const q = "SELECT p.id, `username`, `title`, `date`,`desc`, p.img, u.img AS userImg, `cat` FROM users u JOIN books p ON u.id=p.uid WHERE p.id = ?" ;

//     db.query(q,[req.params.id],(err,data)=>{
//         if(err) return res.json(err);

//         return res.status(200).json(data[0]);
//     });
// }

// export const searchBooks = (req,res) => {
//     const q = req.query.cat ? "SELECT * FROM books WHERE cat=? AND title like '" + req.query.title + "%'" : " SELECT * FROM books WHERE title like '" + req.query.title + "%'";

//     db.query(q,[req.query.cat],(err,data)=>{
//         if(err) return res.send(err);

//         return res.status(200).json(data);
//     });
// }

export const addComment = (req,res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token,"unama", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not vaild!")
        if (userInfo.isAdmin) return res.status(403).json("You do not have permission for this operation!");
            
    
        const q = "INSERT INTO comments(`content`,`userId`) VALUES (?)"

        const values = [
            req.body.content,
            req.body .userId,           
        ]
    
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err)

            return res.json("Comment has been created");
        })
    })
}

export const deleteComment = (req,res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token,"unama", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not vaild!")

        const bookId = req.params.id
        const q = "DELETE FROM comments WHERE `id` = ? AND `userid` = ?";

        db.query(q,[bookId, userInfo.id], (err, data) =>{
            if(err) return res.status(403).json("You do not have permission for this opertion!")
        
            return res.json("Comment has been deleted!")
        })
    })
}

export const updateComment = (req,res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token,"unama", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not vaild!")

        const bookId = req.body.userId; 
         // UPDATE books SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id`=? AND `uid` = ?
        const q = "UPDATE comments SET `content`=? WHERE `id`=? AND `userId` = ?";

        const values = [
            req.body.content,    
            req.body.id,        
        ]
    
        db.query(q,[...values,bookId,userInfo.id],(err,data)=>{
            if(err) return res.status(500).json(err)

            return res.json("Comment has been updated");
        })
    })
}