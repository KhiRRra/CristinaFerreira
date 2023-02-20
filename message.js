class Mess extends React.Component {
  state = {
    name: "",
    email: "",
    text: "",
    btn: "none",

    errors: {
      name: false,
      email: false,
      text: false,
    },
  };

  messages = {
    name_incorrect: "Enter your first and last name!",
    email_incorrect: "Missing or incorrect e-mail address!",
    text_incorrect: "Enter your message!",
  };

  handleChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleChangeText = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const validation = this.handleForm();
    // console.log(validation)

    if (validation.correct) {
      this.setState({
        name: "",
        email: "",
        text: "",
        btn: "block",
        // message: "Formularz został wysłany",

        errors: {
          name: false,
          email: false,
          text: false,
        },
      });
    } else {
      this.setState({
        errors: {
          name: !validation.name,
          email: !validation.email,
          text: !validation.text,
        },
      });
    }
  };

  handleForm = () => {
    let name = false;
    let email = false;
    let text = false;
    let correct = false;

    if (this.state.name.length > 3 && this.state.name.indexOf(" ") !== -1) {
      name = true;
    }
    if (this.state.email.indexOf("@") !== -1) {
      email = true;
    }
    if (this.state.text.length !== 0) {
      text = true;
    }

    if (name && email && text) {
      correct = true;
    }
    return { correct, name, email, text };
  };

  handleClickBtnClose = () => {
    this.setState({
      btn: "none",
    });
  };

  render() {
    return (
      <>
        <form className="columnn needs-validation" onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <input
              name="name"
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.handleChangeName}
              placeholder="First and last name"
              pattern="\w{3,30}[ ]\w{3,30}"
            />
          </div>
          {this.state.errors.name ? (
            <div className="error">{this.messages.name_incorrect}</div>
          ) : null}

          <div className="input-group mb-3">
            <input
              name="email"
              type="email"
              className="form-control two"
              value={this.state.email}
              onChange={this.handleChangeEmail}
              placeholder="name@example.com"
            />
          </div>
          {this.state.errors.email ? (
            <div className="error">{this.messages.email_incorrect}</div>
          ) : null}
          <div id="emailHelp" class="input-group form-text text-light">
            Remember! We'll never share your e-mail with anyone else.
          </div>

          {this.state.errors.text ? (
            <div className="error">{this.messages.text_incorrect}</div>
          ) : null}
          <div className="input-group">
            <textarea
              name="message"
              className="form-control"
              placeholder="Message"
              value={this.state.text}
              onChange={this.handleChangeText}
            ></textarea>
          </div>

          <button
            className="btn btn-light px-4 py-2 mt-0 col-4 text-center"
            id="btn"
          >
            Send!
          </button>
        </form>

        <div
          className="popup text-light col-5"
          id="popup"
          style={{ display: this.state.btn }}
        >
          <p>Your message has been sent!</p>
          <button
            className="btnClose col-3"
            id="btnClose"
            onClick={this.handleClickBtnClose}
          >
            Close
          </button>
        </div>
      </>
    );
  }
}

ReactDOM.render(<Mess />, document.getElementById("root"));
