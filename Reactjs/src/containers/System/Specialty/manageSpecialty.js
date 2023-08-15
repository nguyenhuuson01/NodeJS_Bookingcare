import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./manageSpecialty.scss";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import {toast} from "react-toastify"


const mdParser = new MarkdownIt(/* Markdown-it options */);

class manageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML:'',
            descriptionMarkdown: '',
        }
    }

  async componentDidMount(event) {
   
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.language !== prevProps.language) {
       
    }
 }

 handleOnChangeInput = (event, id) => {
    let stateCopy = {...this.state}
    stateCopy[id] = event.target.value;
    this.setState({
        ...stateCopy
    })
 }

 handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };


 handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleSaveSpecialty = async () => {
    let res = await createNewSpecialty(this.state);
    if(res && res.errCode === 0){
        toast.success('Add new specialty successfully!')
        this.setState({
          name: '',
          imageBase64: '',
          descriptionHTML:'',
          descriptionMarkdown: '',
        })
    }else{
        toast.error('Failed to add')
        console.log('check state res>>>>' , res)
    }
 
  }

  render() {
    
    return (
        <div className="manage-specialty-container">
            <div className="ms-title">Quản lý chuyên khoa</div>

            <div className="add-new-specialty row">
                <div className="col-6 form-group">
                    <label>Tên Chuyên khoa</label>
                    <input type="text" className="form-control" value={this.state.name}
                        onChange={(event) => this.handleOnChangeInput(event,'name')}
                    />
                </div>
                <div className="col-6 form-group">
                    <label>Ảnh Chuyên khoa</label>
                    <input type="file" className="form-control" 
                        onChange={(event) => this.handleOnChangeImage(event)}
                    />
                </div>
                <div className="all-specialty col-12">
                    <MdEditor
                    style={{ height: "400px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.descriptionMarkdown}
                    />
                </div>
                    <div className="col-12">
                    <button className="btn-save-specialty"
                        onClick={() => this.handleSaveSpecialty()}
                    >Save</button>
                </div>
            </div>
            
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(manageSpecialty);
