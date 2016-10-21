var Tab = React.createClass({displayName: "Tab",
  getInitialState: function() {
    return {
      animateS: ''
    };
  },
  componentDidMount: function() {
    setTimeout(function() {
      this.setState({animate: 'enter'});
    }.bind(this), 300);
  },
  click: function(event) {
    event.preventDefault();
    this.props.click();
  },
  render: function() {
    return (
      React.createElement("li", {className: this.props.isCurrent ? 'active '+this.state.animate : this.state.animate}, 
        React.createElement("a", {onClick: this.click, href: this.props.url}, 
          this.props.name
        )
      )
    );
  }
});

var Nav = React.createClass({displayName: "Nav",
  click: function(tab) {
    this.props.changeTab(tab);
  },
  render: function() {
    return (
      React.createElement("nav", null, 
        React.createElement("ul", null, 
          this.props.navlist.map(function(tab, index) {
            return (
              React.createElement(Tab, {
                click: this.click.bind(this, index), 
                key: tab.id, 
                url: tab.url, 
                name: tab.name, 
                isCurrent: (this.props.currentTab === index)}
              )
            );
          }.bind(this))
        )
      )
    );
  }
});

var App = React.createClass({displayName: "App",
  getInitialState: function() {
    return {
      hero: true,
      navlist: navlist,
      welcome: welcome,
      counter: 0,
      currentTab: 0,
      breakup: false,
      animateHero: '',
      animateRightImage: '',
      animateLeftImage: '',
      animateHeroButton: '',
      animateHeroButtonInner: '',
      animateHeroName: '',
      animateHeroArrow: '',
      animateSlideIn: ''
    };
  },
  handleClick: function() {
    setTimeout(function() {
      this.setState({hero: false});
      if (this.state.breakup) {
        this.setState({animateSlideIn: 'enter'});
      }
      clearInterval(this.state.interval);
      console.log('Darren Lim: Interval stopped');
      console.log('Darren Lim: Hero is set to FALSE');
    }.bind(this), 580);
  },
  handleClickSlide: function() {
    this.setState({
      animateHero: 'animate-slide',
      animateHeroName: '',
      animateHeroArrow: ''
    });
    this.handleClick();
  },
  handleClickBreakup: function() {
    this.setState({
      animateHeroButton: 'exit',
      animateHeroName: 'exit',
      animateHeroArrow: 'exit',
      breakup: true
    });
    setTimeout(function() {
      this.setState({animateHero: 'animate-breakup'});
      this.handleClick();
    }.bind(this), 300);
  },
  changeTab: function(index) {
    this.setState({ currentTab: index });
  },
  componentDidMount: function() {
    if (this.state.hero) {
      setTimeout(function() {
        var interval = setInterval(this.countTimer, 1200);
        this.setState({ interval: interval });
        console.log('Darren Lim: Interval initialized');
      }.bind(this), 1200);
    }
    setTimeout(function() {
      this.setState({
        animateRightImage: 'enter',
        animateLeftImage: 'enter'
      });
    }.bind(this), 100);
    setTimeout(function() {
      this.setState({animateHeroButton: 'enter'});
    }.bind(this), 1200);
    setTimeout(function() {
      this.setState({
        animateHeroName: 'enter',
        animateHeroButtonInner: 'enter',
        animateHeroArrow: 'enter'
      });
    }.bind(this), 2000);
  },
  countTimer: function() {
    if (this.state.counter >= welcome.length-1) {
      this.setState({ counter: 0 });
    }
    else {
      this.setState({ counter: this.state.counter+1 });
    }
    console.log('Darren Lim: Counter');
  },
  render: function() {
    var component;
    if (this.state.hero) {
      component = (
        React.createElement("div", {id: "hero", className: this.state.animateHero}, 
          React.createElement("div", {className: 'image-container image-bg '+this.state.animateRightImage}, 
            React.createElement("div", {className: "image"})
          ), 
          React.createElement("div", {className: 'image-container image-non '+this.state.animateLeftImage}, 
            React.createElement("div", {className: "image"})
          ), 
          React.createElement("div", {className: 'button '+this.state.animateHeroButton, 
               onClick: this.handleClickBreakup}, 
            React.createElement("div", {className: this.state.animateHeroButtonInner}), 
            React.createElement("span", null, this.state.welcome[this.state.counter])
          ), 
          React.createElement("div", {className: 'name '+this.state.animateHeroName, 
               onClick: this.handleClickSlide}, "Darren Lim"), 
          React.createElement("div", {className: 'arrow '+this.state.animateHeroArrow, 
               onClick: this.handleClickSlide}, 
            React.createElement("div", {id: "upperline"}), 
            React.createElement("div", {id: "lowerline"})
          )
        )
      );
    }
    else {
      component = (
        React.createElement("div", {id: "main-wrapper"}, 
          React.createElement("div", {id: "sidebar", className: this.state.animateSlideIn}, 
            React.createElement(Nav, {
              currentTab: this.state.currentTab, 
              navlist: this.state.navlist, 
              changeTab: this.changeTab}
            )
          ), 
          React.createElement("div", {id: "page", className: this.state.animateSlideIn}, 
            React.createElement("div", {className: "content"}, 
              this.state.navlist[this.state.currentTab].content
            )
          )
        )
      );
    }

    return (
      React.createElement("div", null, 
        component
      )
    );
  }
});

var welcome = [
  'Welcome',
  'Bienvenue',
  '欢迎',
  'Velkommen',
  'Bienvenido',
  '歡迎',
  'Willkommen',
  'Välkommen',
  'ようこそ'
];

var navlist = [
  {
    id: 0,
    name: 'about me',
    url: '/about',
    content:
      React.createElement("div", {className: "about"}, "stuff")
  },
  {
    id: 1,
    name: 'portfolio',
    url: '/portfolio',
    content:
      React.createElement("div", {className: "portfolio"}, "portfolio")
  },
  {
    id: 2,
    name: 'my skills',
    url: '/skills',
    content:
      React.createElement("div", {className: "skills"}, "skills")
  },
  {
    id: 3,
    name: 'contact me',
    url: '/contact',
    content:
      React.createElement("div", {className: "contact"}, "contact")
  }
];

ReactDOM.render(React.createElement(App, null), document.getElementById('main'));