import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchDocumentsAsync } from '../../actions/documentActions';
import CircularPreloader from '../common/CircularPreloader';

class DocumentsList extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col s8 offset-s2">
          <ul className="collection with-header">
            <li className="collection-header">
              <h4>Documents: {this.props.documents.length}</h4>
            </li>
            {this.generateDocumentsList()}
          </ul>
        </div>
      </div>

    );
  }

  componentWillMount() {
    this.props.fetchDocumentsAsync(this.props.user.token);
  }

  generateDocumentsList() {
    if (!this.props.fetchingDocuments) {
      return this.props.documents.map(document =>
        (
          <li className="collection-item" key={document.id}>
            <Link to={`/documents/${document.id}`}>
              <h6>{document.title}</h6>
            </Link>
          </li>
        )
      );
    }
    return (
      <div>
        <h5> Fetching Documents From Server ..... </h5>
        <CircularPreloader />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    documents: state.documents,
    user: state.user,
    fetchingDocuments: state.fetchingDocuments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDocumentsAsync: bindActionCreators(fetchDocumentsAsync, dispatch)
  };
}

DocumentsList.propTypes = {
  documents: React.PropTypes.array.isRequired,
  user: React.PropTypes.object.isRequired,
  fetchingDocuments: React.PropTypes.bool.isRequired,
  fetchDocumentsAsync: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsList);
