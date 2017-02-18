import React from 'react';

/**
 * Custom react component class for creating documents
 */
class CreateDocumentPage extends React.Component {

  /**
   * Constructor for an instance of the CreateDocumentPage
   * @param{Object} props - Property of this React component
   * @param{Object} context - Context of this react component
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      documentValid: false,
      document: {
        title: 'Default Title',
        content: ''
      }
    }
  }

  /**
   * 
   */
  handleTitle(event) {
    const document = this.state.document;
    document.title = event.target.value;
    this.setState({document});
    console.log('state is :' + this.state);
     
  }

  submitDocument(event) {
    event.preventDefault();
    console.log('submit document called');
  }

  handleContent(event) {
    console.log('handle content called');
  }

  /**
   * Method to render a create document CreateDocumentPage
   * @return{Object} - Element to be rendered
   */
  render() {
    return (
      <div className='row'>
        <form className='col s12 m8 offset-m2'>
          <div className='row'>
            <br/>
            <h5 className='indigo-text left-align'>New Document</h5>
            <br/>
            <div class='row col s12'>
            <div className='input-field col s9'>
              <input id='document_title' type='text' value={this.state.document.title} onChange={this.handleTitle}/>
              <label htmlFor='document_title' className='active'>Title</label>
            </div>
            <div class="input-field col s3">
              <select>
                <option value="1">Public</option>
                <option value="2">Private</option>
                <option value="3">Role</option>
              </select>
              <label>Document Access</label>
            </div>
          </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <textarea id='document_content' className='materialize-textarea' onChange={this.handleContent} value={this.state.content} ></textarea>
              <label htmlFor='document_content' className='active'>Content</label>
            </div>
          </div>
          <div className='row'>
            <button type='submit'
              name='btn_login' 
              className='col s12 m6 offset-m3 btn btn-large waves-effect indigo'
              onClick={this.submitDocument}>
              Create Document</button>
          </div>
          <br/>
        </form>
      </div>
    );
  }
}

export default CreateDocumentPage;
