import React, { Component } from "react";
import firebase from "firebase";
import "./Loading.css";
import { Table, Container, Row, Col } from "reactstrap";
class BookPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      bookId: this.props.match.params["id"],
      title: "",
      author: "",
      description: "",
      cover: "",
      book: "",
      category: "Psychologie"
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("/books/" + this.state.bookId)
      .once("value")
      .then(book => {
        const bookObject = book.val();

        this.setState({ ...bookObject, isLoading: false });
      });
  }

  render() {
    return (
      <div>
        <center>
          {this.state.isLoading && <div class="lds-dual-ring" />}
          {!this.state.isLoading && (
            <Container>
              <Row>
                <Col sm={{ size: 3, offset: 2 }}>
                  <img src={this.state.cover} width="100%" />
                </Col>
                <Col
                  sm="auto"
                  className="d-flex justify-content-center align-items-center"
                >
                  <Table style={{ maxWidth: "500px" }} size="sm">
                    <tbody>
                      <tr>
                        <th scope="row">title</th>
                        <td>{this.state.title}</td>
                      </tr>
                      <tr>
                        <th scope="row">author</th>
                        <td>{this.state.author}</td>
                      </tr>
                      <tr>
                        <th scope="row">category</th>
                        <td>{this.state.category}</td>
                      </tr>
                      <tr>
                        <th scope="row">description</th>
                        <td>{this.state.description}</td>
                      </tr>
                      <tr>
                        <th scope="row">download</th>
                        <td>
                          <a href={this.state.book} target="_blank" download>
                            book link
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          )}
        </center>
      </div>
    );
  }
}

export default BookPage;
