import React, { Component } from "react";
import Link from "next/link";
import { Link as LocalLink, animateScroll as scroll } from "react-scroll";

export default class Header extends Component {
  constructor() {
    super();
    this.state = { collapseMenu: true, menuOpen: false, shrink: false };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  handleResize = () => {
    const expandMenuWidth = 650;
    console.log(window.innerWidth);
    if (window.innerWidth > expandMenuWidth) {
      this.setState({ collapseMenu: false });
    } else {
      this.setState({ collapseMenu: true });
    }
  };

  handleScroll = () => {
    const shrinkHeight = 200;
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (scrollPosition > shrinkHeight) {
      this.setState({ shrink: true });
    } else {
      this.setState({ shrink: false });
    }
  };

  openHamburger() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    return (
      <header>
        <div className="logoContainer">
          <a
            href="/"
            onClick={e => {
              e.preventDefault();
              scroll.scrollToTop();
            }}
          >
            <h2 className="logo">JV</h2>
          </a>
        </div>
        {this.state.collapseMenu ? (
          <div
            id="hamburger"
            className={this.state.menuOpen ? "open" : ""}
            onClick={() => this.openHamburger()}
          >
            <span />
            <span />
          </div>
        ) : null}

        {this.state.menuOpen || !this.state.collapseMenu ? (
          <nav className={this.state.menuOpen ? null : "cl-effect-21"}>
            <div>
              <LocalLink to="work" smooth={true}>
                <a href="">🗄 Work</a>
              </LocalLink>
              <Link href="/about">
                <a>👨🏻‍💻 About</a>
              </Link>
              <Link href="http://johnverrone.com">
                <a>📸 Photography</a>
              </Link>
              <Link href="/resume.pdf">
                <a>📄 Resume</a>
              </Link>
              <Link href="https://github.com/jverrone3">
                <a>🖥 GitHub</a>
              </Link>
            </div>
          </nav>
        ) : null}

        <style jsx>{`
          header {
            position: fixed;
            width: 100%;
            background-color: rgba(255, 255, 255, 0.9);
            border-bottom: thin solid black;
            padding: ${this.state.shrink ? "3px" : "30px"} 0;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s;
            max-height: ${this.state.menuOpen ? '400px' : '100px'};
          }

          nav {
            width: ${this.state.menuOpen ? "100%" : "auto"};
            position: relative;
            ${
              this.state.menuOpen ? "text-align: center;" : "margin-right: 15%;"
            }
          }

          nav a {
            position: relative;
            display: ${this.state.menuOpen ? "block" : "inline-block"};
            text-transform: lowercase;
            margin-right: ${this.state.menuOpen ? "0" : "20px;"}
            line-height: 30px;
            transition: all 0.3s;
            ${this.state.menuOpen ? "padding: 10px 0;" : null}
          }

          .logoContainer {
            margin-left: 15%;
            float: left;
          }

          .logo {
            font-family: "Oswald";
            font-weight: 300;
            font-variant: small-caps;
            letter-spacing: 0.1em;
            line-height: "30px";
            margin: 0 auto;
            padding: 3px 4px 3px 6px;
            border: 1px solid black;
          }

          #hamburger {
            width: 20px;
            height: 10px;
            margin-right: 15%;
            transform: rotate(0deg);
            transition: 0.5s ease-in-out;
            cursor: pointer;
          }

          #hamburger span {
            display: block;
            position: absolute;
            height: 2px;
            width: 100%;
            background: #777;
            border-radius: 2px;
            opacity: 1;
            left: 0;
            transform: rotate(0deg);
            transition: 0.25s ease-in-out;
          }

          #hamburger span:nth-child(1) {
            top: 0px;
            transform-origin: left center;
          }

          #hamburger span:nth-child(2) {
            top: 10px;
            transform-origin: left center;
          }

          #hamburger.open span:nth-child(1) {
            transform: rotate(45deg);
            top: -2px;
            left: 0px;
          }

          #hamburger.open span:nth-child(2) {
            transform: rotate(-45deg);
            top: 12px;
            left: 0px;
          }

          .cl-effect-21 a {
            color: #777;
            text-shadow: none;
            -webkit-transition: color 0.3s;
            -moz-transition: color 0.3s;
            transition: color 0.3s;
            cursor: pointer;
          }

          .cl-effect-21 a::before,
          .cl-effect-21 a::after {
            position: absolute;
            left: 0;
            width: 100%;
            height: 2px;
            background: #de8642;
            content: "";
            opacity: 0;
            -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
            -moz-transition: opacity 0.3s, -moz-transform 0.3s;
            transition: opacity 0.3s, transform 0.3s;
            -webkit-transform: translateY(-10px);
            -moz-transform: translateY(-10px);
            transform: translateY(-10px);
          }

          .cl-effect-21 a::before {
            top: 0;
            -webkit-transform: translateY(-10px);
            -moz-transform: translateY(-10px);
            transform: translateY(-10px);
          }

          .cl-effect-21 a::after {
            bottom: 0;
            -webkit-transform: translateY(10px);
            -moz-transform: translateY(10px);
            transform: translateY(10px);
          }

          .cl-effect-21 a:hover,
          .cl-effect-21 a:focus {
            color: #de8642;
          }

          .cl-effect-21 a:hover::before,
          .cl-effect-21 a:focus::before,
          .cl-effect-21 a:hover::after,
          .cl-effect-21 a:focus::after {
            opacity: 1;
            -webkit-transform: translateY(0px);
            -moz-transform: translateY(0px);
            transform: translateY(0px);
          }
        `}</style>
      </header>
    );
  }
}
