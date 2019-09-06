import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'

//MaterialUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import PostDialog from './PostDialog'

import { connect } from 'react-redux'
//icons
import ChatIcon from '@material-ui/icons/Chat'
import MyButton from '../util/MyButton';
import DeletePost from './DeletePost'
import LikeButton from './LikeButton';

const styles = {
    card: {
        position:  'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
        minHeight: 100
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Post extends Component {

    render() {
        dayjs.extend(relativeTime)
        const { classes,
            post: {
                body,
                createdAt,
                userImage,
                userHandle,
                postId,
                likeCount,
                commentCount
            },
            user: {
                authenticated, credentials: { handle }
            }
        } = this.props;
                    
        const deleteButton =
        authenticated && userHandle === handle ? (
          <DeletePost postId={postId} />
        ) : null;

        return (
            <Card className={classes.card}>
                <CardMedia image={userImage}
                    title="Profile image"
                    className={classes.image}
                />
                <CardContent className={classes.content}>
                    <Typography variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                    >{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton postId={postId}/>
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} Comments</span>
                </CardContent>
                <PostDialog postId={postId} userHandle={userHandle}/>
            </Card>
        )
    }
}

Post.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Post))