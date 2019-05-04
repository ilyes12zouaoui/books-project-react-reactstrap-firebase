import React, { Component } from "react";
import firebase from "firebase";

import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
class FireBaseAdd extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      isLoading: false,
      title: "",
      author: "",
      description: "",
      cover: "",
      book: "",
      category: "Psychologie"
    };
  }

  generateId() {
    return btoa(Math.random()).substring(0, 12);
  }

  onFormSubmit(event) {
    event.preventDefault();

    const id = this.generateId();

    let newBlog = {
      id: id,
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
      cover: this.state.cover,
      book: this.state.book,
      category: this.state.category
    };

    firebase
      .storage()
      .ref(`images/covers/${id}`)
      .put(this.state.cover)
      .on(
        "state_changed",
        progress => {
          console.log("progress");
          this.setState({ isLoading: true });
        },
        error => {
          console.log("erroe", error);
        },
        () => {
          console.log("done");
          //getting cover url, adding book pdf file
          firebase
            .storage()
            .ref("images/covers")
            .child(id)
            .getDownloadURL()
            .then(url => {
              newBlog.cover = url;
              firebase
                .storage()
                .ref(`images/books/${id}`)
                .put(this.state.book)
                .on(
                  "state_changed",
                  progress => {
                    console.log("progress");
                  },
                  error => {
                    console.log("erroe", error);
                  },
                  () => {
                    //getting book url, adding book to database
                    firebase
                      .storage()
                      .ref("images/books")
                      .child(id)
                      .getDownloadURL()
                      .then(url => {
                        newBlog.book = url;
                        firebase
                          .database()
                          .ref("books/" + id)
                          .set(newBlog);
                        this.props.history.push("/list");
                      });
                  }
                );
            });
        }
      );
  }

  onInputChange(e) {
    const name = e.target.name;

    if (name == "cover" || name == "book") {
      this.setState({ [name]: e.target.files[0] });
    } else {
      this.setState({ [name]: e.target.value });
    }
  }

  render() {
    return (
      <center>
        {this.state.isLoading && (
          <div>
            <h2>Loading please wait ...</h2>
            <div class="lds-dual-ring" />
          </div>
        )}
        {!this.state.isLoading && (
          <div style={{ maxWidth: "500px", margin: "20px", textAlign: "left" }}>
            <Form onSubmit={this.onFormSubmit}>
              <FormGroup>
                <Label for="author">author</Label>
                <Input
                  type="text"
                  value={this.state.author}
                  onChange={this.onInputChange}
                  name="author"
                  id="author"
                />
              </FormGroup>
              <FormGroup>
                <Label for="title">title</Label>
                <Input
                  type="text"
                  value={this.state.title}
                  onChange={this.onInputChange}
                  name="title"
                  id="title"
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">description</Label>
                <Input
                  type="textarea"
                  value={this.state.description}
                  onChange={this.onInputChange}
                  name="description"
                  id="description"
                />
              </FormGroup>
              <FormGroup>
                <Label for="category"> category</Label>
                <Input
                  type="select"
                  name="category"
                  onChange={this.onInputChange}
                  value={this.state.category}
                  id="category"
                >
                  <option value="Psychologie">Psychologie</option>
                  <option value="Philosophie">Philosophie</option>
                  <option value="Romans">Romans</option>
                  <option value="Science fiction">Science fiction</option>
                  <option value="Histoire">Histoire</option>
                  <option value="Poésie">Poésie</option>
                  <option value="Science">Science</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="cover">cover</Label>
                <Input
                  type="file"
                  onChange={this.onInputChange}
                  name="cover"
                  id="cover"
                />
              </FormGroup>
              <FormGroup>
                <Label for="book">book</Label>
                <Input
                  type="file"
                  onChange={this.onInputChange}
                  name="book"
                  id="book"
                />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </div>
        )}
      </center>
    );
  }
}

export default FireBaseAdd;
