import React, { useEffect, useState } from 'react';
import { Button, Comment, Form, Header, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { List, notification } from 'antd';
import Service from '../../../api/service';
import Utils from '../../../utilities/utils';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function CommentSection(props) {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [newComment, setNewComment] = useState('');
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [comments, setComments] = useState([]);
    const [enteredText, setEnteredText] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const isUserLoggedIn = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        const getAllComments = async () => {
            await Service.getAllComments(props.gameId).then((res) => {
                let tmp_comments = [];
                for (let comment of res.data.comments) {
                    tmp_comments.unshift(comment);
                }
                setComments(tmp_comments);
            });
        };
        getAllComments();

        return () => {
            setComments([]);
        };
    }, [props.gameId]);

    const handleInputChange = (event) => {
        setEnteredText(event.target.value);
        if (event.target.value) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
        setNewComment(event.target.value);
    };

    const handleAddComment = () => {
        if (!isUserLoggedIn) {
            setIsAlertVisible(true);
        } else {
            Service.addComment({
                comment: newComment,
                commentedBy: currentUser.fullName,
                game: props.gameId,
            })
                .then((res) => {
                    setComments((prevState) => {
                        return [
                            {
                                comment: res.data.newComment.comment,
                                commentedBy: res.data.newComment.commentedBy,
                                createdAt: res.data.newComment.createdAt,
                            },
                            ...prevState,
                        ];
                    });
                    notification.open({
                        message: `Game Commented`,
                        icon: <Icon name="check circle outline" />,
                    });
                    setEnteredText('');
                    setIsButtonDisabled(true);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const handleCloseNotification = () => {
        setIsAlertVisible(false);
    };

    return (
        <div>
            <Comment.Group>
                <Header as="h3" dividing>
                    Comments
                </Header>
                {comments.length > 0 ? (
                    <List
                        pagination={{
                            pageSize: 3,
                            responsive: true,
                        }}
                        dataSource={comments}
                        renderItem={(comment) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={comment.commentedBy}
                                    description={Utils.formatDate(
                                        comment.createdAt
                                    )}
                                />
                                {comment.comment}
                            </List.Item>
                        )}
                    ></List>
                ) : (
                    <p>No comments for this game.</p>
                )}
                <Form reply>
                    <Form.TextArea
                        onChange={handleInputChange}
                        value={enteredText}
                    />
                    <Button
                        content="Comment"
                        labelPosition="left"
                        icon="edit"
                        secondary
                        onClick={handleAddComment}
                        disabled={isButtonDisabled}
                    />
                </Form>
            </Comment.Group>
            {isAlertVisible && (
                <Snackbar
                    open={isAlertVisible}
                    autoHideDuration={3000}
                    onClose={handleCloseNotification}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleCloseNotification}
                        severity="warning"
                        style={{ marginTop: 50, backgroundColor: 'black' }}
                    >
                        Comment section only available for users! Please
                        Register!
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}

export default CommentSection;
