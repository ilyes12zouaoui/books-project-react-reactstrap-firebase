import React, { Component } from "react";

import firebase from "./FireBaseConfig";
import "./Loading.css";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardColumns,
  CardSubtitle,
  CardBody
} from "reactstrap";
class FireBaseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      bookList: []
    };
    this.onClickDelete = this.onClickDelete.bind(this);
    this.getBooksFromFireBaseAndPutThemInState = this.getBooksFromFireBaseAndPutThemInState.bind(
      this
    );
  }

  componentDidMount() {
    this.getBooksFromFireBaseAndPutThemInState();
  }

  getBooksFromFireBaseAndPutThemInState() {
    firebase
      .database()
      .ref("/books")
      .once("value")
      .then(books => {
        let newBooksList = [];

        const bolgsObject = books.val();

        for (const book in bolgsObject) {
          newBooksList = [...newBooksList, bolgsObject[book]];
        }

        this.setState({ bookList: newBooksList, isLoading: false });
      });
  }

  onClickDelete(id) {
    firebase
      .storage()
      .ref("images/covers")
      .child(id)
      .delete()
      .then(() => {
        firebase
          .storage()
          .ref("images/books")
          .child(id)
          .delete()
          .then(() => {
            firebase
              .database()
              .ref("books/" + id)
              .remove();
            this.getBooksFromFireBaseAndPutThemInState();
          })
          .catch(err => {
            console.log("error", err);
          });
      })
      .catch(err => {
        console.log("error", err);
      });
  }
  render() {
    return (
      <div>
        <center>
          <h1 style={{ textAlign: "center" }}>List</h1>
          {this.state.isLoading && <div class="lds-dual-ring" />}
          <CardColumns>
            {!this.state.isLoading &&
              this.state.bookList.map(book => {
                return (
                  <Card
                    onClick={() => {
                      this.props.history.push(`/book/${book.id}`);
                    }}
                    className="custom-card"
                  >
                    <CardImg
                      style={{ maxHeight: "400px" }}
                      top
                      width="100%"
                      src={book.cover}
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle>{book.title}</CardTitle>
                    </CardBody>
                  </Card>
                );
              })}
          </CardColumns>
        </center>
      </div>
    );
  }
}

export default FireBaseList;
