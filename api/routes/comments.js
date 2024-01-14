import express  from "express";
import { getComments,addComment,deleteComment,updateComment} from "../controllers/comments.js";

const router = express.Router()

// router.get("/:id",getComments)
router.get("/",getComments)
router.delete('/:id',deleteComment)
router.put('/:id',updateComment)
// router.put('/:id', put);
router.put("/",addComment);
// router.put("/user-image-upload/:id", updateUserPhoto)

export default router