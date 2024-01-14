import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import "../styles/forum.css";

function Forum() {
  const state = useLocation().state;
  console.log("state " + state);
  const location = useLocation();
  const commentId = location.pathname.split("/")[2];
  console.log("commentId " + commentId);
  const { currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editComment, setEditComment] = useState('');
  const navigate = useNavigate();
  const [editCommentShow, setEditCommentShow] = useState(false);
  const [editCommentCurrent, setEditCommentCurrent] = useState();

  console.log("current user " + JSON.stringify(currentUser));
  console.log("current user " + currentUser.id);
  
  useEffect(() => {
    if (currentUser == null) {
      navigate('/');
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get('/comments');
        setComments(res.data);
        console.log("res.data " + JSON.stringify(res.data));
        console.log("res.data comment id" + res.data[0].id);
      } catch (err) {
        console.log(err);
      }

    
    };

    fetchComments();
  }, []);


  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleEditCommentChange = (e) => {
    setEditComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      await axios.put('/comments/', {
        content: newComment,
        userId: currentUser.id,
      });
      setNewComment('');
      const res = await axios.get('/comments');
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setEditCommentShow(true);
  }, [editCommentCurrent]);

  const CommentEdit = (commentid, commentid2) => {
    setEditCommentCurrent(commentid);
    setEditCommentShow(!editCommentShow);

    console.log("comment id " + editCommentCurrent);
    console.log("comment id2 " + commentid);
  };

  const handleCommentEdit = async (commentId, commentUserId) => {
    try {
      await axios.put(`/comments/${commentId}`, {
        content: editComment,
        userId: commentUserId,
        id: commentId,
      });
      const res = await axios.get('/comments');
      setComments(res.data);
      setEditCommentShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`/comments/${commentId}`);
      const res = await axios.get('/comments');
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Forum">
      <div>
        <h2 className="headingForum">FORUM</h2>
        <div>
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Napišite komentar..."
          />
          <button onClick={handleCommentSubmit}>Potvrdi</button>
        </div>
        <div>
          {comments.map((comment) => (
            
            <div key={comment.id}>
              <div className="user">
                <div className="profile_picture">
                  {comment.userImg && (
                    <img
                      className="avatar-single"
                      src={`../upload/${comment.userImg}`}
                      alt="user image"
                    />
                  )}
                </div>
                <div className="username">
                <span>{comment.username}</span>
                </div>
                <br />
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
              {currentUser?.id === comment.userId && (
                <div className="user-actions">
                  <Link className="button-single" onClick={() => CommentEdit(comment.id)}>
                    Uredi
                  </Link>
                  {editCommentShow && comment.id === editCommentCurrent && (
                    <div>
                      <textarea
                        value={editComment}
                        onChange={handleEditCommentChange}
                        placeholder="Uredi komentar..."
                      />
                      <button onClick={() => handleCommentEdit(comment.id, comment.userId)}>
                        Uredi
                      </button>
                    </div>
                  )}
                  <Link
                    className="button-delete-single"
                    onClick={() => handleCommentDelete(comment.id)}
                  >
                    Obriši
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Forum;