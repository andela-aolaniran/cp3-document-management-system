import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import {
  fetchDocumentsAsync, updateDocumentAsync
} from '../../actions/documentActions';
import Button from '../common/Button';

/**
 * Class to create a custom user sign up form
 */
class Document extends React.Component {
   /**
   * constructor for instantiation of an object of this class
   * @param{Object} props - props passed down to this component
   */
  constructor(props) {
    super(props);
    this.state = {
      editOn: false,
      selectedDocument: null
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
  }

  componentWillMount() {
    this.props.fetchDocumentsAsync(this.props.user.token);
  }

  componentWillReceiveProps(nextProps) {
    const selectedDocument = (nextProps.documents.documents.filter(document =>
      String(document.id) === nextProps.params.id))[0];
    if (selectedDocument) {
      this.setState({ selectedDocument: Object.assign({}, selectedDocument) });
    }
  }

  /**
   * Method for rendering this component
   * @return{Object} - component to be rendered
   */
  render() {
    return (
      <div className="row">
        <div className="col s8 offset-s2">
          {this.renderDocument()}
        </div>
      </div>
    );
  }

  handleOnChange(event) {
    const nextState = Object.assign(
      {},
      this.state.selectedDocument,
      { [event.target.id]: event.target.value });
    this.setState({ selectedDocument: nextState });
  }

  submitUpdate(event) {
    event.preventDefault();
    const docFields = {
      title: this.state.selectedDocument.title,
      content: this.state.selectedDocument.content,
      access: this.state.selectedDocument.access
    };
    this.props.updateDocumentAsync(
      this.props.user.token,
      docFields,
      this.state.selectedDocument.id);
    notify.show(
      'Sent update',
      'success',
      1000
    );
  }

  toggleEdit() {
    notify.show(
      this.state.editOn ? 'Edit Mode OFF' : 'Edit mode ON',
      'success',
      1000
    );
    this.setState({ editOn: !this.state.editOn, title: this.props });
  }

  renderActionButtons() {
    if (this.state.selectedDocument.ownerId === this.props.user.id
      || this.props.user.roleId === 1) {
      return (
        <span>
          <Button
            value={this.state.editOn ? 'Save Changes' : 'Edit Document'}
            name="update"
            type={this.state.editOn ? 'button' : 'submit'}
            className="btn waves waves-effect waves-light teal darken-3"
            onClick={this.toggleEdit}
          />
        </span>
      );
    }
  }

  renderDocument() {
    if (this.state.selectedDocument) {
      return (
        <div className="row">
          <br />
          <br />
          <div className="col s8 offset-s2">
            <div className="row grey lighten-5 z-depth-2 form-padding">
              <form onSubmit={this.submitUpdate}>
                <br />
                <div className="row">
                  <div className="input-field col s8">
                    <input
                      placeholder="Enter document title"
                      value={this.state.selectedDocument.title}
                      id="title"
                      type="text"
                      onChange={this.handleOnChange}
                      readOnly={this.state.editOn ? '' : 'readOnly'}
                    />
                    <label className="active" htmlFor="title">Title</label>
                  </div>
                  <div className="input-field col s4">
                    <select
                      disabled={this.state.editOn ? '' : 'disabled'}
                      id="access"
                      className="browser-default"
                      defaultValue={this.state.selectedDocument.access}
                      onChange={this.handleOnChange}
                    >
                      <option value="public">Public</option>
                      <option value="role">Role</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <textarea
                      placeholder="Enter document content"
                      value={this.state.selectedDocument.content}
                      id="content"
                      type="text"
                      className="materialize-textarea"
                      onChange={this.handleOnChange}
                      readOnly={this.state.editOn ? '' : 'readOnly'}
                    />
                    <label className="active" htmlFor="content">Content</label>
                  </div>
                </div>
                {this.renderActionButtons()}
              </form>
              <br />
            </div>
            <br />
          </div>
        </div>
      );
    }
    return (
      <div>
        <h3> Fetching document </h3>
      </div>
    );
  }
}

Document.propTypes = {
  user: PropTypes.object.isRequired,
  fetchDocumentsAsync: React.PropTypes.func.isRequired,
  updateDocumentAsync: React.PropTypes.func.isRequired
};

/**
 * Function to match a slice of our state tree to this component props
 * @param {Object} state - Current state of the user slice of our state
 * tree.
 * @return {Object} - part of our state tree we want available to our component
 * as props
 */
function mapStateToProps(state) {
  return {
    user: state.user,
    documents: state.documents
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDocumentsAsync: bindActionCreators(fetchDocumentsAsync, dispatch),
    updateDocumentAsync: bindActionCreators(updateDocumentAsync, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Document);
