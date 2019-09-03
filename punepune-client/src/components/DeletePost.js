import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../util/MyButton'
import PropTypes from 'prop-types'

//MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutline from '@material-ui/icons/DeleteOutline'

import {connect} from 'react-redux'
import {deletePost} from '../redux/actions/dataActions';

const styles = {
    deleteButton: {
        position: 'absolute',
        top: '10%',
        left: '90%'
    }
}

export class DeletePost extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true})
    }
    handleClose = () => {
        this.setState({ open: false})
    }
    deletePost = () => {
        this.props.deletePost(this.props.postId)
        this.setState({open: true})
    }
    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <MyButton tip="Delete post" onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}>
                        <DeleteOutline color="secondary"/>
                    </MyButton>
            <Dialog open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>
                        Are you sure you want to delete this post? 
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.deletePost} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeletePost.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}
export default connect(null, { deletePost })(withStyles(styles)(DeletePost))
