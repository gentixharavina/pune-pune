import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../util/MyButton'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom'
//MUI stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

//icons
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import ChatIcon from '@material-ui/icons/Chat'
//redux 
import { connect } from 'react-redux'
import { getPost, clearErrors } from '../redux/actions/dataActions'
import LikeButton from './LikeButton';

const styles = theme => ({
    ...theme.spreadTheme,
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%',
        top: '57%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
})

class PostDialog extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true })
        this.props.getPost(this.props.postId)
    }
    handleClose = () => {
        this.setState({ open: false })
        this.props.clearErrors();
    }

    render() {
        const {
            classes,
            post: {
                postId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                userHandle,
                comments
            },
            UI: { loading }
        } = this.props

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
                <Grid container spacing={10}>
                    <Grid item sm={5}>
                        <img src={userImage} alt="Profile" className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={7}>
                        <Typography
                            component={Link}
                            color="primary"
                            variant="h5"
                            to={`users/${userHandle}`}
                        >
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body1">
                            {body}
                        </Typography>
                        <LikeButton postId={postId} />
                        <span>{likeCount} likes</span>
                        <MyButton tip="comments">
                            <ChatIcon color="primary" />
                        </MyButton>
                        <span>{commentCount} Comments</span>
                    </Grid>
                    <hr className={classes.visibleSeparator} />
                </Grid>
            )
        return (
            <Fragment>
                <MyButton
                    onClick={this.handleOpen}
                    tip="Expand Post"
                    tipClassName={classes.expandButton}>
                    <UnfoldMore color='primary' />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.data.post,
    UI: state.UI
})

const mapActionsToProps = {
    getPost,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog))